import React from 'react';
import ReactDOM from 'react-dom';
import SpendingTracker from './SpendingTracker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SpendingTracker />, div);
  ReactDOM.unmountComponentAtNode(div);
});
