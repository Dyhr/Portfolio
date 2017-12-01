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
          var type = "undefined";
          if(typeof(val)==='string') {
            acc.arr.push({name: val, row: acc.row});
          } else {
            type = val[1];
            acc.arr.push({
              name: val[0],
              size: val[1],
              row: acc.row,
            });
          }

          acc.c += 1;
          var max = 0;
          switch(type) {
            case "small": max = 4;
              break;
            case "medium": max = 2;
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
