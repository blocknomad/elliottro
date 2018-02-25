import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/ui/config';

// Styled components

const Header = Styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 2% ${config.padding.horizontal} 2%;
  color: ${config.colors.primary};

  h1 {
    font-size: 34px;
  }

  p {
    font-size: 12px;
    color: #37474F;
  }
`


export default class HeaderComponent extends Component {
  render() {
    return (
      <Header>
        <h1>Elliott&middot;ro</h1>
        <p>A simple cryptocurrency chart pattern screener which uses AI methods.</p>
      </Header>
    );
  }
}
