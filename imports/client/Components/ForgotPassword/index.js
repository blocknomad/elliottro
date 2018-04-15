import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import Lodash from 'lodash';

import config from '/imports/client/config';

import Background from '/imports/client/Components/Reusable/Background';

import {
  TextField,
  RaisedButton,
  Paper,
} from 'material-ui';


// Styled components

const ForgotPassword = Styled.section`
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

export default class ForgotPasswordComponent extends Component {
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
      <ForgotPassword>
        <Background />

        <Panel>
          <Link to="/">
            <Logo src="/logo-brand_black.svg" />
          </Link>

          <Title>Forgot password</Title>

          <form onSubmit={this.handleSubmit}>
            {this.state.main.type === 'error' &&
              <Error><i className="material-icons">error</i> {this.state.main.text}</Error>
            }

            {this.state.main.type === 'success' ?
              <Success><i className="material-icons">done</i> {this.state.main.text}</Success> : [

                <Input
                  fullWidth={true}
                  floatingLabelText="Email"
                  name="email"
                  key={0}
                  innerRef={r => this._email = r}
                  errorText={this.state.errors.email}
                />,

                <RaisedButton
                  label="Send me instructions"
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
            {this.state.main.type === 'success' ?
              <Link to="/">
                <RaisedButton
                  label="Home"
                  icon={<HomeIcon>home</HomeIcon>}
                  primary={true}
                />
              </Link> :
              <p><Link to="/signin">Cancel</Link></p>
            }
          </Links>
        </Panel>
      </ForgotPassword>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      errors: {},
      disabled: true,
    });

    const errors = {};

    const email = this._email.input.value;

    if (Lodash.isEmpty(email)) errors.email = 'This field is required.';

    if (Lodash.isEmpty(errors)) {
      Meteor.call('user/forgotPassword', email, (error, res) => {
        if (res === 'NotFound') {
          this.setState({ main: {
            text: 'There is no account associated with this email.',
            type: 'error',
          }});
        } else {
          this.setState({ main: {
            text: 'An email was just sent to the inserted address.',
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
