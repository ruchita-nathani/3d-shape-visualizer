import React, { useRef, useEffect, useState } from 'react';
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
  const [selectedShapeName, setSelectedShapeName] = useState(null); // State for storing clicked shape name
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const shapeMeshesRef = useRef({});
  const raycasterRef = useRef(new THREE.Raycaster()); // Raycaster for detecting clicks
  const mouseRef = useRef(new THREE.Vector2()); // Mouse position for raycasting

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
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
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

    // Handle mouse clicks
    const handleMouseClick = (event) => {
      // Get the mouse position in normalized device coordinates (-1 to +1)
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Perform raycasting to find intersections
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(
        Object.values(shapeMeshesRef.current)
      );

      if (intersects.length > 0) {
        // Get the first intersected object
        const clickedObject = intersects[0].object;
        const clickedShape = shapes.find(
          (shape) => shapeMeshesRef.current[shape.id] === clickedObject
        );

        if (clickedShape) {
          // Set the clicked shape name to be displayed at the top
          setSelectedShapeName(clickedShape.name);
        }
      }
    };

    // Add event listener for clicks
    renderer.domElement.addEventListener('click', handleMouseClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.domElement.removeEventListener('click', handleMouseClick);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Update shapes when they change
  useEffect(() => {
    if (!sceneRef.current) return;

    // Clear old shapes
    Object.values(shapeMeshesRef.current).forEach((mesh) => {
      sceneRef.current.remove(mesh);
    });
    shapeMeshesRef.current = {};

    // Add new shapes
    shapes.forEach((shape, index) => {
      let geometry;
      let material;
      switch (shape.type) {
        case 'Sphere':
          geometry = new THREE.SphereGeometry(1, 32, 32);
          material = new THREE.MeshPhongMaterial({
            color: 0x8b0000,
          });
          break;
        case 'Cube':
          geometry = new THREE.BoxGeometry(1, 1, 1);
          material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
          });
          break;
        case 'Cylinder':
          geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
          material = new THREE.MeshPhongMaterial({
            color: 0x0000ff,
          });
          break;
        case 'Cone':
          geometry = new THREE.ConeGeometry(1, 2, 32);
          material = new THREE.MeshPhongMaterial({
            color: 0x800080,
          });
          break;
        default:
          return;
      }

      const mesh = new THREE.Mesh(geometry, material);
      const angle = (index / shapes.length) * Math.PI * 2;
      const radius = Math.max(2, shapes.length * 0.5);
      mesh.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

      // Add mesh to scene and store it in the shapeMeshesRef
      sceneRef.current.add(mesh);
      shapeMeshesRef.current[shape.id] = mesh;
    });

    // Update camera position
    if (cameraRef.current) {
      const distance = Math.max(5, shapes.length * 1.5);
      cameraRef.current.position.set(0, distance, distance);
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, [shapes]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Shape name at the top of the screen */}
      {selectedShapeName && (
        <div
          style={{
            position: 'absolute',
            top: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            zIndex: 1,
            fontSize: '18px',
          }}
        >
          {selectedShapeName}
        </div>
      )}
      {/* Three.js canvas */}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default ShapeCanvas;
