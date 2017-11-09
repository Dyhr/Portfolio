import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Project from './Project.js';

class App extends Component {
  constructor(props) {
    super(props);

    var YAML = require('yamljs');
    this.data = YAML.load('data/projects.yml');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.data.games.map(item => <Project name={item} />)}
      </div>
    );
  }
}

export default App;
