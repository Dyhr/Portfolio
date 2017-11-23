import React, { Component } from 'react';
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
          <h1 className="App-title">Rasmus Dyhr Larsen</h1>
        </header>
        {this.data.games.map(item => <Project key={item} name={item} />)}
        <footer>
          <p>Copyright {(new Date()).getFullYear()} © Rasmus Dyhr Larsen</p>
        </footer>
      </div>
    );
  }
}

export default App;
