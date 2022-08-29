import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import Lodash from "lodash";

import QuoteAssets from "../fixtures/quoteAssets";
import Exchanges from "../fixtures/exchanges";
import Timeframes from "../fixtures/timeframes";

const Symbols = new Mongo.Collection("symbols");

const SymbolSchema = new SimpleSchema({
  baseAsset: String,
  quoteAsset: {
    type: String,
    allowedValues: Lodash.flatten(Lodash.map(QuoteAssets, "value")),
  },
  exchange: {
    type: String,
    allowedValues: Lodash.keys(Exchanges),
  },
  timeframe: {
    type: String,
    allowedValues: Lodash.keys(Timeframes),
  },
  klines: Array,
  "klines.$": Object,
  "klines.$.open": Number,
  "klines.$.high": Number,
  "klines.$.low": Number,
  "klines.$.close": Number,
  "klines.$.openTime": Number,
  "klines.$.closeTime": Number,

  createdAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
      this.unset();
    },
  },
});

Symbols.attachSchema(SymbolSchema);

export default Symbols;
