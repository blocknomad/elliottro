import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import config from '/imports/client/config';

import Patterns from '/imports/both/fixtures/patterns';


// Styled components

const Table = Styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid ${config.colors.border};
  border-bottom: 1px solid ${config.colors.border};

  th {
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    padding: 24px 0 5px;
    color: #263238;

    &:first-child {
      padding-right: 10px;
      padding-left: 1vw;
    }
  }

  td {
    font-size: 13px;
    padding: 7px 0;
    color: ${config.colors.text};

    &:first-child {
      padding-left: 1vw;
    }
  }

  tr:nth-child(even) {
    background-color: ${config.colors.secondary};
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
                <td>{new Date(match.start + 1000).toLocaleString()}</td>
                <td>{new Date(match.end + 1000).toLocaleString()}</td>
              </tr>
          )}
        </tbody>
      </Table>
    );
  }
}
