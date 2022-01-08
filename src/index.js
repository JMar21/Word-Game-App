import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './navbar'
ReactDOM.render(
  <React.StrictMode>
	<NavBar />
	<App />
  </React.StrictMode>,
  document.getElementById('root')
);

