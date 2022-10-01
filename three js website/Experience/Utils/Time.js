export default class Time {
    constructor() {
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

        console.log(this.delta);
        window.requestAnimationFrame(() => this.update())
    }
}