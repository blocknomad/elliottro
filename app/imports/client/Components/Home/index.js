import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

import {

} from '@material-ui/core';


// Styled components

const Home = Styled.section`
  padding: 30px ${config.padding.horizontal};
  min-height: 70vh;
`;

export default class HomeComponent extends Component {
  render() {
    return (
      <Home>
        Home
      </Home>
    );
  }
}
