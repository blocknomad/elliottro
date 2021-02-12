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
  Button,
  Paper,
} from '@material-ui/core';


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
  color: ${config.colors.textSecondary};
`;

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
              <Error><i className="material-icons">error</i> Invalid email or password.</Error>
            }
            <Input
              fullWidth={true}
              label="Email"
              name="email"
              inputRef={r => this._email = r}
              error={Boolean(this.state.errors.email)}
            />
            <Input
              fullWidth={true}
              label="Password"
              name="password"
              type="password"
              inputRef={r => this._password = r}
              error={Boolean(this.state.errors.password)}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{marginTop: 20}}
            >
              Sign in
            </Button>
          </form>

          <Links>
            <p>Need an account? Click to <Link to="/signup">sign up.</Link></p>
            <p><Link to="/forgot-password">Forgot your password?</Link></p>
          </Links>
        </Panel>
      </SignIn>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    const user = this._email.value;
    const password = this._password.value;

    if (Lodash.isEmpty(user)) errors.email = 'This field is required.';
    if (Lodash.isEmpty(password)) errors.password = 'This field is required.';

    if (Lodash.isEmpty(errors)) {
      Meteor.loginWithPassword(user, password, (error) => {
        if (error) return this.setState({ errors: { invalidUser: true }});
        this.props.history.push('/view')
      });
    } else {
      this.setState({ errors });
    }
  }
}

export default withRouter(SignInComponent);
