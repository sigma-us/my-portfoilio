import React, { Component } from 'react';
import * as THREE from 'three';
import Vector from '../helpers/vectors';

let scene: THREE.Scene;
let line: any;
const MAX_POINTS = 600;
let drawCount: number;

export default class ThreeJS extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    renderer = new THREE.WebGLRenderer();
    info = document.createElement('div');
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    zoom = 1; inc = 0.00005;
    
    componentDidMount() {
        // this.buildScene();
        this.init();
        this.animate();
        window.addEventListener("resize", this.resize);

    }

    componentWillUnmount() {
        document.body.removeChild(this.renderer.domElement);
        document.body.removeChild(this.info);
        window.removeEventListener("resize", this.resize);
    }

    resize() {
        document.body.removeChild(this.renderer.domElement);
        document.body.removeChild(this.info);
        this.init();
        this.animate();
    }




    init = () => {
        // info
        this.info.style.position = 'absolute';
        this.info.style.top = '30px';
        this.info.style.width = '100%';
        this.info.style.overflow = 'none';
        this.info.style.textAlign = 'center';
        this.info.style.color = '#fff';
        this.info.style.fontWeight = 'bold';
        this.info.style.backgroundColor = 'transparent';
        this.info.style.zIndex = '1';
        this.info.style.fontFamily = 'Monospace';
        this.info.innerHTML = "three.js animated fibonacci sequence using BufferGeometry";
        document.body.appendChild(this.info);

        // renderer
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth - 15, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // scene
        scene = new THREE.Scene();

        // camera
        this.camera.position.set(0, 0, 2000);

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

    fibonacci(): number[] {
        let arr = [1, 1, 2];
        let i = 2;

        while (i < 300) {
            arr[i] = arr[i-2] + arr[i-1];
            i++;
        }

        return arr;
    }

    // update positions
    updatePositions = () => {
        let vectorHelper = new Vector();
        let positions = line.geometry.attributes.position.array;
        let current = vectorHelper.convert(0, 0);
        let index = 0;
        let fib = this.fibonacci();
        let rotationMap = [0, 90, 180, 270];

        for (var i = 0, l = MAX_POINTS; i < l; i++) {
            current = vectorHelper.vectorAdd(current, vectorHelper.convert(rotationMap[i%4], fib[i]))

            positions[index++] = current[0];
            positions[index++] = current[1];
            positions[index++] = 1;
        }

    }

    // render
    render2 = () => {

        this.renderer.render(scene, this.camera);

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


        this.camera.fov = this.camera.fov * this.zoom;
        this.camera.updateProjectionMatrix();
        this.zoom += this.inc;

        this.camera.rotateZ(0.1);

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