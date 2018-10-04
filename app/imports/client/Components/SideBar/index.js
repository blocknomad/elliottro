import React, { Component } from 'react';
import Styled from 'styled-components';
import { withRouter } from 'react-router';

import config from '/imports/client/config';

import Screens from './Screens';

import { IconButton, Badge } from 'material-ui';

// Styled components

const SideBar = Styled.div`
  background-color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  display: flex;
`;

const Content = Styled.div`
  width: 340px;
  height: 100%;
  box-sizing: border-box;
  border-left: 1px solid #eee;

  ${props => props.visible === false && 'display: none;'}
`;

const tabSize = 50;

const Tabs = Styled.div`
  width: ${tabSize}px;
  height: 100%;
  background-color: #eee;
  box-sizing: border-box;
  border-left: 1px solid #ddd;
`;

const Tab = Styled.div`
  height: ${tabSize}px;
  border-bottom: 1px solid #ddd;

  ${props => props.active && `
    background-color: #FFF;
  `};
`;

const Icon = Styled(IconButton).attrs({
  iconClassName: 'material-icons',
  style: { width: tabSize, height: tabSize, padding: tabSize / 4, opacity: .8 },
  iconStyle: { width: tabSize / 2, height: tabSize / 2, fontSize: tabSize / 2 },
  hoveredStyle: { opacity: 1 },
})``;

class SideBarComponent extends Component {
  state = {
    active: undefined,
  }

  render() {
    const { active } = this.state;

    return (
      <SideBar>
        <Content visible={this.props.visible}>
          {active === 'screens' && <Screens />}
        </Content>

        <Tabs>
          <Tab
            title="Screens"
            active={active === 'screens'}
            onClick={() => this.handleChange('screens')}
          >
            <Icon>web_asset</Icon>
          </Tab>

          <Tab
            title="Alerts"
            active={active === 'alerts'}
            onClick={() => this.handleChange('alerts')}
          >
            <Icon>access_alarms</Icon>
          </Tab>

          <Tab
            title="Notifications"
            active={active === 'notifications'}
            onClick={() => this.handleChange('notifications')}
          >
            <Badge
              badgeContent={10}
              style={{padding: 0}}
              badgeStyle={{height: 18, width: 18, lineHeight: 1, fontSize: 10, top: 4, right: 4}}
              secondary={true}
            >
              <Icon>notifications</Icon>
            </Badge>
          </Tab>
        </Tabs>
      </SideBar>
    );
  }

  handleChange = (tab) => {
    if (tab === this.state.active) {
      this.setState({ active: null });
      this.props.handleSideBarToggle();
    } else {
      this.setState({ active: tab });

      if (this.props.visible === false) {
        this.props.handleSideBarToggle();
      }
    }
  }
};

export default withRouter(SideBarComponent);
