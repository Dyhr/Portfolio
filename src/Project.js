import React, { Component } from 'react';
import './Project.css';

var YAML = require('yamljs');
var Markdown = require('react-markdown');


class Project extends Component {
  constructor(props) {
    super(props);

    var data = YAML.load('data/projects/'+props.name+'.yml');

    props.row.push(this);

    this.toggle = this.toggle.bind(this);
    this.state = {
      ...data,
      open: false,
      row: props.row,
      id: props.name,
      size: props.size,
    };
  }

  componentDidMount() {
    var xhr = new XMLHttpRequest();
    var base = 'data/img/';
    var name = this.state.image;
    var type = ['.gif'];
    var element = this;

    var error = function(e) {
      if(type[0] === '.gif') {
        type[0] = '.jpg';
      } else if(type[0] === '.jpg') {
        type[0] = '.png';
      } else return;
      xhr.open("GET",base+name+type[0],true);
      xhr.send(null);
    }
    var found = function(e) {
      if(xhr.responseText.startsWith('<!doctype html>')) {
        error(null);
      } else {
        element.setState({imageUrl:base+name+type[0]});
        xhr.abort();
      }
    }

    xhr.open("GET",base+name+type,true);
    xhr.onload = found;
    xhr.onerror = error;
    xhr.send(null);
  }

  toggle() {
    for (let item of this.state.row)
      item.setState(prev => {
        prev.open = !prev.open;
        return prev;
      });
  }

  style() {
    return {
      "backgroundImage":"linear-gradient(rgba(0, 0, 0, 0.55),rgba(0, 0, 0, 0.55)),url("+this.state.imageUrl+")"
    };
  }

  text() {
    return this.state.open ? this.state.desc : this.state.short;
  }
  classes() {
    var arr = ["Project", "Project-size-"+this.state.size];
    if(this.state.open)arr.push("Project-toggled");
    return arr.join(" ");
  }

  date() {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var date = new Date(this.state.date);
    return ((this.state.open ? date.getDate() + " " : "") + monthNames[date.getMonth()].toUpperCase() + " " + date.getFullYear());
  }

  render() {
    return (
      <section className={this.classes()} id={this.state.id} style={this.style()} onClick={this.toggle}>
        <h2 className="Project-header">{this.state.name}</h2>
        <p className="Project-date">{this.date()}</p>
        <Markdown className="Project-description" source={this.text()} />
      </section>
    );
  }
}

export default Project;
