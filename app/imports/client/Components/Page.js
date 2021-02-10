import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Styled from 'styled-components';
import Lodash from 'lodash';
import { Route, Redirect } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';

import config from '/imports/client/config';

import UserContainer from '/imports/client/Containers/user';

// Styled components

const App = Styled.section`
	width: 100%;
	// background-color: ${config.colors.primary};
`;

const Main = Styled.div`
  width: 100%;
`;

class PageComponent extends Component {
  render() {
    const {
      component: Component,
      blank,
      onlyLoggedOut = false,
      onlyLoggedIn = false,
      user,
      isLoggingIn,
      ...props
    } = this.props;

    return (
      <Route {...props} render={renderProps => {

        const isLoggedIn = Lodash.isEmpty(user) === false || isLoggingIn;

        // if the route is limited for logged out users and there's a logged in user, redirect
        // if the route is limited for logged in users and there's a logged out user, redirect

        if (
          (onlyLoggedOut && isLoggedIn) ||
          (onlyLoggedIn && isLoggedIn === false)
        ) {
         return <Redirect to="/" />;
        }

        // otherwise, just render it

        return (
          <App>
            <Main>
              {!blank && <Header />}

              <Component {...renderProps} />

              {!blank && <Footer />}
            </Main>
          </App>
        )
      }} />
    );
  }
};

export default UserContainer(PageComponent);
