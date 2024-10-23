import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Component for rendering a 3D canvas with shapes using Three.js.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.shapes - Array of shape objects to render
 * @param {function} props.onUpdateShape - Function to call when a shape is updated
 * @returns {JSX.Element} The rendered component
 */
const ShapeCanvas = ({ shapes }) => {
    console.log('shapes:',shapes);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const shapeMeshesRef = useRef({});

  useEffect(() => {
    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(ambientLight);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Update shapes when they change
  useEffect(() => {
    if (!sceneRef.current) return;

    // Clear old shapes
    Object.values(shapeMeshesRef.current).forEach(mesh => {
      sceneRef.current.remove(mesh);
    });
    shapeMeshesRef.current = {};

    // Add new shapes
    shapes.forEach((shape, index) => {
      let geometry;
      let material;
      switch (shape.type) {
        case 'sphere':
          geometry = new THREE.SphereGeometry(1, 32, 32);
          material = new THREE.MeshPhongMaterial({
                color: 0x8b0000,
          });
          break;
        case 'cube':
          geometry = new THREE.BoxGeometry(1,1,1);
          material = new THREE.MeshPhongMaterial({
            color: 0x00ff00            ,
          });
          break;
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(1,1,2,32);
          material = new THREE.MeshPhongMaterial({
            color: 0x0000ff,
          });
          break;
        case 'cone':
          geometry = new THREE.ConeGeometry(1,2,32);
          material = new THREE.MeshPhongMaterial({
                color: 0x800080,
          });
          break;
        default:
          return;
      }

      const mesh = new THREE.Mesh(geometry, material);
      
    //   mesh.position.set(shape.x || 0, shape.y || 0, shape.z || 0);
    //   sceneRef.current.add(mesh);
    //   shapeMeshesRef.current[shape.id] = mesh;

      const angle = (index / shapes.length) * Math.PI * 2;
      const radius = Math.max(2, shapes.length * 0.5);
      mesh.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );

      sceneRef.current.add(mesh);
      shapeMeshesRef.current[shape.id] = mesh;
    });

    if (cameraRef.current) {
        const distance = Math.max(5, shapes.length * 1.5);
        cameraRef.current.position.set(0, distance, distance);
        cameraRef.current.lookAt(0, 0, 0);
    }

  }, [shapes]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default ShapeCanvas;