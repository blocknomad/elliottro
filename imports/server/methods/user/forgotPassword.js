
/**

	@method forgotPassword

	Parameters:

		email: String
**/

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Lodash from 'lodash';


Meteor.methods({
	'user/forgotPassword'(email) {
    const user = Meteor.users.findOne({ 'emails.0.address': email });

    console.log(user);

    if (Lodash.isEmpty(user)) {
      return 'NotFound';
    } else {
      Meteor.defer(() => Accounts.sendResetPasswordEmail(user._id));
      
      return 'EmailSent';
    }
	},
});
