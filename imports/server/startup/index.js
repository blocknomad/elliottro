import { Meteor } from 'meteor/meteor';
import fetchKlinesBinance from '/imports/server/functions/fetchKlines/binance';
import Timeframes from '/imports/both/fixtures/timeframes';


Meteor.startup(() => {
  //fetchKlinesBinance('M15');

  for (timeframe in Timeframes) {
    fetchKlinesBinance(timeframe);
  }
});
