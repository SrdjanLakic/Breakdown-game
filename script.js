const grid = document.querySelector('.grid');
const score = document.getElementById('score');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let timer;
let xDirections = -2;
let yDirections = 2;

const userStartPosition = [230, 10];
let userCurrentPosition = userStartPosition;

const ballStartPosition = [270, 40];
let ballCurrentPosition = ballStartPosition;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px';
    block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    grid.appendChild(block);
  }
}

addBlocks();

function drawUser() {
  user.style.left = userCurrentPosition[0] + 'px';
  user.style.bottom = userCurrentPosition[1] + 'px';
}
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px';
  ball.style.bottom = ballCurrentPosition[1] + 'px';
}

function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (userCurrentPosition[0] > 0) {
        userCurrentPosition[0] -= 10;
        drawUser();
      }
      break;
    case 'ArrowRight':
      if (userCurrentPosition[0] < boardWidth - blockWidth) {
        userCurrentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener('keydown', moveUser);

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

function moveBall() {
  ballCurrentPosition[0] += xDirections;
  ballCurrentPosition[1] += yDirections;
  drawBall();
  checkForCollisions();
}

timer = setInterval(moveBall, 30);

function checkForCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll('.block'));
      allBlocks[i].classList.remove('block');
      blocks.splice(i, 1);
      changeDirection();
    }
  }
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timer);
    score.textContent = 'You lose';
    document.removeEventListener('keydown', moveUser);
  }
}

function changeDirection() {
  if (xDirections === 2 && yDirections === 2) {
    yDirections = -2;
    return;
  }
  if (xDirections === 2 && yDirections === -2) {
    xDirections = -2;
    return;
  }
  if (xDirections === -2 && yDirections == -2) {
    yDirections = 2;
    return;
  }
  if (xDirections === -2 && yDirections === 2) {
    xDirections = 2;
    return;
  }
}
