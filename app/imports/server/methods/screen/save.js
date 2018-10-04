
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

		console.log(screen)
		// if no name is sent, create one
		if (Lodash.isEmpty(screen.name)) {
			screen.name = `${screen.timeframe} / ${screen.exchanges.join(' ')} / ${screen.quoteAssets.join(' ')} / Last ${screen.range} candlesticks`;
		}

		console.log(screen)

		// if slug is not sent, insert screen
		if (Lodash.isEmpty(screen.slug)) {

			// insert screen
			id = Screens.insert({
				...screen,
				userId: this.userId,
			});

		// else try to update screen
		} else {

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
		}

		// return upserted screen
		return Screens.findOne({ _id: id });
	},
});
