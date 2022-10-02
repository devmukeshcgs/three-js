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
    }

    resize() { }

    update() { }
} 
