import React, { Component } from "react";
import Styled, { keyframes } from "styled-components";


import config from "/imports/client/config";

// Styled components

const Rotate = keyframes`
  from { transform: translate(0, 0); }
  20% { transform: translate(0, 0); }
  25% { transform: translate(0, 5rem); }
  45% { transform: translate(0, 5rem); }
  50% { transform: translate(5rem, 5rem); }
  70% { transform: translate(5rem, 5rem); }
  75% { transform: translate(5rem, 0); }
  95% { transform: translate(5rem, 0); }
`

const Spinner = Styled.div`
  position: relative;
  margin-top: 10%;
  top: 50%;
  left: 50%;
  height: 6rem;
  width: 6rem;
  transform: translate(-50%) scale(.9);
`

const Dot = Styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  filter: url("#goo");

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: ${config.colors.primary};
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    animation: ${Rotate} 3s linear infinite;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 137, 123, .4);
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    animation: ${Rotate} 3s linear infinite;
  }

  &:nth-of-type(1):before {
    animation-delay: .05s;
  }

  &:nth-of-type(2) {
    transform: rotate(90deg);

    &:after {
      animation-delay: .25s;
    }

    &:before {
      animation-delay: calc(.25s + .05s);
    }
  }

  &:nth-of-type(3) {
    transform: rotate(180deg);

    &:after {
      animation-delay: .5s;
    }

    &:before {
      animation-delay: calc(.5s + .05s);
    }
  }
`

export default () =>
  <div>
    <Spinner>
      <Dot />
      <Dot />
      <Dot />
    </Spinner>

    <svg>
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 50 -8" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  </div>
