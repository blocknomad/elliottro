import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';
import { withRouter } from 'react-router';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import Text from '/imports/client/Components/Reusable/Text';
import config from '/imports/client/config';

import Tabs from './Tabs';

import QuoteAssets from '/imports/both/fixtures/quoteAssets';
import Exchanges from '/imports/both/fixtures/exchanges';
import Timeframes from '/imports/both/fixtures/timeframes';

import {
  RadioButton,
  RadioButtonGroup
} from 'material-ui/RadioButton';

import {
  Checkbox,
  Slider,
  RaisedButton,
  IconMenu,
  MenuItem,
  IconButton,
  Paper,
} from 'material-ui';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SaveIcon from 'material-ui/svg-icons/av/playlist-add';
import AddAlertIcon from 'material-ui/svg-icons/alert/add-alert';

// Styled components

const Screen = Styled.section`
  padding: 30px ${config.padding.horizontal};
`;

const Header = Styled(Paper)`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${config.colors.primaryContrast};
  margin-bottom: 15px;

  & > * {
    flex-shrink: 0;
  }
`;

const ScreenIcon = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
  //background-color: ${config.colors.primary};
  background-color: #f8f8f8;

  i {
    //color: #FFF;
    color: ${config.colors.secondary};
    font-size: 30px;
  }
`;

const ScreenName = Styled.input`
  font-size: 22px;
  flex-grow: 100;
  padding: 8px;
  color: ${config.colors.text};
  border: 1px solid transparent;

  &:hover {
    border-color: #ddd;
  }

  &:focus {
    border-color: transparent;
    background-color: #f6f6f6;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
    font-weight: 300;
  }
`;

const ArrowIcon = Styled.i.attrs({
  className: 'material-icons',
})`
  color: #FFF;
  vertical-align: text-top !important;
`;

const Form = Styled.form`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${config.colors.primaryContrast};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
`;

const ColumnGroup = Styled.div`
  display: flex;
`;

const Column = Styled.div`
  width: 100%;

  &:not(:last-child) {
    padding-right: 30px;
  }
`;

const Buttons = Styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

const SliderContainer = Styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-top: 12px;
`;

class ScreenComponent extends Component {
  constructor(props) {
    super();

    const { search } = props.history.location;
    const params = new URLSearchParams(search);

    this.state = {
      screen: {
        name: params.get('name') && decodeURIComponent(params.get('name')) || undefined,
        timeframe: params.get('timeframe') || 'H1',
        exchanges: params.get('exchanges') && params.get('exchanges').split(',') || ['BINA'],
        quoteAssets: params.get('quoteAssets') && params.get('quoteAssets').split(',') || ['BTC', 'ETH', 'USD'],
        range: params.get('range') && Number(params.get('range')) || 50,
        chart: {
          type: params.get('chartType') || 'reversal',
          pattern: params.get('chartPattern') || 'HSB',
        },
        candlestick: undefined,
        indicators: [],
        price: {},
      },
    };
  }

  render() {
    const { screen } = this.state;

    const labelStyle = {
      fontSize: 13,
    };

    return (
      <Screen>
        <Header>
          <ScreenIcon>
            <i className="material-icons">show_chart</i>
          </ScreenIcon>

          <ScreenName
            placeholder="Unnamed screen"
            defaultValue={screen.name}
            innerRef={ref => this._name = ref}
          />

          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            style={{padding: '0 10px'}}
          >
            <MenuItem
              primaryText="Save screen"
              style={{fontSize: 14}}
              leftIcon={<SaveIcon />}
            />
            <MenuItem
              primaryText="Create alert"
              style={{fontSize: 14}}
              leftIcon={<AddAlertIcon />}
            />
          </IconMenu>

          <RaisedButton
            label="Run Screen"
            primary={true}
            onClick={this.handleSearch}
            style={{lineHeight: '24px'}}
            icon={<ArrowIcon>play_arrow</ArrowIcon>}
          />
        </Header>

        <Form>
          <ColumnGroup>
            <Column>
              <ColumnTitle>Timeframe</ColumnTitle>

              <RadioButtonGroup
                name="timeframe"
                defaultSelected={screen.timeframe}
                onChange={(t, v) => this.handleChange('timeframe', v)}
              >
                {Lodash.map(Timeframes, (timeframe, key) =>
                  <RadioButton
                    key={key}
                    value={key}
                    label={timeframe.name}
                    labelStyle={labelStyle}
                  />
                )}
              </RadioButtonGroup>
            </Column>

            <Column>
              <ColumnTitle>Exchanges</ColumnTitle>

              <div>
                {Lodash.map(Exchanges, (exchange, key) =>
                  <Checkbox
                    key={key}
                    label={exchange.name}
                    disabled={exchange.status === 1}
                    checked={Lodash.includes(screen.exchanges, key)}
                    onCheck={(t, checked) => this.handleChange('exchanges',
                      Lodash.uniq(
                        checked ?
                          Lodash.concat(screen.exchanges, key) :
                          Lodash.without(screen.exchanges, key)
                      )
                    )}
                    labelStyle={labelStyle}
                  />
                )}
              </div>
            </Column>

            <Column>
              <ColumnTitle>Quote assets</ColumnTitle>

              <div>
                {Lodash.map(QuoteAssets, (quoteAsset, key) =>
                  <Checkbox
                    key={key}
                    label={quoteAsset.name}
                    disabled={quoteAsset.status === 1}
                    checked={Lodash.includes(screen.quoteAssets, key)}
                    onCheck={(t, checked) => this.handleChange('quoteAssets',
                      Lodash.uniq(
                        checked ?
                          Lodash.concat(screen.quoteAssets, key) :
                          Lodash.without(screen.quoteAssets, key)
                      )
                    )}
                    labelStyle={labelStyle}
                  />
                )}
              </div>

              <ColumnTitle style={{marginTop: 36}}>
                Analysis range
              </ColumnTitle>

              <div>
                <Text>The algorithm will analyze the last <b>{screen.range}</b> candlesticks of each symbol.</Text>

                <SliderContainer>
                  <Text style={{marginRight: 10}}>30</Text>

                  <Slider
                    value={screen.range}
                    min={30}
                    max={100}
                    step={1}
                    onChange={(a, v) => this.handleChange('range', v)}
                    sliderStyle={{margin: 0}}
                    style={{flexGrow: 100}}
                  />

                  <Text style={{marginLeft: 10}}>100</Text>
                </SliderContainer>
              </div>
            </Column>
          </ColumnGroup>

          <Tabs
            screen={screen}
            handleChange={this.handleChange}
          />
        </Form>
      </Screen>
    );
  }

  handleChange = (name, value) => {
    this.setState({
      screen: {
        ...this.state.screen,
        [name]: value
      }
    });
  }

  handleSearch = () => {
    const { screen } = this.state;

    let query = '';

    query += `name=${encodeURIComponent(this._name.value)}`;
    query += `&timeframe=${screen.timeframe}`;
    query += `&exchanges=${screen.exchanges}`;
    query += `&quoteAssets=${screen.quoteAssets}`;
    query += `&range=${screen.range}`;

    if (Lodash.isEmpty(screen.chart) === false) {
      query += `&chartType=${screen.chart.type}&chartPattern=${screen.chart.pattern}`;
    }

    this.props.history.push(`/view/?${query}`);
  }
};

export default withRouter(ScreenComponent);
