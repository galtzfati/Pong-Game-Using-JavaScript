import { Shape } from "./Shape.js";
import { Screen } from "./Screen.js";
import * as Settings from "./Settings.js";

class Ball {
    #position;
    #startingPosition;
    #xDirection;
    #yDirection;
    #color;
    #shape;

    constructor(startingPosition) {
        this.#startingPosition = this.#position = startingPosition;
        this.#color = Settings.ballColor;
        this.#shape = Shape.CIRCLE;
        this.#init();
    }
    get position() {
        return this.#position;
    }
    set position(position) {
        this.#position = position;
    }
    get xDirection() {
        return this.#xDirection;
    }
    set xDirection(xDirection) {
        this.#xDirection = xDirection;
    }
    set yDirection(yDirection) {
        this.#yDirection = yDirection;
    }
    get yDirection() {
        return this.#yDirection;
    }
    #init() {
        this.#xDirection = Math.round(Math.random()) == 0 ? -1 : 1;
        this.#yDirection = Math.round(Math.random()) == 0 ? -1 : 1;
        Screen.paint(this.#position, this.#color, this.#shape);
    }
    moveTo(newPosition) {
        Screen.erase(this.#position, this.#shape);        
        this.#position = newPosition;
        Screen.paint(this.#position, this.#color, this.#shape);
    }
    reset() {
        Screen.erase(this.#position, this.#shape);
        this.#position = this.#startingPosition;
        this.#init();
    }
}
export {Ball};