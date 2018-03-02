
/**

	@method searchPattern

	 Scans all listed symbols and tries to match the selected pattern in the chosen timeframe


	Parameters:

		pattern: String,
		timeframe: String,


**/

import { Meteor } from 'meteor/meteor';
import BinanceAPI from 'binance';
import Lodash from 'lodash';
import dtw from 'dtw';

import filterPatterns from './functions/filterPatterns';
import normalizeInput from './functions/normalizeInput';
import normalizeTemplate from './functions/normalizeTemplate';
import prepareInput from './functions/prepareInput';

import Patterns from '/imports/both/fixtures/patterns';
import Timeframes from '/imports/both/fixtures/timeframes';



Meteor.methods({
	searchPattern({ filters, timeframe } = {}) {
		const Binance = new BinanceAPI.BinanceRest({});
		const DTW = new dtw();

		return new Promise(

			// 1 - Fetch exchange info

			(resolve, reject) => {
				console.time('fetchData');

				Binance.exchangeInfo((error, response) => {
					if (error) {
						reject(error);
					} else {
						resolve(response);
					}
				});
			}

		).then(

			// 2 - Treat exchange info and filter symbols with desired quote assets

			data =>
				Lodash.filter(
					data.symbols,
					symbol => Lodash.includes(filters.quoteAssets, symbol.quoteAsset)
				)

		).then(

			// 3 - Create list of promises

			data =>
				Lodash.map(
					data,
					({ symbol, baseAsset, quoteAsset }) =>
						new Promise(resolve =>
							Binance.klines({
								symbol,
								interval: Timeframes[timeframe].value,
								limit: 30,
							}, (error, klines) => resolve({
								baseAsset,
								quoteAsset,
								exchange: 'BINA',
								klines,
							}))
						)
				)

		).then(

			// 4 - Run list of promises

			data => Promise.all(data)

		).then(

			// 5 - Sweep out recently added symbols

			data => {
				console.timeEnd('fetchData');
				return Lodash.filter(data, ({ klines }) => klines.length >= 30)
			}

		).then(

			// 6 - Match patterns

			data => {

				console.time('processData');

				const matches = [];
				const selectedPatterns = filterPatterns(filters.patterns);


				// Loops through symbols

				Lodash.forEach(data, ({
					quoteAsset,
					baseAsset,
					exchange,
					klines
				}) => {

					// Prepare input series

					const input = prepareInput(klines);


					// Intialize match variable

					const match = {
				    cost: Number.POSITIVE_INFINITY,
				  };


					// Loops through selected patterns

					Lodash.forEach(selectedPatterns, pattern => {

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


						    // Normalize input window to template height

						    const normalizedInput = normalizeInput(
						      Lodash.slice(input, wStart, wEnd),
						      pattern.min,
						      pattern.max
						    );


						    // Compute the similarity cost between the normalized input
								// and the nomalized template series

						    const cost = DTW.compute(normalizedInput, normalizedTemplate);

						    if (cost < match.cost) {
									match.cost = cost;
									match.pattern = pattern.acronym;
									match.start = klines[wStart].closeTime;
									match.end = klines[wEnd].closeTime;
						    }
						  }
						}
					});


					// Push optimal match to matches array if its cost is lesser than 4

					match.cost < 4 &&	matches.push({
						quoteAsset,
						baseAsset,
						exchange,
						...match,
					});

				});

				console.timeEnd('processData');

				return matches;
			}

		).catch(

			error => {
				console.log('ERROR: ', error);
			}

		);
	},
})
