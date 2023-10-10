import * as Settings from "./Settings.js";
import { Shape } from "./Shape.js";

class Screen {
    static #context;
    static #board;
    static #radius;
    static #background;

    static get width() {
        return this.#board.width / Settings.unitSize;
    }
    static get height() {
        return this.#board.height / Settings.unitSize; 
    }

    static init() {
        this.#board = document.getElementById("gameCanvas");
        this.#context = this.#board.getContext("2d");
        this.#radius = Settings.ballRadius;
        this.#background = window.getComputedStyle(this.#board).backgroundColor;
    }
    static paint(position, color, shape) {
        this.#context.fillStyle = color;
        let x = position.x * Settings.unitSize;
        let y = position.y * Settings.unitSize;
        switch (shape) {
            case Shape.CIRCLE:
                this.#context.beginPath();
                this.#context.arc(x + Settings.unitSize / 2, y + Settings.unitSize / 2, this.#radius, 0, 2 * Math.PI);
                this.#context.fill();
                break;
            case Shape.RECTANGLE:
                this.#context.fillRect(x, y, Settings.unitSize, Settings.unitSize);
                break;
        }
    }
    static erase(position, shape) {
        this.#radius += 0.7;
        this.paint(position, this.#background, shape);
        this.#radius -= 0.7;
    }
}
export {Screen};