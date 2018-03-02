import React, { Component } from 'react';
import Styled, { keyframes } from 'styled-components';


import config from '/imports/client/config';

// Styled components

const BounceDelay = keyframes`
  3%, 30% { transform: translateY(0) }
  13% { transform: translateY(-100%) }
`

const Spinner = Styled.div`
  width: 100%;
  padding: 50px 0;
  display: flex;
  justify-content: center;
`

const Bounce = Styled.div`
  width: 18px;
  height: 18px;
  background-color: ${config.colors.primary};
  margin-right: 10px;

  border-radius: 100%;
  display: inline-block;
  animation: ${BounceDelay} 1.5s infinite ease-in-out both;

  &:nth-child(2) {
    animation-delay: .5s;
  }

  &:last-child {
    animation-delay: 1s;
    margin-right: 0;
  }
`

export default () => <Spinner>
  <Bounce />
  <Bounce />
  <Bounce />
</Spinner>
