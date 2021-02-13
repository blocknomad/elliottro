
/**

	@method cancelSubscription
**/

import { Meteor } from 'meteor/meteor';
import Stripe from 'stripe';

Meteor.methods({
	async 'user/cancelSubscription'() {
		if (!this.userId) {
			throw new Meteor.Error('user/cancelSubscription', 'User must be logged in')
		}

		const user = Meteor.users.findOne({ _id: this.userId });

		try {
			const stripe = Stripe(Meteor.settings.stripe_sk);

			await stripe.subscriptions.del(
				user.stripe.subscriptionId
			);

			Meteor.users.update(user._id, {
				$set: {
					'stripe.subscriptionStatus': 'cancelled'
				}
			});
		} catch (error) {
			console.log(error)
			throw new Meteor.Error("user/cancelSubscription", error);
		}
	},
});
