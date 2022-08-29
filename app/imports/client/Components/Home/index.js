import React, { Component } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";

import config from "/imports/client/config";
import ScreenSimplified from "/imports/client/Components/ScreenSimplified";

import { Button } from "@material-ui/core";

// Styled components

const Home = Styled.section`
  padding: 30px ${config.padding.horizontal} 80px;
  background-color: ${config.colors.primary};
  // min-height: 70vh;
`;

const HeroText = Styled.div`
	margin: 3rem 2rem 5rem;
`;

const HeroTitle = Styled.h1`
	font-size: 3rem;
	color: ${config.colors.text};
	text-align: center;
	margin-bottom: 1.5rem;
`;

const HeroSubtitle = Styled.p`
	font-size: 1rem;
	color: ${config.colors.text};
	text-align: center;
	font-weight: normal;
`;

const Buttons = Styled.div`
	margin-top: 2.5rem;
	display: flex;
	justify-content: center;

	& > a:not(:last-child) {
		margin-right: 15px;
	}
`;

export default class HomeComponent extends Component {
  render() {
    return (
      <>
        <Home>
          <HeroText>
            <HeroTitle>
              Find Head and Shoulders in cryptocurrency charts
            </HeroTitle>
            <HeroSubtitle>
              Sign up and screen real-time price data for $
              {Meteor.settings.public.price}/mo
            </HeroSubtitle>
            <Buttons>
              <Link to="/signup">
                <Button variant="contained" color="secondary" size="large">
                  Sign up
                </Button>
              </Link>
              <Link to="/learn-more">
                <Button color="secondary" size="large">
                  Learn more
                </Button>
              </Link>
            </Buttons>
          </HeroText>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <ScreenSimplified />
          </div>
        </Home>

        <div style={{ height: 500 }} />
      </>
    );
  }
}
