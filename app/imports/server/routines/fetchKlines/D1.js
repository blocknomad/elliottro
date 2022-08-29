import { Meteor } from "meteor/meteor";
import fetchKlinesBinance from "/imports/server/functions/fetchKlines/binance";

Meteor.setInterval(() => {
  fetchKlinesBinance("D1");
}, 86400000);
