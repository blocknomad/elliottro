import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import BinanceAPI from 'binance';
import Lodash from 'lodash';

import Symbols from '/imports/both/collections/symbols';
import Timeframes from '/imports/both/fixtures/timeframes';


export default function fetchKlinesBinance(timeframe) {
  console.log(`START: Fetching BINANCE ${timeframe} klines`);

  const Binance = new BinanceAPI.BinanceRest({});
  const BinanceSymbols = {};

  Symbols.find({ exchange: 'BINA', timeframe }).forEach(symbol => {
    BinanceSymbols[symbol.baseAsset + symbol.quoteAsset] = symbol;
  });

  const treatKlines = klines =>
    Lodash.map(klines, kline => ({
        open: Number(kline[1]),
        high: Number(kline[2]),
        low: Number(kline[3]),
        close: Number(kline[4]),
        openTime: kline[0],
        closeTime: kline[6],
      })
    );

  new Promise(

    // 1 - Fetch exchange info

    (resolve, reject) =>
      Binance.exchangeInfo((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      })

  ).then(

    // 2 - Treat exchange info and filter symbols with desired quote assets

    data =>
      Lodash.filter(
        data.symbols,
        //symbol => Lodash.includes(['USDT'], symbol.quoteAsset)
        symbol => Lodash.includes(['BTC', 'ETH', 'USDT'], symbol.quoteAsset)
      )

  ).then(

    // 3 - Create list of promises

    data =>
      Lodash.map(
        data,
        ({ symbol, baseAsset, quoteAsset }) =>
          new Promise(resolve => {

            let query = `symbol=${symbol}&interval=${Timeframes[timeframe].value}&limit=100`;

            const currentKlines = Lodash.get(BinanceSymbols[symbol], 'klines');

            if (Lodash.isEmpty(currentKlines) === false) {
              query += `&startTime=${Lodash.last(currentKlines).closeTime + 1}`;
            }

            try {
              const response = HTTP.get(
                'https://api.binance.com/api/v1/klines',
                { query }
              );

              resolve({
                symbol,
                baseAsset,
                quoteAsset,
                klines: response.data,
              });
            } catch(error) {
              console.log(error);
            }

          }).catch(error => {
            console.log(error);
          })
      )

  ).then(

    // 4 - Run list of promises

    data => Promise.all(data)

  ).then(

    // 5 - Store klines on Symbols collection

    data => {

      data.forEach(({ symbol, baseAsset, quoteAsset, klines }) => {
        if (BinanceSymbols[symbol]) {
          klines = (BinanceSymbols[symbol].klines.concat(treatKlines(klines))).slice(-100);

          Symbols.update(
            BinanceSymbols[symbol]._id,
            { $set: { klines } }
          );
        } else if (Lodash.isEmpty(klines) === false) {
          Symbols.insert({
            baseAsset,
            quoteAsset,
            timeframe,
            exchange: 'BINA',
            klines: treatKlines(klines),
          });
        }
      });

      console.log(`END: Fetching BINANCE ${timeframe} klines, ${(Lodash.map(data, 'klines')).length} klines fetched`);

    }

  );
};
