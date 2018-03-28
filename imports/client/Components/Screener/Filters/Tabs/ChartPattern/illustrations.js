import React from 'react';

import config from '/imports/client/config';

const width = 120;
const height = 100;

// padding + offset inside canvas
const x = (n, t) => n / points[t].x * width;
const y = (n, t) => height - n / points[t].y * height;

const primary = config.colors.secondary;
const secondary = config.colors.primary;

const strokeWidth = 2;

const points = {
  DTR: { x: 6, y: 2 },
  DBR: { x: 6, y: 2 },
  HST: { x: 10, y: 3 },
  HSB: { x: 10, y: 3 },
  TTR: { x: 8, y: 2 },
  TBR: { x: 8, y: 2 },

  FL: { x: 9, y: 4 },
  DT: { x: 9, y: 6 },
  AT: { x: 9, y: 6 },
  FWU: { x: 9, y: 4 },
}


const illustrations =  {

  // Double Top Reversal

  DTR: [
    <path
      key={0}
      d={`
        M ${x(.5, 'DTR')} ${y(.5, 'DTR')}
        L ${x(2, 'DTR')} ${y(2, 'DTR')}
        L ${x(3, 'DTR')} ${y(1, 'DTR')}
        L ${x(4, 'DTR')} ${y(2, 'DTR')}
        L ${x(5, 'DTR')} ${y(1, 'DTR')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      fill="none"
    />,
    <path
      key={1}
      d={`
        M ${x(5, 'DTR')} ${y(1, 'DTR')}
        L ${x(5.75, 'DTR')} ${y(.25, 'DTR')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      strokeDasharray="3, 3"
      fill="none"
    />,
    <path
      key={2}
      d={`
        M ${x(0, 'DTR')} ${y(1, 'DTR') + strokeWidth}
        L ${x(6, 'DTR')} ${y(1, 'DTR') + strokeWidth}
      `}
      stroke={secondary}
      strokeWidth={strokeWidth}
      fill="none"
    />,
  ],


  // Double Bottom Reversal

  DBR: [
    <path
      key={0}
      d={`
        M ${x(.5, 'DBR')} ${y(1.5, 'DBR')}
        L ${x(2, 'DBR')} ${y(0, 'DBR')}
        L ${x(3, 'DBR')} ${y(1, 'DBR')}
        L ${x(4, 'DBR')} ${y(0, 'DBR')}
        L ${x(5, 'DBR')} ${y(1, 'DBR')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      fill="none"
    />,
    <path
      key={1}
      d={`
        M ${x(5, 'DBR')} ${y(1, 'DBR')}
        L ${x(5.75, 'DBR')} ${y(1.75, 'DBR')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      strokeDasharray="3, 3"
      fill="none"
    />,
    <path
      key={2}
      d={`
        M ${x(0, 'DBR')} ${y(1, 'DBR') - strokeWidth}
        L ${x(6, 'DBR')} ${y(1, 'DBR') - strokeWidth}
      `}
      stroke={secondary}
      strokeWidth={strokeWidth}
      fill="none"
    />,
  ],


  // Head and Shoulders Top

  HST: [
    <path
      key={0}
      d={`
        M ${x(.5, 'HST')} ${y(.5, 'HST')}
        L ${x(2, 'HST')} ${y(2, 'HST')}
        L ${x(3, 'HST')} ${y(1, 'HST')}
        L ${x(5, 'HST')} ${y(3, 'HST')}
        L ${x(7, 'HST')} ${y(1, 'HST')}
        L ${x(8, 'HST')} ${y(2, 'HST')}
        L ${x(9, 'HST')} ${y(1, 'HST')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      fill="none"
    />,
    <path
      key={1}
      d={`
        M ${x(9, 'HST')} ${y(1, 'HST')}
        L ${x(10, 'HST')} ${y(0, 'HST')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      strokeDasharray="3, 3"
      fill="none"
    />,
    <path
      key={2}
      d={`
        M ${x(0, 'HST')} ${y(1, 'HST') + strokeWidth}
        L ${x(10, 'HST')} ${y(1, 'HST') + strokeWidth}
      `}
      stroke={secondary}
      strokeWidth={strokeWidth}
      fill="none"
    />,
  ],


  // Head and Shoulders Bottom

  HSB: [
    <path
      key={0}
      d={`
        M ${x(.5, 'HSB')} ${y(2.5, 'HSB')}
        L ${x(2, 'HSB')} ${y(1, 'HSB')}
        L ${x(3, 'HSB')} ${y(2, 'HSB')}
        L ${x(5, 'HSB')} ${y(0, 'HSB')}
        L ${x(7, 'HSB')} ${y(2, 'HSB')}
        L ${x(8, 'HSB')} ${y(1, 'HSB')}
        L ${x(9, 'HSB')} ${y(2, 'HSB')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      fill="none"
    />,
    <path
      key={1}
      d={`
        M ${x(9, 'HSB')} ${y(2, 'HSB')}
        L ${x(10, 'HSB')} ${y(3, 'HSB')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      strokeDasharray="3, 3"
      fill="none"
    />,
    <path
      key={2}
      d={`
        M ${x(0, 'HSB')} ${y(2, 'HSB') - strokeWidth}
        L ${x(10, 'HSB')} ${y(2, 'HSB') - strokeWidth}
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
        M ${x(0, 'FWU')} ${y(0, 'FWU')}
        L ${x(2, 'FWU')} ${y(4, 'FWU')}
        L ${x(3, 'FWU')} ${y(1.75, 'FWU')}
        L ${x(4, 'FWU')} ${y(2.775, 'FWU')}
        L ${x(5, 'FWU')} ${y(1.125, 'FWU')}
        L ${x(5.7, 'FWU')} ${y(1.8, 'FWU')}
        L ${x(6.675, 'FWU')} ${y(.6, 'FWU')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      fill="none"
    />,

    // projection
    <path
      key={1}
      d={`
        M ${x(6.675, 'FWU')} ${y(.6, 'FWU')}
        L ${x(8.5, 'FWU')} ${y(2.5, 'FWU')}
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
        M ${x(2, 'FWU')} ${y(4, 'FWU') - strokeWidth}
        L ${x(9, 'FWU')} ${y(0, 'FWU') + 1}
      `}
      stroke={secondary}
      strokeWidth={strokeWidth}
      fill="none"
    />,

    // support
    <path
      key={3}
      d={`
        M ${x(1, 'FWU') + strokeWidth} ${y(2.25, 'FWU') + strokeWidth}
        L ${x(9, 'FWU')} ${y(0, 'FWU') + strokeWidth}
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
        M ${x(.5, 'TTR')} ${y(.5, 'TTR')}
        L ${x(2, 'TTR')} ${y(2, 'TTR')}
        L ${x(3, 'TTR')} ${y(1, 'TTR')}
        L ${x(4, 'TTR')} ${y(2, 'TTR')}
        L ${x(5, 'TTR')} ${y(1, 'TTR')}
        L ${x(6, 'TTR')} ${y(2, 'TTR')}
        L ${x(7, 'TTR')} ${y(1, 'TTR')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      fill="none"
    />,

    // projection
    <path
      key={1}
      d={`
        M ${x(7, 'TTR')} ${y(1, 'TTR')}
        L ${x(7.75, 'TTR')} ${y(.25, 'TTR')}
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
        M ${x(0, 'TTR')} ${y(1, 'TTR') + strokeWidth}
        L ${x(8, 'TTR')} ${y(1, 'TTR') + strokeWidth}
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
        M ${x(.5, 'TBR')} ${y(1.5, 'TBR')}
        L ${x(2, 'TBR')} ${y(0, 'TBR')}
        L ${x(3, 'TBR')} ${y(1, 'TBR')}
        L ${x(4, 'TBR')} ${y(0, 'TBR')}
        L ${x(5, 'TBR')} ${y(1, 'TBR')}
        L ${x(6, 'TBR')} ${y(0, 'TBR')}
        L ${x(7, 'TBR')} ${y(1, 'TBR')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      fill="none"
    />,

    // projection
    <path
      key={1}
      d={`
        M ${x(7, 'TBR')} ${y(1, 'TBR')}
        L ${x(7.75, 'TBR')} ${y(1.75, 'TBR')}
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
        M ${x(0, 'TBR')} ${y(1, 'TBR') - strokeWidth}
        L ${x(8, 'TBR')} ${y(1, 'TBR') - strokeWidth}
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
        M ${x(0, 'FL')} ${y(0, 'FL')}
        L ${x(2, 'FL')} ${y(3.5, 'FL')}
        L ${x(3, 'FL')} ${y(1.5, 'FL')}
        L ${x(4, 'FL')} ${y(3, 'FL')}
        L ${x(5, 'FL')} ${y(1, 'FL')}
        L ${x(6, 'FL')} ${y(2.5, 'FL')}
        L ${x(7, 'FL')} ${y(.5, 'FL')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      fill="none"
    />,

    // projection
    <path
      key={1}
      d={`
        M ${x(7, 'FL')} ${y(.5, 'FL')}
        L ${x(8.5, 'FL')} ${y(2.75, 'FL')}
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
        M ${x(2, 'FL')} ${y(3.5, 'FL') - strokeWidth}
        L ${x(9, 'FL')} ${y(1.75, 'FL') - strokeWidth}
      `}
      stroke={secondary}
      strokeWidth={strokeWidth}
      fill="none"
    />,

    // support
    <path
      key={3}
      d={`
        M ${x(1, 'FL') + strokeWidth} ${y(2, 'FL') + strokeWidth * 2}
        L ${x(8, 'FL')} ${y(.5, 'FL') + strokeWidth * 2}
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
        M ${x(0, 'DT')} ${y(6, 'DT')}
        L ${x(2, 'DT')} ${y(1.5, 'DT')}
        L ${x(3, 'DT')} ${y(4.5 - 3 / 7, 'DT')}
        L ${x(4, 'DT')} ${y(1.5, 'DT')}
        L ${x(5, 'DT')} ${y(4.5 - 3 / 7 * 3, 'DT')}
        L ${x(6, 'DT')} ${y(1.5, 'DT')}
        L ${x(7, 'DT')} ${y(4.5 - 3 / 7 * 5, 'DT')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      fill="none"
    />,

    // projection
    <path
      key={1}
      d={`
        M ${x(7, 'DT')} ${y(4.5 - 3 / 7 * 5, 'DT')}
        L ${x(8.5, 'DT')} ${y(0, 'DT')}
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
        M ${x(2, 'DT')} ${y(4.5, 'DT') - strokeWidth}
        L ${x(8.5, 'DT')} ${y(4.5 - 3 / 7 * 6.5, 'DT') - strokeWidth}
      `}
      stroke={secondary}
      strokeWidth={strokeWidth}
      fill="none"
    />,

    // support
    <path
      key={3}
      d={`
        M ${x(1, 'DT')} ${y(1.5, 'DT') + strokeWidth}
        L ${x(8.5, 'DT')} ${y(1.5, 'DT') + strokeWidth}
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
        M ${x(0, 'AT')} ${y(0, 'AT')}
        L ${x(2, 'AT')} ${y(4.5, 'AT')}
        L ${x(3, 'AT')} ${y(1.5 + 3 / 7, 'AT')}
        L ${x(4, 'AT')} ${y(4.5, 'AT')}
        L ${x(5, 'AT')} ${y(1.5 + 3 / 7 * 3, 'AT')}
        L ${x(6, 'AT')} ${y(4.5, 'AT')}
        L ${x(7, 'AT')} ${y(1.5 + 3 / 7 * 5, 'AT')}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      fill="none"
    />,

    // projection
    <path
      key={1}
      d={`
        M ${x(7, 'AT')} ${y(1.5 + 3 / 7 * 5, 'AT')}
        L ${x(8.5, 'AT')} ${y(6, 'AT')}
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
        M ${x(1, 'AT')} ${y(4.5, 'AT') - strokeWidth}
        L ${x(8.5, 'AT')} ${y(4.5, 'AT') - strokeWidth}
      `}
      stroke={secondary}
      strokeWidth={strokeWidth}
      fill="none"
    />,

    // support
    <path
      key={3}
      d={`
        M ${x(2, 'AT')} ${y(1.5, 'AT') + strokeWidth}
        L ${x(8.5, 'AT')} ${y(1.5 + 3 / 7 * 6.5, 'AT') + strokeWidth}
      `}
      stroke={secondary}
      strokeWidth={strokeWidth}
      fill="none"
    />,
  ],
}


export default function Illustration(name) {
  return (
    <svg width={width} height={height}>
      {illustrations[name]}
    </svg>
  )
}
