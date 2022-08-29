import React, { Component } from "react";
import Styled from "styled-components";

import config from "/imports/client/config";

// Styled components

const H3 = Styled.h3`
  color: ${config.colors.text};
  font-size: 17px;
  font-weight: 700;
  text-transform: uppercase;
`;

export default function SectionTitle({ children }) {
  return <H3 style={style}>{children}</H3>;
}
