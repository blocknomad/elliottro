import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

// Styled components

const P = Styled.p`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${config.colors.text};
  border-bottom: 2px solid ${config.colors.border};
  padding-bottom: 3px;
  margin-bottom: 18px;
`;

export default function ColumnTitle({ children }) {
  return <P>{children}</P>;
}
