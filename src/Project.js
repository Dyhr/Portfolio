import React, { Component } from 'react';
import './Project.css';


class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prev => ({
      open: !prev.open
    }));
  }

  render() {
    return (
      <div className={"Project"+(this.state.open?" Project-toggled":"")} onClick={this.toggle}>
        <h2 className="Project-header">Game Title</h2>
        <p className="Project-description">Game description is very good.</p>
      </div>
    );
  }
}

export default Project
