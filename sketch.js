let video;
let particles = [];
let fontSans, fontPixel;
let selectedWords = [];

// Word separation
let words = [];

function preload() {
  fontSans = loadFont('./OpenSans.ttf');
  fontPixel = loadFont('./Mister_Pixel_Regular.otf');
}

fetch('./Mission.txt')
  .then(response => response.text())
  .then((data) => {
    let words = data.split(" ");
    for (let w in words) {
      let word = words[w];
      word = word.replace(/(\r\n|\n|\r)/gm, ''); //remove line breaks
      word = word.replace(/[-_?!.,:;\(\)]/g, '');
      word = word.toLowerCase();
      if (word.length < 1) words.splice(w,1);
      else words[w] = word; //update
    }
    // console.log(data);
    console.log(words);
  })

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
      this.word = random(words); //assign a random word to the particle
    }
  
  // creation of a particle.
    createParticle() {
      stroke('black');
      
      push();
      translate(this.x-windowWidth/2,this.y-windowHeight/2);
      if (dist(mouseX, mouseY, this.x, this.y) < 50) {
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
      if (dist(mouseX, mouseY, this.x, this.y) < 50) {
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

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0,0);
  canvas.style('z-index','-1')
  
  for(let i = 0;i<width/25;i++){
    particles.push(new Particle());
  }
}

function draw() {
  if (selectedWords.join(' ').length > 300) {
    selectedWords = [];
  }

  blendMode(BLEND);
  background(255);

  //words
  push();
  fill('black');
  textFont(fontPixel);
  textSize(60);
  text(selectedWords.join(' '),-windowWidth/2+40,-windowHeight/2+40, windowWidth-80,windowHeight-80);
  pop();

  //ellipse
  push();
  stroke(0)
  fill('rgba(255,255,255)');
  ellipse(mouseX-windowWidth/2, mouseY-windowHeight/2, 100);
  pop();
  
  //particles
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    if (dist(mouseX, mouseY, particles[i].x, particles[i].y) < 50 && mouseIsPressed) {
      selectedWords.push(particles[i].word);
      particles.splice(i,1)
    }
    particles[i].moveParticle();
  }

}
