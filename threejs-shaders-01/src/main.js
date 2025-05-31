import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

import GUI from "lil-gui";
import {Pane} from 'tweakpane';
import Stats from 'stats.js'

import gsap from "gsap";
import "./style.css";

import perspectiveVertShader from "./shaders/perspective.vert";
import perspectiveFragShader from "./shaders/perspective.frag";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import grainVert from "./shaders/grain.vert";
import grainFrag from "./shaders/grain.frag";

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
    // this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
    this.geometry = new THREE.BufferGeometry();
    const grainGeometry = new THREE.PlaneGeometry(0.5, 0.5);


    let  count = 500;
    let positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = Math.random() - .5;
      positions[i * 3 + 1] = Math.random() - .5;
      positions[i * 3 + 2] = 0;
    }

    let positionAttribute = new THREE.BufferAttribute(positions, 3);
    this.geometry.setAttribute('position', positionAttribute);

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
    // Material
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: uniforms,
    });
    this.mesh = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.mesh);

    // GRAIN 
    // Grain Material / perspectiveFragShader
    this.grainMaterial = new THREE.ShaderMaterial({
      vertexShader: grainVert,
      fragmentShader: grainFrag,
      side: THREE.DoubleSide,
      transparent: false,
      depthTest: false,
      depthWrite: false,
      uniforms: uniforms,
    });
    const plane = new THREE.Mesh(grainGeometry, this.grainMaterial);

    
    // this.scene.add(plane);
        //////////////////////////////////
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

    //////////////////////////////////
    // Create the plane geometry and hollow circle
    const planeWidth = 1.5;
    const planeHeight = 1.5;
    const holeRadius = 0.5;

    // Define the outer shape (plane rectangle)
    const outerShape = new THREE.Shape();
    outerShape.moveTo(-planeWidth / 2, -planeHeight / 2);
    outerShape.lineTo(planeWidth / 2, -planeHeight / 2);
    outerShape.lineTo(planeWidth / 2, planeHeight / 2);
    outerShape.lineTo(-planeWidth / 2, planeHeight / 2);
    outerShape.lineTo(-planeWidth / 2, -planeHeight / 2);

    // Define the circular hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, false);

    // Subtract the hole from the plane
    outerShape.holes.push(holePath);
    // Create the geometry from the shape
    this.planeGeo = new THREE.ShapeGeometry(outerShape);

    // Create a material
    const plane2material = new THREE.MeshBasicMaterial({ color: 0x3D85C6, side: THREE.DoubleSide });
    // Grain Material / perspectiveFragShader
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
    // const plane2 = new THREE.Mesh(geometry2, this.plane2);
    const plane2 = new THREE.Mesh(this.planeGeo, this.planeMat);
    this.scene.add(plane2);



  }

  initCamera() {
    const fielsOfView = 75;
    const aspectRatio = this.sizes.width / this.sizes.height;
    const near = 0.1;
    const far = 10000;

    // Base camera

    this.camera = new THREE.PerspectiveCamera(
      fielsOfView,
      aspectRatio,
      near,
      far,
    );
    this.camera.position.z = 2;

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
