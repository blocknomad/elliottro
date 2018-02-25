
/**

	@method searchPattern

	 Scans all listed symbols and tries to match the selected pattern in the chosen timeframe


	Parameters:

		pattern: String,
		timeframe: String,


**/

import { Meteor } from 'meteor/meteor';
import Binance from 'node-binance-api';
import Lodash from 'lodash';
import DTW from 'dtw';
import Future from 'fibers/future';
import Symbols from './symbols';
import Templates from './templates';
import normalizeInput from './functions/normalizeInput';
import normalizeTemplate from './functions/normalizeTemplate';


Meteor.methods({
	searchPattern(pattern = 'inversedHS', timeframe) {
    // const future = new Future();


    // Create DTW class
    
    const dtw = new DTW();

    const limit = 30;


		// START: Loop through symbols array

    Symbols.forEach(symbol => {
      // START: Fetch current symbol kline/candlestick data

      const Cmin = {
        warpingDistance: Number.POSITIVE_INFINITY, 
      };

      
      // Binance.candlesticks('BCCBTC', '1d', (error, ticks, symbol) => {
  		Binance.candlesticks(symbol, '1w', (error, ticks, xsymbol) => {
        
        const template = Templates[pattern];

        if (Lodash.isEmpty(ticks) || ticks.length < template.series.length) return;

        // Extract close value from kline/candlestick
        const input = {
          series: Lodash.map(ticks, v => Lodash.toNumber(v[4])),
          closeTime: Lodash.map(ticks, v => Lodash.toNumber(v[6])),
        };

        const inputLength = input.series.length;



        // Increment window size by 1 up to input series length

        for (let wSize = template.series.length; wSize <= input.series.length; wSize++) {

          // Normalize template series
          // const normalizedTemplate = wSize > template.series.length * 2 ?
          //   normalizeTemplate(template, wSize) : template.series;

          const normalizedTemplate = normalizeTemplate(template, wSize);

          // Slid window through input series

          for (let wOffset = 0; wOffset < 5 && wSize + wOffset < input.series.length; wOffset++) {
            const wStart = inputLength - wOffset - wSize - 1;
            const wEnd = inputLength - wOffset - 1;
          
            // Normalize input series

            const normalizedInput = normalizeInput(
              Lodash.slice(input.series, wStart, wEnd),
              Templates[pattern].min,
              Templates[pattern].max
            );


            // Compute the similarity cost between the normalized input and the template series 
            const cost = dtw.compute(normalizedInput, normalizedTemplate);


            if (cost < Cmin.warpingDistance) {
              Cmin.symbol = symbol;
              Cmin.warpingDistance = cost;
              Cmin.pattern = pattern;
              Cmin.start = new Date(input.closeTime[wStart]).toLocaleString();
              Cmin.end = new Date(input.closeTime[wEnd]).toLocaleString();
            }
          }
        }

        if (Cmin.warpingDistance < 5) {
          console.log(Cmin);
        }

        // Fetch optmal path for the two series
        // const path = dtw.path();


        // future.return(normalizedInput)
        // if (cost < 15) {
          // console.log(xsymbol, cost)
        // }

  			// const [
  			//   time,
  			//   open,
  			//   high,
  			//   low,
  			//   close,
  			//   volume,
  			//   closeTime,
  			//   assetVolume,
  			//   trades,
  			//   buyBaseVolume,
  			//   buyAssetVolume,
  			//   ignored,
  			// ] = lastTick;
      // }, { startTime: 1510444800000, endTime: 1515542400000 });
      // }, { startTime: 1517464800000, endTime: 1518451200000 });
  		}, { limit });

      // END: Fetch current symbol kline/candlestick data
    });


		// END: Loop through symbols array

    // return future.wait();
	},

})



//Meteor.call('searchPattern')
