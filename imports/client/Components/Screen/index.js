import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Styled from 'styled-components';
import Lodash from 'lodash';
import { withRouter } from 'react-router';
import { Tracker } from 'meteor/tracker';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import Text from '/imports/client/Components/Reusable/Text';
import config from '/imports/client/config';

import Tabs from './Tabs';
import ChartPattern from './ChartPattern';

import QuoteAssets from '/imports/both/fixtures/quoteAssets';
import Exchanges from '/imports/both/fixtures/exchanges';
import Timeframes from '/imports/both/fixtures/timeframes';
import Screens from '/imports/both/collections/screens';

import {
  RadioButton,
  RadioButtonGroup
} from 'material-ui/RadioButton';

import {
  Checkbox,
  Slider,
  RaisedButton,
  IconButton,
  Paper,
  TextField,
} from 'material-ui';

// Styled components

const Screen = Styled.section`
`;

const Header = Styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${config.colors.primaryContrast};
  border-bottom: 1px solid #ddd;
  padding: ${config.padding.vertical} ${props => props.sidebar ? config.padding.horizontalMin : config.padding.horizontal};

  & > * {
    flex-shrink: 0;
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
  box-sizing: border-box;
  padding: ${config.padding.vertical} ${props => props.sidebar ? config.padding.horizontalMin : config.padding.horizontal};
  background-color: ${config.colors.primaryContrast};
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
  max-width: 300px;
  box-sizing: border-box;
  margin-top: 12px;
`;

const Row = Styled.div`
  width: 100%;
  display: flex;
  font-size: 13px;
  align-items: baseline;

  & > div:first-child {
    color: ${config.colors.textLighter};
    width: 30%;
  }

  & > div:last-child {
    color: ${config.colors.text};
    width: 70%;
  }

  &:not(:last-child) {
    margin-bottom: 50px;
  }
`;

class ScreenComponent extends Component {
  constructor(props) {
    super(props);

    const { search } = props.history.location;
    const params = new URLSearchParams(search);

    this.state = {
      screen: {
        name: params.get('name') && decodeURIComponent(params.get('name')) || null,
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
      saveDisabled: false,
      createAlertDisabled: false,
    };
  }

  componentDidMount() {
    this.fetchScreen(this.props);
  }

  componentWillReceiveProps(nextProps) {

    // fill form with screen when slug changes
    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.fetchScreen(nextProps);
    }

    // empty form when slug disappears
    if (
      Lodash.isEmpty(nextProps.match.params.slug) &&
      Lodash.isEmpty(this.props.match.params.slug) === false
    ) {
      this.setState({
        screen: {
          name: null,
          timeframe: 'H1',
          exchanges: ['BINA'],
          quoteAssets: ['BTC', 'ETH', 'USD'],
          range: 50,
          chart: {
            type: 'reversal',
            pattern: 'HSB',
          },
          candlestick: undefined,
          indicators: [],
          price: {},
        },
        saveDisabled: false,
        createAlertDisabled: false,
      });

      this._name.input.value = null;
    }
  }

  fetchScreen = props => {
    Tracker.autorun(c => {
      const { params } = props.match;

      if (params.slug) {
        const screen = Screens.findOne({ slug: params.slug });

        if (Lodash.isEmpty(screen) === false) {
          this._name.input.value = screen.name;
          this.setState({ screen, saveDisabled: true });

          // stop computation once form is filled with data
          c.stop();
        }
      }
    });
  }

  render() {
    const { screen } = this.state;

    const labelStyle = {
      fontSize: 13,
    };

    return (
      <Screen>
        <Header sidebar={this.props.sidebar}>
          <IconButton
            iconClassName="material-icons"
            tooltip="Create alert"
            style={{width: 40, height: 40, padding: 10, marginLeft: 20}}
            iconStyle={{width: 20, height: 20, fontSize: 20}}
            disabled={this.state.createAlertDisabled}
          >
            add_alarm
          </IconButton>

          <IconButton
            iconClassName="material-icons"
            tooltip="Save screen"
            style={{width: 40, height: 40, padding: 10, marginRight: 20}}
            iconStyle={{width: 20, height: 20, fontSize: 20}}
            disabled={this.state.saveDisabled}
            onClick={this.handleSave}
          >
            playlist_add
          </IconButton>

          <RaisedButton
            label="Run Screen"
            primary={true}
            onClick={this.handleRun}
            style={{lineHeight: '24px'}}
            icon={<ArrowIcon>play_arrow</ArrowIcon>}
          />
        </Header>

        <Form sidebar={this.props.sidebar}>
          <Row>
            <div>Screen name</div>
            <div>
              <TextField
                placeholder="Type a name..."
                defaultValue={screen.name}
                name="name"
                ref={ref => this._name = ref}
                onChange={e => this.handleChange('name', e.target.value)}
              />
            </div>
          </Row>

          <Row>
            <div>Timeframe</div>
            <div>
              <RadioButtonGroup
                name="timeframe"
                valueSelected={screen.timeframe}
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
            </div>
          </Row>

          <Row>
            <div>Exchanges</div>
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
          </Row>

          <Row>
            <div>Quote assets</div>
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
          </Row>

          <Row>
            <div>Analysis range</div>
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
          </Row>

          <Row>
            <div>Chart patterns</div>

            <div>
              <ChartPattern
                selected={screen.chart.pattern}
                handleChange={this.handleChange}
              />
            </div>
          </Row>
        </Form>
      </Screen>
    );
  }

  handleChange = (name, value) => {
    if (name) {
      this.setState({
        screen: {
          ...this.state.screen,
          [name]: value
        }
      });
    }

    this.setState({ saveDisabled: false });
  }

  handleRun = () => {
    const { screen } = this.state;

    let query = '';

    query += `name=${encodeURIComponent(this._name.input.value)}`;
    query += `&timeframe=${screen.timeframe}`;
    query += `&exchanges=${screen.exchanges}`;
    query += `&quoteAssets=${screen.quoteAssets}`;
    query += `&range=${screen.range}`;

    if (Lodash.isEmpty(screen.chart) === false) {
      query += `&chartType=${screen.chart.type}&chartPattern=${screen.chart.pattern}`;
    }

    this.props.history.push(`/view/?${query}`);
  }

  handleSave = () => {
    this.setState({ saveDisabled: true });

    const screen = {
      ...this.state.screen,
      name: this._name.input.value,
      slug: this.props.match.params.slug,
    };

    Meteor.call('screen/save', screen, (error, returnScreen) => {
      this.props.history.replace(`/screen/${returnScreen.slug}`);
      this.setState({ screen: returnScreen });

      if (Lodash.isEmpty(screen.name)) {
        this._name.value = returnScreen.name;
      }
    });
  }
};

export default withRouter(ScreenComponent);
