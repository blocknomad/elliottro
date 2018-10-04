import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import config from '/imports/client/config';

// Styled components

const Collapsible = Styled.div`
  border-top: 1px solid ${config.colors.border};
`;

const Toggle = Styled.div`
  display: flex;
  align-items: center;
  padding: 12px ${config.padding.horizontal};
  cursor: pointer;
`;

const Label = Styled.span`
  flex-grow: 100;
  font-size: 13px;
  color: ${config.colors.text};

`

const Icon = Styled.i`
  color: ${config.colors.primary};
  transition: .3s ease-in-out;
  ${props => props.toggled && 'transform: rotate(180deg);'}
`;

const Content = Styled.div`
  background-color: ${config.colors.secondary};
  overflow: hidden;
  transition: .3s ease-in-out;
  height: 0;
`;

const ContentInner = Styled.div`
  padding: 6px ${config.padding.horizontal};

  div {
    display: flex;
    align-items: center;
  }

  label {
    color: ${config.colors.text};
    font-size: 13px;
  }
`;

export default class CollapsibleComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false,
    };
  }

  componentDidMount() {
    this.props.toggled && this.handleToggle();

    Lodash.forEach(this.props.items, (item, key) => {
      if (item.status === 2) this.props.handleToggle(this.props.name, key)
    });
  }

  render() {
    const { toggled } = this.state;
    const { label, children, name, items, handleToggle } = this.props;

    return (
      <Collapsible>
        <Toggle onClick={this.handleToggle}>
          <Label>{label}</Label>
          <Icon className="material-icons" toggled={toggled}>expand_more</Icon>
        </Toggle>

        <Content toggled={toggled} innerRef={ref => this.content = ref}>
          <ContentInner>
            {Lodash.map(items, (item, key) =>
              <div key={key}>
                <input
                  type="checkbox"
                  name={name}
                  value={key}
                  id={key}
                  defaultChecked={item.status === 2}
                  disabled={item.status === 1}
                  onChange={() => handleToggle(name, key)}
                />
                &nbsp;<label htmlFor={key}>{item.name}</label>
              </div>
            )}
          </ContentInner>
        </Content>
      </Collapsible>
    );
  }

  handleToggle = () => {
    this.content.style.height = this.state.toggled === false ?
      `${this.content.scrollHeight}px` : 0;

    this.setState({ toggled: !this.state.toggled });
  }
};
