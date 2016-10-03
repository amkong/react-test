import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import List from './list';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={ App }/>
    <Route path="/list" component={ List }/>
  </Router>,
  document.getElementById('root')
);
