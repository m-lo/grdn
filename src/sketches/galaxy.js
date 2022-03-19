
export default function sketch(p) {
  let rings = [];
  p.setup = function() {
      p.createCanvas(400, 400, p.WEBGL);
      p.camera(-p.width / 2, -p.height/2, 160, 0, 0, 0, 0, 1, 0);
      p.strokeWeight(1.5);

      let innerRad = 1, outerRad = 9, increment = 1
      for (let ringIndex = 0; ringIndex < 64; ringIndex++) {
        p.append(rings, [])
        let curr = rings[rings.length - 1]
        for (let starIndex = 0; starIndex < 3200; starIndex++) {
          let a = p.random(0, 1) * p.TWO_PI;
          let r = p.sqrt(p.random(p.sq(innerRad), p.sq(outerRad)));
          p.append(curr, p.createVector(r * p.cos(a), r * p.sin(a), p.random(-increment, increment)))
        }
        innerRad += increment;
        outerRad += increment * 1.5;
        increment += 1;
      }
  }

  function drawRing(index) {
    let curr = rings[index];
    p.beginShape(p.POINTS);
    for (let starIndex = 0; starIndex < curr.length; starIndex++) {
      p.vertex(curr[starIndex].x, curr[starIndex].y, curr[starIndex].z)
    }
    p.endShape();
  }

  p.draw = function() {
    p.background(0);

    for (let ringIndex = 0; ringIndex < 64; ringIndex++) {
      p.push();
      let c = p.lerpColor(p.color(232, 232, 232), p.color(80, 80, 80), ringIndex/64);
      p.stroke(p.red(c), p.green(c), p.blue(c), 0);
      p.rotateY(p.TWO_PI/ (ringIndex ** 2 + 1) * (p.frameCount))
      p.rotateX(1.45);
      drawRing(ringIndex)
      p.pop()
    }
  }
}
