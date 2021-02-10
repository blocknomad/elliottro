import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';


// Styled components

const color = '#acadaf';

const Footer = Styled.footer`
  padding: 4vh ${config.padding.horizontal};
  // background-color: ${config.colors.primaryContrast};
  background-color: #2f2e3c;
`

const About = Styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #ffffff77;
  color: white;
  padding-bottom: calc(4vh + 10px);

  img {
    margin-bottom: 20px;
    width: 100px;
  }

  p {
    font-size: 12px;
    line-height: 18px;
    max-width: 40%;

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;

const Copyright = Styled.div`
  font-size: 15px;
  color: white;
  padding: 10px 0;
`;

export default class FooterComponent extends Component {
  render() {
    return (
      <Footer>
        <About>
          <img src="/logo-brand.svg" />
          <p>
            Welcome to <strong>elliott ro</strong>! This is an in-development comprehensible trendline-based cryptocurrency
            screener designed for <strong>active traders</strong>.
          </p>
          <p>
            elliott ro enables you to combine multiple criteria such as <strong>candlestick patterns</strong>, classical <strong>chart patterns</strong>,
            <strong> indicators</strong> (e.g., MACD and RSI) divergences and trends, <strong>price performance</strong> and <strong>volume</strong> to screen symbols
            from major exchanges.
          </p>
          <p>
            Besides screening the cryptomarket, you will also be able to set up <strong>alerts</strong> for the screens you create
            and have notifications delivered in-app and/or on your email.
          </p>
          <p>
            <strong>Disclaimer:</strong> the content provided on this website is purely informational. We take no responsibility for
            any investment decision you make.
          </p>
        </About>
        <Copyright>
          <small>&copy; {new Date().getFullYear()} elliottro.com</small>
        </Copyright>
      </Footer>
    );
  }
}
