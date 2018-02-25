import React, { Component } from 'react';
import Styled from 'styled-components';
//import CanvasJS from 'canvasjs';

import config from '/imports/ui/config';

// Styled components

const Tile = Styled.div`
  padding: 14px;
  border-box: box-sizing;
  background-color: ${config.colors.secondary};
  box-shadow: 0 0 0 rgba(0,0,0,.1);
  border-bottom: 1px solid #e2e2e4;
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
    		type: "candlestick",
    		yValueFormatString: "$##0.00",
    		dataPoints: dataPoints
    	}]
    });

    chart.render();
  }

  render() {
    return (
      <Tile>
        <Title>{this.props.title}</Title>

        <div id="chartContainer" style={{width:300, height: 300}}/>
      </Tile>
    );
  }
}
