// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import Spinner from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <Spinner />
    </div>
  , div);
});
