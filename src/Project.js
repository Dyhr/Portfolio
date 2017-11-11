import React, { Component } from 'react';
import './Project.css';

var YAML = require('yamljs');
var Markdown = require('react-markdown');


class Project extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {...YAML.load('data/projects/'+props.name+'.yml'), open: false};
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
        <Markdown className="Project-description" source={this.state.open ? this.state.desc : this.state.short} />
      </div>
    );
  }
}

export default Project
