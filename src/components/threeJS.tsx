import React, { Component } from 'react';
import * as THREE from 'three';

let scene: THREE.Scene, camera: THREE.PerspectiveCamera;
let line: any;
const MAX_POINTS = 600;
let drawCount: number;

export default class ThreeJS extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    renderer = new THREE.WebGLRenderer();

    componentDidMount() {
        // this.buildScene();
        this.init();
        this.animate();
        window.addEventListener("resize", this.resize);

    }

    componentWillUnmount() {
        document.body.removeChild(this.renderer.domElement);
        window.removeEventListener("resize", this.resize);
    }

    resize = () => {
        this.init();
        this.animate();
    }




    init = () => {
        // info
        let info = document.createElement('div');
        info.style.position = 'absolute';
        info.style.top = '30px';
        info.style.width = '100%';
        info.style.overflow = 'none';
        info.style.textAlign = 'center';
        info.style.color = '#fff';
        info.style.fontWeight = 'bold';
        info.style.backgroundColor = 'transparent';
        info.style.zIndex = '1';
        info.style.fontFamily = 'Monospace';
        info.innerHTML = "three.js animataed line using BufferGeometry";
        document.body.appendChild(info);

        // renderer
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth - 15, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // scene
        scene = new THREE.Scene();

        // camera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(0, 0, 1000);

        // geometry
        var geometry = new THREE.BufferGeometry();

        // attributes
        var positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // drawcalls
        drawCount = 2; // draw the first 2 points, only
        geometry.setDrawRange(0, drawCount);

        // material
        var material = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });

        // line
        line = new THREE.Line(geometry, material);
        scene.add(line);

        // update positions
        this.updatePositions();
    }

    // update positions
    updatePositions = () => {

        let positions = line.geometry.attributes.position.array;

        let x = 0, y = 0, z = 0, index = 0;

        for (var i = 0, l = MAX_POINTS; i < l; i++) {

            positions[index++] = x;
            positions[index++] = y;
            positions[index++] = z;

            x += (Math.random() - 0.5) * 30;
            y += (Math.random() - 0.5) * 30;
            z += (Math.random() - 0.5) * 30;

        }

    }

    // render
    render2 = () => {

        this.renderer.render(scene, camera);

    }

    // animate
    animate = () => {

        requestAnimationFrame(this.animate);

        drawCount = (drawCount + 1) % MAX_POINTS;

        line.geometry.setDrawRange(0, drawCount);

        if (drawCount === 0) {

            // periodically, generate new data

            this.updatePositions();

            line.geometry.attributes.position.needsUpdate = true; // required after the first render

            line.material.color.setHSL(Math.random(), 1, 0.5);

        }

        this.render2();

    }


    buildScene() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth - 15, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        var geometry = new THREE.BoxGeometry(2, 2, 2);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 6;

        var animate = function () {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.02;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        scene.dispose()
        setTimeout(() => {
            animate();

            renderer.dispose();
            document.body.appendChild(renderer.domElement);

        }, 1000)
    }

    render() {
        return (
            <div></div>
        )
    }
}