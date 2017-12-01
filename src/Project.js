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

  toggle() {
    for (let item of this.state.row)
      item.setState(prev => {
        prev.open = !prev.open;
        return prev;
      });
  }

  urlExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status !== 404;
  }

  style() {
    var base = "data/img/";
    var name = this.state.image;
    var type = ".";
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
      <div className={this.classes()} id={this.state.id} style={this.style()} onClick={this.toggle}>
        <h2 className="Project-header">{this.state.name}</h2>
        <p className="Project-date">{this.date()}</p>
        <Markdown className="Project-description" source={this.text()} />
      </div>
    );
  }
}

export default Project;
