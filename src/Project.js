import React, { Component } from 'react';
import './Project.css';

var yaml = require('js-yaml');
var Markdown = require('react-markdown');


class Project extends Component {
  constructor(props) {
    super(props);
    props.row.push(this);

    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false,
      size: props.size,
    };
  }

  componentDidMount() {
    var elem = this;
    var req = new XMLHttpRequest();
    req.open('GET', './data/projects/'+this.props.name+'.yml');
    req.onload = function(e) {
      elem.setState({...yaml.safeLoad(req.responseText)});
    };
    req.send();
  }

  loadImage(){
    if(!this.state.image) return;

    var xhr = new XMLHttpRequest();
    var base = 'data/img/thumbs/';
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
      if(e.loaded > 64 && xhr.responseText.startsWith('<!')) {
        xhr.abort();
        error(null);
      } else {
        xhr.abort();
        element.setState({imageUrl:base+name+type[0]});
      }
    }

    xhr.open("GET",base+name+type,true);
    xhr.onprogress = found;
    xhr.onerror = error;
    xhr.send(null);
  }

  toggle() {
    for (let item of this.props.row)
      item.setState(prev => {
        prev.open = !prev.open;
        return prev;
      });
  }

  style() {
    return {
      "backgroundImage":"linear-gradient(rgba(0, 0, 0, 0.50),rgba(0, 0, 0, 0.75)),url("+this.state.imageUrl+")"
    };
  }

  classes() {
    var arr = ["Project", "Project-size-"+this.state.size];
    if(this.state.open)arr.push("Project-toggled");
    return arr.join(" ");
  }

  date() {
    if(!this.state.date) return null;

    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var date = new Date(this.state.date);
    return ((this.state.open ? date.getDate() + " " : "") + monthNames[date.getMonth()].toUpperCase() + " " + date.getFullYear());
  }

  content() {
    if(!this.state.desc && !this.state.short)
      return null;
    if(!this.state.open)
      return <Markdown className="Project-description" source={this.state.short} />;
    if(!this.state.content || this.state.content.length === 0)
      return <Markdown className="Project-description Project-description-full" source={this.state.desc} />;

    var contents = this.state.content.map(item => {
      if(item[0] === "screen") return <img className="Project-screenshot" src={"data/img/screens/"+item[1]} alt="Screenshot" />
      return null;
    });

    return (
      <div>
        <Markdown className="Project-description Project-description-half" source={this.state.desc} />
        <div className="Project-contents">{contents}</div>
      </div>
    );
  }

  render() {
    if(this.state.imageUrl === undefined) this.loadImage();
    return (
      <section className={this.classes()} id={this.props.name} style={this.style()} onClick={this.toggle}>
        <h2 className="Project-header">{this.state.name}</h2>
        <p className="Project-date">{this.date()}</p>
        {this.content()}
      </section>
    );
  }
}

export default Project;
