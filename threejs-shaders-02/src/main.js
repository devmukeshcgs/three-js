import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

import GUI from "lil-gui";
import { Pane } from 'tweakpane';
import Stats from 'stats.js'

import gsap from "gsap";
import "./style.css";

// Shaders

import speherVertexShader from "./shaders/speher/vertex.glsl";
import speherFragmentShader from "./shaders/speher/fragment.glsl";
// hollo plane shaders
import planVertexShader from "./shaders/plane/vertex.glsl";
import planFragmentShader from "./shaders/plane/fragment.glsl";


class ShaderRenderer {
  constructor() {
    // Debug
    this.gui = new GUI();
    this.pane = new Pane();

    //FPS, MS, MB, CUSTOM
    this.stats = new Stats()

    // Canvas
    this.canvas = document.querySelector("canvas.webgl");

    // Scene
    this.scene = new THREE.Scene();

    // Sizes
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.loader = new THREE.TextureLoader();

    this.initStats();
    this.initGeometry();
    this.initCamera();
    this.initRenderer();
    this.initControls();
    this.initEventListeners();
    this.startAnimationLoop();
  }

  loadTexture(name, material) {
    const load = () => this.loader.load(
      "https://documents.iplt20.com/ipl/IPLHeadshot2024/62.png",
      (texture) => {
        material.matcap = texture
        material.needsUpdate = true
      },
      undefined,
      load
    )
    load()
  }

  initStats() {
    // the number will decide which information will be displayed
    // 0 => FPS Frames rendered in the last second. The higher the number the better.
    // 1 => MS Milliseconds needed to render a frame. The lower the number the better.
    // 2 => MB MBytes of allocated memory. (Run Chrome with --enable-precise-memory-info)
    // 3 => CUSTOM User-defined panel support.
    this.stats.showPanel(0)
    document.body.appendChild(this.stats.dom)
  }

  initGeometry() {
    // Geometry
    this.geometry = new THREE.PlaneGeometry(1, 1,);

    // UNIFORMS
    let uniforms = {
      u_time: { value: 0 },
      u_radius: { value: 0.5 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_Texture: { value: new THREE.TextureLoader().load("https://documents.iplt20.com/ipl/IPLHeadshot2024/62.png") },
      u_PointSize: { value: 2 },
      u_rows: { value: 1000 },
      u_cols: { value: 1000 },
      u_lightDirection: { value: new THREE.Vector3(1, 1, 1).normalize() },
      u_lightColor: { value: new THREE.Color(0xffffff) },
      u_ambientColor: { value: new THREE.Color(0x333333) }
    };

    ////////////////////////////////////////////////////////////////////
    // Create a material
    this.planeMat = new THREE.ShaderMaterial({
      vertexShader: planVertexShader,
      fragmentShader: planFragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: uniforms,
    });

    this.planeMat.uniforms.u_radius = { value: 0.5 };
    // GUI RAIDUS
    this.gui.add(this.planeMat.uniforms.u_radius, 'value').min(0).max(1).step(0.01).name('Radius');
    // Create the mesh 
    const hollowPlane = new THREE.Mesh(this.geometry, this.planeMat);
    this.scene.add(hollowPlane);
    ////////////////////////////////////////////////////////////////////
    const SphereGeo = new THREE.SphereGeometry(0.25, 32, 32);
    const SphereMat = new THREE.ShaderMaterial({
      vertexShader: speherVertexShader,
      fragmentShader: speherFragmentShader,
      side: THREE.DoubleSide,
      transparent: false,
      depthTest: false,
      depthWrite: false,
      uniforms: uniforms,
    });
    const sphere = new THREE.Mesh(SphereGeo, SphereMat);
    sphere.position.x = 0.5;
    this.scene.add(sphere);
  }

  initCamera() {
    const fielsOfView = 75;
    const aspectRatio = this.sizes.width / this.sizes.height;
    const near = 0.1;
    const far = 1000;

    // Base camera

    this.camera = new THREE.PerspectiveCamera(
      fielsOfView,
      aspectRatio,
      near,
      far,
    );
    this.camera.position.z = 1;

    this.scene.add(this.camera);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x202020, 1);
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
  }

  initEventListeners() {
    window.addEventListener("resize", () => this.handleResize());
  }

  handleResize() {
    // Update sizes
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  animate() {
    this.stats.begin();
    // Update controls
    this.controls.update();

    // Render
    this.renderer.render(this.scene, this.camera);
    this.stats.end();
    // Call animate again on the next frame
    window.requestAnimationFrame(() => this.animate());
  }

  startAnimationLoop() {
    this.animate();
  }
}

// Initialize the renderer when the script loads
const shaderRenderer = new ShaderRenderer();
