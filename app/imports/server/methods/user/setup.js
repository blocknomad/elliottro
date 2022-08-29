/**

	@method forgotPassword

	Parameters:

		email: String
		password: String
		paymentMethod: Object
**/

import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import Stripe from "stripe";

Meteor.methods({
  async "user/setup"({ email, password, paymentMethod }) {
    const userId = Accounts.createUser({ email, password });

    try {
      const stripe = Stripe(Meteor.settings.stripe_sk);

      const customer = await stripe.customers.create({
        payment_method: paymentMethod.id,
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
        email,
        metadata: { userId },
      });
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: Meteor.settings.stripe_price_id }],
      });

      Meteor.users.update(userId, {
        $set: {
          stripe: {
            customerId: customer.id,
            subscriptionId: subscription.id,
            subscriptionStatus: "ongoing",
            paymentMethodId: paymentMethod.id,
            card: {
              brand: paymentMethod.card.brand,
              exp_month: paymentMethod.card.exp_month,
              exp_year: paymentMethod.card.exp_year,
              last4: paymentMethod.card.last4,
            },
          },
        },
      });
    } catch (error) {
      Meteor.users.remove(userId);
      throw new Meteor.Error("user/setup", error);
    }
  },
});
