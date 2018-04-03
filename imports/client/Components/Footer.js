import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';


// Styled components

const color = '#acadaf';

const Footer = Styled.section`
  padding: 4vh ${config.padding.horizontal};
  background-color: ${config.colors.primaryContrast};
  background-color: #2f2e3c;
`

const About = Styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #666;
  color: ${color};
  padding-bottom: calc(4vh + 10px);

  img {
    margin-bottom: 20px;
    width: 112px;
    height: 20.25px;
  }

  p {
    font-size: 12px;
    line-height: 18px;
    max-width: 40%;

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    b {
      color: #ccc;
    }
  }
`;

const Copyright = Styled.div`
  font-size: 15px;
  color: ${color};
  padding: 10px 0;
`;

export default class FooterComponent extends Component {
  render() {
    return (
      <Footer>
        <About>
          <img src="/logo-brand.svg" />
          <p>
            Welcome to <b>elliott ro</b>! This is an in-development comprehensible trendline-based cryptocurrency
            screener designed for <b>active traders</b>.
          </p>
          <p>
            elliott ro enables you to combine multiple criteria such as <b>candlestick patterns</b>, classical <b>chart patterns</b>,
            <b> indicators</b> (e.g., MACD and RSI) divergences and trends, <b>price performance</b> and <b>volume</b> to screen symbols
            from major exchanges.
          </p>
          <p>
            Besides screening the cryptomarket, you will also be able to set up <b>alerts</b> for the screens you create
            and have notifications delivered in-app and/or on your email.
          </p>
          <p>
            <b>Disclaimer:</b> the content provided on this website is purely informational. We take no responsibility for
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
