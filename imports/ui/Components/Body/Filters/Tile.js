import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/ui/config';

// Styled components

const Tile = Styled.div`
  display: flex;
  padding: 3% 20px 3% 14px;
  border-box: box-sizing;
  background-color: #FFF;
  box-shadow: 0 0 0 rgba(0,0,0,.1);
  border-bottom: 1px solid #e2e2e4;
  cursor: pointer;
  align-items: center;

  &:hover {
    background-color: ${config.colors.primary};

    h3 {
      color: ${config.colors.primaryContrast};
    }

    div {
      border-color: ${config.colors.primaryContrast};
    }
  }
`

const Label = Styled.h3`
  color: #37474F;
  font-size: 14px;
  font-weight: normal;
  flex-grow: 100;
`

const Toggle = Styled.div`
  position: relative;
  width: 14px;
  height: 14px;
  border: 1px solid ${props => props.toggled ? config.colors.primary : '#B0BEC5'};
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${config.colors.primaryContrast};
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: ${props => props.toggled ? 'initial' : 'none'};
  }
`

const ToggleMarker = Styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${config.colors.primary};
`

export default class FilterTileComponent extends Component {
  state = {
    toggled: false,
  }

  render() {
    return (
      <Tile onClick={this.handleClick}>
        <Label>{this.props.label}</Label>
        <Toggle toggled={this.state.toggled}>
          <ToggleMarker />
        </Toggle>
      </Tile>
    );
  }

  handleClick = () => {
    this.setState({ toggled: !this.state.toggled });
  }
}
