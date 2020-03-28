// let song1;
// let song2;
// let song1Live = false;
// let song2Live = false;

let musicFile, amplitude, fft;

let touchBtnArr = [];
let tapTargetArr = [];

function preload() {
  musicFile = loadSound('bensound-happyrock.mp3');
  song1 = loadSound('bensound-happyrock.mp3');
  song2 = loadSound('bensound-happyrock.mp3');



}

function setup() {
  fft = new p5.FFT();


  let cnv = createCanvas(450, 700);
  background(255);
  musicFile.setVolume(.1);
  amplitude = new p5.Amplitude();
  //   Setup tap buttons
  for (let i = 0; i < 3; i++) {
    touchBtnArr.push(new tapperButton((95 * i) + 120, height - 50, 70, random(1, 360), i));
  }
  musicFile.play();
  //   analyze sounds and create tap target at certain points to be used in draw function
  // tapTarget(yStart,yEnd,targetRail,timing,alive);

  //   Lets try analyzing the song and dividing it into parts before load then print it on draw

}

let time = 0;
let score = 0;

function draw() {
  background(255, 255, 255, 50);
  ellipse(mouseX, mouseY, 20, 20);
  //   Get amplitude levels
  let level = amplitude.getLevel();
  let size = map(level, 0, 1, 0, 2000);

  // console.log(level);
  if (time % 10 == 0) {
    if (level >= .04) {
      // constructor(yStart,yEnd,targetRail,timing,alive)
      tapTargetArr.push(new tapTarget(0, 0, 0, 0, true));
      // ellipse(50, height - 150, size, size);
    } else if (level >= .025) {
      tapTargetArr.push(new tapTarget(0, 0, 1, 0, true));
      // ellipse(150, height - 150, size, size);
    } else if (level >= .01) {
      tapTargetArr.push(new tapTarget(0, 0, 2, 0, true));
      // ellipse(250, height - 150, size, size);
    }
  }


  for (let i = 0; i < touchBtnArr.length; i++) {
    touchBtnArr[i].update();
    touchBtnArr[i].display();
  }

  for (let i = 0; i < tapTargetArr.length; i++) {
    tapTargetArr[i].update();
    tapTargetArr[i].display();
    if (tapTargetArr[i].isDead()) {
      tapTargetArr.splice(i, 1);
    }


    // tapTargetArr[i].display();
  }
  
  


  displayScore(score);
  time += 1;
}




function displayScore() {
  push();
  textSize(32);
  text(score, 100, 100);
  pop();
}



function mousePressed() {
  console.log("mouse pressed")
  // Check over each note with each button
  for (let i = 0; i < touchBtnArr.length; i++) {
    for (let j = 0; j < tapTargetArr.length; j++) {
      // console.log("hello")
      if (touchBtnArr[i].isOverlapping(tapTargetArr[j].xPos, tapTargetArr[j].yPos)) {
        if(touchBtnArr[i].isOverlapping(mouseX, mouseY)){
          tapTargetArr.splice(j, 1);
           console.log("overlapped and mouse pressed" + tapTargetArr[j].targetRail)
          score+=10;
      }
        
      }

    }
  }

}


let play = true;

function keyPressed() {
  if (play) {
    musicFile.pause();
    play = false;
  } else {
    musicFile.play();
    play = true;
  }

}
/*
ToDo:
- Analyze song
- Use that data to emit touch events
- Accept touches at right time
- Make a touch object that animated to the tapperButton at a certain points; What params?
- Param(xStart, xEnd, whichTarget, when does it start);
*/