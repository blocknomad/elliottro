import { Accounts } from "meteor/accounts-base";
import { get } from "lodash";

Accounts.validateLoginAttempt(({ allowed, user }) => {
  return allowed && get(user, "stripe.subscriptionStatus", "") === "ongoing";
});
