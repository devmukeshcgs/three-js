import * as THREE from 'three';
import images from './images.js';
import vertexShader from '../shaders/vertex.glsl?raw';
import fragmentShader from '../shaders/fragment.glsl?raw';
import '../style.css';

const main = document.querySelector('main');
const navLinks = [...document.querySelectorAll('li.nav-link')]
// const navLinks = [...document.getElementsByClassName('nav-link')]
const transitionDiv = document.querySelector('.transition__div')

navLinks.forEach(link => {
  link.addEventListener('click', async e => {
    e.preventDefault();
    const url = e.target.href
    startTransition(url);
    const pathname = new URL(url);
    history.pushState(null, '', pathname)
  })
})

// handle back button click
window.addEventListener('popstate', () => {
  const url = window.location.pathname;
  startTransition(url);
})

const startTransition = async (url) => {
  const html = await fetch(url);
  const htmlString = await html.text();
  const parser = new DOMParser();
  const parserhtml = parser.parseFromString(htmlString, 'text/html').querySelector('main')

  // FADEIN / FADEOUT

  // main.classList.add('hidden');
  // main.addEventListener('transitionend', () => {
  //   console.log("Ended.");
  //   main.innerHTML = parserhtml.innerHTML;
  //   main.classList.remove('hidden');
  // }, { once: true })

  // SLIDE EFFECT

  transitionDiv.classList.add('animate__in');
  transitionDiv.addEventListener('transitionend', () => {
    main.innerHTML = parserhtml.innerHTML;
    transitionDiv.classList.remove('animate__in');
    transitionDiv.classList.add('animate__out');

    setTimeout(() => {
      transitionDiv.style.transition = '0s';
      transitionDiv.classList.remove('animate__out');

      setTimeout(() => {
        transitionDiv.style.transition = '1s';
      }, 100)

    }, 1000)
  })
}

function bindEvents() {
  // Remove old event listeners first if needed
  const buttons = document.querySelectorAll('.my-button');
  buttons.forEach(btn => {
    btn.removeEventListener('click', handler);
    btn.addEventListener('click', handler);
  });
}

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

let targetX = 0;
let targetY = 0;
let meshWidth = 250;
let meshHeight = 350;

const textureOne = new THREE.TextureLoader().load(images.imageOne);
const textureTwo = new THREE.TextureLoader().load(images.imageTwo);
const textureThree = new THREE.TextureLoader().load(images.imageThree);
const textureFour = new THREE.TextureLoader().load(images.imageFour);

class WebGL {
  constructor() {
    this.container = document.querySelector('main');
    this.links = [...document.querySelectorAll('li.proj')];
    console.log();

    this.isMoving = true;
    this.perspective = 1000;
    this.scene = new THREE.Scene();
    this.sizes = new THREE.Vector2(0, 0);
    this.offset = new THREE.Vector2(0, 0); // Positions of mesh on screen. Will be updated below.
    this.uniforms = {
      uIsMoving: { value: this.isMoving },
      uTexture: { value: new THREE.TextureLoader().load(images.imageThree) },
      uAlpha: { value: 0.0 },
      uOffset: { value: new THREE.Vector2(0.0, 0.0) }
    }
    this.links.forEach((link, idx) => {
      link.addEventListener('mouseenter', () => {
        switch (idx) {
          case 0:
            this.uniforms.uTexture.value = textureOne;
            break;
          case 1:
            this.uniforms.uTexture.value = textureTwo;
            break;
          case 2:
            this.uniforms.uTexture.value = textureThree;
            break;
          case 3:
            this.uniforms.uTexture.value = textureFour;
            break;
        }
      })

      //When link clicked, set mesh width and height to viewport width and height
      link.addEventListener('click', () => {
        this.isMoving = false;
        console.log('clicked', this.isMoving);

        meshWidth = this.viewport.width;
        meshHeight = this.viewport.height;
        this.sizes.set(meshWidth, meshHeight, 1);
        this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);
        targetX = this.viewport.width / 2;
        targetY = this.viewport.height / 2;
      });

      link.addEventListener('mouseleave', () => {
        this.uniforms.uAlpha.value = lerp(this.uniforms.uAlpha.value, 0.0, 0.1);
      });
    })
    this.addEventListeners(document.querySelector('ul.projects'));
    this.setUpCamera();
    this.onMouseMove();
    this.createMesh();
    this.render()

  }

  get viewport() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspectRatio = width / height;

    return {
      width,
      height,
      aspectRatio
    }
  }

  addEventListeners(element) {
    element.addEventListener('mouseenter', () => {
      this.linkHovered = true;
    })
    element.addEventListener('mouseleave', () => {
      this.linkHovered = false;
    })
  }

  setUpCamera() {
    window.addEventListener('resize', this.onWindowResize.bind(this))

    let fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) / Math.PI;
    this.camera = new THREE.PerspectiveCamera(fov, this.viewport.aspectRatio, 0.1, 1000);
    this.camera.position.set(0, 0, this.perspective);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.viewport.width, this.viewport.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement)
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 20, 20);
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      // wireframe: true,
      // side: THREE.DoubleSide
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.sizes.set(meshWidth, meshHeight, 1);
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

    // this.mesh.position.set(this.offset.x, this.offset.y, 0);

    this.scene.add(this.mesh);
  }
  onWindowResize() {

    this.camera.aspect = this.viewport.aspectRatio;
    this.camera.fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) / Math.PI;
    this.renderer.setSize(this.viewport.width, this.viewport.height);
    this.camera.updateProjectionMatrix();
  }

  onMouseMove() {
    console.log('onMouseMove', this.isMoving);
    window.addEventListener('mousemove', (e) => {
      targetX = this.isMoving ? e.clientX : this.viewport.width / 2;
      targetY = this.isMoving ? e.clientY : this.viewport.height / 2;
    })

  }

  render() {
    this.offset.x = lerp(this.offset.x, targetX, 0.1);
    this.offset.y = lerp(this.offset.y, targetY, 0.1);
    this.uniforms.uOffset.value.set((targetX - this.offset.x) * 0.0005, -(targetY - this.offset.y) * 0.0005)
    // this.mesh.scale.set(this.sizes.x, this.sizes.y)
    this.mesh.position.set(this.offset.x - (window.innerWidth / 2), -this.offset.y + (window.innerHeight / 2), 0);

    // set uAlpha when list is hovered / unhovered
    this.linkHovered
      ? this.uniforms.uAlpha.value = lerp(this.uniforms.uAlpha.value, 1.0, 0.1)
      : this.uniforms.uAlpha.value = lerp(this.uniforms.uAlpha.value, 0.0, 0.1);


    for (let i = 0; i < this.links.length; i++) {
      if (this.linkHovered) {
        this.links[i].style.opacity = 0.2
      } else {
        this.links[i].style.opacity = 1
      }


    }

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));

  }

}

new WebGL()