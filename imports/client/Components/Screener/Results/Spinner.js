import React, { Component } from 'react';
import Styled, { keyframes } from 'styled-components';


import config from '/imports/client/config';

// Styled components

const initialColor = '#ccc';
const animationDuration = .9;

const Transition = keyframes`
  0% { background-color: ${config.colors.primary} }
  33% { background-color: ${config.colors.primary} }
  33.33% { background-color: ${initialColor} }
`

const Spinner = Styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`

const Dot = Styled.div`
  width: 14px;
  height: 14px;
  background-color: ${initialColor};
  margin-right: 14px;

  border-radius: 100%;
  display: inline-block;
  animation: ${Transition} ${animationDuration}s infinite;

  &:nth-child(2) {
    animation-delay: ${animationDuration * .33}s;
  }

  &:last-child {
    animation-delay: ${animationDuration * .66}s;
    margin-right: 0;
  }
`

export default () =>
  <Spinner>
    <Dot />
    <Dot />
    <Dot />
  </Spinner>
