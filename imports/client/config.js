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
    border: '#eee',
    text: 'rgba(0, 0, 0, 0.87)',
    textLighter: '#adaeb0',
    icon: '#666',
  },
  padding: {
    horizontal: '12%',
  },
  animations: {
    fadeIn: `${fadeIn} .2s`,
  },
  shadow: {
    normal: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
  },
};
