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
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            45,
            this.sizes.aspect,
            0.1,
            1000);
        this.scene.add(this.PerspectiveCamera);
    };

    createOrthographicCamera() {
        this.frustrum = 5;
        this.orthographicCamera = new THREE.OrthographicCamera(

            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum,
            -this.sizes.frustrum,
            -100,
            100
        );
        this.scene.add(this.OrthographicCamera);
    };

    resize() {
        //Updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        //Updating Orthigrphic Camera on Resize
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.orthographicCamera.top = this.sizes.frustrum,
            this.orthographicCamera.bottom = -this.sizes.frustrum,
            this.orthographicCamera.updateProjectionMatrix();
    }
    resize() {
        //Updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        //Updating Orthigrphic Camera on Resize
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.orthographicCamera.top = this.sizes.frustrum,
            this.orthographicCamera.bottom = -this.sizes.frustrum,
            this.orthographicCamera.updateProjectionMatrix();
    }
} 