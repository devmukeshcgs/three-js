import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import Experiance from "./Experience";
export default class Camera {
    constructor() {
        this.experiance = new Experiance();
        this.sizes = this.experiance.sizes;
        this.scene = this.experiance.scene;
        this.canvas = this.experiance.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitcontrols();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 20;
        this.perspectiveCamera.position.x = 10;
        this.perspectiveCamera.position.y = 5;
    };

    createOrthographicCamera() {
        this.frustrum = 5;
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum, -this.sizes.frustrum, -100,
            100
        );
        this.scene.add(this.orthographicCamera);
        //Grid Helper
        const size = 10;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);
        //Axes Helper
        const axesHelper = new THREE.AxesHelper(10);
        this.scene.add(axesHelper);
    };

    setOrbitcontrols() {
        this.conrols = new OrbitControls(this.perspectiveCamera, this.canvas)
        this.conrols.enableDamping = true;
        this.conrols.enableZoom = true;
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

    update() {
        this.conrols.update();
    }
}