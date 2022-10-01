import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera.js";
import Renderer from "./Renderer";

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
    }
}