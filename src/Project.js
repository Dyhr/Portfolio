import React, { Component } from 'react';
import './Project.css';


class Project extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    var YAML = require('yamljs');
    this.state = YAML.load('data/projects/'+props.name+'.yml');
    this.state.open = false;
  }

  toggle() {
    this.setState(prev => ({
      open: !prev.open
    }));
  }

  render() {
    return (
      <div className={"Project"+(this.state.open?" Project-toggled":"")} onClick={this.toggle}>
        <h2 className="Project-header">{this.state.name}</h2>
        <p className="Project-description">{this.state.open ? this.state.desc : this.state.short}</p>
      </div>
    );
  }
}

export default Project
