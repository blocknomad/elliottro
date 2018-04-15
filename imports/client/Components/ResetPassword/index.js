import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
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

const ResetPassword = Styled.section`
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

const Success = Styled.div`
  color: #43A047;
  font-size: 12px;
  margin-top: 15px;
  display: flex;
  align-items: center;

  i {
    margin-right: 5px;
  }
`;

const HomeIcon = Styled.i.attrs({
  className: 'material-icons',
})`
  color: #FFF;
`;

class ForgotPasswordComponent extends Component {
  state = {
    main: {
      type: undefined,
      text: undefined,
    },
    errors: {},
    disabled: false,
  }

  render() {
    return (
      <ResetPassword>
        <Background />

        <Panel>
          <Link to="/">
            <Logo src="/logo-brand_black.svg" />
          </Link>

          <Title>Reset password</Title>

          <form onSubmit={this.handleSubmit}>
            {this.state.main.type === 'error' &&
              <Error><i className="material-icons">error</i> {this.state.main.text}</Error>
            }

            {this.state.main.type === 'success' ?
              <Success><i className="material-icons">done</i> {this.state.main.text}</Success> : [

                <Input
                  fullWidth={true}
                  floatingLabelText="New password"
                  name="password"
                  type="password"
                  key={0}
                  innerRef={r => this._password = r}
                  errorText={this.state.errors.password}
                />,

                <RaisedButton
                  label="Reset password"
                  primary={true}
                  key={1}
                  disabled={this.state.disabled}
                  type="submit"
                  style={{marginTop: 20}}
                />,
              ]
            }
          </form>

          <Links>
            {this.state.main.type === 'success' &&
              <Link to="/">
                <RaisedButton
                  label="Home"
                  icon={<HomeIcon>home</HomeIcon>}
                  primary={true}
                />
              </Link>
            }
          </Links>
        </Panel>
      </ResetPassword>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      errors: {},
      disabled: true,
    });

    const errors = {};

    const password = this._password.input.value;

    if (Lodash.isEmpty(password)) errors.password = 'This field is required.';

    if (Lodash.isEmpty(errors)) {
      const { token } = this.props.match.params;

      Accounts.resetPassword(token, password, error => {
        if (error) {
          this.setState({ main: {
            text: `${error.reason}.`,
            type: 'error',
          }});
        } else {
          this.setState({ main: {
            text: 'Successfully reset password and now you are logged in.',
            type: 'success',
          }});
        }

        this.setState({ disabled: false });
      });
    } else {
      this.setState({
        errors,
        disabled: false,
      });
    }
  }
}

export default withRouter(ForgotPasswordComponent);
