import React, { Component } from 'react';
import Styled from 'styled-components';

import config from '/imports/client/config';

// Styled components

const P = Styled.p`
  color: ${config.colors.textLighter};
  font-size: 13px;
`;

export default function Text({ children }) {
  return <P>{children}</P>;
}
