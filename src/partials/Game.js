import { SVG_NS, PADDLE_WIDTH, PADDLE_HEIGHT, BOARD_GAP, KEYS, RADIUS} from '../settings';
import Board from './Board';
import Paddle from './Paddles';
import Ball from './Ball';
import Score from './Score';


export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.numGame = 1;
    this.width = width;
    this.height = height;
    this.paused = false;
    this.newGame = false;
    this.gameElement = document.getElementById(this.element);
  
    this.board = new Board(this.width, this.height);
    const boardMid = (this.height - PADDLE_HEIGHT) / 2;
    this.paddle1 = new Paddle(this.height, PADDLE_WIDTH, PADDLE_HEIGHT, BOARD_GAP, boardMid, KEYS.p1up, KEYS.p1down);
    const paddle2Gap = this.width - BOARD_GAP - PADDLE_WIDTH;
    this.paddle2 = new Paddle(this.height, PADDLE_WIDTH, PADDLE_HEIGHT, paddle2Gap, boardMid, KEYS.p2up, KEYS.p2down);
    this.ball = new Ball(this.width, this.height, 7, 'orange');
    this.ball2 = new Ball(this.width, this.height, 10, 'orange');
    // this.ball3 = new Ball(this.width, this.height, RADIUS, 'yellow');
    // this.ball4 = new Ball(this.width, this.height, RADIUS, 'purple');
    // this.ball5 = new Ball(this.width, this.height, RADIUS, 'pink');
    // this.ball6 = new Ball(this.width, this.height, RADIUS);
    this.score1 = new Score (this.width/2 - 50, 30);
    this.score2 = new Score (this.width/2 + 25, 30);
    document.addEventListener("keydown", event => {
        if (event.key === KEYS.pause){
          this.paused = !this.paused;
        }
      
    });
		// Other code goes here...
  }

  declareWinner(player1, player2){
    if (player1 === 3){
      this.gameElement.innerHTML ='PLAYER 2 WINS!!!';
      this.paused = true;
      this.newGame = true;
      this.numGame += this.numGame;
      const h2 = document.querySelector('h2');
      const p = document.querySelectorAll('p');
      h2.setAttribute('style', 'display: none');
      p[0].setAttribute('style', 'display: none');      
      p[1].setAttribute('style', 'display: none');      
      p[2].setAttribute('style', 'display: none');       
      this.paddle1.resetScore();
      this.paddle2.resetScore();
      this.ball.reset();
         
    } else if (player2 === 3){
      this.gameElement.innerHTML = 'PLAYER 1 WINS!!!';
      this.paused = true;
      this.newGame = true;
      this.numGame += this.numGame;
      this.paddle1.resetScore();
      this.paddle2.resetScore();
      this.ball.reset();
      const h2 = document.querySelector('h2');
      const p = document.querySelectorAll('p');
      h2.setAttribute('style', 'display: none');
      p[0].setAttribute('style', 'display: none');      
      p[1].setAttribute('style', 'display: none');      
      p[2].setAttribute('style', 'display: none');  
    }
  }
  checkPaddleHeight(player1, player2){
    if( player1 === 5){
      this.paddle1.setPaddleHeight(40);

    } if (player2 === 5){
      this.paddle2.setPaddleHeight(40);
    }
  }


  render() {

    this.declareWinner(this.paddle1.getScore(), this.paddle2.getScore());
      // if (this.paused){
      //   return false;
      // }
   
    if (this.paused === false){ 
      this.gameElement.innerHTML = '';
      let svg = document.createElementNS(SVG_NS, 'svg');
      svg.setAttributeNS(null, "width", this.width);
      svg.setAttributeNS(null, "height", this.height);
      svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
      this.gameElement.appendChild(svg);
      this.board.render(svg);
      this.paddle1.render(svg);
      this.paddle2.render(svg);
      this.checkPaddleHeight(this.paddle1.getScore(), this.paddle2.getScore());
     this.ball.render(svg, this.paddle1, this.paddle2);
    if (this.newGame === true){
    this.ball2.render(svg, this.paddle1, this.paddle2);
    const h2 = document.querySelector('h2');
    const p = document.querySelectorAll('p');
    h2.setAttribute('style', 'display: block');
    p[0].setAttribute('style', 'display: block');      
    p[1].setAttribute('style', 'display: block');      
    p[2].setAttribute('style', 'display: block');  
  }

    if (this.numGame > 4){      
      this.gameElement.innerHTML = 'Game Over ☠️';
      const h2 = document.querySelector('h2');
      const p = document.querySelectorAll('p');
      h2.setAttribute('style', 'display: none');
      p[0].setAttribute('style', 'display: none');      
      p[1].setAttribute('style', 'display: none');      
      p[2].setAttribute('style', 'display: none');  
    }

    // this.ball3.render(svg, this.paddle1, this.paddle2);
    // this.ball4.render(svg, this.paddle1, this.paddle2);
    // this.ball5.render(svg, this.paddle1, this.paddle2);
    // this.ball6.render(svg, this.paddle1, this.paddle2);
    this.score1.render(svg, this.paddle1.getScore());
    this.score2.render(svg, this.paddle2.getScore());
    

    // More code goes here....
  }
}
}
