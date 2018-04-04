import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

// Styled components

const ScreenIcon = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 50px;
  height: 45px;
  margin-right: 20px;
  background-color: rgba(255,171,26, .90);
  //border-bottom: 3px solid rgba(255,171,26, 1.3);
  //box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;

  i {
    color: #FFF;
    font-size: 25px;
  }

  &::after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: rgba(255, 255, 255, .1);
  }
`;

export default function ScreenIc() {
  return (
    <ScreenIcon>
      <i className="material-icons">filter_list</i>
    </ScreenIcon>
  );
};
