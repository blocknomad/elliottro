export default {

  /*** START: Triangles  ***/


  // Ascending Triangle

  ascendingTriangle: {
    min: 2,
    max: 5,
    rule: 'PTPTPT',
    series: [10, 2, 10, 4, 10, 6],
  },



  /*** END: Triangles  ***/

  flag: {
    min: 1,
    max: 6,
    rule: 'TPTPTPT',
    series: [1, 6, 4, 5, 3, 4, 2],
  },

  // Head and Shoulders

	HS: {
    min: 2,
    max: 6,
    rule: 'TPTPTPT',
    series: [2, 4, 2, 6, 2, 4, 2],
  },

  // Inversed Head and Shoulders

  inversedHS: {
    min: 2,
    max: 6,
    rule: 'PTPTPTP',
    series: [6, 4, 6, 2, 6, 4, 6],
  },
};