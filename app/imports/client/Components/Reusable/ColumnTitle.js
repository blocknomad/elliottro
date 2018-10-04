import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

// Styled components

const P = Styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${config.colors.text};
  margin-bottom: 13px;
`;

export default function ColumnTitle({ style, children }) {
  return <P style={style}>{children}</P>;
}
