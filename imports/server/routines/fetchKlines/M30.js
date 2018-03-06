import { Meteor } from 'meteor/meteor';
import fetchKlinesBinance from '/imports/server/functions/fetchKlines/binance';


Meteor.setInterval(() => {
  fetchKlinesBinance('M30');
}, 1800000);
