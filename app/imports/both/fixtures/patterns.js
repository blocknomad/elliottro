export default {
  /*** START: Reversal Patterns  ***/

  // SERIES devem começar sempre em 0

  reversal: {
    DTR: {
      name: "Double Top",
      acronym: "DTR",
      status: 1,
    },

    DBR: {
      name: "Double Bottom",
      acronym: "DBR",
      status: 1,
      min: 2,
      max: 6,
      rule: "PTPTP",
      series: [6, 2, 4, 2, 4],
    },

    HST: {
      name: "Head and Shoulders Top",
      acronym: "HST",
      status: 2,
      rule: "PTPTPTP",
      series: [6, 4, 6, 1, 6, 4, 6],
    },

    HSB: {
      name: "Head and Shoulders Bottom",
      acronym: "HSB",
      status: 1,
      min: 1,
      max: 6,
      rule: "PTPTPTP",
      series: [6, 4, 6, 1, 6, 4, 6],
    },

    FWD: {
      name: "Falling Wedge in Downtrend",
      acronym: "FWD",
      status: 1,
    },

    RWU: {
      name: "Rising Wedge in Uptrend",
      acronym: "RWU",
      status: 1,
    },

    RB: {
      name: "Rounding Bottom",
      acronym: "RB",
      status: 3,
    },

    TTR: {
      name: "Triple Top",
      acronym: "TTR",
      status: 1,
    },

    TBR: {
      name: "Triple Bottom",
      acronym: "TBR",
      status: 1,
    },

    BRR: {
      name: "Bump and Run",
      acronym: "BRR",
      status: 3,
    },
  },

  /*** END: Reversal Patterns  ***/

  /*** START: Continuation Patterns  ***/

  continuation: {
    FL: {
      name: "Flag",
      acronym: "FL",
      status: 1,
    },

    STU: {
      name: "Symmetrical Triangle in Uptrend",
      acronym: "STU",
      status: 1,
    },

    STD: {
      name: "Symmetrical Triangle in Downtrend",
      acronym: "STD",
      status: 1,
    },

    AT: {
      name: "Ascending Triangle",
      acronym: "AT",
      status: 1,
    },

    DT: {
      name: "Descending Triangle",
      acronym: "DT",
      status: 1,
    },

    FWU: {
      name: "Falling Wedge in Uptrend",
      acronym: "FWU",
      status: 1,
    },

    RWD: {
      name: "Rising Wedge in Downtrend",
      acronym: "RWD",
      status: 1,
    },

    R: {
      name: "Rectangle",
      acronym: "R",
      status: 3,
    },

    PC: {
      name: "Price Channel",
      acronym: "PC",
      status: 3,
    },

    MMBu: {
      name: "Measured Move - Bullish",
      acronym: "MMBu",
      status: 3,
    },

    MMBe: {
      name: "Measured Move - Bearish",
      acronym: "MMBe",
      status: 3,
    },

    CH: {
      name: "Cup with Handle",
      acronym: "CH",
      status: 1,
    },
  },

  /*** END: Continuation Patterns  ***/
};
