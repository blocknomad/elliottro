export default {

  /*** START: Reversal Patterns  ***/


  DTR: {
    name: 'Double Top Reversal',
    acronym: 'DTR',
    type: 'Reversal',
    status: 1,
  },

  DBR: {
    name: 'Double Bottom Reversal',
    acronym: 'DBR',
    type: 'Reversal',
    status: 2,
    min: 2,
    max: 6,
    rule: 'PTPTP',
    series: [6, 2, 4, 2, 4],
  },

  HST: {
    name: 'Head and Shoulders Top',
    acronym: 'HST',
    type: 'Reversal',
    status: 1,
  },

  HSB: {
    name: 'Head and Shoulders Bottom',
    acronym: 'HSB',
    type: 'Reversal',
    status: 2,
    min: 2,
    max: 6,
    rule: 'PTPTPTP',
    series: [6, 4, 6, 2, 6, 4, 6],
  },

  FW: {
    name: 'Falling Wedge',
    acronym: 'FW',
    type: 'Reversal',
    status: 1,
  },

  RW: {
    name: 'Rising Wedge',
    acronym: 'RW',
    type: 'Reversal',
    status: 1,
  },

  RB: {
    name: 'Rounding Bottom',
    acronym: 'RB',
    type: 'Reversal',
    status: 1,
  },

  TTR: {
    name: 'Triple Top Reversal',
    acronym: 'TTR',
    type: 'Reversal',
    status: 1,
  },

  TBR: {
    name: 'Triple Bottom Reversal',
    acronym: 'TBR',
    type: 'Reversal',
    status: 1,
  },

  BRR: {
    name: 'Bump and Run Reversal',
    acronym: 'BRR',
    type: 'Reversal',
    status: 1,
  },


  /*** END: Reversal Patterns  ***/

  /*** START: Continuation Patterns  ***/


  FL: {
    name: 'Flag/Pennant',
    acronym: 'FL',
    type: 'Continuation',
    status: 1,
  },

  ST: {
    name: 'Symmetrical Triangle',
    acronym: 'ST',
    type: 'Continuation',
    status: 1,
  },

  AT: {
    name: 'Ascending Triangle',
    acronym: 'AT',
    type: 'Continuation',
    status: 1,
  },

  DT: {
    name: 'Descending Triangle',
    acronym: 'DT',
    type: 'Continuation',
    status: 1,
  },

  R: {
    name: 'Rectangle',
    acronym: 'R',
    type: 'Continuation',
    status: 1,
  },

  PC: {
    name: 'Price Channel',
    acronym: 'PC',
    type: 'Continuation',
    status: 1,
  },

  MMBu: {
    name: 'Measured Move - Bullish',
    acronym: 'MMBu',
    type: 'Continuation',
    status: 1,
  },

  MMBe: {
    name: 'Measured Move - Bearish',
    acronym: 'MMBe',
    type: 'Continuation',
    status: 1,
  },

  CH: {
    name: 'Cup with Handle',
    acronym: 'CH',
    type: 'Continuation',
    status: 1,
  },


  /*** END: Continuation Patterns  ***/

};
