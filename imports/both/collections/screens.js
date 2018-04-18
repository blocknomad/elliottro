import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import Lodash from 'lodash';

import QuoteAssets from '../fixtures/quoteAssets';
import Exchanges from '../fixtures/exchanges';
import Timeframes from '../fixtures/timeframes';

const Screens = new Mongo.Collection('screens');

const ScreenSchema = new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },
  timeframe: {
    type: String,
    allowedValues: Lodash.keys(Timeframes),
  },
  exchanges: {
    type: Array,
  },
  'exchanges.$': {
    type: String,
    allowedValues: Lodash.keys(Exchanges),
  },
  quoteAssets: {
    type: Array,
  },
  'quoteAssets.$': {
    type: String,
    allowedValues: Lodash.flatten(Lodash.map(QuoteAssets, 'value')),
  },
  range: {
    type: Number,
  },
  chart: {
    type: Object,
  },
  'chart.type': {
    type: String,
  },
  'chart.pattern': {
    type: String,
  },
  slug: {
    type: String,
    optional: true,
  },

  userId: {
    type: String,
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        return new Date()
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() }
      }
      this.unset()
    },
  },
});

Screens.attachSchema(ScreenSchema);
Screens.friendlySlugs({
  slugFrom: 'name',
  updateSlug: true,
});

export default Screens;
