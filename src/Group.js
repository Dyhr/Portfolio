import React, { Component } from 'react';
import './Group.css';
import Project from './Project.js';

class Group extends Component {
  constructor(props) {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {open:false}
  }

  componentDidMount() {
    this.setState({items:this.items()});
  }

  toggle() {
    this.setState({open:!this.state.open});
  }

  items() {
    this.setState({open:true});
    return this.props.data.reduce((acc, val) => {
      if(val[0] === 'group') {
        this.setState({label:val[1]});
        this.setState({open:false});
        return acc;
      }

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
    })
  }

  text() {
    return
  }

  render() {
    return (
      <div className="Group clearfix">
      <GroupToggle label={this.state.label} open={this.state.open} click={this.toggle} />
      <GroupItems items={this.state.items} open={this.state.open} />
      </div>
    );
  }
}

function GroupToggle(props) {
  if(!props.label) return null;
  return (
    <div className="Group-toggle">
      <span onClick={props.click}>{props.open?"↓":"→"} <u>{props.label}</u> {props.open?"↓":"←"}</span>
    </div>
  );
}
function GroupItems(props) {
  if(!props.open) return null;
  return <div className="Group-items clearfix">{props.items}</div>
}

export default Group;
