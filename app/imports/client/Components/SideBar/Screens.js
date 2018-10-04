import React, { Component } from 'react';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import Lodash from 'lodash';
import { createContainer } from 'meteor/react-meteor-data';

import Screens from '/imports/both/collections/screens';

import config from '/imports/client/config';

import { IconButton, RaisedButton } from 'material-ui';

// Styled components

const List = Styled.div`
  padding: 0;
  color: ${config.colors.text};
`;

const Title = Styled.div`
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
`;

const Item = Styled.div`
  padding: 3px 12px;
  width: 100%;
  font-size: 13px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  &:nth-child(even) {
    background-color: #f2f2f5;
  }
`;

const Name = Styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 100;
`;

const iconSize = 15;

const Icon = Styled(IconButton).attrs({
  iconClassName: 'material-icons',
  style: { width: iconSize * 2, height: iconSize * 2, padding: iconSize / 2, opacity: .7 },
  iconStyle: { width: iconSize, height: iconSize, fontSize: iconSize },
  hoveredStyle: { opacity: 1 },
})``;

class ScreensComponent extends Component {
  render() {
    const { screens, loading } = this.props;

    return (
      <List>
        <Title>Screens</Title>

        {Lodash.map(screens, screen => (
          <Item key={screen._id}>
            <Name title={screen.name}>{screen.name}</Name>

            <Link to={`/screen/${screen.slug}`}>
              <Icon title="Edit screen">
                settings
              </Icon>
            </Link>

            <Icon title="Remove screen">
              delete
            </Icon>

            <Link to={`/view/${screen.slug}`}>
              <RaisedButton
                style={{height: 20, width: 30, minWidth: 'none', marginLeft: 10}}
                icon={<i className="material-icons" style={{color: '#FFF', fontSize: 16, verticalAlign: 'sub'}}>play_arrow</i>}
                primary={true}
                title="Run screen"
              />
            </Link>
          </Item>
        ))}
      </List>
    );
  }
};

export default createContainer(({ params }) => {
  const subscription = Meteor.subscribe('screens.fromCurrentUser');
  const loading = !subscription.ready();
  const screens = Screens.find().fetch();

  return { loading, screens };
}, ScreensComponent);
