import React, { Component } from "react";
import Styled from "styled-components";
import Lodash from "lodash";

import config from "/imports/client/config";
import Patterns from "/imports/both/fixtures/patterns";

import Illustrate from "./IllustrateChartPattern";

// Styled components

const Background = Styled.div`
  background-color: ${config.colors.primary};
  border-bottom: 4px solid #00a1a9;
  position: fixed;
  top: 0;
  left: 0;
  height: 35vh;
  padding-bottom: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  div {
    margin-right: 50px;
  }
`;

export default function fBackground({ style, children }) {
  const color = "rgba(0, 0, 0, .12)";
  const filterPatterns = (ps) => Lodash.filter(ps, (p) => p.status !== 3);
  const patterns = filterPatterns({
    ...Patterns.reversal,
    ...Patterns.continuation,
  });

  return (
    <Background>
      {Lodash.shuffle(patterns).map(({ acronym }) => {
        const i = Math.ceil(Math.random() * 4);

        return (
          <div key={acronym}>
            {Illustrate(acronym, {
              primary: color,
              secondary: color,
              width: 72 * i,
              height: 60 * i,
              props: {},
            })}
          </div>
        );
      })}
    </Background>
  );
}
