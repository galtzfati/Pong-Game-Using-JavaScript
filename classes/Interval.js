class Interval {
    #interval = null;

    set interval(interval) {
        if (!this.#interval) {
            this.#interval = interval;
        }
    }
    get interval() {
        return this.#interval;
    }
    clearInterval() {
        if (this.#interval) {
            clearInterval(this.#interval);
            this.#interval = null;
        }
    }
}
export {Interval};