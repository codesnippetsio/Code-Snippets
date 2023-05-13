import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'
import './src/scss/global.scss';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App />);