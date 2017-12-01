import React, { Component } from 'react';
import './App.css';
import Project, { Row } from './Project.js';

class App extends Component {
  constructor(props) {
    super(props);

    var YAML = require('yamljs');
    this.data = YAML.load('data/projects.yml');
  }

  render() {
    return (
      <div className="App clearfix">
        <header className="App-header">
          <h1 className="App-title">Rasmus Dyhr Larsen</h1>
        </header>
        {this.data.games.reduce((acc, val) => {
          if(typeof(val)==='string') {
            acc.row = [];
            acc.arr.push({name: val, row: acc.row});
            acc.row = [];
          } else {
            acc.arr.push({
              name: val[0],
              size: val[1],
              row: acc.row,
            });
          }
          return acc;
        }, {arr:[],row:[]}).arr.map(item => {
          return <Project key={item.name} name={item.name} size={item.size} row={item.row} />;
        })}
        <footer className="App-footer">
          <p>Copyright {(new Date()).getFullYear()} © Rasmus Dyhr Larsen</p>
        </footer>
      </div>
    );
  }
}

export default App;
