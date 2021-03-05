const timer = document.querySelector('.timer');
const playToggle = document.querySelector('.playToggle');
const replayBtn = document.querySelector('.replay');
const popUp = document.querySelector(`.popUp`);
const playGround = document.querySelector('.playground');
const timerSpan = document.querySelector('.timerspan');
const counterSpan = document.querySelector('.conterspan');
const carrotSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const bgm = new Audio('sound/bg.mp3');
const winSound = new Audio('sound/game_win.mp3');
const loseSound = new Audio('sound/alert.wav');

let interval;
let started = false;
let gameTime = 10;
let gameScore = 10;

playToggle.addEventListener('click', playGame);
replayBtn.addEventListener('click', replay);


//Sound
function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound){
  sound.pause();
}

// Play Button
function playGame() {
  if(started) {
    stopGame();
  } else {
    startGame();
  }
   started = !started;
}

function startGame() {
  playSound(bgm);
  playToggle.innerHTML = '<i class="fas fa-stop"></i>';
  popUp.classList.add('noShow');
  timerSpan.classList.remove('visible');
  counterSpan.classList.remove('visible');
  playToggle.classList.remove('visible');
  playGround.innerHTML = '';      //이것도 너무 어렸게 코딩 했었음 
  counterSpan.textContent = gameScore;
  
  interval = setInterval(countdown,1000);
  makeId();

  const bugs = document.querySelectorAll('.bug');    // 또 너무 어렵게 코딩했음 
  const carrots = document.querySelectorAll('.carrot');
  carrots.forEach(element=> element.addEventListener('click', removeItem));
  bugs.forEach(element=>element.addEventListener('click', removeItem));

  /*
  ellie는 matches 사용해서 간단하게 끝냈음
  */

}
function stopGame(){
  stopSound(bgm);
  playToggle.innerHTML = '<i class="fas fa-play"></i>';
  popUp.classList.remove('noShow')
  clearInterval(interval);
  playToggle.classList.add('visible');
  gameScore=10;
  gameTime =10;

}
function loseGame(){
  playSound(loseSound);
  stopGame();
  const popUpContent = document.querySelector('.popUpContent');
  popUpContent.innerText = "You Lose";
  
}
  
function winGame(){
  playSound(winSound);
  stopGame();
  const popUpContent = document.querySelector('.popUpContent');
  popUpContent.innerText = "You Win";
}

function replay() {
  started=true;
  stopGame();
  popUp.classList.add('noShow');
  clearInterval(interval);
  startGame();
  
}

function makeId(){
  for(i=1; i<11; i++){
  locateItems('bug', 'img/bug.png', `bug${i}`);
  locateItems('carrot','img/carrot.png', `carrot${i}`);
  }
}

function removeItem(event) {
  if(!started) {
    return;

  } else if(event.target.className === 'carrot'){
  playSound(carrotSound);
  event.target.remove();
  gameScore--;
  counterSpan.innerText = gameScore;
  console.log(gameScore);
    if(gameScore===0){
      winGame();
      clearInterval(interval);
      }
   } else {
     playSound(bugSound);
    loseGame();
  }
}

// CountDown 
function countdown(){
 if(gameTime<0){
  clearInterval(interval);
  loseGame();
  } else {
   timer.textContent = `0:${gameTime<10? `0${gameTime}` : `${gameTime}`}`; 
  gameTime--
  }
}

// Play Ground
const coordinate = playGround.getBoundingClientRect();
let playGroundWidth = coordinate.width;
let playGroundHeight = coordinate.height;

function getRandomInt(width, height){
  x = Math.ceil(width);
  y = Math.floor(height);
  itemX = Math.random()*(x-80) + 50;
  itemY = Math.random()*(y-90) + 50;
  return itemX, itemY;
}

 function locateItems(className, imgPath, className2){
    getRandomInt(playGroundWidth,playGroundHeight);
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.setAttribute('id', className2);
    item.style.left = `${itemX}px`;
    item.style.bottom = `${itemY}px`;
    playGround.appendChild(item);
    
}


