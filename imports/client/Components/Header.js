import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

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

    sup {
      font-size: .285em;
      margin-left: .4em;
      font-weight: 600;
      color: #37474F;
    }
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
        <h1>Elliott&middot;ro<sup>PRE-ALPHA</sup></h1>
        <p>A straightforward cryptocurrency screener which uses Artificial Intelligence methods.</p>
      </Header>
    );
  }
}
