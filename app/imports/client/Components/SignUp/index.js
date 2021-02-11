import React, { Component } from 'react';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';
import Lodash from 'lodash';

import config from '/imports/client/config';

import Background from '/imports/client/Components/Reusable/Background';

import {
  Checkbox,
  TextField,
  Button,
  Paper,
} from '@material-ui/core';


// Styled components

const SignUp = Styled.section`
  display: flex;
  justify-content: center;
`;

const Panel = Styled(Paper)`
  padding: 50px;
  background-color: #FFF;
  width: 450px;
  margin-top: 12vh;
  position: relative;
  z-index: 2;

  a {
    color: ${config.colors.primary};
  }
`;

const Logo = Styled.img`
  width: 118px;
`;

const Title = Styled.h1`
  font-size: 18px;
  font-weight: 300;
  margin: 30px 0 10px;
  color: ${config.colors.textSecondary};
`;

const Buttons = Styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  & > * {
    flex-shrink: 0;
  }
`;

const Terms = Styled.span`
  font-size: 13px;
  color: ${config.colors.textSecondary};
  margin-left: 10px;
`

const Links = Styled.div`
  margin: 30px 0 0;
  font-size: 14px;
  color: ${config.colors.textSecondary};

  p:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const Input = Styled(TextField).attrs({
  fullWidth: true,
  style: { fontSize: 14 },
})``;

class SignUpComponent extends Component {
  state = {
    errors: {},
  }

  render() {
    return (
      <SignUp>
        <Background />

        <Panel>
          <Link to="/">
            <Logo src="/logo-brand_black.svg" />
          </Link>

          <Title>Sign up</Title>

          <form onSubmit={this.handleSubmit}>
            <Input
              label="Email"
              inputRef={r => this._email = r}
              error={this.state.errors.email}
              name="email"
            />
            <Input
              label="Password"
              type="password"
              inputRef={r => this._password = r}
              error={this.state.errors.password}
              name="password"
            />

            <Buttons>
              <Button
                variant="contained"
                type="submit"
                color="primary"
              >
                Sign up
              </Button>

              <Terms>
                By clicking on “Sign up” you are agreeing to the <Link to="/terms" target="_blank">Terms of Service.</Link>
              </Terms>
            </Buttons>
          </form>

          <Links>
            <p>Already have an account? Click to <Link to="/signin">sign in.</Link></p>
          </Links>
        </Panel>
      </SignUp>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    const email = this._email.value;
    const password = this._password.value;

    if (Lodash.isEmpty(email)) {
      errors.email = 'This field is required.';
    } else if (SimpleSchema.RegEx.Email.test(email) === false) {
      errors.email = 'Please enter a valid email address.';
    }

    if (Lodash.isEmpty(password)) {
      errors.password = 'This field is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    if (Lodash.isEmpty(errors)) {
      Accounts.createUser({
        email: this._email.value,
        password: this._password.value,
      }, (error) => {
        if (error) {
          if (error.reason.includes('Email')) {
            this.setState({ errors: { email: error.reason }});
          } else if (error.reason.includes('Password')) {
            this.setState({ errors: { password: error.reason }});
          }
        } else {
          this.props.history.push('/');
        }
      });
    } else {
      console.log(errors)
      this.setState({ errors });
    }
  }
}

export default withRouter(SignUpComponent);
