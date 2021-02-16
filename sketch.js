//todo
// reduce resolution OK
// zoom screen too 200%  OK
// reduce particle size OK
// change hand representation
// make video for ipad


let video;
let particles = [];
let fontSans, fontPixel;



let handX, handY;
let handDistance;

//resolution related
let s = 1.5;
let w = 640;
let h = 360;
let cube = w/50;

//handpose
let handpose;
let predictions = [];
let r = w/120;
let threshold = w/5;

// text
let maxwords = 150;

// https://editor.p5js.org/jeeyoonhyun/sketches/NW40RMjGO
let wordlist = ["a", "glimpse", "of", "america’s", "future", "climate", "change", "means", "trouble", "for", "power", "grids", "systems", "are", "designed", "to", "handle", "spikes", "in", "demand", "but", "the", "wild", "and", "unpredictable", "weather", "linked", "to", "global", "warming", "will", "very", "likely", "push", "grids", "beyond", "their", "limits", "huge", "winter", "storms", "have", "plunged", "large", "parts", "of", "the", "central", "and", "southern", "united", "states", "into", "an", "energy", "crisis", "this", "week", "as", "frigid", "blasts", "of", "arctic", "weather", "crippled", "electric", "grids", "and", "left", "millions", "of", "americans", "without", "power", "amid", "dangerously", "cold", "temperatures", "the", "grid", "failures", "were", "most", "severe", "in", "texas", "where", "more", "than", "four", "million", "people", "woke", "up", "tuesday", "morning", "facing", "power", "failures", "on", "tuesday", "gov", "greg", "abbott", "called", "for", "an", "emergency", "reform", "of", "the", "electric", "reliability", "council", "of", "texas", "saying", "the", "operator", "of", "the", "state’s", "power", "grid", "“has", "been", "anything", "but", "reliable", "over", "the", "past", "48", "hours”", "analysts", "have", "begun", "to", "identify", "a", "few", "key", "factors", "behind", "the", "grid", "failures", "in", "texas", "recordbreaking", "cold", "weather", "spurred", "residents", "to", "crank", "up", "their", "electric", "heaters", "and", "pushed", "demand", "for", "electricity", "beyond", "the", "worstcase", "scenarios", "that", "grid", "operators", "had", "planned", "for", "at", "the", "same", "time", "many", "of", "the", "state’s", "gasfired", "power", "plants", "were", "knocked", "offline", "amid", "icy", "conditions", "and", "some", "plants", "appeared", "to", "suffer", "fuel", "shortages", "as", "natural", "gas", "demand", "spiked", "nationwide", "many", "of", "texas’", "wind", "turbines", "also", "froze", "and", "stopped", "working", "although", "this", "was", "a", "smaller", "part", "of", "the", "problem", "the", "resulting", "electricity", "shortfalls", "forced", "grid", "operators", "in", "texas", "to", "impose", "rotating", "blackouts", "on", "homes", "and", "businesses", "starting", "monday", "to", "avert", "a", "broader", "collapse", "of", "the", "system", "separate", "regional", "grids", "in", "the", "southwest", "and", "midwest", "are", "also", "coming", "under", "serious", "strain", "this", "week", "the", "crisis", "highlighted", "a", "deeper", "warning", "for", "power", "systems", "throughout", "the", "country", "electric", "grids", "can", "be", "engineered", "to", "handle", "a", "wide", "range", "of", "severe", "conditions", "—", "as", "long", "as", "grid", "operators", "can", "reliably", "predict", "the", "dangers", "ahead", "but", "as", "climate", "change", "accelerates", "many", "electric", "grids", "will", "face", "novel", "and", "extreme", "weather", "events", "that", "go", "beyond", "the", "historical", "conditions", "those", "grids", "were", "designed", "for", "putting", "the", "systems", "at", "risk", "of", "catastrophic", "failure", "the", "climate", "connectionscientists", "explain", "how", "climate", "change", "may", "be", "contributing", "to", "frigid", "weather", "so", "far", "south", "building", "electric", "grids", "that", "are", "resilient", "in", "the", "face", "of", "increasingly", "wild", "and", "unpredictable", "weather", "will", "be", "an", "enormous", "challenge", "experts", "said", "in", "many", "cases", "it", "may", "prove", "expensive", "although", "as", "texas", "shows", "the", "costs", "of", "grid", "failure", "can", "be", "extremely", "costly", "too", "“it’s", "essentially", "a", "question", "of", "how", "much", "insurance", "you", "want", "to", "buy”", "said", "jesse", "jenkins", "an", "energy", "systems", "engineer", "at", "princeton", "university", "“what", "makes", "this", "problem", "even", "harder", "is", "that", "we’re", "now", "in", "a", "world", "where", "especially", "with", "climate", "change", "the", "past", "is", "no", "longer", "a", "good", "guide", "to", "the", "future", "we", "have", "to", "get", "much", "better", "at", "preparing", "for", "the", "unexpected”", "a", "grid", "pushed", "to", "the", "limit", "texas’s", "main", "electric", "grid", "which", "largely", "operates", "independently", "from", "the", "rest", "of", "the", "country", "is", "primarily", "designed", "to", "handle", "the", "state’s", "most", "predictable", "weather", "extremes", "soaring", "summer", "temperatures", "that", "spur", "millions", "of", "texans", "to", "turn", "up", "their", "airconditioners", "all", "at", "once", "while", "freezing", "weather", "is", "rarer", "grid", "operators", "in", "texas", "have", "long", "known", "that", "electricity", "demand", "can", "also", "spike", "in", "the", "winter", "particularly", "after", "severe", "cold", "snaps", "in", "2011", "and", "2018", "led", "millions", "of", "texans", "to", "turn", "up", "their", "electric", "heaters", "and", "strained", "the", "system", "but", "this", "week’s", "winter", "storms", "which", "buried", "the", "state", "in", "snow", "and", "ice", "and", "led", "to", "recordcold", "temperatures", "surpassed", "all", "expectations", "—", "and", "pushed", "the", "grid", "to", "its", "breaking", "point", "texas’", "grid", "operators", "had", "anticipated", "that", "in", "the", "worst", "case", "the", "state", "might", "need", "67", "gigawatts", "of", "electricity", "to", "handle", "a", "winter", "peak", "but", "by", "sunday", "evening", "power", "demand", "had", "surged", "past", "69", "gigawatts", "as", "temperatures", "dropped", "many", "homes", "were", "relying", "on", "older", "inefficient", "electric", "resistance", "heaters", "which", "consume", "more", "power", "the", "problems", "compounded", "from", "there", "as", "frigid", "weather", "knocked", "out", "of", "service", "power", "plants", "with", "more", "than", "30", "gigawatts", "of", "capacity", "by", "monday", "night", "the", "vast", "majority", "of", "those", "failures", "occurred", "at", "thermal", "plants", "like", "natural", "gas", "generators", "as", "plummeting", "temperatures", "paralyzed", "plant", "operations", "and", "soaring", "demand", "for", "natural", "gas", "nationwide", "appeared", "to", "leave", "some", "plants", "struggling", "to", "procure", "fuel", "a", "number", "of", "the", "state’s", "power", "plants", "were", "also", "offline", "for", "scheduled", "maintenance", "in", "preparation", "for", "the", "summer", "peak", "at", "times", "the", "state’s", "fleet", "of", "wind", "farms", "also", "lost", "up", "to", "5", "gigawatts", "of", "capacity", "as", "many", "turbines", "froze", "in", "the", "icy", "conditions", "and", "stopped", "working", "“no", "one’s", "model", "of", "the", "power", "system", "envisioned", "that", "all", "254", "texas", "counties", "would", "come", "under", "a", "winter", "storm", "warning", "at", "the", "same", "time”", "said", "joshua", "rhodes", "an", "expert", "on", "the", "state’s", "electric", "grid", "at", "the", "university", "of", "texas", "austin", "“it’s", "putting", "major", "strain", "on", "both", "the", "electricity", "grid", "and", "the", "gas", "grid", "that", "feeds", "both", "electricity", "and", "heat”", "building", "in", "more", "resilience", "in", "theory", "experts", "said", "there", "are", "technical", "solutions", "that", "can", "avert", "such", "problems", "but", "they", "can", "be", "costly", "to", "install", "and", "the", "difficulty", "is", "in", "anticipating", "exactly", "when", "and", "where", "such", "solutions", "will", "be", "needed", "wind", "turbines", "for", "instance", "can", "be", "equipped", "with", "heaters", "and", "other", "devices", "so", "that", "they", "can", "operate", "in", "icy", "conditions", "—", "as", "is", "often", "done", "in", "the", "upper", "midwest", "where", "cold", "weather", "is", "more", "frequent", "gas", "plants", "can", "be", "built", "to", "store", "oil", "onsite", "and", "burn", "the", "fuel", "if", "needed", "as", "is", "often", "done", "in", "the", "northeast", "where", "natural", "gas", "shortages", "are", "more", "common", "grid", "regulators", "can", "design", "markets", "that", "pay", "extra", "to", "keep", "a", "fleet", "of", "backup", "power", "plants", "in", "reserve", "in", "case", "of", "emergencies", "as", "is", "often", "done", "in", "the", "midatlantic", "but", "all", "of", "these", "solutions", "cost", "money", "and", "grid", "operators", "are", "often", "wary", "of", "forcing", "consumers", "to", "pay", "extra", "for", "safeguards", "if", "they", "don’t", "think", "they", "will", "be", "needed", "“building", "in", "resilience", "often", "comes", "at", "a", "cost", "and", "there’s", "a", "risk", "of", "both", "underpaying", "but", "also", "of", "overpaying”", "said", "daniel", "cohan", "an", "associate", "professor", "of", "civil", "and", "environmental", "engineering", "at", "rice", "university", "“it’s", "a", "difficult", "balancing", "act”", "in", "the", "months", "ahead", "as", "texas", "grid", "operators", "and", "policymakers", "study", "this", "week’s", "winter", "storm", "they", "may", "start", "to", "ask", "how", "and", "whether", "the", "grid", "might", "be", "bolstered", "to", "handle", "extremely", "cold", "temperatures", "is", "there", "aging", "infrastructure", "in", "dire", "need", "of", "repair", "would", "it", "make", "sense", "to", "build", "more", "connections", "between", "texas’", "power", "grid", "and", "other", "parts", "of", "the", "country", "to", "balance", "out", "electricity", "supplies", "—", "a", "move", "the", "state", "has", "long", "resisted", "should", "homeowners", "be", "encouraged", "to", "install", "costly", "backup", "battery", "storage", "units", "or", "more", "efficient", "heat", "pumps", "that", "use", "less", "electricity", "should", "the", "state’s", "electricity", "markets", "be", "tweaked", "to", "keep", "additional", "power", "plants", "in", "reserve", "one", "difficulty", "is", "that", "climate", "change", "is", "making", "it", "harder", "to", "prepare", "overall", "the", "state", "is", "getting", "warmer", "as", "global", "temperatures", "rise", "and", "coldweather", "extremes", "are", "on", "average", "becoming", "less", "common", "over", "time", "but", "some", "climate", "scientists", "have", "also", "suggested", "that", "global", "warming", "could", "paradoxically", "bring", "more", "winter", "storms", "like", "the", "one", "seen", "this", "week", "there", "is", "some", "research", "suggesting", "that", "arctic", "warming", "is", "weakening", "the", "jet", "stream", "the", "highlevel", "air", "current", "that", "circles", "the", "northern", "latitudes", "and", "usually", "holds", "back", "the", "frigid", "polar", "vortex", "this", "allows", "the", "cold", "air", "to", "escape", "to", "the", "south", "especially", "when", "a", "blast", "of", "additional", "warming", "strikes", "the", "stratosphere", "and", "deforms", "the", "vortex", "the", "result", "can", "be", "episodes", "of", "plunging", "temperatures", "even", "in", "places", "that", "rarely", "get", "nipped", "by", "frost", "but", "this", "remains", "an", "active", "area", "of", "debate", "among", "climate", "scientists", "with", "some", "experts", "less", "certain", "that", "polar", "vortex", "disruptions", "are", "becoming", "more", "frequent", "making", "it", "even", "trickier", "for", "grid", "planners", "to", "anticipate", "the", "dangers", "ahead", "all", "over", "the", "country", "electric", "utilities", "and", "grid", "operators", "are", "confronting", "similar", "questions", "as", "climate", "change", "threatens", "to", "intensify", "heat", "waves", "droughts", "floods", "water", "shortages", "and", "other", "calamities", "all", "of", "which", "could", "create", "new", "and", "unforeseen", "risks", "for", "the", "nation’s", "electricity", "systems", "dealing", "with", "those", "risks", "will", "carry", "a", "hefty", "price", "tag", "one", "recent", "study", "found", "that", "the", "southeast", "alone", "may", "need", "35", "percent", "more", "electric", "capacity", "by", "2050", "simply", "to", "deal", "with", "the", "known", "hazards", "of", "climate", "change", "and", "the", "task", "of", "building", "resilience", "is", "becoming", "increasingly", "urgent", "many", "policymakers", "are", "increasingly", "promoting", "electric", "cars", "and", "electric", "heating", "as", "a", "way", "of", "curbing", "greenhouse", "gas", "emissions", "but", "as", "more", "of", "the", "nation’s", "economy", "depends", "on", "reliable", "flows", "of", "electricity", "the", "cost", "of", "failures", "will", "become", "ever", "more", "dire", "“this", "is", "going", "to", "be", "a", "significant", "challenge”", "said", "emily", "grubert", "an", "expert", "in", "electricity", "systems", "at", "georgia", "tech", "“we", "need", "to", "decarbonize", "our", "power", "systems", "so", "that", "climate", "change", "doesn’t", "keep", "getting", "worse", "but", "we", "also", "need", "to", "adapt", "to", "changing", "conditions", "at", "the", "same", "time", "and", "the", "latter", "alone", "is", "going", "to", "be", "very", "costly", "we", "can", "already", "see", "that", "the", "systems", "we", "have", "today", "aren’t", "handling", "this", "very", "well”"]

