import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import config from '/imports/client/config';

import Exchanges from '/imports/both/fixtures/exchanges';

import formatDate from '../functions/formatDate';

// Styled components

const Table = Styled.table`
  width: 100%;
  background-color: #FFF;
  animation: ${config.animations.fadeIn};
  padding: 25px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  color: ${config.colors.text};

  th {
    text-align: left;
    font-size: 13px;
    font-weight: 600;
  }

  td {
    font-size: 13px;
    padding: 10px 0;

    &:last-child {
      padding: 0 0 0 15px;
    }
  }

  tr:not(:last-child) td {
    border-bottom: 1px solid ${config.colors.border};
  }

  th:first-child,
  th:last-child,
  td:first-child,
  td:last-child {
    text-align: right;
    width: 1%;
    white-space: nowrap;
  }

  th:first-child, td:first-child {
    padding-right: 15px;
  }
`

const Visit = Styled.a`
  i {
    color: ${config.colors.text};
    font-size: 17px;
    vertical-align: top;
  }
`

export default class TableResultsComponent extends Component {
  render() {
    const {
      matches,
      timeframe,
    } = this.props;

    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Base asset</th>
            <th>Quote asset</th>
            <th>Exchange</th>
            <th>From</th>
            <th>To</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {Lodash.map(

            matches,

            (match, key) =>
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{match.baseAsset}</td>
                <td>{match.quoteAsset}</td>
                <td>{Exchanges[match.exchange].name}</td>
                <td>{formatDate(match.start, timeframe)}</td>
                <td>{formatDate(match.end, timeframe)}</td>
                <td>
                  <Visit
                    title="Access this symbol on exchange"
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
