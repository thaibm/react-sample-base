import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </Provider>,
  );

  expect(getByText(/Counter/i)).toBeTruthy();
});
