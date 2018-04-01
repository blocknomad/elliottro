import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

// Styled components

const P = Styled.p`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${config.colors.text};
  border-bottom: 1px solid ${config.colors.border};
  padding-bottom: 5px;
  margin-bottom: 18px;
`;

export default function ColumnTitle({ style, children }) {
  return <P style={style}>{children}</P>;
}
