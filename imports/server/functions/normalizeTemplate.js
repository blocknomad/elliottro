
/**

  @function normalizeTemplate

    Normalizes template series to length of input series


  Parameters:

    template: Array,
    inputLength: Number,


**/

import Lodash from 'lodash';


const sumUpTemplatePath = series => {
  let sum = 0;

  
  for (let i = 1; i < series.length; i++) {
    sum += Math.abs(series[i - 1] - series[i]);
  }

  return sum;
};


export default function normalizeTemplate(template, inputLength) {
  const { series, rule } = template;
  const normalizedSeries = [];

  const pathLength = sumUpTemplatePath(series);
  let step = pathLength / inputLength;
  

  let j = series[0];
  normalizedSeries.push(j);

  for (let i = 1; i < series.length; i++) {
    step = rule[i] === 'P' ? Math.abs(step) : -(Math.abs(step));


    do {
      j += step;
      normalizedSeries.push(j);
    } while (j <= series[i] - Math.abs(step) || j >= series[i] + Math.abs(step))
  }

  return normalizedSeries;
};
