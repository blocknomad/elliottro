import { Meteor } from 'meteor/meteor'

import Screens from '/imports/both/collections/screens';

Meteor.publish('screens.fromCurrentUser', function() {
  if (this.userId) {
    return Screens.find({ userId: this.userId });
  } else {
    return [];
  }
});
