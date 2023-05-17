import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import App from '../client/App.jsx';

describe('Unit testing React components', () => {
  beforeAll(() => {
    app = render(<App />);
  });

  test('Renders', () => {
    expect(app.getByText('Code Snippets')).toBeTruthy();
    expect(app.getByRole('button', { name: 'Logout' })).toBeTruthy();
  });
});
