import * as THREE from '../js/build/three.module.js';
import * as dat from '../js/dat.gui.module.js';

import { OrbitControls } from '../js/examples/jsm/controls/OrbitControls.js';
// import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

export default class Sketch {
    constructor(options) {
        this.scene = new THREE.Scene();
        this.container = options.dom;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xeeeeee, 1);//white BG
        this.renderer.setClearColor("#1e272e", 1.0); // grey BG
        this.renderer.physicallycorrectLights = true;
        this.renderer.outputEncoding - THREE.SRGBEncoding;
        this.container.appendChild(this.renderer.domElement);
        this.camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.001,
            1000
        );
        this.vertexDisplacement;
        var frustumSize = 10;
        var aspect = window.innerWidth / window.innerHeight;
        this.canera = new THREE.OrthographicCamera(frustumSize * aspect)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.set(0, 0, 3);
        this.controls.update();
        this.u_time = 0;
        this.isplaying = true;

        this.addobjects();
        this.resize();
        this.render();
        this.setupResize();
        this.settings();

    } //Cunstructor END

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
        this.material.uniforms.u_resolution.value.x = this.width;
        this.material.uniforms.u_resolution.value.y = this.height;
        this.material.uniforms.u_resolution.value.z = a1;
        this.material.uniforms.u_resolution.value.w = a2;

        // optional - cover width
        const dist = this.camera.position.z;
        const height = 1;
        this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / 2 * dist)

        //if(w/h>1){
        if (this.width / this.height > 1) {
            this.plane.scale.x = this.camera.aspect;

        } else {
            this.plane.scale.y = 1 / this.camera.aspect
        }
        this.camera.updateProjectionMatrix();
    }
    addobjects() {
        let that = this;
        const texture = new THREE.TextureLoader().load("https://dl.dropbox.com/s/cyiex5ykp2xhau4/transform_image.jpg");

        let uniforms = {
            u_time: { type: "f", value: 1.0 },
            u_mouse: { type: "v2", value: new THREE.Vector2() },
            u_resolution: { type: "v4", value: new THREE.Vector4() },
            uvRatel: { value: new THREE.Vector2(1, 1) },
            u_color: { value: new THREE.Color(0x3f5b15) },
            texture: { type: 't', value: texture },
        }

        this.material = new THREE.RawShaderMaterial({
            // side: THREE.DOubleside,
            uniforms: uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent,
            // wireframe: true,
            // transparent: true,
        });

        this.geometry = new THREE.PlaneGeometry(5, 5, 15, 15);
        this.plane = new THREE.Mesh(this.geometry, this.material);
        // this.plane = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.plane);

        this.vertexDisplacement = new Float32Array(this.geometry.attributes.position.count)
        for (let i = 0; i < this.vertexDisplacement.length; i += 1) {
            this.vertexDisplacement[i] = Math.sin(i);
        }
        this.geometry.setAttribute('vertexDisplacement', new THREE.BufferAttribute(this.vertexDisplacement, 1))
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
        this.u_time += 0.05;
        // this.material.uniforms.u_time.value = this.u_time;
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera)
        this.controls.update();
    }
}


new Sketch({
    dom: document.getElementById('myCanvas'),
})
