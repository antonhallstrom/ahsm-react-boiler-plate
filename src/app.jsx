import React, { Component } from 'react';
import '../styles/main.scss';

import { BrowserRouter as Router, browserHistory, Route, Redirect, Switch, Link } from 'react-router-dom';



export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>App</h1>
      </div>
    );
  }
}
