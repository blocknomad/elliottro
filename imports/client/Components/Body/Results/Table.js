import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import config from '/imports/client/config';

import Patterns from '/imports/both/fixtures/patterns';
import Exchanges from '/imports/both/fixtures/exchanges';


// Styled components

const Table = Styled.table`
  width: 100%;
  border-top: 1px solid ${config.colors.border};
  border-left: 1px solid ${config.colors.border};
  background-color: #FFF;
  box-shadow: 2px 2px 3px ${config.colors.border};
  animation: ${config.animations.fadeIn};
  padding: 0 15px;
  margin-bottom: 20px;

  th {
    text-align: left;
    font-size: 13px;
    font-weight: 600;
    padding: 15px 0;
    color: ${config.colors.text};
  }

  td {
    font-size: 13px;
    padding: 10px 0;
    color: ${config.colors.textLighter};

    &:last-child {
      padding: 0 0 0 15px;
    }
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

  tr:not(:last-child) td {
    border-bottom: 1px solid ${config.colors.border};
  }
`

const Visit = Styled.a`
  i {
    color: ${config.colors.icon};
    font-size: 17px;
    vertical-align: top;
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
            <th>Base asset</th>
            <th>Quote asset</th>
            <th>Exchange</th>
            <th>Starts at</th>
            <th>Ends at</th>
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
                <td>{new Date(match.start + 1000).toLocaleString()}</td>
                <td>{new Date(match.end + 1000).toLocaleString()}</td>
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
