/**

	@function normalizeInput

	Normalizes input series by running the following formula:

		X' = a + ((X - Xmin) * (b - a)) / Xmax - Xmin
	
	where

		X' = Normalized value of a point,
		Xmin = Minimum value in a window (w),
		Xmax = Maximum value in a window (w),
		a = Minimum value of Template (T), and
		b = Maximum value of Template (T).


  Parameters:

    series: Array,
    a: Number,
    b: Number,
    

**/

import Lodash from "lodash";

export default function normalizeInput(series, a, b) {
  const Xmin = Lodash.min(series);
  const Xmax = Lodash.max(series);

  return Lodash.map(series, (X) => a + ((X - Xmin) * (b - a)) / (Xmax - Xmin));
}
