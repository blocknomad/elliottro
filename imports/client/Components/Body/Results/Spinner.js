import React, { Component } from 'react';
import Styled, { keyframes } from 'styled-components';


import config from '/imports/client/config';

// Styled components

const CubeMove = keyframes`
  25% { transform: translateX(42px) rotate(-90deg) scale(0.5) }
  50% { transform: translateX(42px) translateY(42px) rotate(-180deg) }
  75% { transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
  100% { transform: rotate(-360deg) }
`

const Spinner = Styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin: 100px auto;
`

const Cube = Styled.div`
  background-color: ${config.colors.primaryContrast};
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${CubeMove} 1.8s infinite ease-in-out;

  &:last-child {
    animation-delay: -.9s;
  }
`

export default () => <Spinner>
  <Cube />
  <Cube />
</Spinner>
