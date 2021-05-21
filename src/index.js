import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.baseURL = 'https://protected-brushlands-08126.herokuapp.com/';

ReactDOM.render(
 
    <App />,
  document.getElementById('root')
);


