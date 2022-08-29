import { Meteor } from "meteor/meteor";
import fetchKlinesBinance from "/imports/server/functions/fetchKlines/binance";

Meteor.setInterval(() => {
  fetchKlinesBinance("W1");
}, 604800000);
