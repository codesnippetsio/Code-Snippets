import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ErrorPage from './Error-Page.jsx';
import './src/scss/App.scss';
import Login from './Login.jsx';
import Sidebar from './src/containers/Sidebar/Sidebar.jsx';
import SnippetDisplay from './src/components/SnippetDisplay/SnippetDisplay.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
    children: [
      {
        path: 'Snippet/:id',
        element: <SnippetDisplay />,
      }
    ]
	},
	{
		path: '/login',
		element: <Login />,
		errorElement: <ErrorPage />,
	},
]);

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
