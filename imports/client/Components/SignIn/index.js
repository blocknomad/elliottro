import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

import {
  Checkbox,
  Slider,
  RaisedButton,
  IconMenu,
  MenuItem,
  IconButton,
  Paper,
} from 'material-ui';


// Styled components

const SignIn = Styled.section`
  padding: 30px ${config.padding.horizontal};
`;

export default class SignInComponent extends Component {
  render() {
    const {
      filters,
      loading,
      handleChange,
      handleSearch,
    } = this.props;

    return (
      <SignIn>

      </SignIn>
    );
  }
}
