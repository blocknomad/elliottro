
/**

	@method newsletter/add

	Parameters:

		email: String
**/

import { Meteor } from 'meteor/meteor';

import Newsletter, {  NewsletterSchema} from '/imports/both/collections/newsletter';

Meteor.methods({
	'newsletter/add'(email) {
		const data = NewsletterSchema.clean({ email });
		NewsletterSchema.validate(data);
		Newsletter.insert(data);
	},
});
