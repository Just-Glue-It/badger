import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as SpiralActions from '../../actions/SpiralActions';
import p5 from 'p5';


let data = [];

function P5Spiral(p5) {
  let timeOffset= 0;
  let targetTimeOffset = 0;

  let memory = 7;
  let hw, hh, r;
  p5.setup = () => {
    const dim = p5.min(p5.windowWidth, p5.windowHeight);
    p5.createCanvas(dim, dim);
    p5.randomSeed(0);
    hw = p5.width / 2;
    hh = p5.height / 2;
    r = p5.min(hw, hh);
  };

  let getDatum = (time) => {
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].time / 1000 <= time) {
        return data[i];
      }
    }
    return null;
  };

  p5.draw = () => {
    let speed = 1/1.0;
    let curTime = speed * (new Date().getTime() / 1000);
    // timeOffset += (-(memory * p5.mouseY) / p5.height - timeOffset) * 0.1;
    //curTime = timeOffset + curTime;
    p5.background(255);
    let n = memory * 24; // one cell for every half hour
    let startAngle = curTime;
    let px = r * p5.cos(startAngle);
    let py = r * p5.sin(startAngle);
    for (let i = 0; i < n; i++) {
      let p = 1 - i / n;
      let angle = p * memory * 2 * p5.PI;
      let x = r * p * p5.cos(startAngle + angle);
      let y = r * p * p5.sin(startAngle + angle);
      let datum = getDatum((curTime - ((1-p) * memory)));
      p5.noStroke();
      if (datum != null) {
        p5.fill(datum.color[0], datum.color[1], datum.color[2]);
        //p5.stroke(datum.color[0], datum.color[1], datum.color[2]);
      } else {
        p5.fill(255);
        //p5.stroke(255);
      }
      p5.strokeWeight(1);
      p5.triangle(hw + px, hh + py, hw + x, hh + y, hw, hh);
      p5.stroke(255);
      p5.strokeWeight(5);
      p5.line(hw + px, hh + py, hw + x, hh + y);
      px = x;
      py = y;
    }
  };
};

let instance = null;

export default class Spiral extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }
  
  componentDidMount() {
    console.log('didmount');
    if (!this.state) {
      this.state = new p5(P5Spiral, 'spiral_container');
    }
  }
  
  render() {
    data = this.props.data;
    return (<div id="spiral_container"></div>);
  }
}
