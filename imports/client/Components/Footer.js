import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';


// Styled components

const Footer = Styled.section`
  padding: 0 ${config.padding.horizontal};
  background-color: ${config.colors.primaryContrast};
`

const Content = Styled.div`
  font-size: 13px;
  color: #444;
  padding: 4% 0;
  text-align: center;
`



// App component - represents the whole app
export default class FooterComponent extends Component {
  render() {
    return (
      <Footer>
        <Content>
          <span>Copyright &copy; {new Date().getFullYear()} Elliottro. All Rights Reserved.</span>
        </Content>
      </Footer>
    );
  }
}
