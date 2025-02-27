import * as THREE from "three"
import Experiance from "../Experience.js";
import Room from "./Room"
import Environment from "./Environment.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js"

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
        this.loader = new THREE.TextureLoader();
        this.torusOrbitGeometry;
        this._callback;

        // const cameraPivot = new THREE.Group()
        // cameraPivot.add(this.camera)
        // this.camera.perspectiveCamera.position.z = 5
        // this.scene.add(cameraPivot)

        const geometry = new THREE.PlaneGeometry(10, 10);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: false });
        const plane = new THREE.Mesh(geometry, material);
        this.scene.add(plane);
        // console.log("PLANE", plane);
        plane.rotation.x = 110;
        // const ringGeometry = new THREE.RingGeometry(5, 4, 32);
        // const ringMaterial = new THREE.MeshBasicMaterial({
        //     color: 0xffff00,
        //     side: THREE.DoubleSide
        // });
        // const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        // this.scene.add(ringMesh);
        //// VAR SETUP
        const main = document.querySelector("experiance");

        let distanceY = -10
        let distanceX = innerWidth / innerHeight
        let pointerDamp = 0.062
        let meshRotation = Math.PI / 4

        const amount = 256
        const gizmo = new THREE.Object3D()
        const wireframeMaterial = new THREE.MeshBasicMaterial({ wireframe: true })

        const meshes = new THREE.Group()
        // this.scene.add(meshes);

        //// PARTICLES
        const particleGeometry = new THREE.TetrahedronGeometry(0.01)
        const particles = new THREE.InstancedMesh(particleGeometry, wireframeMaterial, amount)

        {
            let cp = this.camera.perspectiveCamera.position.z;
            let sp = this.scene.position.z;

            const d = cp - sp;
            const f = (this.camera.perspectiveCamera.fov * Math.PI) / 360
            const v = 2 * Math.tan(f) * d

            for (let i = 0; i < amount; i++) {
                gizmo.position.x = (Math.random() - 0.5) * v * this.camera.perspectiveCamera.aspect
                gizmo.position.y = (1 - Math.random() * (meshes.children.length + 3)) * v
                gizmo.position.z = (Math.random() * 2 - 1) * v * this.camera.perspectiveCamera.aspect
                gizmo.rotation.set(Math.random(), Math.random(), Math.random())
                let s = 1 + Math.random() * 4
                s = s > 4.8 ? s * s : s
                gizmo.scale.set(s, s, s)
                gizmo.updateMatrix()
                particles.setMatrixAt(i, gizmo.matrix)
            }
        }

        meshes.add(particles)

        // SCROLL
        if (main) {
            main.addEventListener("scroll", (e) => {
                e.preventDefault();
                const newSection =
                    (main.scrollTop / innerHeight <= 0.2) ? 0 :
                        (main.scrollTop / innerHeight <= 1.2 &&
                            main.scrollTop / innerHeight >= 0.8) ? 1 :
                            (main.scrollTop / innerHeight >= 1.8) ? 2 :
                                null
            });
        } //END SCROLL

    }

    // END constructor


    loadTexture(name, material) {
        const load = () => this.loader.load(
            "https://raw.githubusercontent.com/foretoo/jora/main/src/assets/" + name + ".png",
            (texture) => {
                material.matcap = texture
                material.needsUpdate = true
            },
            undefined,
            load
        )
        load()
    }

    resize() { }

    update() {
        // console.log("World updating...");
        if (this.room) {
            this.room.update()
        }
    }
}