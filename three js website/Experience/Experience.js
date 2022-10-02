import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import assets from "./Utils/Assets";


import Camera from "./Camera.js";
import Renderer from "./Renderer";
import World from "./World/World.js";

export default class Experiance {
    static instance
    constructor(canvas) {
        if (Experiance.instance) {
            return Experiance.instance
        }
        Experiance.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
        this.time = new Time();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World();

        this.sizes.on("resize", () => {
            this.resize();
        })

        this.time.on("updateTime", () => {
            this.update();
        })
    }

    resize() {
        this.camera.update()
        this.renderer.update()
    }
    update() {
        this.camera.update()
        this.renderer.update()
    }
}   