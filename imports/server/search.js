
/**

	@method screen

	 Scans all listed symbols and tries to match the selected pattern in the chosen timeframe


	Parameters:

		filters: Object
			timeframe: String
			exchanges: String
			quoteAssets: String
			range: Number
			chart: Object
				pattern: String
				type: String

**/

import { Meteor } from 'meteor/meteor';
import Lodash from 'lodash';
import dtw from 'dtw';

import normalizeInput from './functions/normalizeInput';
import normalizeTemplate from './functions/normalizeTemplate';
import prepareInput from './functions/prepareInput';

import Patterns from '/imports/both/fixtures/patterns';
import Timeframes from '/imports/both/fixtures/timeframes';

import Symbols from '/imports/both/collections/symbols';


Meteor.methods({
	screen({ timeframe, exchanges, quoteAssets, range, chart}) {
		// Create instance of DTW class

		const DTW = new dtw();


		// Fetch symbols

		const data = Symbols.find({
			timeframe,
			exchange: { $in: exchanges },
			quoteAsset: { $in: quoteAssets },
		}).fetch();

		// Get selected pattern

		const pattern = Patterns[chart.type][chart.pattern];


		// Variable to measure processing time

		let processingTimeStart = new Date().getTime();


		// Match patterns

		const matches = [];


		// Loops through symbols

		Lodash.forEach(data, ({
			quoteAsset,
			baseAsset,
			exchange,
			klines,
		}) => {

			// Slice klines range

			klines = klines.slice(-range);

			// Prepare input series

			const input = prepareInput(klines);


			// Initialize match variable

			const match = {
		    cost: Number.POSITIVE_INFINITY,
		  };


			// Increment window size

			for (
				let wSize = pattern.series.length;
				wSize <= input.length;
				wSize++
			) {

				// Normalize template series to window size (wSize)

				const normalizedTemplate = normalizeTemplate(pattern, wSize);


				// Slid window through input series.
				// Offset starts at 0 and goes up to 5 or max offset allowed
				// in input series for given window size (wSize) lesser than 5

			  for (
					let wOffset = 0;
					wOffset < 5 && wSize + wOffset < input.length;
					wOffset++
				) {

					// Compute windows start and end in input series

				  const wStart = input.length - wOffset - wSize - 1;
			    const wEnd = input.length - wOffset - 1;


					// Slice window from input series

					const slicedInput = Lodash.slice(input, wStart, wEnd);


			    // Normalize input window to template height

			    const normalizedInput = normalizeInput(
			      slicedInput,
			      pattern.min,
			      pattern.max
			    );


			    // Compute the similarity cost between the normalized input
					// and the nomalized template series

			    const cost = DTW.compute(normalizedInput, normalizedTemplate);

			    if (cost < match.cost) {
						match.cost = cost;
						match.start = klines[wStart].closeTime + 1000;
						match.end = klines[wEnd].openTime;
						match.klines = klines;
						/*match.klines = Lodash.slice(
							klines,
							Lodash.clamp(wStart - 4, 0, wStart)
						);*/
			    }
			  }
			}


			// Push optimal match to matches array if its cost is lesser than 4

			match.cost < 4 &&	matches.push({
				quoteAsset,
				baseAsset,
				exchange,
				...match,
			});

		});


		return {
			matches: Lodash.sortBy(
				matches,
				['quoteAsset', 'exchange', 'baseAsset']
			),
			processingTime: new Date().getTime() - processingTimeStart,
		};
	},
});
