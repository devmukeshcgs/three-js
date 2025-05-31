import "../style.css";
import * as THREE from "three";
import images from "./images";

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}
//Mouse Coords
let targetX = 0;
let targetY = 0;

//Load image texture for mesh

const textureOne = new THREE.TextureLoader().load(images.imageOne);
const textureTwo = new THREE.TextureLoader().load(images.imageTwo);
const textureThree = new THREE.TextureLoader().load(images.imageThree);
const textureFour = new THREE.TextureLoader().load(images.imageFour);

class webgl {
  constructor() {
    this.contianer = document.querySelector("main");
    this.links = [...document.querySelectorAll("li")];
    this.scene = new THREE.Scene();
    this.perspective = 1000;
    this.sizes = new THREE.Vector2(0, 0); //Mesh sizes
    this.offset = new THREE.Vector2(0, 0); //Mesh Position
    this.uniforms = {
      uTexture: { value: textureOne },
      uAlpha: { value: 0.0 },
      uOffset: { value: new THREE.Vector2(0.0, 0.0) },
    };
    this.links.forEach((link, idx) => {
      //   link.addEventListner("mouseenter", () => {
      //     switch (idx) {
      //       case 0:
      //         this.uniforms.uTexture.value = textureOne;
      //         break;
      //       case 1:
      //         this.uniforms.uTexture.value = textureTwo;
      //         break;
      //       case 2:
      //         this.uniforms.uTexture.value = textureThree;
      //         break;
      //       case 3:
      //         this.uniforms.uTexture.value = textureFour;
      //         break;
      //       default:
      //         break;
      //     }
      //   });
    });
    this.addEventListners(document.querySelector("ul"));
    this.setupCamera();
    this.onMousemove();
    this.createMesh();
    this.render();
  }

  get viewport() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspectRatio = width / height;
    return {
      width,
      height,
      aspectRatio,
    };
  }

  onMousemove() {
    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });
  }

  addEventListners(element) {
    console.log(element);
    // element.addEventListner("mouseenter", () => {
    //   this.linkhover = true;
    // });
    // element.addEventListner("mouseleave", () => {
    //   this.linkhover = false;
    // });
  }

  setupCamera() {
    // REadjust setting
    window.addEventListener("resize", this.onWindowResize.bind(this));

    let fov =
      (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) /
      Math.PI;
    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.viewport.aspectRatio,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, this.perspective);

    // Renderer / Canvas
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.viewport.width, this.viewport.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.contianer.appendChild(this.renderer.domElement);
  }

  onWindowResize() {
    this.camera.aspect = this.viewport.aspectRatio;
    this.camera.fov =
      (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) /
      Math.PI;
    this.renderer.setSize(this.viewport.width, this.viewport.height);
    this.camera.updateProjectionMatrix();
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 250, 350);
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(this.geometry, this, this.material);
    this.sizes.set(250, 350);
    this.mesh.scale.set(this.sizes.x, this.sizes.y);
    this.mesh.position.set(this.offset.x, this.offset.y, 0, 0);
    this.scene.add(this.mesh);
    console.log(this.mesh);
    
  }
  render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

new webgl();
