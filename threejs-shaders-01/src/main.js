import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";
import Stats from 'stats.js'

import perspectiveVertShader from "./shaders/perspective.vert";
import perspectiveFragShader from "./shaders/perspective.frag";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import grainVert from "./shaders/grain.vert";
import grainFrag from "./shaders/grain.frag";
import "./style.css";

console.log(gsap);

class ShaderRenderer {
  constructor() {
    // Debug
    this.gui = new GUI();
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


    let count = 500;
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
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_Texture: { value: new THREE.TextureLoader().load("https://documents.iplt20.com/ipl/IPLHeadshot2024/62.png") },
      u_PointSize: { value: 2 },
      U_Rows: { value: 1000 },
      U_Cols: { value: 1000 }
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
    this.scene.add(plane);

    // MESH
    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(this.mesh);
    // const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });

    // this.grainGeometry.setAttribute('grain_position', positionAttribute);

    // Create the plane geometry and hollow circle
    const planeWidth = 2;
    const planeHeight = 2;
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
    const geometry2 = new THREE.ShapeGeometry(outerShape);

    // Create a material
    const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });

    // Create the mesh
    const plane2 = new THREE.Mesh(geometry2, this.grainMaterial);
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
    // this.camera = new THREE.PerspectiveCamera(
    //   75,
    //   this.sizes.width / this.sizes.height,
    //   0.1,
    //   100
    // );
    // this.camera.lookAt(0,0,0);
    // this.camera.position.set(0.25, -0.25, 1);
    this.camera.position.z = 2;

    this.scene.add(this.camera);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
