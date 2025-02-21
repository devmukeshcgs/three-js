import EventEmitter from "events";

export default class Time extends EventEmitter {
    constructor() {
        super()
        this.time = Date.now();
        this.current = this.time;
        this.elapsed = 0;
        this.delta = 16;

        this.update()
    }
    update() {
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        TimeRanges.elapsed = this.current - this.start;
        this.emit("updateTime")
        window.requestAnimationFrame(() => this.update())
    }
}