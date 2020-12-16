let facemesh;
let video;
let facePred = [];
let handPred = [];
let areaPoints = [];
let particles = [];
let font;
let wordlist = ["f", "he", "described", "a", "simple", "app", "for", "posting", "and", "viewing", "photos", "as", "a", "user", "would", "on", "nstagram", "the", "system", "generated", "the", "code", "needed", "to", "build", "it", "his", "code", "was", "sometimes", "flawed", "ut", "typically", "if", "r", "inger", "made", "just", "a", "tweak", "or", "two", "it", "worked", "as", "he", "wanted", "ts", "not", "absolutely", "perfect", "he", "said", "ut", "it", "is", "very", "very", "close"];
let selectedWords = [];
let mouthX, mouthY;
let mouthDistance;

// particles
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
    constructor(){
      this.x = random(0,width);
      this.y = random(0,height);
      this.r = random(1,8);
      this.xSpeed = random(-1,1);
      this.ySpeed = random(-1,1.5);
      this.word = random(wordlist); //assign a random word to the particle
    }
  
  // creation of a particle.
    createParticle() {
      stroke('black');
      
      push();
      translate(this.x-windowWidth/2,this.y-windowHeight/2);
      if (dist(mouthX, mouthY, this.x, this.y) < 50) {
        fill('black');
        stroke('white');
        rotateX(frameCount * 0.05);
        rotateY(frameCount * 0.05);
        box(this.r*2);
      } else {
        box(this.r);
      }
      pop();

      push();
      translate(this.x-windowWidth/2,this.y-windowHeight/2);
      if (dist(mouthX, mouthY, this.x, this.y) < 50) {
        scale(-1, 1); //flip webcam
        textAlign(CENTER, CENTER);
        fill('black');
        textSize(14 + this.r/2);
        textFont(fontSans);
        text(this.word,0,12);
      }
      pop();
    }
  
  // setting the particle in motion.
    moveParticle() {
      if(this.x < 0 || this.x > width)
        this.xSpeed*=-1;
      if(this.y < 0 || this.y > height)
        this.ySpeed*=-1;
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
    }
  }

// mesh annotations
// source: https://github.com/tensorflow/tfjs-models/blob/master/facemesh/src/keypoints.ts
const mesh = {
  lipsUpperOuter: [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291],
  lipsLowerOuter: [146, 91, 181, 84, 17, 314, 405, 321, 375, 291],
  lipsUpperInner: [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308],
  lipsLowerInner: [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308],
};

function preload() {
  fontSans = loadFont('./OpenSans.ttf');
  fontMilli = loadFont('./Millimetre-Extrablack_web.otf');
  fontPixel = loadFont('./Mister_Pixel_Regular.otf');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0,0);
  canvas.style('z-index','-1')

  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);

  // face mesh
  //todo: if no face is detected on starting the model, ask user to refresh the page. facePred[0].faceInViewConfidence == 1
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    facePred = results;  
    if (facePred[0]) { //only works when face is detected
      mouthDistance = dist(
        facePred[0].mesh[13][0], facePred[0].mesh[13][1], facePred[0].mesh[13][2],
        facePred[0].mesh[14][0], facePred[0].mesh[14][1], facePred[0].mesh[14][2]
      );
    }
  });
  
  video.hide();
  
  for(let i = 0;i<width/10;i++){
    particles.push(new Particle());
  }
}

function modelReady() {
  console.log("Model ready!");
  
}

function draw() {
  scale(-1, 1); //flip webcam
  if (selectedWords.join(' ').length > 300) {
    selectedWords = [];
  }

  blendMode(BLEND);
  background(255);

    //words
    push();
    scale(-1, 1); //flip webcam again
    fill('black');
    textFont(fontPixel);
    textSize(60);
    text(selectedWords.join(' '),-windowWidth/2+40,-windowHeight/2+40, windowWidth-80,windowHeight-80);
    pop();

    //ellipse
    push();
    stroke(0)
    fill('rgba(255,255,255)');
    ellipse(mouthX-windowWidth/2, mouthY-windowHeight/2, 100);
    pop();

    //particles
    for(let i = 0;i<particles.length;i++) {
      particles[i].createParticle();
      if (dist(mouthX, mouthY, particles[i].x, particles[i].y) < 50 && mouthIsOpen()) {
        selectedWords.push(particles[i].word);
        particles.splice(i,1)
      }
      particles[i].moveParticle();
    }

        
    //lips
    drawBox('black','lipsUpperOuter', 'rgba(255,255,255, 0.05)');
    drawBox('black','lipsLowerOuter', 'rgba(255,255,255, 0.05)');
    drawBox('black','lipsUpperInner', 'rgba(255,255,255, 0.05)');
    drawBox('black','lipsLowerInner', 'rgba(255,255,255, 0.05)');
}

function drawBox(color = 'black', area, fillColor, size = 4) {
  for (let i = 0; i < facePred.length; i += 1) {
    const keypoints = facePred[i].scaledMesh;
    for (let j = 0; j < keypoints.length - 2; j++) {
      if (mesh[area].includes(j)) {
        const [x, y] = keypoints[j];
        mouthX = x;
        mouthY = y;
        stroke(color);
        fill(fillColor);
        push();
        translate(x-windowWidth/2,y-windowHeight/2);
        ellipse(0,0,size)
        pop();
      }
    }
  }
}

// calculate distance between points 13 and 14 (center of mouth)s
function mouthIsOpen() {
  if (mouthDistance > 5) {
    return true;
  } else {
    return false;
  }
}
  