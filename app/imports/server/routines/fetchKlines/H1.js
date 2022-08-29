import { Meteor } from "meteor/meteor";
import fetchKlinesBinance from "/imports/server/functions/fetchKlines/binance";

Meteor.setInterval(() => {
  fetchKlinesBinance("H1");
}, 3600000);
