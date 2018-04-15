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
  RaisedButton,
  Paper,
} from 'material-ui';


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
  color: ${config.colors.text};
`;

const Buttons = Styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  span {
    font-size: 13px;
    color: ${config.colors.text};
    margin-left: 10px;
  }
`;

const Links = Styled.div`
  margin: 30px 0 0;
  font-size: 14px;
  color: ${config.colors.text};

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
              floatingLabelText="Email"
              innerRef={r => this._email = r}
              errorText={this.state.errors.email}
              name="email"
            />
            <Input
              floatingLabelText="Username"
              innerRef={r => this._username = r}
              errorText={this.state.errors.username}
              name="username"
            />
            <Input
              floatingLabelText="Password"
              type="password"
              innerRef={r => this._password = r}
              errorText={this.state.errors.password}
              name="password"
            />

            <Buttons>
              <RaisedButton
                label="Sign up"
                type="submit"
                primary={true}
              />

              <span>
                By clicking on “Sign up” you are agreeing to the <Link to="/terms" target="_blank">Terms of Service.</Link>
              </span>
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

    const email = this._email.input.value;
    const username = this._username.input.value;
    const password = this._password.input.value;

    if (Lodash.isEmpty(email)) {
      errors.email = 'This field is required.';
    } else if (SimpleSchema.RegEx.Email.test(email) === false) {
      errors.email = 'Please enter a valid email address.';
    }

    if (Lodash.isEmpty(username)) errors.username = 'This field is required.';

    if (Lodash.isEmpty(password)) {
      errors.password = 'This field is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    if (Lodash.isEmpty(errors)) {
      Accounts.createUser({
        email: this._email.input.value,
        username: this._username.input.value,
        password: this._password.input.value,
      }, (error) => {
        if (error) {
          if (error.reason.includes('Email')) {
            this.setState({ errors: { email: error.reason }});
          } else if (error.reason.includes('Username')) {
            this.setState({ errors: { username: error.reason }});
          } else if (error.reason.includes('Password')) {
            this.setState({ errors: { password: error.reason }});
          }
        } else {
          this.props.history.push('/');
        }
      });
    } else {
      this.setState({ errors });
    }
  }
}

export default withRouter(SignUpComponent);
