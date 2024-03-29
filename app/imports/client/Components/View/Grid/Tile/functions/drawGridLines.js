import config from "/imports/client/config";
import drawGridLine from "./drawGridLine";

import Lodash from "lodash";

// months diff

const getMonthsDiff = (s, e) => {
  const yDiff = e.getUTCFullYear() - s.getUTCFullYear();
  let diff;

  if (yDiff > 0) {
    const a = 11 - s.getUTCMonth();
    const b = 12 * (yDiff > 1 ? yDiff - 1 : 0);
    const c = e.getUTCMonth() + 1;

    diff = a + b + c;
  } else {
    const a = s.getUTCMonth();
    const b = e.getUTCMonth();

    diff = b - a;
  }

  return diff;
};

// days diff

const getDaysDiff = (s, e) => {
  const start = Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate());
  const end = Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate());

  return Math.ceil((end - start) / 86400000);
};

// hours diff

const getHoursDiff = (s, e) => {
  const start = Date.UTC(
    s.getUTCFullYear(),
    s.getUTCMonth(),
    s.getUTCDate(),
    s.getUTCHours()
  );
  const end = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours()
  );

  return Math.floor((end - start) / 3600000);
};

// test if the app is trying to overlap grid guides

const overlapsBigger = (date, scale, stepper) => {
  let overlaps = false;
  date = new Date(date);

  switch (scale) {
    case "Y":
      break;
    case "M":
      overlaps = date.getUTCMonth() === 0;
      break;
    case "D":
      const currentMonth = new Date(date.getUTCFullYear(), date.getUTCMonth());
      const nextMonth = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1);

      const cDiff = getDaysDiff(currentMonth, date);
      const nDiff = getDaysDiff(date, nextMonth);

      const dSpan = Math.floor(stepper * 0.75);

      overlaps = cDiff < dSpan || nDiff < dSpan;
      break;
    case "H":
      const hSpan = Math.round(stepper * 0.75);

      overlaps = date.getUTCHours() < hSpan || 24 - date.getUTCHours() < hSpan;
      break;
    default:
      break;
  }

  return overlaps;
};

// format hours

