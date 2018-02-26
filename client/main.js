import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/client/Components/App.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
