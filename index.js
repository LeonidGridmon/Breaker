const grid = document.querySelector('.grid')
const boardWidth = 560;
//Create ball
ballDiameter =20;
//Create block
const scoreDisplay =document.querySelector('#score')
const userStart =[230,10];
const blockWidth = 100;
const blockHeight = 20;
const ballStart=[270,31]
const boardHeight=300;
document.getElementById('start').addEventListener('click', gameStart)
let currentPosition =userStart;
let ballCurrentPosition =ballStart;
let timerId;
let xDirection =2;
let yDirection =2;
let score =0;
const ball =document.createElement('div');
class block {
    constructor(xAxis,yAxis) {
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidth,yAxis]
        this.topLeft = [xAxis,yAxis+blockHeight]
        this.topRight =[xAxis+blockWidth,yAxis+blockHeight]
    }

}
//all my blocks
var blocks=[
    new block(10,270),
    new block(120,270),
    new block(230,270),
    new block(340,270),
    new block(450,270),

    new block(10,240),
    new block(120,240),
    new block(230,240),
    new block(340,240),
    new block(450,240),

    new block(10,210),
    new block(120,210),
    new block(230,210),
    new block(340,210),
    new block(450,210)
];
console.log(blocks)


//draw all my block
function addBlock () {

    for(let i =0;i<blocks.length;i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] +'px'
        grid.appendChild(block)
    }
}

addBlock ()
//add ball


//add User
const user = document.createElement('div');
user.classList.add('user')
grid.appendChild(user)
drawUser()
drawBall()

function drawBall (){
   ball.style.left = ballCurrentPosition[0] +'px'
    ball.style.bottom = ballCurrentPosition[1] +'px'
}

 function drawUser() {
    user.style.left = currentPosition[0] +'px'
    user.style.bottom = currentPosition[1] +'px'
}

//move user
function  moveUser(e){
    switch (e.key){
        case 'ArrowLeft':
            if(currentPosition[0]>0){
            currentPosition[0] -=10;
            drawUser();
            }
            break;
        case 'ArrowRight':
           if(currentPosition[0]<boardWidth-blockWidth){
                currentPosition[0] +=10;
                drawUser();
            }
            break;
    }
}

document.addEventListener('keydown', moveUser);

//move ball
function moveBall() {
    ballCurrentPosition[0]+=xDirection;
    ballCurrentPosition[1]+=yDirection;
    drawBall();
    checkForCollisions();
}


//check collisions
function checkForCollisions () {
     for(i=0;i<blocks.length;i++) {
         if (
             (ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
                 ballCurrentPosition[0]< blocks[i].bottomRight[0]) &&
             ((ballCurrentPosition[1]+ballDiameter) > blocks[i].bottomLeft[1] &&
                 ballCurrentPosition[1]< blocks[i].bottomRight[1])
         ){
             const allBlocks = Array.from(document.querySelectorAll('.block'));
             allBlocks[i].classList.remove('block');
             blocks.splice(i,1);
             changeDirection();
             score++;
             scoreDisplay.innerHTML ='Your score: '+ score;
         }
     }
    //check for win
    if (blocks.length == 0 ) {
        alert('You win!')
        clearInterval(timerId);
    }
    //check for wall collisions
    if (ballCurrentPosition[0]>=(boardWidth-ballDiameter) ||
        ballCurrentPosition[1]>=(boardHeight-ballDiameter) ||
        ballCurrentPosition[0]<=0) {
        changeDirection();
    }
    //check for player collision
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth)&&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
        ) {changeDirection()}

  //check fo game over
    if(ballCurrentPosition[1]<=0) {
        ballCurrentPosition =[270,31]
        alert('You Lose!')
        document.removeEventListener('keydown',moveUser)
        blocks = [];
        clearInterval(timerId)

        const allBlocks = Array.from(document.querySelectorAll('.block'));
        for (j=0;j<allBlocks.length;j++){
            allBlocks[j].classList.remove('block');
            blocks.splice(j,1);

        }
    }
}

function changeDirection() {
    if(xDirection ===2 && yDirection ===2) {
        yDirection = -2
        return
    }
    if(xDirection ===2 && yDirection ===-2) {
        xDirection =-2
        return
    }
    if(xDirection ===-2 && yDirection ===2) {
        xDirection=2
        return
    }
    if(xDirection ===-2 && yDirection ===-2) {
        yDirection=2
        return
    }
    }

function gameStart ()  {


    ballCurrentPosition =[270,31]
    drawBall()
    ball.classList.add('ball');
    grid.appendChild(ball);
    timerId = setInterval(moveBall,30)
    document.addEventListener('keydown', moveUser);
    currentPosition = [230,10];
    drawUser()
    blocks = []
    blocks = [
        new block(10,270),
        new block(120,270),
        new block(230,270),
        new block(340,270),
        new block(450,270),

        new block(10,240),
        new block(120,240),
        new block(230,240),
        new block(340,240),
        new block(450,240),

        new block(10,210),
        new block(120,210),
        new block(230,210),
        new block(340,210),
        new block(450,210)
    ]
    const allBlocks = Array.from(document.querySelectorAll('.block'));
    for (j=0;j<allBlocks.length;j++){
        allBlocks[j].classList.remove('block');
        blocks.splice(j,1);
        }
    addBlock()
    score =0;
    scoreDisplay.innerHTML = 'Your score: 0'
}