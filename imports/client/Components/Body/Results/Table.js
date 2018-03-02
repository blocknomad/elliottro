import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import config from '/imports/client/config';

import Patterns from '/imports/both/fixtures/patterns';


// Styled components

const Table = Styled.table`
  width: 100%;
  background-color: ${config.colors.primaryContrast};
  box-shadow: 2px 2px 2px #eee;
  padding: 20px;
  border: 1px solid #eee;

  th {
    text-align: left;
    font-size: 15px;
    font-weight: 600;
    padding: 5px 0 10px;
    color: #263238;

    &:first-child {
      padding-right: 5px;
    }
  }

  td {
    font-size: 14px;
    font-weight: 300;
    padding: 7px 0;
    color: #37474F;
  }

  tbody tr:not(:last-child) td {
    border-bottom: 1px solid #ddd;
  }
`

export default class TableResultsComponent extends Component {
  render() {
    const { matches } = this.props;

    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Base Asset</th>
            <th>Quote Asset</th>
            <th>Exchange</th>
            <th>Pattern</th>
            <th>Starts in</th>
            <th>Ends in</th>
          </tr>
        </thead>

        <tbody>
          {Lodash.map(

            Lodash.sortBy(
              matches,
              ['pattern', 'exchange', 'quoteAsset', 'baseAsset']
            ),

            (match, key) =>
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{match.baseAsset}</td>
                <td>{match.quoteAsset}</td>
                <td>{match.exchange}</td>
                <td>{Patterns[match.pattern].name}</td>
                <td>{new Date(match.start).toLocaleString()}</td>
                <td>{new Date(match.end).toLocaleString()}</td>
              </tr>
          )}
        </tbody>
      </Table>
    );
  }
}
