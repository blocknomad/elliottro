import React from "react";

import config from "/imports/client/config";

export default function Illustrate(
  name,
  {
    width = 72,
    height = 60,
    primary = config.colors.secondary,
    secondary = config.colors.primary,
    props = {},
  } = {}
) {
  // padding + offset inside canvas
  const x = (n, t) => (n / points[t].x) * width;
  const y = (n, t) => height - (n / points[t].y) * height;

  const strokeWidth = 2;

  const points = {
    // reversal
    DTR: { x: 6, y: 2 },
    DBR: { x: 6, y: 2 },
    HST: { x: 10, y: 3 },
    HSB: { x: 10, y: 3 },
    TTR: { x: 8, y: 2 },
    TBR: { x: 8, y: 2 },

    // continuation
    FL: { x: 9, y: 4 },
    STU: { x: 9, y: 6 },
    STD: { x: 9, y: 6 },
    DT: { x: 9, y: 6 },
    AT: { x: 9, y: 6 },
    FWU: { x: 9, y: 6 },
    RWD: { x: 9, y: 6 },
    FWD: { x: 10, y: 6 },
    RWU: { x: 10, y: 6 },
    CH: { x: 12, y: 6 },
  };

  const illustrations = {
    // Double Top Reversal

    DTR: [
      // price
      <path
        key={0}
        d={`
          M ${x(0.5, "DTR")} ${y(0.5, "DTR")}
          L ${x(2, "DTR")} ${y(2, "DTR")}
          L ${x(3, "DTR")} ${y(1, "DTR")}
          L ${x(4, "DTR")} ${y(2, "DTR")}
          L ${x(5, "DTR")} ${y(1, "DTR")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(5, "DTR")} ${y(1, "DTR")}
          L ${x(6, "DTR")} ${y(0, "DTR")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // support
      <path
        key={2}
        d={`
          M ${x(0, "DTR")} ${y(1, "DTR") + strokeWidth}
          L ${x(6, "DTR")} ${y(1, "DTR") + strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Double Bottom Reversal

    DBR: [
      // price
      <path
        key={0}
        d={`
          M ${x(0.5, "DBR")} ${y(1.5, "DBR")}
          L ${x(2, "DBR")} ${y(0, "DBR")}
          L ${x(3, "DBR")} ${y(1, "DBR")}
          L ${x(4, "DBR")} ${y(0, "DBR")}
          L ${x(5, "DBR")} ${y(1, "DBR")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(5, "DBR")} ${y(1, "DBR")}
          L ${x(6, "DBR")} ${y(2, "DBR")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // resistance
      <path
        key={2}
        d={`
          M ${x(0, "DBR")} ${y(1, "DBR") - strokeWidth}
          L ${x(6, "DBR")} ${y(1, "DBR") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Head and Shoulders Top

    HST: [
      // price
      <path
        key={0}
        d={`
          M ${x(0.5, "HST")} ${y(0.5, "HST")}
          L ${x(2, "HST")} ${y(2, "HST")}
          L ${x(3, "HST")} ${y(1, "HST")}
          L ${x(5, "HST")} ${y(3, "HST")}
          L ${x(7, "HST")} ${y(1, "HST")}
          L ${x(8, "HST")} ${y(2, "HST")}
          L ${x(9, "HST")} ${y(1, "HST")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(9, "HST")} ${y(1, "HST")}
          L ${x(10, "HST")} ${y(0, "HST")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // support
      <path
        key={2}
        d={`
          M ${x(0, "HST")} ${y(1, "HST") + strokeWidth}
          L ${x(10, "HST")} ${y(1, "HST") + strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Head and Shoulders Bottom

    HSB: [
      // price
      <path
        key={0}
        d={`
          M ${x(0.5, "HSB")} ${y(2.5, "HSB")}
          L ${x(2, "HSB")} ${y(1, "HSB")}
          L ${x(3, "HSB")} ${y(2, "HSB")}
          L ${x(5, "HSB")} ${y(0, "HSB")}
          L ${x(7, "HSB")} ${y(2, "HSB")}
          L ${x(8, "HSB")} ${y(1, "HSB")}
          L ${x(9, "HSB")} ${y(2, "HSB")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(9, "HSB")} ${y(2, "HSB")}
          L ${x(10, "HSB")} ${y(3, "HSB")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // resistance
      <path
        key={2}
        d={`
          M ${x(0, "HSB")} ${y(2, "HSB") - strokeWidth}
          L ${x(10, "HSB")} ${y(2, "HSB") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Triple Top Reversal

    TTR: [
      // price
      <path
        key={0}
        d={`
          M ${x(0.5, "TTR")} ${y(0.5, "TTR")}
          L ${x(2, "TTR")} ${y(2, "TTR")}
          L ${x(3, "TTR")} ${y(1, "TTR")}
          L ${x(4, "TTR")} ${y(2, "TTR")}
          L ${x(5, "TTR")} ${y(1, "TTR")}
          L ${x(6, "TTR")} ${y(2, "TTR")}
          L ${x(7, "TTR")} ${y(1, "TTR")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(7, "TTR")} ${y(1, "TTR")}
          L ${x(8, "TTR")} ${y(0, "TTR")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // support
      <path
        key={2}
        d={`
          M ${x(0, "TTR")} ${y(1, "TTR") + strokeWidth}
          L ${x(8, "TTR")} ${y(1, "TTR") + strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Triple Bottom Reversal

    TBR: [
      // price
      <path
        key={0}
        d={`
          M ${x(0.5, "TBR")} ${y(1.5, "TBR")}
          L ${x(2, "TBR")} ${y(0, "TBR")}
          L ${x(3, "TBR")} ${y(1, "TBR")}
          L ${x(4, "TBR")} ${y(0, "TBR")}
          L ${x(5, "TBR")} ${y(1, "TBR")}
          L ${x(6, "TBR")} ${y(0, "TBR")}
          L ${x(7, "TBR")} ${y(1, "TBR")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(7, "TBR")} ${y(1, "TBR")}
          L ${x(8, "TBR")} ${y(2, "TBR")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // support
      <path
        key={2}
        d={`
          M ${x(0, "TBR")} ${y(1, "TBR") - strokeWidth}
          L ${x(8, "TBR")} ${y(1, "TBR") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Flag

    FL: [
      // price
      <path
        key={0}
        d={`
          M ${x(0, "FL")} ${y(0, "FL")}
          L ${x(2, "FL")} ${y(3.25, "FL")}
          L ${x(3, "FL")} ${y(1.5, "FL")}
          L ${x(4, "FL")} ${y(2.75, "FL")}
          L ${x(5, "FL")} ${y(1, "FL")}
          L ${x(6, "FL")} ${y(2.25, "FL")}
          L ${x(7, "FL")} ${y(0.5, "FL")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(7, "FL")} ${y(0.5, "FL")}
          L ${x(9, "FL")} ${y(3.25, "FL")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // resistance
      <path
        key={2}
        d={`
          M ${x(1.5, "FL")} ${y(3.5, "FL") - strokeWidth}
          L ${x(9, "FL")} ${y(1.5, "FL") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // support
      <path
        key={3}
        d={`
          M ${x(1.5, "FL")} ${y(1.75, "FL") + strokeWidth}
          L ${x(8, "FL")} ${y(0.25, "FL") + strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Descending Triangle

    DT: [
      // price
      <path
        key={0}
        d={`
          M ${x(0, "DT")} ${y(6, "DT")}
          L ${x(2, "DT")} ${y(1.5, "DT")}
          L ${x(3, "DT")} ${y(4.5 - 3 / 7, "DT")}
          L ${x(4, "DT")} ${y(1.5, "DT")}
          L ${x(5, "DT")} ${y(4.5 - (3 / 7) * 3, "DT")}
          L ${x(6, "DT")} ${y(1.5, "DT")}
          L ${x(7, "DT")} ${y(4.5 - (3 / 7) * 5, "DT")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(7, "DT")} ${y(4.5 - (3 / 7) * 5, "DT")}
          L ${x(8.5, "DT")} ${y(0, "DT")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // resistance
      <path
        key={2}
        d={`
          M ${x(2, "DT")} ${y(4.5, "DT") - strokeWidth}
          L ${x(8.5, "DT")} ${y(4.5 - (3 / 7) * 6.5, "DT") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // support
      <path
        key={3}
        d={`
          M ${x(1, "DT")} ${y(1.5, "DT") + strokeWidth}
          L ${x(8.5, "DT")} ${y(1.5, "DT") + strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Falling Wedge in Downtrend

    FWD: [
      // price
      <path
        key={0}
        d={`
          M ${x(0, "FWD")} ${y(6, "FWD")}
          L ${x(2, "FWD")} ${y(3, "FWD")}
          L ${x(3, "FWD")} ${y(5, "FWD")}
          L ${x(4, "FWD")} ${y(2 - 1.5 / 7, "FWD")}
          L ${x(5, "FWD")} ${y(5 - (4.5 / 7) * 2, "FWD")}
          L ${x(6, "FWD")} ${y(2 - (1.5 / 7) * 3, "FWD")}
          L ${x(7, "FWD")} ${y(5 - (4.5 / 7) * 4, "FWD")}
          L ${x(8, "FWD")} ${y(2 - (1.5 / 7) * 5, "FWD")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(8, "FWD")} ${y(2 - (1.5 / 7) * 5, "FWD")}
          L ${x(10, "FWD")} ${y(5, "FWD")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // resistance
      <path
        key={2}
        d={`
          M ${x(2.5, "FWD")} ${y(5 - (4.5 / 7) * -0.5, "FWD") - strokeWidth}
          L ${x(9.5, "FWD")} ${y(5 - (4.5 / 7) * 6.5, "FWD") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // support
      <path
        key={3}
        d={`
          M ${x(2, "FWD")} ${y(2 - (1.5 / 7) * -1, "FWD") + strokeWidth}
          L ${x(9.3, "FWD")} ${y(2 - (1.5 / 7) * 6.3, "FWD") + strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Rising Wedge in Uptrend

    RWU: [
      // price
      <path
        key={0}
        d={`
          M ${x(0, "RWU")} ${y(0, "RWU")}
          L ${x(2, "RWU")} ${y(3, "RWU")}
          L ${x(3, "RWU")} ${y(1, "RWU")}
          L ${x(4, "RWU")} ${y(4 + 1.5 / 7, "RWU")}
          L ${x(5, "RWU")} ${y(1 + (4.5 / 7) * 2, "RWU")}
          L ${x(6, "RWU")} ${y(4 + (1.5 / 7) * 3, "RWU")}
          L ${x(7, "RWU")} ${y(1 + (4.5 / 7) * 4, "RWU")}
          L ${x(8, "RWU")} ${y(4 + (1.5 / 7) * 5, "RWU")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(8, "RWU")} ${y(4 + (1.5 / 7) * 5, "RWU")}
          L ${x(10, "RWU")} ${y(1, "RWU")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // resistance
      <path
        key={2}
        d={`
          M ${x(2, "RWU")} ${y(4 + (1.5 / 7) * -1, "RWU") - strokeWidth}
          L ${x(9.3, "RWU")} ${y(4 + (1.5 / 7) * 6.3, "RWU") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // support
      <path
        key={3}
        d={`
          M ${x(2.5, "RWU")} ${y(1 + (4.5 / 7) * -0.5, "RWU") + strokeWidth}
          L ${x(9.5, "RWU")} ${y(1 + (4.5 / 7) * 6.5, "RWU") + strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Symmetrical Triangle in Downtrend

    STD: [
      // price
      <path
        key={0}
        d={`
          M ${x(0, "STD")} ${y(6, "STD")}
          L ${x(2, "STD")} ${y(1.5, "STD")}
          L ${x(3, "STD")} ${y(4.5 - 1.5 / 7, "STD")}
          L ${x(4, "STD")} ${y(1.5 + (1.5 / 7) * 2, "STD")}
          L ${x(5, "STD")} ${y(4.5 - (1.5 / 7) * 3, "STD")}
          L ${x(6, "STD")} ${y(1.5 + (1.5 / 7) * 4, "STD")}
          L ${x(7, "STD")} ${y(4.5 - (1.5 / 7) * 5, "STD")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(7, "STD")} ${y(4.5 - (1.5 / 7) * 5, "STD")}
          L ${x(8.5, "STD")} ${y(0, "STD")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // resistance
      <path
        key={2}
        d={`
          M ${x(1.5, "STD")} ${y(4.5 - (1.5 / 7) * -0.5, "STD") - strokeWidth}
          L ${x(8.5, "STD")} ${y(4.5 - (1.5 / 7) * 6.5, "STD") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // support
      <path
        key={3}
        d={`
          M ${x(1.5, "STD")} ${y(1.5 + (1.5 / 7) * -0.5, "STD") + strokeWidth}
          L ${x(8.5, "STD")} ${y(1.5 + (1.5 / 7) * 6.5, "STD") + strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Ascending Triangle

    AT: [
      // price
      <path
        key={0}
        d={`
          M ${x(0, "AT")} ${y(0, "AT")}
          L ${x(2, "AT")} ${y(4.5, "AT")}
          L ${x(3, "AT")} ${y(1.5 + 3 / 7, "AT")}
          L ${x(4, "AT")} ${y(4.5, "AT")}
          L ${x(5, "AT")} ${y(1.5 + (3 / 7) * 3, "AT")}
          L ${x(6, "AT")} ${y(4.5, "AT")}
          L ${x(7, "AT")} ${y(1.5 + (3 / 7) * 5, "AT")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(7, "AT")} ${y(1.5 + (3 / 7) * 5, "AT")}
          L ${x(8.5, "AT")} ${y(6, "AT")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // resistance
      <path
        key={2}
        d={`
          M ${x(1, "AT")} ${y(4.5, "AT") - strokeWidth}
          L ${x(8.5, "AT")} ${y(4.5, "AT") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // support
      <path
        key={3}
        d={`
          M ${x(2, "AT")} ${y(1.5, "AT") + strokeWidth}
          L ${x(8.5, "AT")} ${y(1.5 + (3 / 7) * 6.5, "AT") + strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Symmetrical Triangle in Uptrend

    STU: [
      // price
      <path
        key={0}
        d={`
          M ${x(0, "STU")} ${y(0, "STU")}
          L ${x(2, "STU")} ${y(4.5, "STU")}
          L ${x(3, "STU")} ${y(1.5 + 1.5 / 7, "STU")}
          L ${x(4, "STU")} ${y(4.5 - (1.5 / 7) * 2, "STU")}
          L ${x(5, "STU")} ${y(1.5 + (1.5 / 7) * 3, "STU")}
          L ${x(6, "STU")} ${y(4.5 - (1.5 / 7) * 4, "STU")}
          L ${x(7, "STU")} ${y(1.5 + (1.5 / 7) * 5, "STU")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(7, "STU")} ${y(1.5 + (1.5 / 7) * 5, "STU")}
          L ${x(8.5, "STU")} ${y(6, "STU")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // resistance
      <path
        key={2}
        d={`
          M ${x(1.5, "STU")} ${y(4.5 - (1.5 / 7) * -0.5, "STU") - strokeWidth}
          L ${x(8.5, "STU")} ${y(4.5 - (1.5 / 7) * 6.5, "STU") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // support
      <path
        key={3}
        d={`
          M ${x(1.5, "STU")} ${y(1.5 + (1.5 / 7) * -0.5, "STU") + strokeWidth}
          L ${x(8.5, "STU")} ${y(1.5 + (1.5 / 7) * 6.5, "STU") + strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Falling Wedge in Uptrend

    FWU: [
      // price
      <path
        key={0}
        d={`
          M ${x(0, "FWU")} ${y(0, "FWU")}
          L ${x(2, "FWU")} ${y(5, "FWU")}
          L ${x(3, "FWU")} ${y(2 - 1.5 / 7, "FWU")}
          L ${x(4, "FWU")} ${y(5 - (4.5 / 7) * 2, "FWU")}
          L ${x(5, "FWU")} ${y(2 - (1.5 / 7) * 3, "FWU")}
          L ${x(6, "FWU")} ${y(5 - (4.5 / 7) * 4, "FWU")}
          L ${x(7, "FWU")} ${y(2 - (1.5 / 7) * 5, "FWU")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(7, "FWU")} ${y(2 - (1.5 / 7) * 5, "FWU")}
          L ${x(9, "FWU")} ${y(5, "FWU")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // resistance
      <path
        key={2}
        d={`
          M ${x(1.5, "FWU")} ${y(5 - (4.5 / 7) * -0.5, "FWU") - strokeWidth}
          L ${x(8.5, "FWU")} ${y(5 - (4.5 / 7) * 6.5, "FWU") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // support
      <path
        key={3}
        d={`
          M ${x(1.5, "FWU")} ${y(2 - (1.5 / 7) * -0.5, "FWU") + strokeWidth}
          L ${x(8.3, "FWU")} ${y(2 - (1.5 / 7) * 6.3, "FWU") + strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Rising Wedge in Downtrend

    RWD: [
      // price
      <path
        key={0}
        d={`
          M ${x(0, "RWD")} ${y(6, "RWD")}
          L ${x(2, "RWD")} ${y(1, "RWD")}
          L ${x(3, "RWD")} ${y(4 + 1.5 / 7, "RWD")}
          L ${x(4, "RWD")} ${y(1 + (4.5 / 7) * 2, "RWD")}
          L ${x(5, "RWD")} ${y(4 + (1.5 / 7) * 3, "RWD")}
          L ${x(6, "RWD")} ${y(1 + (4.5 / 7) * 4, "RWD")}
          L ${x(7, "RWD")} ${y(4 + (1.5 / 7) * 5, "RWD")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={1}
        d={`
          M ${x(7, "RWD")} ${y(4 + (1.5 / 7) * 5, "RWD")}
          L ${x(9, "RWD")} ${y(1, "RWD")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // resistance
      <path
        key={2}
        d={`
          M ${x(1.5, "RWD")} ${y(4 + (1.5 / 7) * -0.5, "RWD") - strokeWidth}
          L ${x(8.3, "RWD")} ${y(4 + (1.5 / 7) * 6.3, "RWD") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // support
      <path
        key={3}
        d={`
          M ${x(1.5, "RWD")} ${y(1 + (4.5 / 7) * -0.5, "RWD") + strokeWidth}
          L ${x(8.5, "RWD")} ${y(1 + (4.5 / 7) * 6.5, "RWD") + strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],

    // Cup with Handle

    CH: [
      // price
      <path
        key={0}
        d={`
          M ${x(0, "CH")} ${y(1, "CH")}
          L ${x(2, "CH")} ${y(3.5, "CH")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      <path
        key={1}
        d={`
          M ${x(2, "CH")} ${y(3.5, "CH")}
          C ${x(2.25, "CH")},${y(0, "CH")} ${x(7.75, "CH")},${y(0, "CH")} ${x(
          8,
          "CH"
        )},${y(3.5, "CH")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      <path
        key={3}
        d={`
          M ${x(8, "CH")} ${y(3.5, "CH")}
          L ${x(9, "CH")} ${y(2.5, "CH")}
          L ${x(10, "CH")} ${y(3.5, "CH")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        fill="none"
      />,

      // projection
      <path
        key={4}
        d={`
          M ${x(10, "CH")} ${y(3.5, "CH")}
          L ${x(12, "CH")} ${y(5.5, "CH")}
        `}
        stroke={primary}
        strokeWidth={strokeWidth}
        strokeDasharray="3, 3"
        fill="none"
      />,

      // resistance
      <path
        key={5}
        d={`
          M ${x(1, "CH")} ${y(3.5, "CH") - strokeWidth}
          L ${x(11, "CH")} ${y(3.5, "CH") - strokeWidth}
        `}
        stroke={secondary}
        strokeWidth={strokeWidth}
        fill="none"
      />,
    ],
  };

  return (
    <svg {...props} width={width} height={height}>
      {illustrations[name]}
    </svg>
  );
}
