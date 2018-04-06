import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import Lodash from 'lodash';

import config from '/imports/client/config';

import Background from '/imports/client/Components/Reusable/Background';

import {
  TextField,
  RaisedButton,
  Paper,
} from 'material-ui';


// Styled components

const SignIn = Styled.section`
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

const Error = Styled.div`
  color: rgb(244, 67, 54);
  font-size: 12px;
  margin-top: 15px;
  display: flex;
  align-items: center;

  i {
    margin-right: 5px;
  }
`;

class SignInComponent extends Component {
  state = {
    errors: {},
  }

  render() {
    return (
      <SignIn>
        <Background />

        <Panel>
          <Link to="/">
            <Logo src="/logo-brand_black.svg" />
          </Link>

          <Title>Sign in</Title>

          <form onSubmit={this.handleSubmit}>
            {this.state.errors.invalidUser &&
              <Error><i className="material-icons">error</i> Invalid username or password.</Error>
            }
            <Input
              fullWidth={true}
              floatingLabelText="Email or username"
              name="username"
              innerRef={r => this._username = r}
              errorText={this.state.errors.username}
            />
            <Input
              fullWidth={true}
              floatingLabelText="Password"
              name="password"
              type="password"
              innerRef={r => this._password = r}
              errorText={this.state.errors.password}
            />

            <RaisedButton
              label="Sign in"
              primary={true}
              type="submit"
              style={{marginTop: 20}}
            />
          </form>

          <Links>
            <p>Need an account? Click to <Link to="/signup">sign up.</Link></p>
            <p><Link to="/reset-password">Forgot your password?</Link></p>
          </Links>
        </Panel>
      </SignIn>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    const user = this._username.input.value;
    const password = this._password.input.value;

    if (Lodash.isEmpty(user)) errors.username = 'This field is required.';
    if (Lodash.isEmpty(password)) errors.password = 'This field is required.';

    if (Lodash.isEmpty(errors)) {
      Meteor.loginWithPassword(user, password, (error) => {
        if (error) {
          this.setState({ errors: { invalidUser: true }});
        } else {
          this.props.history.push('/');
        }
      });
    } else {
      this.setState({ errors });
    }
  }
}

export default withRouter(SignInComponent);
