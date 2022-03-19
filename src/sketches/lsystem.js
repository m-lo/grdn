export default function sketch(p) {
  // TURTLE STUFF:
  let x, y; // the current position of the turtle
  let currentangle = 0; // which way the turtle is pointing
  let step = 20; // how much the turtle moves with each 'F'
  let angle = 90; // how much the turtle turns with a '-' or '+'

  // LINDENMAYER STUFF (L-SYSTEMS)
  let thestring = 'A'; // "axiom" or start of the string
  let numloops = 5; // how many iterations to pre-compute
  let therules = []; // array for rules
  therules[0] = ['A', '-BF+AFA+FB-']; // first rule
  therules[1] = ['B', '+AF-BFB-FA+']; // second rule

  let whereinstring = 0; // where in the L-system are we?

  function lindenmayer(s) {
    let outputstring = ''; // start a blank output string

    // iterate through 'therules' looking for symbol matches:
    for (let i = 0; i < s.length; i++) {
      let ismatch = 0; // by default, no match
      for (let j = 0; j < therules.length; j++) {
        if (s[i] === therules[j][0]) {
          outputstring += therules[j][1]; // write substitution
          ismatch = 1; // we have a match, so don't copy over symbol
          break; // get outta this for() loop
        }
      }
      // if nothing matches, just copy the symbol over.
      if (ismatch === 0) outputstring += s[i];
    }

    return outputstring; // send out the modified string
  }

  // this is a custom function that draws turtle commands
  function drawIt(k) {

    if (k === 'F') { // draw forward
      // polar to cartesian based on step and currentangle:
      let x1 = x + step * p.cos(p.radians(currentangle));
      let y1 = y + step * p.sin(p.radians(currentangle));
      p.line(x, y, x1, y1); // connect the old and the new

      // update the turtle's position:
      x = x1;
      y = y1;
    } else if (k === '+') {
      currentangle += angle; // turn left
    } else if (k === '-') {
      currentangle -= angle; // turn right
    }

    // give me some random color values:
    let r = p.random(128, 255);
    let g = p.random(0, 192);
    let b = p.random(0, 50);
    let a = p.random(50, 100);

    // pick a gaussian (D&D) distribution for the radius:
    let radius = 0;
    radius += p.random(0, 15);
    radius += p.random(0, 15);
    radius += p.random(0, 15);
    radius = radius / 3;

    // draw the stuff:
    p.fill(r, g, b, a);
    p.ellipse(x, y, radius, radius);
  }

  p.setup = function () {
    p.createCanvas(400, 400);
    p.background(255);
    p.stroke(0, 0, 0, 255);

    x = 0;
    y = p.height - 1;

    for (let i = 0; i < numloops; i++) {
      thestring = lindenmayer(thestring);
    }
  }

  p.draw = function () {
    drawIt(thestring[whereinstring])

    whereinstring++
    if (whereinstring > thestring.length - 1) whereinstring = 0;
  }


}
