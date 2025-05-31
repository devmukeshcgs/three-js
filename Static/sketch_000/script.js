import * as THREE from '../js/build/three.module.js';
import * as dat from '../js/dat.gui.module.js';

import { OrbitControls } from '../js/examples/jsm/controls/OrbitControls.js';
// import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

// import vertex from './vertext.vert'
// import fragment from './fragment.glsl'

export default class Sketch {
    constructor(options) {
        this.scene = new THREE.Scene();
        this.container = options.dom;
        this.width = this.container.offsetWidth;
        console.log("DOM", this.container);
        this.height = this.container.offsetHeight;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xeeeeee, 1);
        this.renderer.physicallycorrectLights = true;
        this.renderer.outputEncoding - THREE.SRGBEncoding;
        this.container.appendChild(this.renderer.domElement);
        console.log(this.height);
        this.camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.001,
            1000
        );
        var frustumSize = 10;
        var aspect = window.innerWidth / window.innerHeight;
        this.canera = new THREE.OrthographicCamera(frustumSize * aspect)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.set(0, 0, 10);
        this.controls.update();
        this.time = 0;
        this.isplaying = true;

        this.addobjects();
        this.resize();
        this.render();
        this.setupResize();
        this.settings();
        // this.vertex = document.getElementById("vertexImport").import.body.childNodes[0].data
        // this.vertex = document.getElementById("fragmentImport").import.body.childNodes[0].data
    }

    settings() {
        let that = this;
        this.settings = {
            progress: 0,
        };
        this.gui = new dat.GUI();
        this.gui.add(this.settings, "progress", 0, 1, 0.01);
    }
    setupResize() {
        window.addEventListener("resize", this.resize.bind(this));
    }
    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;

        //image cover
        this.imageAspect - 855 / 1280;
        let a1; let a2;
        if (this.height / this.width > this.imagespect) {
            a1 = (this.width / this.height) * this.imagespect;
            a2 = 2;
        } else {
            a1 = 1;
            a2 = (this.height / this.width) * this.imageAspect;
        }
        this.material.uniforms.resolution.value.x = this.width;
        this.material.uniforms.resolution.value.y = this.height;
        this.material.uniforms.resolution.value.z = a1;
        this.material.uniforms.resolution.value.w = a2;

        // optional - cover width
        // const dist = this.camera.position.z;
        // const height = 1;
        // this.camera.fov = 2 * (180/Math.PI)*Math.atan(height/2*dist)

        // //if(w/h>1){
        // if (this.width / this.height > 1) {
        //     this.plane.scale.x = this.camera.aspect;

        // } else {
        //     this.plane.scale.y = 1 / this.camera.aspect
        // }
        this.camera.updateProjectionMatrix();
    }
    addobjects() {
        let that = this;
        this.material = new THREE.ShaderMaterial({
            side: THREE.DOubleside,
            uniforms: {
                time: { type: "f", value: 0 },
                resolution: { type: "v4", value: new THREE.Vector4() },
                uvRatel: { value: new THREE.Vector2(1, 1) },
            },
            wireframe: true,
            // transparent: true,
            vertexShadex: this.vertex,
            fragmentshader: this.fragment
        });

        this.geometry = new THREE.PlaneGeometry(5, 5, 15, 15);
        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.plane);
    }
    stop() {
        this.isplaying = false;
    }
    play() {
        if (!this.isplaying) {
            this.render();
            this.isplaying = true;
        }
    }
    render() {
        if (!this.isplaying) return;
        this.time += 0.05;
        this.material.uniforms.time.value = this.time;
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera)
        this.controls.update();

    }
}


new Sketch({
    dom: document.getElementById('myCanvas'),
})
