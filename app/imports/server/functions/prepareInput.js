/**

  @function prepareInput

    Prepare input series


  Parameters:

    klines: Array,


**/

import Lodash from "lodash";

export default function prepareInput(klines) {
  return Lodash.map(klines, (kline) => Lodash.toNumber(kline.close));
}
