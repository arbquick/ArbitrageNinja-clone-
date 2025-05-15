import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface CurrencyAnimation3DProps {
  className?: string;
}

export function CurrencyAnimation3D({ className }: CurrencyAnimation3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const symbolsRef = useRef<THREE.Group>(new THREE.Group());
  const glowRingRef = useRef<THREE.Mesh | null>(null);
  
  // Animation loop
  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    // Rotate the ring
    if (glowRingRef.current) {
      glowRingRef.current.rotation.z += 0.01;
    }
    
    // Rotate all symbols
    symbolsRef.current.children.forEach((child, i) => {
      // Apply different rotation speeds to different symbols
      child.rotation.y += 0.01 * ((i % 3) + 1);
      child.rotation.x += 0.005 * ((i % 2) + 1);
    });
    
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  
  // Init and cleanup
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Setup scene
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true // Allow transparency
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point light in center
    const pointLight = new THREE.PointLight(0x8B5CF6, 2, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);
    
    // Create glowing ring
    const ringGeometry = new THREE.TorusGeometry(2, 0.1, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B5CF6,
      emissive: 0x8B5CF6,
      emissiveIntensity: 0.5,
    });
    const glowRing = new THREE.Mesh(ringGeometry, ringMaterial);
    glowRing.rotation.x = Math.PI / 4;
    scene.add(glowRing);
    glowRingRef.current = glowRing;
    
    // Glow effect
    const glowGeometry = new THREE.TorusGeometry(2, 0.3, 16, 100);
    const glowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.2,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.rotation.x = Math.PI / 4;
    scene.add(glow);
    
    // Add symbols group to scene
    scene.add(symbolsRef.current);
    
    // Currency symbols to represent
    const symbols = [
      { symbol: '$', isCrypto: false },
      { symbol: '€', isCrypto: false },
      { symbol: '£', isCrypto: false },
      { symbol: '¥', isCrypto: false },
      { symbol: 'B', isCrypto: true },  // Bitcoin
      { symbol: 'E', isCrypto: true }   // Ethereum
    ];
    
    // Position symbols in circle around the ring
    const positionSymbol = (index: number, total: number, radius: number) => {
      const angle = (index / total) * Math.PI * 2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: 0
      };
    };
    
    // Create geometric shapes for the symbols
    symbols.forEach((symbolData, i) => {
      let geometry;
      
      if (symbolData.isCrypto) {
        // For crypto symbols use octahedrons (diamond-like)
        geometry = new THREE.OctahedronGeometry(0.4, 0);
      } else {
        // For fiat symbols use cylinders (coin-like)
        geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 32);
      }
      
      // Create different materials based on symbol type
      const color = symbolData.isCrypto ? 0x14B8A6 : 0xFFD700; // Crypto teal, Fiat gold
      const material = new THREE.MeshStandardMaterial({ 
        color: color,
        metalness: symbolData.isCrypto ? 0.9 : 0.7,
        roughness: symbolData.isCrypto ? 0.1 : 0.3,
        emissive: symbolData.isCrypto ? 0x14B8A6 : 0xFFD700,
        emissiveIntensity: symbolData.isCrypto ? 0.4 : 0.2
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      
      // Position around the ring
      const position = positionSymbol(i, symbols.length, 2.5);
      mesh.position.set(position.x, position.y, position.z);
      
      // Add some initial rotation for variety
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      symbolsRef.current.add(mesh);
      
      // Add symbol particle effects for crypto
      if (symbolData.isCrypto) {
        const particles = new THREE.Group();
        const particleCount = 5;
        
        for (let j = 0; j < particleCount; j++) {
          const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
          const particleMaterial = new THREE.MeshBasicMaterial({
            color: 0x14B8A6,
            transparent: true,
            opacity: 0.7
          });
          
          const particle = new THREE.Mesh(particleGeometry, particleMaterial);
          
          // Position particles randomly around the symbol
          const radius = 0.5 + Math.random() * 0.3;
          const angle1 = Math.random() * Math.PI * 2;
          const angle2 = Math.random() * Math.PI * 2;
          
          particle.position.x = position.x + radius * Math.sin(angle1) * Math.cos(angle2);
          particle.position.y = position.y + radius * Math.sin(angle1) * Math.sin(angle2);
          particle.position.z = position.z + radius * Math.cos(angle1);
          
          particles.add(particle);
        }
        
        symbolsRef.current.add(particles);
      }
    });
    
    // Add particles flowing through the ring
    const particleGroup = new THREE.Group();
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.06, 8, 8);
      const isCrypto = i > particleCount / 2;
      const particleColor = isCrypto ? 0x14B8A6 : 0xFFD700;
      
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: particleColor,
        transparent: true,
        opacity: 0.7
      });
      
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      
      // Position on the ring with some randomness
      const angle = (i / particleCount) * Math.PI * 2;
      const ringRadius = 2 + (Math.random() - 0.5) * 0.3;
      particle.position.x = Math.cos(angle) * ringRadius;
      particle.position.y = Math.sin(angle) * ringRadius;
      particle.position.z = (Math.random() - 0.5) * 0.2;
      
      particleGroup.add(particle);
      
      // Animate particles independently
      const animate = () => {
        const speed = 0.02 + Math.random() * 0.02;
        const newAngle = angle + speed;
        
        particle.position.x = Math.cos(newAngle) * ringRadius;
        particle.position.y = Math.sin(newAngle) * ringRadius;
        
        // After completing a circle, change particle type
        if (newAngle > angle + Math.PI * 2) {
          const newColor = isCrypto ? 0xFFD700 : 0x14B8A6;
          (particle.material as THREE.MeshBasicMaterial).color.set(newColor);
        }
      };
      
      // Store animation function on the particle object
      (particle as any).animate = animate;
    }
    
    scene.add(particleGroup);
    
    // Create extended animation function that includes particles
    const animateWithParticles = () => {
      // Call the original animation logic
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      // Rotate the ring
      if (glowRingRef.current) {
        glowRingRef.current.rotation.z += 0.01;
      }
      
      // Rotate all symbols
      symbolsRef.current.children.forEach((child, i) => {
        // Apply different rotation speeds to different symbols
        child.rotation.y += 0.01 * ((i % 3) + 1);
        child.rotation.x += 0.005 * ((i % 2) + 1);
      });
      
      // Animate all particles in the particle group
      particleGroup.children.forEach(particle => {
        if ((particle as any).animate) {
          (particle as any).animate();
        }
      });
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animateWithParticles);
    };
    
    // Start animation with particles
    animateWithParticles();
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className={`w-full h-64 md:h-96 relative ${className}`}
      style={{ 
        background: 'transparent',
      }}
    >
      {/* Fallback/Loading State */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 pointer-events-none">
        <div className="text-4xl text-accent-purple animate-pulse">Loading...</div>
      </div>
    </div>
  );
}