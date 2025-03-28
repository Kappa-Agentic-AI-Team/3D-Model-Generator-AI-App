
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const initThreeScene = (container: HTMLElement) => {
  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f7);
  
  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  
  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  
  // Resize handler
  const handleResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  
  animate();
  
  // Return methods to manipulate the scene
  return {
    scene,
    camera,
    renderer,
    controls,
    
    // Method to change background color (for theme changes)
    setBackgroundColor: (color: string) => {
      scene.background = new THREE.Color(color);
    },
    
    // Method to add a room model
    addRoom: (type: 'preset' | 'custom') => {
      // Clear existing room if any
      scene.children.forEach(child => {
        if (child.name === 'room') {
          scene.remove(child);
        }
      });
      
      // Basic room geometry
      const roomGroup = new THREE.Group();
      roomGroup.name = 'room';
      
      // Floor
      const floorGeometry = new THREE.PlaneGeometry(10, 10);
      const floorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xd2c0a6,
        roughness: 0.8
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -2;
      roomGroup.add(floor);
      
      // Back wall
      const backWallGeometry = new THREE.PlaneGeometry(10, 6);
      const wallMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf4f4f4,
        roughness: 0.5
      });
      const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
      backWall.position.z = -5;
      backWall.position.y = 1;
      roomGroup.add(backWall);
      
      // Left wall
      const leftWallGeometry = new THREE.PlaneGeometry(10, 6);
      const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
      leftWall.position.x = -5;
      leftWall.position.y = 1;
      leftWall.rotation.y = Math.PI / 2;
      roomGroup.add(leftWall);
      
      // Right wall
      const rightWallGeometry = new THREE.PlaneGeometry(10, 6);
      const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
      rightWall.position.x = 5;
      rightWall.position.y = 1;
      rightWall.rotation.y = -Math.PI / 2;
      roomGroup.add(rightWall);
      
      // If preset, add some furniture
      if (type === 'preset') {
        // Simple sofa
        const sofaGeometry = new THREE.BoxGeometry(4, 1, 1.5);
        const sofaMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x8c96a9,
          roughness: 0.7
        });
        const sofa = new THREE.Mesh(sofaGeometry, sofaMaterial);
        sofa.position.set(0, -1.5, -3);
        roomGroup.add(sofa);
        
        // Coffee table
        const tableGeometry = new THREE.BoxGeometry(2, 0.5, 1);
        const tableMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x6a4f3b,
          roughness: 0.6
        });
        const table = new THREE.Mesh(tableGeometry, tableMaterial);
        table.position.set(0, -1.75, -1);
        roomGroup.add(table);
        
        // Window
        const windowGeometry = new THREE.PlaneGeometry(3, 3);
        const windowMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xa7c5eb,
          opacity: 0.7,
          transparent: true
        });
        const windowPane = new THREE.Mesh(windowGeometry, windowMaterial);
        windowPane.position.set(0, 1, -4.9);
        roomGroup.add(windowPane);
      }
      
      scene.add(roomGroup);
      return roomGroup;
    },
    
    // Clean up
    dispose: () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
    }
  };
};
