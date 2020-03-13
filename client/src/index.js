import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Router>
      <Route exact path="/" component={() => <Redirect to="/carousel" />}/>
      <App />
    </Router>,
    document.getElementById("root")
  );

registerServiceWorker();
