import { Meteor } from 'meteor/meteor';
import fetchKlinesBinance from '/imports/server/functions/fetchKlines/binance';
import Timeframes from '/imports/both/fixtures/timeframes';
import Symbols from '/imports/both/collections/symbols';


Meteor.startup(() => {  
  for (timeframe in Timeframes) {
    fetchKlinesBinance(timeframe);
  }
});
