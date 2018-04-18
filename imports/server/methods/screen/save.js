
/**

	@method screen/save

	Parameters:

		screen: Object
**/

import { Meteor } from 'meteor/meteor';
import Lodash from 'lodash';

import Screens from '/imports/both/collections/screens';


Meteor.methods({
	'screen/save'(screen) {
		let id;

		// if no name is sent, create one
		if (Lodash.isEmpty(screen.name)) {
			screen.name = `${screen.timeframe} / ${screen.exchanges.join(' ')} / ${screen.quoteAssets.join(' ')} / Last ${screen.range} candlesticks`;
		}

		// if slug is sent, try to update screen
		if (screen.slug) {

			// fetch screen from slug
			const currentScreen = Screens.findOne({ slug: screen.slug });

			// if screen is not found, cancel
			if (Lodash.isEmpty(currentScreen)) {
				return;
			} else {
				id = currentScreen._id;
			}

			// update screen
			Screens.update({
				slug: screen.slug,
				userId: this.userId,
			}, { $set: screen });
		} else {

			// else insert screen
			id = Screens.insert({
				...screen,
				userId: this.userId,
			});
		}

		// return upserted screen
		return Screens.findOne({ _id: id });
	},
});
