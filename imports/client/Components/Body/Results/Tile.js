import React, { Component } from 'react';
import Styled from 'styled-components';
//import CanvasJS from 'canvasjs';

import config from '/imports/client/config';

// Styled components

const Tile = Styled.div`
  padding: 0 14px;
  border-box: box-sizing;
  box-shadow: 0 0 0 rgba(0,0,0,.1);
  border-bottom: 1px solid #e2e2e4;
  width: 100%;
`

const Title = Styled.h3`
  color: ${config.colors.primary};
  font-size: 18px;
  margin-bottom: 14px;
`

export default class ResultTileComponent extends Component {
  componentDidMount() {
    const dataPoints = [
      { x: new Date('2018-02-12'), y: [0.00006900, 0.00007190, 0.00006102, 0.00006103] },
      { x: new Date('2018-02-13'), y: [0.00006109, 0.00006683, 0.00005951, 0.00006236] },
      { x: new Date('2018-02-14'), y: [0.00006239, 0.00006667, 0.00005876, 0.00006079] },
      { x: new Date('2018-02-15'), y: [0.00006079, 0.00006889, 0.00005909, 0.00006650] },
    ];

    const chart = new CanvasJS.Chart('chartContainer', {
    	animationEnabled: true,
    	theme: "light2",
      title: {
    		text: "BINANCE:EOSBTC",
        fontColor: config.colors.primary,
        fontSize: 18,
        margin: 24,
    	},
    	axisX: {
    		interval: 1,
    		valueFormatString: "DD"
    	},
    	axisY: {
    		includeZero: false,
    	},
    	toolTip: {
    		content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
    	},
    	data: [{
        color: config.colors.primary,
    		type: "candlestick",
    		dataPoints: dataPoints
    	}]
    });

    chart.render();
  }

  render() {
    return (
      <Tile>

        <div id="chartContainer" style={{width:'100%', height: 300}}/>
      </Tile>
    );
  }
}
