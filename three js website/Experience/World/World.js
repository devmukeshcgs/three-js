import * as THREE from "three"
import Experiance from "../Experience.js";
import Room from "./Room"
import Environment from "./Environment.js";

export default class World {
    constructor() {
        this.experiance = new Experiance();
        this.sizes = this.experiance.sizes;
        this.scene = this.experiance.scene;
        this.canvas = this.experiance.canvas;
        this.camera = this.experiance.camera;
        this.resources = this.experiance.resources

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.room = new Room();
            console.log("Room Created");
        })

        const geometry = new THREE.RingGeometry(5, 4, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);

    }

    resize() {}

    update() {}
}