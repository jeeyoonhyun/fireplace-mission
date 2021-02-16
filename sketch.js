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
let r = w/60;
let threshold = w/5;

// text
let maxwords = 150;
let wordlist = ["after", "months", "of", "stalemate", "congressional", "leaders", "were", "on", "the", "verge", "on", "wednesday", "of", "cementing", "a", "roughly", "$900", "billion", "stimulus", "deal", "to", "deliver", "emergency", "aid", "to", "individuals", "and", "companies", "devastated", "by", "the", "toll", "of", "the", "worsening", "pandemic", "racing", "to", "finish", "the", "details", "and", "stave", "off", "a", "government", "shutdown", "on", "friday", "the", "measure", "which", "has", "been", "under", "discussion", "for", "months", "as", "the", "coronavirus", "has", "ravaged", "the", "economy", "is", "expected", "provide", "a", "new", "round", "of", "direct", "payments", "to", "millions", "of", "americans", "as", "well", "as", "additional", "unemployment", "benefits", "food", "assistance", "and", "rental", "aid", "it", "would", "prop", "up", "sputtering", "businesses", "with", "federally", "backed", "loans", "and", "provide", "funding", "for", "schools", "hospitals", "and", "the", "distribution", "of", "a", "justapproved", "vaccine", "while", "the", "agreement", "was", "not", "yet", "final", "republicans", "and", "democrats", "alike", "signaled", "that", "they", "were", "ready", "to", "coalesce", "around", "the", "main", "elements", "marking", "an", "extraordinary", "shift", "from", "just", "weeks", "ago", "when", "both", "sides", "were", "issuing", "ultimatums", "and", "refusing", "to", "budge", "from", "longheld", "positions", "the", "momentum", "indicated", "that", "relief", "could", "soon", "be", "on", "its", "way", "for", "individuals", "and", "businesses", "who", "have", "waited", "for", "months", "as", "economists", "have", "clamored", "for", "another", "robust", "infusion", "of", "federal", "aid", "warning", "that", "congress’s", "failure", "to", "act", "could", "do", "longlasting", "damage", "“we’re", "making", "good", "progress”", "said", "senator", "chuck", "schumer", "of", "new", "york", "the", "democratic", "leader", "in", "a", "brief", "interview", "on", "wednesday", "afternoon", "as", "staff", "exchanged", "offers", "and", "counteroffers", "“no", "one", "gets", "everything", "they", "want", "but", "we’re", "feeling", "pretty", "good”", "but", "even", "as", "lawmakers", "moved", "toward", "striking", "an", "elusive", "deal", "the", "package", "pointed", "to", "troubles", "on", "the", "horizon", "for", "presidentelect", "joseph", "r", "biden", "jr", "who", "had", "pressed", "for", "at", "least", "some", "compromise", "on", "emergency", "pandemic", "aid", "before", "year’s", "end", "to", "break", "the", "logjam", "democrats", "appeared", "to", "have", "dropped", "their", "demand", "for", "a", "dedicated", "funding", "stream", "for", "states", "and", "cities", "that", "are", "facing", "fiscal", "ruin", "guaranteeing", "that", "mr", "biden", "will", "have", "to", "act", "early", "in", "his", "tenure", "to", "try", "to", "bolster", "them", "and", "take", "additional", "action", "to", "prop", "up", "the", "economy", "“the", "stimulus", "package", "is", "encouraging”", "mr", "biden", "said", "wednesday", "at", "an", "event", "in", "wilmington", "del", "“but", "it’s", "a", "down", "payment", "—", "an", "important", "down", "payment", "on", "what’s", "going", "to", "have", "to", "be", "done", "beginning", "the", "end", "of", "january", "into", "february", "but", "it’s", "very", "important", "to", "get", "done”", "for", "months", "democrats", "and", "republicans", "had", "been", "unwilling", "to", "compromise", "amid", "a", "toxic", "presidential", "election", "democrats", "who", "initially", "pushed", "a", "$34", "trillion", "plan", "held", "out", "for", "a", "much", "broader", "package", "than", "republicans", "were", "willing", "to", "consider", "in", "the", "runup", "to", "the", "november", "election", "judging", "that", "president", "trump", "and", "his", "party", "would", "pay", "a", "political", "price", "for", "failing", "to", "agree", "to", "a", "generous", "new", "batch", "of", "aid", "republicans", "for", "their", "part", "were", "wary", "of", "any", "new", "federal", "spending", "and", "insisted", "on", "a", "much", "narrower", "plan", "that", "would", "extend", "sweeping", "coronavirus", "liability", "protections", "they", "appeared", "to", "have", "put", "that", "demand", "aside", "in", "recent", "days", "in", "exchange", "for", "democrats", "backing", "off", "their", "insistence", "on", "a", "large", "new", "infusion", "of", "state", "and", "local", "assistance", "two", "officials", "familiar", "with", "the", "talks", "said", "there", "were", "other", "avenues", "to", "potentially", "provide", "the", "aid", "how", "to", "handle", "bad", "coworkers", "of", "the", "antimask", "and", "boyfriend", "varieties", "but", "the", "political", "calculus", "changed", "after", "the", "election", "mr", "biden", "and", "his", "advisers", "began", "quietly", "pressing", "for", "democrats", "to", "strike", "a", "deal", "—", "even", "a", "scaleddown", "one", "—", "and", "senator", "mitch", "mcconnell", "republican", "of", "kentucky", "and", "the", "majority", "leader", "had", "powerful", "reasons", "of", "his", "own", "to", "compromise", "on", "wednesday", "he", "suggested", "on", "a", "private", "call", "with", "republicans", "that", "delivering", "the", "stimulus", "package", "could", "bolster", "the", "party’s", "hopes", "of", "hanging", "onto", "its", "majority", "in", "the", "senate", "according", "to", "three", "people", "who", "relayed", "his", "comments", "on", "the", "condition", "of", "anonymity", "mr", "mcconnell", "said", "that", "senators", "kelly", "loeffler", "and", "david", "perdue", "who", "are", "both", "facing", "runoffs", "in", "january", "that", "will", "determine", "which", "party", "controls", "the", "senate", "were", "“getting", "hammered”", "for", "congress’s", "failure", "to", "deliver", "more", "pandemic", "aid", "to", "struggling", "americans", "—", "particularly", "the", "direct", "payments", "—", "and", "that", "enacting", "the", "measure", "could", "help", "them", "the", "majority", "leader", "also", "emphasized", "that", "the", "package", "could", "be", "signed", "by", "mr", "trump", "who", "has", "pushed", "for", "another", "round", "of", "stimulus", "checks", "even", "as", "enthusiasm", "built", "that", "the", "longstalled", "stimulus", "talks", "were", "finally", "bearing", "fruit", "it", "was", "clear", "that", "the", "potential", "agreement", "was", "far", "smaller", "than", "what", "economists", "say", "is", "needed", "the", "plan", "under", "discussion", "amounts", "to", "less", "than", "half", "of", "the", "$22", "trillion", "stimulus", "law", "enacted", "in", "march", "and", "it", "does", "not", "come", "close", "to", "matching", "what", "many", "economists", "had", "said", "would", "be", "necessary", "to", "jolt", "the", "economy", "out", "of", "a", "pandemicinduced", "slump", "they", "have", "warned", "for", "months", "about", "permanent", "economic", "damage", "and", "deteriorating", "prospects", "for", "a", "swift", "recovery", "offering", "a", "grim", "backdrop", "as", "lawmakers", "traded", "blame", "jerome", "h", "powell", "the", "chair", "of", "the", "federal", "reserve", "reiterated", "his", "call", "for", "more", "fiscal", "stimulus", "on", "wednesday", "saying", "that", "the", "continuing", "rise", "in", "covid19", "cases", "and", "the", "lapse", "in", "funding", "for", "several", "programs", "that", "were", "helping", "households", "and", "businesses", "stay", "afloat", "posed", "challenges", "for", "the", "economy", "“the", "case", "for", "fiscal", "policy", "right", "now", "is", "very", "very", "strong", "and", "i", "think", "that’s", "widely", "understood", "right", "now”", "he", "said", "“now", "that", "we", "can", "kind", "of", "see", "the", "light", "at", "the", "end", "of", "the", "tunnel", "it", "would", "be", "bad", "to", "see", "people", "losing", "their", "business", "their", "life’s", "work", "even", "generations’", "worth", "of", "work”", "even", "as", "negotiations", "continued", "there", "was", "evidence", "of", "economic", "harm", "the", "worsening", "pandemic", "was", "causing", "retail", "sales", "fell", "11", "percent", "in", "november", "the", "commerce", "department", "reported", "with", "restaurants", "and", "bars", "experiencing", "even", "bigger", "declines", "as", "states", "reimposed", "business", "restrictions", "other", "measures", "of", "economic", "activity", "have", "likewise", "slowed", "in", "recent", "weeks", "and", "applications", "for", "unemployment", "benefits", "have", "surged", "for", "the", "millions", "of", "americans", "already", "relying", "on", "jobless", "benefits", "the", "situation", "could", "be", "even", "more", "dire", "if", "two", "programs", "that", "expand", "and", "extend", "the", "unemployment", "insurance", "system", "expire", "after", "next", "week", "without", "congressional", "action", "republicans", "have", "continued", "to", "insist", "that", "a", "package", "should", "remain", "under", "$1", "trillion", "in", "order", "to", "maintain", "support", "within", "their", "ranks", "leaving", "lawmakers", "and", "staff", "to", "wrangle", "over", "funding", "levels", "for", "various", "provisions", "and", "programs", "in", "the", "new", "measure", "speaker", "nancy", "pelosi", "of", "california", "and", "mr", "schumer", "spoke", "with", "steven", "mnuchin", "the", "treasury", "secretary", "for", "about", "45", "minutes", "on", "wednesday", "as", "they", "worked", "to", "hammer", "out", "final", "details", "the", "measure", "which", "builds", "off", "a", "$748", "billion", "bill", "proposed", "by", "a", "bipartisan", "group", "of", "moderates", "this", "week", "is", "expected", "to", "include", "$25", "billion", "to", "establish", "a", "program", "that", "would", "provide", "emergency", "rental", "assistance", "to", "families", "affected", "by", "the", "pandemic", "as", "well", "as", "billions", "for", "vaccine", "development", "and", "distribution", "broadband", "and", "schools", "across", "the", "country", "negotiators", "were", "still", "discussing", "the", "possible", "inclusion", "of", "house", "legislation", "that", "provides", "funds", "to", "distribute", "to", "states", "and", "cities", "and", "to", "fully", "cover", "the", "costs", "of", "emergency", "work", "during", "the", "pandemic", "they", "were", "also", "still", "haggling", "over", "an", "expansion", "and", "extension", "of", "unemployment", "benefits", "and", "how", "long", "they", "would", "last", "the", "agreement", "is", "expected", "to", "revive", "lapsed", "enhanced", "unemployment", "benefits", "at", "about", "$300", "a", "week", "half", "of", "the", "original", "benefit", "approved", "in", "march", "which", "lapsed", "over", "the", "summer", "but", "republicans", "were", "insisting", "on", "curtailing", "the", "number", "of", "weeks", "of", "benefits", "to", "help", "offset", "the", "cost", "of", "providing", "stimulus", "payments", "in", "addition", "to", "the", "jobless", "aid", "the", "plan", "would", "provide", "a", "onetime", "direct", "payment", "to", "americans", "expected", "to", "be", "about", "$600", "per", "person", "also", "half", "the", "amount", "provided", "under", "the", "march", "stimulus", "law", "senator", "bernie", "sanders", "independent", "of", "vermont", "who", "has", "been", "vocal", "about", "his", "belief", "that", "democrats", "succumbed", "too", "easily", "to", "republican", "demands", "and", "senator", "joe", "manchin", "iii", "democrat", "of", "west", "virginia", "a", "leader", "of", "the", "bipartisan", "group", "got", "into", "a", "heated", "exchange", "on", "a", "private", "democratic", "caucus", "call", "over", "progressives’", "push", "to", "increase", "the", "amount", "of", "the", "direct", "payments", "according", "to", "three", "people", "familiar", "with", "the", "discussion", "“it", "will", "be", "a", "progressive", "holding", "their", "nose", "and", "voting", "for", "something", "because", "we", "don’t", "want", "to", "take", "away", "$600", "from", "american", "families", "before", "christmas", "and", "we", "don’t", "want", "to", "take", "unemployment", "benefits", "away", "from", "people”", "said", "representative", "ro", "khanna", "democrat", "of", "california", "the", "measure", "is", "likely", "to", "advance", "as", "part", "of", "a", "catchall", "spending", "package", "that", "will", "include", "the", "dozen", "annual", "bills", "needed", "to", "fund", "the", "government", "through", "the", "end", "of", "the", "fiscal", "year", "among", "the", "unresolved", "issues", "was", "whether", "to", "include", "a", "bipartisan", "bicameral", "agreement", "on", "legislation", "that", "would", "end", "the", "practice", "of", "surprise", "medical", "billing", "“i’m", "cautiously", "optimistic", "that", "maybe", "we", "will", "be", "able", "to", "finish", "up", "by", "the", "end", "of", "this", "week”", "said", "senator", "susan", "collins", "republican", "of", "maine", "and", "one", "of", "the", "key", "lawmakers", "involved", "in", "drafting", "the", "bipartisan", "proposal", "but", "mr", "mcconnell", "warned", "republicans", "in", "the", "private", "conference", "call", "to", "prepare", "to", "remain", "in", "washington", "through", "the", "weekend", "as", "lawmakers", "and", "aides", "finish", "the", "details", "and", "write", "legislative", "text"]
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
  if (!handIsOpen) {
    console.log('hand is closed');
  }
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

  //ellipse
  push();
  scale(-1, 1);
  stroke(0)
  noFill();
  // ellipse(handX-w/2, handY-h/2, 100);
  if (predictions[0]) {
    // rect(predictions[0].boundingBox.topLeft[0]-w/2,predictions[0].boundingBox.topLeft[1]-h/2,predictions[0].boundingBox.bottomRight[0]-predictions[0].boundingBox.topLeft[0], predictions[0].boundingBox.bottomRight[1]-predictions[0].boundingBox.topLeft[1]);
  }
  
  pop();

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
      console.log('moveParticle error');
    }
  }

  //  create new particles when there's few
  if (particles.length <10) {
      particles.push(new Particle());
  }


  // handpose
  push();
  translate(w/2, -h/2);
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
      noStroke();
      scale(-1, 1); //flip webcam
      if (j == 4 || j == 8) {
        fill('red');
      }else {
        fill('black');
      }
      ellipse(keypoint[0], keypoint[1], r, r);
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