const formatHours = (date) =>
  new Date(date).toLocaleString(false, {
    hour12: false,
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function drawGridLines(
  canvas,
  match,
  vStepper,
  vRatio,
  klineWidth,
  timeframe,
  canvasWidth,
  canvasHeight,
  windowTop,
  windowBottom
) {
  const context = canvas.getContext("2d");
  const color = config.colors.border;

  context.save();

  context.font = "10px Arial";
  context.fillStyle = "#666";

  // vertical border
  drawGridLine(context, canvasWidth, 0, canvasWidth, canvasHeight, color);

  // horizontal border
  drawGridLine(context, 0, canvasHeight, canvasWidth, canvasHeight, color);

  // draw vertical gridlines
  for (
    let step = windowBottom + vStepper;
    step <= windowTop;
    step += vStepper
  ) {
    const y = (windowTop - step) * vRatio;

    drawGridLine(context, 0, y, canvasWidth + 5, y, color);
    context.fillText(step.toFixed(8), canvasWidth + 10, y + 4);
  }

  // draw horizontal gridlines

  const { klines } = match;

  const start = new Date(klines[0].openTime);
  const end = new Date(klines[klines.length - 1].openTime);
  const yDiff = end.getUTCFullYear() - start.getUTCFullYear();

  const limit = 5;
  const hRatio =
    (canvasWidth - klineWidth * 2) / (end.getTime() - start.getTime());

  let used = 0;
  let primary = true;

  context.textBaseline = "middle";

  // draw function

  const drawAtTime = (text, date, scale, stepper) => {
    const textWidth = context.measureText(text).width;
    let xOffset;

    if (timeframe === "M1") {
      const index = Lodash.findIndex(klines, ["openTime", date]);
      xOffset = klineWidth * (index + 1) + (klineWidth / 2) * index;
    } else {
      xOffset = (date - start.getTime()) * hRatio + klineWidth;
    }

    const xPos = xOffset - textWidth / 2;

    if (primary) {
      context.font = "bold 11px Arial";
    } else {
      context.font = "10px Arial";
    }

    if (
      xPos >= -10 &&
      xPos + textWidth <= canvasWidth - 5 &&
      !overlapsBigger(date, scale, stepper)
    ) {
      context.fillText(
        text,
        xPos,
        canvasHeight + (canvas.height - canvasHeight) / 2
      );
      //drawGridLine(context, xOffset, canvasHeight + 5, xOffset, 0, color);
      used++;
    }
  };

  // draw years

  if (yDiff >= limit) {
    primary = false;
    /*const step = Math.round(yDiff / limit);
    console.log(yDiff, step);*/
  } else if (yDiff > 0) {
    for (let i = start.getUTCFullYear(); i <= end.getUTCFullYear(); i++) {
      drawAtTime(i, Date.UTC(i, 0, 1), "Y");
    }

    primary = false;
  } else if (
    new Date(start.getTime() - 1).getUTCFullYear() !== start.getUTCFullYear()
  ) {
    drawAtTime(
      start.getUTCFullYear(),
      Date.UTC(start.getUTCFullYear(), 0),
      "Y"
    );
    primary = false;
  }

  // draw months

  const mDiff = getMonthsDiff(start, end);

  if (mDiff >= limit - used) {
    primary = false;

    const mStepper = Math.round(mDiff / limit);
    const rest = start.getUTCMonth() % mStepper;
    const startGap = rest === 0 ? 0 : mStepper - rest;

    for (let step = startGap; step <= mDiff; step += mStepper) {
      const date = Date.UTC(
        start.getUTCFullYear(),
        start.getUTCMonth() + step,
        1
      );
      drawAtTime(
        new Date(date).toLocaleDateString(false, {
          timeZone: "UTC",
          month: "short",
        }),
        date,
        "M"
      );
    }
  } else if (limit - used > 0) {
    for (let i = 0; i <= mDiff; i++) {
      const date = Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + i, 1);
      drawAtTime(
        new Date(date).toLocaleDateString(false, {
          timeZone: "UTC",
          month: "short",
        }),
        date,
        "M"
      );
    }
  }

  // draw days

  const dDiff = getDaysDiff(start, end);

  if (dDiff >= limit - used) {
    primary = false;

    const limitPerMonth = Math.round(30 / Math.round(dDiff / limit));

    if (limitPerMonth > 1) {
      let month = 0;

      do {
        const daysInMonth = new Date(
          start.getUTCFullYear(),
          start.getUTCMonth() + 1,
          -1
        ).getUTCDate();
        const dStepper = Math.round(daysInMonth / limitPerMonth);

        for (let step = dStepper; step < daysInMonth; step += dStepper) {
          const date = Date.UTC(
            start.getUTCFullYear(),
            start.getUTCMonth() + month,
            1 + step
          );
          drawAtTime(new Date(date).getUTCDate(), date, "D", dStepper);
        }

        month++;
      } while (month <= mDiff);
    }
  } else if (limit - used > 0) {
    for (let i = 0; i <= dDiff; i++) {
      const date = Date.UTC(
        start.getUTCFullYear(),
        start.getUTCMonth(),
        start.getUTCDate() + i
      );
      drawAtTime(new Date(date).getUTCDate(), date, "D", 1);
    }
  }

  // draw hours

  primary = false;

  const hDiff = getHoursDiff(start, end);

  if (hDiff >= limit - used) {
    const hStepper = Math.floor(
      24 / Math.round(24 / Math.round(hDiff / limit))
    );

    let day = 0;

    if (hStepper >= 1) {
      do {
        for (let step = 0; step < 24; step += hStepper) {
          const date = Date.UTC(
            start.getUTCFullYear(),
            start.getUTCMonth(),
            start.getUTCDate() + day,
            step
          );

          drawAtTime(formatHours(date), date, "H", hStepper);
        }

        day++;
      } while (day <= dDiff);
    }
  } else if (limit - used > 0) {
    for (let i = 0; i <= hDiff; i++) {
      const date = Date.UTC(
        start.getUTCFullYear(),
        start.getUTCMonth(),
        start.getUTCDate(),
        start.getUTCHours() + i
      );

      drawAtTime(formatHours(date), date, "H", 1);
    }
  }

  context.restore();
}
