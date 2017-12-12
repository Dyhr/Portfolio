import React, { Component } from 'react';
import './App.css';
import Group from './Group.js';

class App extends Component {
  constructor(props) {
    super(props);

    var YAML = require('yamljs');
    this.data = YAML.load('data/projects.yml');
  }

  makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  groups() {
    return (
      <main>
      {this.data.projects.reduce((acc,val) => {
        if(val[0] === 'group') acc.push([]);
        acc[acc.length-1].push(val);
        return acc;
      }, [[]]).map(item =>
        <Group data={item} key={this.makeid(8)} />
      )}
      </main>
    );
  }

  render() {
    return (
      <div className="App clearfix">
        <header className="App-header">
          <h1 className="App-title">Rasmus Dyhr Larsen</h1>
        </header>
        {this.groups()}
        <footer className="App-footer">
          <p>Copyright {(new Date()).getFullYear()} © Rasmus Dyhr Larsen</p>
        </footer>
      </div>
    );
  }
}

export default App;
