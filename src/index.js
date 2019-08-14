import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Edit from './components/Edit'
import Create from './components/create'
import Show from './components/show'


ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/create' component={Create} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/show/:id' component={Show} />
    </div>
  </Router>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
