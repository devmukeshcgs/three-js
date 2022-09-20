import * as THREE from "three";
import Camera from "./Camera.js";
import Sizes from "./Utils/Sizes";

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
        this.camera = new Camera();
    }
}