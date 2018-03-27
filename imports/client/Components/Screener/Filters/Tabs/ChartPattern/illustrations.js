import React from 'react';

import config from '/imports/client/config';

const width = 150;
const height = 100;
const padding = .1;

// padding + offset inside canvas
const x = (n, a) => (width * padding) + n / a * width * (1 - padding * 2);
const y = (n, a) => (height * padding) + height * (1 - padding * 2) - n / a * height * (1 - padding * 2);

const primary = '#FFA000';
const secondary = config.colors.primary;

const strokeWidth = 2;

const illustrations =  {
  HSB: [
    <path
      key={0}
      d={`
        M ${x(.5, 10)} ${y(2.5, 3)}
        L ${x(2, 10)} ${y(1, 3)}
        L ${x(3, 10)} ${y(2, 3)}
        L ${x(5, 10)} ${y(0, 3)}
        L ${x(7, 10)} ${y(2, 3)}
        L ${x(8, 10)} ${y(1, 3)}
        L ${x(9, 10)} ${y(2, 3)}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      fill="none"
    />,
    <path
      key={0}
      d={`
        M ${x(9, 10)} ${y(2, 3)}
        L ${x(10, 10)} ${y(3, 3)}
      `}
      stroke={primary}
      strokeWidth={strokeWidth}
      strokeDasharray="3, 3"
      fill="none"
    />,
    <path
      key={1}
      d={`
        M ${x(0, 10)} ${y(2, 3) - strokeWidth}
        L ${x(10, 10)} ${y(2, 3) - strokeWidth}
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
