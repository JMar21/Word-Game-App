import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import About from './About';
ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
     <Routes>
	 <Route path="/" element={<><NavBar /><App/></>}/>
	 <Route path="/about" element={<><NavBar /><About /></>}/>
	 </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

