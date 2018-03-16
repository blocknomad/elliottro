import { keyframes } from 'styled-components';

// animations

const fadeIn = keyframes`
  from { opacity: 0; margin-top: 15px; transform: scale(.993); }
  to { opacity: 1; margin-top: 0px; transform: scale(1); }
`;


export default {
  colors: {
    primary: '#00bbc9',
    primaryContrast: '#fff',
    secondary: '#f8f8f8',
    secondaryContrast: '#37474F',
    border: '#ECEFF1',
    text: '#333',
    textLighter: '#555',
    icon: '#777',
  },
  padding: {
    horizontal: '2vw',
  },
  animations: {
    fadeIn: `${fadeIn} .2s`,
  },
};
