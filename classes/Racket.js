import { Position } from "./Position.js";
import * as Settings from "./Settings.js";
import { Shape } from "./Shape.js";
import { Screen } from "./Screen.js";
import { RacketType } from "./RacketType.js";

class Racket {
    #positionsList;
    #color;
    #shape;
    #size;
    #startingPosition;
    #type;

    constructor(type) {
        this.#type = type;
        this.#color = Settings.racketColor;
        this.#size = Settings.racketSize;
        this.#shape = Shape.RECTANGLE;
        this.#setStartingPosition();
        this.#init();
    }
    get surface() {
        return this.#positionsList[0].x;
    }
    get top() {
        return this.#positionsList[0].y;
    }
    get bottom() {
        return this.#positionsList[this.#size - 1].y;
    }

    #init() {
        this.#positionsList = [];
        for (let i = 0; i < this.#size; i++) {
            let position = new Position(this.#startingPosition.x, this.#startingPosition.y - Math.floor(this.#size / 2) + i);
            this.#positionsList.push(position);
            Screen.paint(position, this.#color, this.#shape);
        }
    }
    #setStartingPosition() {
        switch (this.#type) {
            case RacketType.LEFT:
                this.#startingPosition = new Position(0, Screen.height / 2 - 1);
                break;
            case RacketType.RIGHT:
                this.#startingPosition = new Position(Screen.width - 1, Screen.height / 2 - 1);
                break;
        }
    }
    moveUp() {
        if (this.#positionsList[0].y > 0) {
            for (let i = 0; i < this.#size; i++) {
                Screen.erase(this.#positionsList[i], this.#shape);
                this.#positionsList[i].y--;
                Screen.paint(this.#positionsList[i], this.#color, this.#shape);
            }
        }
    }
    moveDown() {
        if (this.#positionsList[this.#size - 1].y < Screen.height - 1) {
            for (let i = this.#size - 1; i >= 0; i--) {
                Screen.erase(this.#positionsList[i], this.#shape);
                this.#positionsList[i].y++;
                Screen.paint(this.#positionsList[i], this.#color, this.#shape);
            }
        }
    }
    isHitBall(ball) {        
        return ball.position.y >= this.top - 1 && ball.position.y <= this.bottom + 1 
            && (this.#type == RacketType.LEFT 
            ? ball.position.x == this.surface + 1 
            : ball.position.x == this.surface - 1);
    }
    reset() {
        this.#positionsList.forEach(position => {
            Screen.erase(position, this.#shape);
        });
        this.#init();
    }
}
export {Racket};