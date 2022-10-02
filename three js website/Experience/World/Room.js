import * as THREE from "three"
import Experiance from "../Experience";
export default class Room {
    constructor() {
        this.experiance = new Experiance();
        this.scene = this.experiance.scene;

        this.resources = this.experiance.resources;
        this.ring = this.resources.items.ringOne;
        this.ringTwo = this.resources.items.ringTwo;
        this.actualRing = this.ring.scene;
        this.actualRingTwo = this.ringTwo.scene;
        console.log("ROOM", this.ring);

        this.setModel();
    }

    setModel() {
        this.scene.add(this.actualRing);
        this.scene.add(this.actualRingTwo);
        this.actualRing.scale.set(4, 4, 4);
        this.actualRing.rotation.x = Math.PI / 2;
        this.actualRingTwo.rotation.x = Math.PI / 2;
    };

    resize() { }

    update() { }
} 
