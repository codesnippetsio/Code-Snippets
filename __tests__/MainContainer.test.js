import React from 'react';
import { render } from '@testing-library/react';
import MainContainer from '../client/src/containers/MainContainer/MainContainer.jsx';
import Sidebar from '../client/src/containers/Sidebar/Sidebar.jsx';

describe('Maincontainer', () => {
  it('should render the MainContainer component', () => {
    render(<MainContainer />);
  });
});