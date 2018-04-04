import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

import {

} from 'material-ui';


// Styled components

const Alerts = Styled.section`
  padding: 30px ${config.padding.horizontal};
  min-height: 70vh;
`;

export default class AlertsComponent extends Component {
  render() {
    return (
      <Alerts>
        Alerts
      </Alerts>
    );
  }
}
