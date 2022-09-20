import * as THREE from "three"
import Experiance from "./Experience";
export default class Camera {
    constructor() {
        this.experiance = new Experiance();
        this.sizes = this.experiance.sizes;
        this.scene = this.experiance.scene;
        this.canvas = this.experiance.canvas;
        console.log(this.experiance);
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
    }
    createPerspectiveCamera() {
        new THREE.PerspectiveCamera(45, this.sizes.a, 1, 1000);
    };
    createOrthographicCamera() {
        new THREE.OrthographicCamera(this.sizes.width / -2, this.sizes.width / 2, this.sizes.height / 2, this.sizes.height / -2, 1, 1000);
    };
}