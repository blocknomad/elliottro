import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Styled from 'styled-components';
import Lodash from 'lodash';
import { Route, Redirect } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';

import config from '/imports/client/config';

import UserContainer from '/imports/client/Containers/user';

// Styled components

const App = Styled.section`
  width: 100%;
`;

const Main = Styled.div`
  width: ${props =>
    (props.sidebar === 'hidden' && '100%') ||
    (props.sidebar === 'open' && 'calc(100% - 50px - 340px)') ||
    (props.sidebar === 'closed' && 'calc(100% - 50px)')
  };
`;

class PageComponent extends Component {
  render() {
    const {
      component: Component,
      blank,
      onlyLoggedOut = false,
      onlyLoggedIn = false,
      sidebar = false,
      handleSideBarToggle = () => {},
      setSideBar = () => {},
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

        // otherwise, act naturally

        return (
          <App>
            <Main sidebar={!isLoggedIn || blank ? 'hidden' : (sidebar ? 'open' : 'closed')}>
              {!blank && <Header sidebar={sidebar} setSideBar={setSideBar} />}

              <Component sidebar={sidebar} {...renderProps} />

              {!blank && <Footer sidebar={sidebar} />}
            </Main>

            {!blank && isLoggedIn && <SideBar handleSideBarToggle={handleSideBarToggle} visible={sidebar} />}
          </App>
        )
      }} />
    );
  }
};

export default UserContainer(PageComponent);
