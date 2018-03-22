export default {

  /*** START: Reversal Patterns  ***/


  DTR: {
    name: 'Double Top Reversal',
    acronym: 'DTR',
    type: 'reversal',
    status: 1,
  },

  DBR: {
    name: 'Double Bottom Reversal',
    acronym: 'DBR',
    type: 'reversal',
    status: 1,
    min: 2,
    max: 6,
    rule: 'PTPTP',
    series: [6, 2, 4, 2, 4],
  },

  HST: {
    name: 'Head and Shoulders Top',
    acronym: 'HST',
    type: 'reversal',
    status: 1,
  },

  HSB: {
    name: 'Head and Shoulders Bottom',
    acronym: 'HSB',
    type: 'reversal',
    status: 2,
    min: 1,
    max: 6,
    rule: 'PTPTPTP',
    series: [6, 4, 6, 1, 6, 4, 6],
  },

  FW: {
    name: 'Falling Wedge',
    acronym: 'FW',
    type: 'reversal',
    status: 1,
  },

  RW: {
    name: 'Rising Wedge',
    acronym: 'RW',
    type: 'reversal',
    status: 1,
  },

  RB: {
    name: 'Rounding Bottom',
    acronym: 'RB',
    type: 'reversal',
    status: 1,
  },

  TTR: {
    name: 'Triple Top Reversal',
    acronym: 'TTR',
    type: 'reversal',
    status: 1,
  },

  TBR: {
    name: 'Triple Bottom Reversal',
    acronym: 'TBR',
    type: 'reversal',
    status: 1,
  },

  BRR: {
    name: 'Bump and Run Reversal',
    acronym: 'BRR',
    type: 'reversal',
    status: 1,
  },


  /*** END: Reversal Patterns  ***/

  /*** START: Continuation Patterns  ***/


  FL: {
    name: 'Flag/Pennant',
    acronym: 'FL',
    type: 'continuation',
    status: 1,
  },

  ST: {
    name: 'Symmetrical Triangle',
    acronym: 'ST',
    type: 'continuation',
    status: 1,
  },

  AT: {
    name: 'Ascending Triangle',
    acronym: 'AT',
    type: 'continuation',
    status: 1,
  },

  DT: {
    name: 'Descending Triangle',
    acronym: 'DT',
    type: 'continuation',
    status: 1,
  },

  R: {
    name: 'Rectangle',
    acronym: 'R',
    type: 'continuation',
    status: 1,
  },

  PC: {
    name: 'Price Channel',
    acronym: 'PC',
    type: 'continuation',
    status: 1,
  },

  MMBu: {
    name: 'Measured Move - Bullish',
    acronym: 'MMBu',
    type: 'continuation',
    status: 1,
  },

  MMBe: {
    name: 'Measured Move - Bearish',
    acronym: 'MMBe',
    type: 'continuation',
    status: 1,
  },

  CH: {
    name: 'Cup with Handle',
    acronym: 'CH',
    type: 'continuation',
    status: 1,
  },


  /*** END: Continuation Patterns  ***/

};
