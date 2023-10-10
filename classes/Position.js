class Position {
    #x;
    #y;

    constructor(x = 0, y = 0) {
        this.#x = x;
        this.#y = y;
    }
    get x () {
        return this.#x; 
    }
    get y () {
        return this.#y;
    }
    set x (x) {
        this.#x = x;
    }
    set y (y) {
        this.#y = y;
    }
    static areEqual(position1, position2) {
        return position1.x === position2.x && position1.y == position2.y;
    }
}
export {Position};