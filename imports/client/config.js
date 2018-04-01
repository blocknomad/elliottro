import { keyframes } from 'styled-components';

// animations

const fadeIn = keyframes`
  from { opacity: 0; margin-top: 10px; }
  to { opacity: 1; margin-top: 0px; }
`;


export default {
  colors: {
    primary: '#00b0bb',
    primaryLighter: '#00bbc9',
    primaryContrast: '#fff',
    secondary: '#FFA000',
    secondaryContrast: '#37474F',
    border: '#ddd',
    text: '#4a4a4a',
    textLighter: '#adaeb0',
    icon: '#666',
  },
  padding: {
    horizontal: '10%',
  },
  animations: {
    fadeIn: `${fadeIn} .2s`,
  },
};
