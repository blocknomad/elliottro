import React, { Component } from "react";
import Styled from "styled-components";
import { withRouter } from "react-router";

import config from "/imports/client/config";

import Screens from "./Screens";

import { IconButton, Badge } from "@material-ui/core";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import NotificationsIcon from "@material-ui/icons/Notifications";

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

  ${(props) => props.visible === false && "display: none;"}
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

  ${(props) =>
    props.active &&
    `
    background-color: #FFF;
  `};
`;

class SideBarComponent extends Component {
  state = {
    active: undefined,
  };

  render() {
    const { active } = this.state;

    return (
      <SideBar>
        <Content visible={this.props.visible}>
          {active === "screens" && <Screens />}
        </Content>

        <Tabs>
          <Tab
            title="Screens"
            active={active === "screens"}
            onClick={() => this.handleChange("screens")}
          >
            <IconButton>
              <WebAssetIcon />
            </IconButton>
          </Tab>

          <Tab
            title="Alerts"
            active={active === "alerts"}
            onClick={() => this.handleChange("alerts")}
          >
            <IconButton>
              <AccessAlarmsIcon />
            </IconButton>
          </Tab>

          <Tab
            title="Notifications"
            active={active === "notifications"}
            onClick={() => this.handleChange("notifications")}
          >
            <IconButton>
              <Badge badgeContent={10} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
  };
}

export default withRouter(SideBarComponent);