let selectedWords = [];

// particles
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
    constructor(){
      this.x = random(0,w);
      this.y = random(0,h);
      this.r = random(1, cube);
      this.xSpeed = random(-1,1);
      this.ySpeed = random(-1,1.5);
      this.word = random(wordlist); //assign a random word to the particle
    }
  
  // creation of a particle.
    createParticle() {
      stroke('black');
      push();
      translate(-this.x+w/2,this.y-h/2);
      if (dist(handX, handY, this.x, this.y) < threshold) {
        fill('black');
        stroke('white');
        rotateX(frameCount * 0.05);
        rotateY(frameCount * 0.05);
        box(this.r*1.5);
      } else {
        box(this.r);
      }
      pop();

      push();
      translate(-this.x+w/2,this.y-h/2);
      if (dist(handX, handY, this.x, this.y) < threshold) {
        textAlign(CENTER, CENTER);
        fill('black');
        textSize(cube/4 + this.r/2);
        textFont(fontSans);
        text(this.word,0,12);
      }
      pop();
    }
  
  // setting the particle in motion.
    moveParticle() {
      if(this.x <= 0 || this.x >= w) {
        this.xSpeed*=-1;
      } 
      if(this.y <= 0 || this.y >= h) {
        this.ySpeed*=-1;
      }
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
    }
  }

