import { Position } from "./Position.js";
import { Racket } from "./Racket.js";
import { Screen } from "./Screen.js";
import { Ball } from "./Ball.js";
import { Keys } from "./Keys.js";
import { Interval } from "./Interval.js";
import { RacketType } from "./RacketType.js";
import * as Settings from "./Settings.js";

class Game {
    #leftRacket;
    #rightRacket;
    #ball;
    #leftPlayerKeys;
    #rightPlayerKeys;
    #racketsMovementInterval = new Interval();
    #ballInterval = new Interval();
    #leftScore = 0;
    #rightScore = 0;
    #scoreLabel = document.getElementById("scoreLabel");

    constructor() {
        this.#init();
        this.#listen();
    }

    #init() {
        this.#leftRacket = new Racket(RacketType.LEFT);
        this.#rightRacket = new Racket(RacketType.RIGHT);
        this.#ball = new Ball(new Position(Screen.width / 2, Screen.height / 2));
    }
    #listenToUserKeys() {
        this.#leftPlayerKeys = {
            up: false,
            down: false,
        };
        
        this.#rightPlayerKeys = {
            up: false,
            down: false,
        };
        
        document.addEventListener('keydown', (event) => {
            if (event.key === Keys.PLAYER1_UP) {
                this.#leftPlayerKeys.up = true;
                event.preventDefault();
            } else if (event.key === Keys.PLAYER1_DOWN) {
                this.#leftPlayerKeys.down = true;
                event.preventDefault();
            } else if (event.key === Keys.PLAYER2_UP) {
                this.#rightPlayerKeys.up = true;
                event.preventDefault();
            } else if (event.key === Keys.PLAYER2_DOWN) {
                this.#rightPlayerKeys.down = true;
                event.preventDefault();
            }
        });
        
        document.addEventListener('keyup', (event) => {
            if (event.key === Keys.PLAYER1_UP) {
                this.#leftPlayerKeys.up = false;
            } else if (event.key === Keys.PLAYER1_DOWN) {
                this.#leftPlayerKeys.down = false;
            } else if (event.key === Keys.PLAYER2_UP) {
                this.#rightPlayerKeys.up = false;
            } else if (event.key === Keys.PLAYER2_DOWN) {
                this.#rightPlayerKeys.down = false;
            }
        });
    }
    #listenToResetButton() {
        const resetButton = document.getElementById("resetButton");
        resetButton.addEventListener("click", () => {
            this.#ballInterval.clearInterval();
            this.#leftScore = this.#rightScore = 0;
            this.#updateScore();
            this.#ball.reset();
            this.#leftRacket.reset();
            this.#rightRacket.reset();
            this.#moveBall();
        });
    }
    #listen() {
        this.#listenToUserKeys();
        this.#listenToResetButton();
    }
    #moveBall() {
        this.#ballInterval.interval = setInterval(() => {
            this.#checkAndHandleBallHittingWall();
            let nextPosition = new Position(this.#ball.position.x, this.#ball.position.y);
            nextPosition.x += this.#ball.xDirection;
            nextPosition.y += this.#ball.yDirection;
            if (this.#isWinningShot(nextPosition)) {
                this.#updateScore();
                this.#ball.reset();
                this.#leftRacket.reset();
                this.#rightRacket.reset();
            }
            else {
                this.#ball.moveTo(nextPosition);
            }
        }, Settings.ballSpeed);
    }
    #checkAndHandleBallHittingWall() {
        if (this.#leftRacket.isHitBall(this.#ball) || this.#rightRacket.isHitBall(this.#ball)) {
            this.#ball.xDirection *= -1;
        }
        if (this.#ball.position.y <= 0 || this.#ball.position.y + 1 >= Screen.height) {
            this.#ball.yDirection *= -1;
        }
    }
    #isWinningShot(nextPositionShot) {
        let winningShot = false;
        if (nextPositionShot.x < this.#leftRacket.surface) {
            this.#rightScore++;
            winningShot = true;
        }
        else if (nextPositionShot.x > this.#rightRacket.surface + 1) {
            this.#leftScore++;
            winningShot = true;
        }
        return winningShot;
    }
    #updateRacketMovements() {
        this.#racketsMovementInterval.interval = setInterval(() => {
        if (this.#leftPlayerKeys.up) {
            this.#leftRacket.moveUp();
        }
        if (this.#leftPlayerKeys.down) {
            this.#leftRacket.moveDown();
        }
        if (this.#rightPlayerKeys.up) {
            this.#rightRacket.moveUp();
        }
        if (this.#rightPlayerKeys.down) {
            this.#rightRacket.moveDown();
        }
        }, Settings.racketSpeed);
    }
    #updateScore() {
        this.#scoreLabel.textContent = `${this.#leftScore} : ${this.#rightScore}`;
    }
    start() {
        this.#updateRacketMovements();
        this.#moveBall();
    }
}
export {Game};