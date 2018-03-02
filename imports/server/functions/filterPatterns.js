
/**

  @function filterPatterns

    Filters patterns


  Parameters:

    selectedPatterns: Array,


**/


import Lodash from 'lodash';

import Patterns from '/imports/both/fixtures/patterns';


export default function filterPatterns(selectedPatterns) {
  return Lodash.filter(
    Patterns,
    (pattern, patternAcronym) => Lodash.includes(selectedPatterns, patternAcronym)
  );
};
