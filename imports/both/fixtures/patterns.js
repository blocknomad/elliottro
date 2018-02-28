export default {

  /*** START: Reversal Patterns  ***/


  DTR: {
    name: 'Double Top Reversal',
    type: 'Reversal',
    status: 1,
  },

  DBR: {
    name: 'Double Bottom Reversal',
    type: 'Reversal',
    status: 1,
  },

  HST: {
    name: 'Head and Shoulders Top',
    type: 'Reversal',
    status: 1,
  },

  HSB: {
    name: 'Head and Shoulders Bottom',
    type: 'Reversal',
    status: 2,
    min: 2,
    max: 6,
    rule: 'PTPTPTP',
    series: [6, 4, 6, 2, 6, 4, 6],
  },

  FW: {
    name: 'Falling Wedge',
    type: 'Reversal',
    status: 1,
  },

  RW: {
    name: 'Rising Wedge',
    type: 'Reversal',
    status: 1,
  },

  RB: {
    name: 'Rounding Bottom',
    type: 'Reversal',
    status: 1,
  },

  TTR: {
    name: 'Triple Top Reversal',
    type: 'Reversal',
    status: 1,
  },

  TBR: {
    name: 'Triple Bottom Reversal',
    type: 'Reversal',
    status: 1,
  },

  BRR: {
    name: 'Bump and Run Reversal',
    type: 'Reversal',
    status: 1,
  },


  /*** END: Reversal Patterns  ***/

  /*** START: Continuation Patterns  ***/


  FL: {
    name: 'Flag/Pennant',
    type: 'Continuation',
    status: 1,
  },

  ST: {
    name: 'Symmetrical Triangle',
    type: 'Continuation',
    status: 1,
  },

  AT: {
    name: 'Ascending Triangle',
    type: 'Continuation',
    status: 1,
  },

  DT: {
    name: 'Descending Triangle',
    type: 'Continuation',
    status: 1,
  },

  R: {
    name: 'Rectangle',
    type: 'Continuation',
    status: 1,
  },

  PC: {
    name: 'Price Channel',
    type: 'Continuation',
    status: 1,
  },

  MMBu: {
    name: 'Measured Move - Bullish',
    type: 'Continuation',
    status: 1,
  },

  MMBe: {
    name: 'Measured Move - Bearish',
    type: 'Continuation',
    status: 1,
  },

  CH: {
    name: 'Cup with Handle',
    type: 'Continuation',
    status: 1,
  },


  /*** END: Continuation Patterns  ***/

};
