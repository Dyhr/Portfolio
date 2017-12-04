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
      <div className="App clearfix">
        <header className="App-header">
          <h1 className="App-title">Rasmus Dyhr Larsen</h1>
        </header>
        {this.data.games.reduce((acc, val) => {
          acc.arr.push({
            name: val[1],
            size: val[0],
            row: acc.row,
          });

          acc.c += 1;
          var max = 0;
          switch(val[0]) {
            case "quater": max = 4;
              break;
            case "third": max = 3;
              break;
            case "half": max = 2;
              break;
            default: max = 1;
              break;
          }
          if(acc.c >= max){
            acc.row=[];
            acc.c = 0;
          }

          return acc;
        }, {arr:[],row:[],c:0}).arr.map(item => {
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