// mesh annotations
// source: https://github.com/tensorflow/tfjs-models/blob/master/handpose/src/keypoints.ts
const mesh = {
  thumb: [1, 2, 3, 4],
  indexFinger: [5, 6, 7, 8],
  middleFinger: [9, 10, 11, 12],
  ringFinger: [13, 14, 15, 16],
  pinky: [17, 18, 19, 20],
  palmBase: [0]
};

function preload() {
  fontSans = loadFont('./OpenSans.ttf');
  fontPixel = loadFont('./Mister_Pixel_Regular.otf');
}

function setup() {
  frameRate(24);
  video = createCapture(VIDEO);
  video.size(w, h);
  handpose = ml5.handpose(video, modelReady);
  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
    if (predictions[0]) { //only works when hand is detected
      handDistance = dist(
          predictions[0].landmarks[4][0], predictions[0].landmarks[4][1], predictions[0].landmarks[4][2],
          predictions[0].landmarks[8][0], predictions[0].landmarks[8][1], predictions[0].landmarks[8][2]
      );
      handX = (predictions[0].boundingBox.bottomRight[0] + predictions[0].boundingBox.topLeft[0]) / 2;
      handY = (predictions[0].boundingBox.bottomRight[1] + predictions[0].boundingBox.topLeft[1]) / 2;
    }
  });

  // Hide the video element, and just show the canvas
  video.hide();


  canvas = createCanvas(w, h, WEBGL);
  canvas.position(0,0);
  canvas.style('z-index','-1')
  
  for(let i = 0;i<w/30;i++){
    particles.push(new Particle());
  }
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  // if (!handIsOpen) {
  //   console.log('hand is closed');
  // }
  //if word is too long, refresh
  if (selectedWords.join(' ').length > maxwords) {
    selectedWords = [];
  }

  blendMode(BLEND);
  background(255);

  //words
  push();
  fill('black');
  textFont(fontPixel);
  textSize(cube*2.4);
  text(selectedWords.join(' '),-w/2+w/32,-h/2+h/32, w-w/64,h-h/64);
  pop();

  // bounding box
  // push();
  // scale(-1, 1);
  // stroke(0)
  // noFill();
  // ellipse(handX-w/2, handY-h/2, 100);
  // if (predictions[0]) {
  //   rect(predictions[0].boundingBox.topLeft[0]-w/2,predictions[0].boundingBox.topLeft[1]-h/2,predictions[0].boundingBox.bottomRight[0]-predictions[0].boundingBox.topLeft[0], predictions[0].boundingBox.bottomRight[1]-predictions[0].boundingBox.topLeft[1]);
  // }
  // pop();

  //particle creation and deletion
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    if (dist(handX, handY, particles[i].x, particles[i].y) < 80 && !handIsOpen()) {
      selectedWords.push(particles[i].word);
      particles.splice(i,1)
    }
    try {
      particles[i].moveParticle();
    } catch {
      // console.log('moveParticle error');
    }
  }
  //  create new particles when there's few
  if (particles.length <10) {
      particles.push(new Particle());
  }

  // handpose
  push();
  translate(w/2, -h/2);
  scale(-1, 1); //flip webcam
  drawKeypoints();
  pop();
}
 
//draw handpose keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      push();
      stroke('rgb(150,150,150)');
      fill('rgb(220,220,220)');
      // if (j == 4 || j == 8) {
      //   fill('red');
      // }else {
      //   fill('black');
      // }
      rect(keypoint[0], keypoint[1], r, r);
      pop();
    }
  }
}

// calculate distance between points 13 and 14 (center of mouth)s
function handIsOpen() {
  if (handDistance > threshold) { // modify distance for testing
    return true;
  } else {
    return false;
  }
}
