import p5 from 'p5';

let data = [];

function Spiral(p5) {
  let timeOffset = 0;
  let targetTimeOffset = 0;

  let memory = 7;
  let hw, hh, r;
  p5.setup = () => {
    p5.createCanvas(700, 410);
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
    curTime = timeOffset + curTime;
    p5.background(255);
    let n = memory * 24 * 2; // one cell for every half hour
    let startAngle = curTime;
    let px = r * p5.cos(startAngle);
    let py = r * p5.sin(startAngle);
    for (let i = 0; i < n; i++) {
      let p = 1 - i / n;
      let angle = p * memory * 2 * p5.PI;
      let x = r * p * p5.cos(startAngle + angle);
      let y = r * p * p5.sin(startAngle + angle);
      let datum = getDatum((curTime - ((1-p) * memory)));
      if (datum != null) {
        p5.fill(datum.color);
        p5.stroke(datum.color);
      } else {
        p5.fill(255);
        p5.stroke(255);
      }
      p5.strokeWeight(1);
      p5.triangle(hw + px, hh + py, hw + x, hh + y, hw, hh);
      p5.stroke(255);
      p5.strokeWeight(5);
      p5.line(hw + px, hh + py, hw + x, hh + y);
      px = x;
      py = y;
    }
    p5.fill(0);
    p5.text('current time: ' + curTime, 25, 25);
  };
};

let instance;
export default (containerName, newData) => {
  data = newData;
  if (!instance) {
    instance = new p5(Spiral, containerName);
  }
  return instance;
};
