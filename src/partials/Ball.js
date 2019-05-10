import { SVG_NS} from '../settings';

export default class Ball {
    constructor(boardWidth, boardHeight, radius){
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.radius = radius;
        this.direction = 2;
        this.ping = new Audio("");
        this.reset();
     }
     reset(){
         this.x = this.boardWidth/2;
         this.y = this.boardHeight/2;
         this.vy = 0;
         this.vx = 0;
         while(this.vy === 0){
         this.vy = Math.floor(Math.random() * 10 - 5);
         }
         this.vx = this.direction * (6- Math.abs(this.vy));
     }
     wallCollision(){
         const hitsTop = this.y -this.radius <= 0;
         const hitsBottom = this.y + this.radius >= this.boardHeight;
         if (hitsTop || hitsBottom){
             this.vy = this.vy * -1;
         }
     }

     goalCollision(player1, player2){
         if (this.x <= 0){
             player2.increaseScore();
             this.direction = this.direction * -1;
             this.reset();
         } else if (this.x >= this.boardWidth){
             player1.increaseScore();
             this.direction = this.direction * -1;
             this.reset();
         }
     }


     paddleCollision(player1, player2){
         if (this.vx > 0){
            const p2 = player2.getCoordinates();
             //check for hit with player2
             if (this.x + this.radius >= p2.left && this.y + this.radius >= p2.top && this.y - this.radius <= p2.bottom){
                 this.vx =this.vx * -1;
                 this.ping.play();
             }
         } else {
             //check for hit with player1
             const p1 = player1.getCoordinates();
             //check for hit with player2
             if (this.x - this.radius <= p1.right && this.y + this.radius >= p1.top && this.y - this.radius <= p1.bottom){
                 this.vx =this.vx * -1;
         }
         }
    }

     render (svg, player1, player2) { 
         let circle = document.createElementNS(SVG_NS, 'circle');
         circle.setAttributeNS(null, "fill", "white");
         circle.setAttributeNS(null, "cx", this.x);
         circle.setAttributeNS(null, "cy", this.y);
         circle.setAttributeNS(null, "r", this.radius);
         this.x = this.x + this.vx;
         this.y = this.y + this.vy;
         this.wallCollision();
         this.goalCollision(player1, player2);
         this.paddleCollision(player1, player2);
         svg.appendChild(circle);
     }
}

