import React, { Component } from 'react';
import './Project.css';

var YAML = require('yamljs');
var Markdown = require('react-markdown');


class Project extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {...YAML.load('data/projects/'+props.name+'.yml'), open: false, id: props.name};
  }

  toggle() {
    document.getElementById(this.state.id).scrollIntoView();
    this.setState(prev => ({
      open: !prev.open
    }));
  }

  urlExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status !== 404;
  }

  style() {
    var base = "data/img/"
    var name = this.state.image;
    var type = "."
    if(this.urlExists(base+name+".gif"))
      type = ".gif";
    else if(this.urlExists(base+name+".jpg"))
      type = ".jpg";
    else if(this.urlExists(base+name+".png"))
      type = ".png";
    return {
      "backgroundImage":"linear-gradient(rgba(0, 0, 0, 0.55),rgba(0, 0, 0, 0.55)),url("+base+name+type+")"
    };
  }

  render() {
    // <img className="Project-img" alt="" src={this.image()} />
    return (
      <div className={"Project"+(this.state.open?" Project-toggled":"")} id={this.state.id} style={this.style()} onClick={this.toggle}>
        <h2 className="Project-header">{this.state.name}</h2>
        <Markdown className="Project-description" source={this.state.open ? this.state.desc : this.state.short} />
      </div>
    );
  }
}

export default Project
