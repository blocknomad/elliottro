import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import config from '/imports/client/config';

import Patterns from '/imports/both/fixtures/patterns';


// Styled components

const Table = Styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;

  th {
    text-align: left;
    font-size: 13px;
    font-weight: 600;
    padding: 0 0 5px;
    color: ${config.colors.text};

    &:first-child {
      padding-right: 10px;
    }
  }

  td {
    font-size: 13px;
    padding: 7px 0;
    color: ${config.colors.text};

    &:last-child {
      width: 1%;
      white-space: nowrap;
      padding: 0 10px;
    }
  }

  th:first-child, td:first-child {
    padding-left: 10px;
  }

  tr:nth-child(even) {
    background-color: ${config.colors.secondary};
  }
`

const Visit = Styled.a`
  i {
    color: ${config.colors.primary};
    font-size: 18px;
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
            <th>Starts in</th>
            <th>Ends in</th>
            <th />
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
                <td>{new Date(match.start + 1000).toLocaleString()}</td>
                <td>{new Date(match.end + 1000).toLocaleString()}</td>
                <td>
                  <Visit
                    title="Access symbol on exchange"
                    href={`https://www.binance.com/trade.html?symbol=${match.baseAsset}_${match.quoteAsset}`}
                    target="_blank"
                  >
                    <i className="material-icons">launch</i>
                  </Visit>
                </td>
              </tr>
          )}
        </tbody>
      </Table>
    );
  }
}
