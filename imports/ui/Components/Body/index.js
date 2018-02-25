import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/ui/config';

import Filters from './Filters';
import Results from './Results';


// Styled components

const Body = Styled.section`
`

// App component - represents the whole app
export default class BodyComponent extends Component {
  render() {
    return (
      <Body>
        <Filters />
        <Results />
      </Body>
    );
  }
}
