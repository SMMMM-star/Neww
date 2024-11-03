import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STATES_DATA } from '../data/states';

interface Map3DProps {
  selectedState: string;
  selectedZone: string;
}

export default function Map3D({ selectedState, selectedZone }: Map3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const markersRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a192f);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create India map base
    const baseGeometry = new THREE.PlaneGeometry(4, 4);
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const baseMap = new THREE.Mesh(baseGeometry, baseMaterial);
    scene.add(baseMap);

    // Add state markers
    Object.entries(STATES_DATA).forEach(([state, data]) => {
      const markerGeometry = new THREE.SphereGeometry(0.05);
      const markerMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.8
      });
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      
      // Convert coordinates to scene position
      const [lat, long] = data.coordinates;
      const x = (long - 83) / 10; // Centered around India's approximate center
      const y = (lat - 23) / 10;
      
      marker.position.set(x, y, 0.1);
      scene.add(marker);
      markersRef.current.push(marker);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update markers when state is selected
  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      const stateName = Object.keys(STATES_DATA)[index];
      const material = marker.material as THREE.MeshPhongMaterial;
      
      if (stateName === selectedState) {
        material.color.setHex(0x00ff00);
        material.opacity = 1;
        marker.scale.set(2, 2, 2);
      } else {
        material.color.setHex(0xff0000);
        material.opacity = 0.8;
        marker.scale.set(1, 1, 1);
      }
    });
  }, [selectedState]);

  return (
    <div 
      ref={containerRef} 
      className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg"
      style={{ background: 'linear-gradient(to bottom right, #1a365d, #1e40af)' }}
    />
  );
}