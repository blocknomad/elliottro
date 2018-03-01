import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import config from '/imports/client/config';

// Styled components

const Table = Styled.table`
  width: 100%;
  background-color: ${config.colors.primaryContrast};
  box-shadow: 4px 4px 2px #00796B;
  padding: 20px;

  th {
    text-align: left;
    font-size: 15px;
    font-weight: 600;
    padding: 5px 0 10px;
    color: #263238;
  }

  td {
    font-size: 14px;
    font-weight: 300;
    padding: 5px 0;
    color: #37474F;
  }

  tbody tr:not(:last-child) td {
    border-bottom: 1px solid #ddd;
  }
`

export default class TableResultsComponent extends Component {
  render() {
    const { results } = this.props;

    return (
      <Table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Base Currency</th>
            <th>Exchange</th>
            <th>Pattern</th>
            <th>Starts in</th>
            <th>Ends in</th>
          </tr>
        </thead>

        <tbody>
          {Lodash.map(results, (result, key) =>
            <tr key={key}>
              <td>{result.symbol}</td>
              <td>{result.baseCurrency}</td>
              <td>{result.exchange}</td>
              <td>{result.pattern}</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}
