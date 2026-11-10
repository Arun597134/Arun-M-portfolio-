import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';

/**
 * Realistic 3D Solar System (Cinematic 3D IMAX Perspective + Interactive Explorer)
 * Features Implemented (Idea 2):
 * 1. Click-to-Inspect Planet Telemetry (Raycasting + Cinematic Target Tracking + NASA/JPL HUD)
 * 2. 360° Interactive Orbit Controls (Mouse/Touch Drag Orbit + Wheel/Pinch Zoom)
 * 3. Main Asteroid Belt (1,600+ rocky particles between Mars and Jupiter)
 * 4. Periodic Shooting Star Comets with glowing ion particle tails
 * 5. Floating Planet Tour Dock & 360° Free Flight Cockpit Explorer Mode
 */

// =============================================================================
// CELESTIAL BODIES TELEMETRY DATABASE (Authentic NASA / JPL Astrodynamics)
// =============================================================================
const CELESTIAL_DATA = {
  sun: {
    id: 'sun',
    name: 'Sol (The Sun)',
    symbol: '☀️',
    category: 'Spectral Class G2V · Yellow Dwarf Star',
    distance: '0.00 AU · System Center of Mass',
    diameter: '1,392,700 km (109× Earth)',
    temp: '5,500°C Surface · 15,000,000°C Core',
    orbitPeriod: '230 Million Years (Galactic Orbit)',
    rotation: '25.4 Earth Days (Differential)',
    moons: '8 Major Planets · 5 Dwarf Planets · 1.5M+ Asteroids',
    gravity: '274.0 m/s² (28.0g)',
    atmosphere: '73.5% Hydrogen · 24.9% Helium · 1.6% Heavy Elements',
    synopsis: 'The thermonuclear powerhouse of our solar system, converting 600 million tons of hydrogen into helium every second via proton-proton nuclear fusion.',
    techBadge: 'CORE // FOUNDATION SCHEDULER',
  },
  mercury: {
    id: 'mercury',
    name: 'Mercury',
    symbol: '☿',
    category: 'Innermost Terrestrial Planet',
    distance: '57.9 Million km (0.39 AU)',
    diameter: '4,879 km (0.38× Earth)',
    temp: '-180°C (Night) to +430°C (Day)',
    orbitPeriod: '88.0 Earth Days',
    rotation: '58.6 Days (3:2 Spin-Orbit Resonance)',
    moons: '0 (None)',
    gravity: '3.70 m/s² (0.38g)',
    atmosphere: 'Trace Exosphere (Sodium, Potassium, Hydrogen)',
    synopsis: 'Fastest planet in the solar system, traveling at 47 km/s. Its colossal iron core accounts for nearly 75% of its entire planetary radius.',
    techBadge: 'LOW-LATENCY // 47 KM/S EXECUTION',
  },
  venus: {
    id: 'venus',
    name: 'Venus',
    symbol: '♀',
    category: 'Super-Heated Terrestrial Sister Planet',
    distance: '108.2 Million km (0.72 AU)',
    diameter: '12,104 km (0.95× Earth)',
    temp: '465°C (Runaway Greenhouse Trap)',
    orbitPeriod: '224.7 Earth Days',
    rotation: '-243.0 Days (Retrograde Clockwise Spin)',
    moons: '0 (None)',
    gravity: '8.87 m/s² (0.91g)',
    atmosphere: '96.5% Carbon Dioxide · 92 atm Surface Pressure',
    synopsis: 'Shrouded in opaque sulfuric acid clouds, Venus is the hottest planet in the solar system. A day on Venus is longer than its entire planetary year.',
    techBadge: 'THERMAL SHIELD // COMPRESSED STATE',
  },
  earth: {
    id: 'earth',
    name: 'Earth (Terra)',
    symbol: '🌍',
    category: 'The Pale Blue Dot · Home World',
    distance: '149.6 Million km (1.00 AU)',
    diameter: '12,742 km',
    temp: '-88°C to +58°C (Mean: +15°C)',
    orbitPeriod: '365.25 Days (1 Tropical Year)',
    rotation: '23 Hours, 56 Minutes, 04 Seconds',
    moons: '1 (Luna) · 2 Active NASA Orbiters (ISS & Hubble)',
    gravity: '9.807 m/s² (1.00g Baseline)',
    atmosphere: '78.1% Nitrogen · 20.9% Oxygen · 0.93% Argon',
    synopsis: 'The only known celestial body confirmed to harbor biological life, vast liquid surface oceans, active plate tectonics, and dynamic space exploration.',
    techBadge: 'HOST WORLD // CLIENT APPLICATION',
  },
  mars: {
    id: 'mars',
    name: 'Mars',
    symbol: '♂',
    category: 'The Red Planet · Future Frontier',
    distance: '227.9 Million km (1.52 AU)',
    diameter: '6,779 km (0.53× Earth)',
    temp: '-140°C to +20°C (Average: -63°C)',
    orbitPeriod: '687.0 Earth Days (1.88 Earth Years)',
    rotation: '24 Hours, 37 Minutes (1 Sol)',
    moons: '2 (Phobos & Deimos)',
    gravity: '3.72 m/s² (0.38g)',
    atmosphere: '95.3% CO₂ · 2.6% N₂ · 0.006 atm (Thin)',
    synopsis: 'Home to Olympus Mons (tallest shield volcano in the solar system at 21.9 km) and Valles Marineris. Surface oxidized with iron dust giving its crimson tint.',
    techBadge: 'REMOTE NODE // DEPLOYED RUNTIME',
  },
  'asteroid-belt': {
    id: 'asteroid-belt',
    name: 'Main Asteroid Belt',
    symbol: '☄️',
    category: 'Circumstellar Torus of Primordial Remnants',
    distance: '329 - 478 Million km (2.2 - 3.2 AU)',
    diameter: '150 Million km Toroidal Band Span',
    temp: '-73°C (Mean Equilibrium)',
    orbitPeriod: '3.0 to 6.0 Earth Years',
    rotation: 'Chaotic Multi-Axis Tumble',
    moons: '1.5+ Million Bodies > 1 km (Ceres, Vesta, Pallas)',
    gravity: 'Micro-Gravity (< 0.03g)',
    atmosphere: 'Interplanetary Vacuum & Solar Wind Dust',
    synopsis: 'A vast ring of cosmic rock and metallic chondrite that failed to coalesce into a planet due to massive gravitational perturbations from neighboring Jupiter.',
    techBadge: 'DISTRIBUTED DATA // PARTICLE CLOUD',
  },
  jupiter: {
    id: 'jupiter',
    name: 'Jupiter',
    symbol: '♃',
    category: 'Gas Giant · King of Planets',
    distance: '778.5 Million km (5.20 AU)',
    diameter: '139,820 km (11.0× Earth)',
    temp: '-110°C (Outer Cloud Tops)',
    orbitPeriod: '11.86 Earth Years',
    rotation: '9 Hours, 55 Minutes (Fastest Spin in System)',
    moons: '95 Confirmed (Io, Europa, Ganymede, Callisto)',
    gravity: '24.79 m/s² (2.53g)',
    atmosphere: '89.8% Hydrogen · 10.2% Helium · Trace Methane',
    synopsis: 'With a mass 2.5x all other planets combined, Jupiter acts as a gravitational shield for Earth. The iconic Great Red Spot storm is larger than Earth.',
    techBadge: 'BIG DATA ENGINE // MEGA CLUSTER',
  },
  saturn: {
    id: 'saturn',
    name: 'Saturn',
    symbol: '♄',
    category: 'Ringed Wonder · Gas Giant',
    distance: '1.43 Billion km (9.58 AU)',
    diameter: '116,460 km (9.1× Earth)',
    temp: '-140°C (Cloud Tops)',
    orbitPeriod: '29.45 Earth Years',
    rotation: '10 Hours, 33 Minutes',
    moons: '146 Confirmed (Titan with Liquid Hydrocarbon Lakes)',
    gravity: '10.44 m/s² (1.06g · Density < Water: 0.69 g/cm³)',
    atmosphere: '96.3% Hydrogen · 3.25% Helium · Trace Phosphine',
    synopsis: 'Famous for its ethereal rings spanning 282,000 km but measuring merely ~10 meters in thickness, consisting of billions of water-ice and rock fragments.',
    techBadge: 'HIGH-FREQUENCY BUS // MULTI-TIER RINGS',
  },
  uranus: {
    id: 'uranus',
    name: 'Uranus',
    symbol: '♅',
    category: 'The Sideways Ice Giant',
    distance: '2.87 Billion km (19.2 AU)',
    diameter: '50,724 km (4.0× Earth)',
    temp: '-195°C (Lowest Recorded: -224°C)',
    orbitPeriod: '84.0 Earth Years',
    rotation: '-17 Hours, 14 Minutes (Axial Tilt: 97.8°)',
    moons: '28 Confirmed (Titania, Oberon, Miranda, Ariel)',
    gravity: '8.69 m/s² (0.89g)',
    atmosphere: 'Hydrogen, Helium & Methane (Pale Cyan Absorption)',
    synopsis: 'An ice giant that orbits tilted completely on its side, producing 42 years of continuous polar daylight followed by 42 years of night.',
    techBadge: 'NON-BLOCKING ASYNC // 90° ROTATION',
  },
  neptune: {
    id: 'neptune',
    name: 'Neptune',
    symbol: '♆',
    category: 'The Supersonic Ice Giant',
    distance: '4.50 Billion km (30.1 AU)',
    diameter: '49,244 km (3.9× Earth)',
    temp: '-201°C (Deep Frozen Cloud Tops)',
    orbitPeriod: '164.8 Earth Years',
    rotation: '16 Hours, 06 Minutes',
    moons: '16 Confirmed (Triton with Active Cryovolcanoes)',
    gravity: '11.15 m/s² (1.14g)',
    atmosphere: 'Hydrogen, Helium & Trace Methane (Vivid Azure)',
    synopsis: 'Features the most violent supersonic winds recorded in the solar system, topping 2,100 km/h. Takes 165 Earth years to complete a single revolution around the Sun.',
    techBadge: 'EDGE GATEWAY // ULTRA HIGH-SPEED BUFFER',
  },
};

const PLANET_ORDER = ['sun', 'mercury', 'venus', 'earth', 'mars', 'asteroid-belt', 'jupiter', 'saturn', 'uranus', 'neptune'];

// =============================================================================
// PROCEDURAL CANVAS TEXTURE GENERATORS
// =============================================================================
function createSunTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#fef08a');
  grad.addColorStop(0.3, '#f59e0b');
  grad.addColorStop(0.7, '#d97706');
  grad.addColorStop(1, '#b45309');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 9 + 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(120, 53, 15, 0.45)';
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * 512;
    const y = 80 + Math.random() * 96;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 6 + 2, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(c);
}

function createMercuryTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#64748b';
  ctx.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 350; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(30, 41, 59, 0.4)' : 'rgba(203, 213, 225, 0.35)';
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 7 + 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(c);
}

function createVenusTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#fef3c7');
  grad.addColorStop(0.5, '#f59e0b');
  grad.addColorStop(1, '#b45309');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = 'rgba(254, 240, 138, 0.3)';
  for (let i = 0; i < 35; i++) {
    ctx.fillRect(0, Math.random() * 256, 512, Math.random() * 14 + 3);
  }
  return new THREE.CanvasTexture(c);
}

function createEarthTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(0, 0, 512, 256);

  // Continents
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.ellipse(320, 110, 80, 50, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#a16207';
  ctx.beginPath();
  ctx.ellipse(310, 120, 45, 25, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#166534';
  ctx.beginPath();
  ctx.ellipse(140, 95, 45, 40, -0.3, 0, Math.PI * 2);
  ctx.ellipse(170, 175, 35, 55, 0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ca8a04';
  ctx.beginPath();
  ctx.ellipse(420, 185, 30, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 512, 18);
  ctx.fillRect(0, 238, 512, 18);

  // Clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.ellipse(Math.random() * 512, 30 + Math.random() * 196, Math.random() * 40 + 10, Math.random() * 8 + 2, Math.random() * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(c);
}

function createMarsTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#c2410c';
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = '#7c2d12';
  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 35 + 8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#ffedd5';
  ctx.fillRect(0, 0, 512, 14);
  ctx.fillRect(0, 244, 512, 12);
  return new THREE.CanvasTexture(c);
}

function createJupiterTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  const bands = ['#fde68a', '#d97706', '#fed7aa', '#b45309', '#fef3c7', '#92400e', '#fef08a'];
  let y = 0;
  while (y < 256) {
    const h = Math.random() * 18 + 8;
    ctx.fillStyle = bands[Math.floor(Math.random() * bands.length)];
    ctx.fillRect(0, y, 512, h);
    y += h;
  }
  ctx.fillStyle = '#b91c1c';
  ctx.beginPath();
  ctx.ellipse(320, 160, 36, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.ellipse(320, 160, 22, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(c);
}

function createSaturnTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  const bands = ['#fef3c7', '#fde68a', '#f59e0b', '#d97706', '#fef08a'];
  let y = 0;
  while (y < 256) {
    const h = Math.random() * 16 + 6;
    ctx.fillStyle = bands[Math.floor(Math.random() * bands.length)];
    ctx.fillRect(0, y, 512, h);
    y += h;
  }
  return new THREE.CanvasTexture(c);
}

function createSaturnRingTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 1;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.15, 'rgba(254, 240, 138, 0.85)');
  grad.addColorStop(0.55, 'rgba(217, 119, 6, 0.9)');
  grad.addColorStop(0.68, 'rgba(0, 0, 0, 0.1)');
  grad.addColorStop(0.72, 'rgba(253, 230, 138, 0.8)');
  grad.addColorStop(0.95, 'rgba(180, 83, 9, 0.5)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 1);
  return new THREE.CanvasTexture(c);
}

function createUranusTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#a5f3fc');
  grad.addColorStop(0.5, '#06b6d4');
  grad.addColorStop(1, '#0891b2');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  for (let i = 0; i < 20; i++) {
    ctx.fillRect(0, Math.random() * 256, 512, Math.random() * 10 + 2);
  }
  return new THREE.CanvasTexture(c);
}

function createNeptuneTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#38bdf8');
  grad.addColorStop(0.4, '#1d4ed8');
  grad.addColorStop(1, '#1e3a8a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = '#172554';
  ctx.beginPath();
  ctx.ellipse(280, 110, 42, 22, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  for (let i = 0; i < 30; i++) {
    ctx.fillRect(Math.random() * 512, Math.random() * 256, Math.random() * 45 + 10, 2);
  }
  return new THREE.CanvasTexture(c);
}

function createMoonTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#475569' : '#cbd5e1';
    ctx.beginPath();
    ctx.arc(Math.random() * 256, Math.random() * 128, Math.random() * 4 + 1, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(c);
}

function createAsteroidTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#18181b';
  ctx.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 120; i++) {
    ctx.fillStyle = Math.random() > 0.6 ? '#71717a' : '#27272a';
    ctx.beginPath();
    ctx.arc(Math.random() * 256, Math.random() * 128, Math.random() * 5 + 1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#ea580c';
  for (let i = 0; i < 15; i++) {
    ctx.fillRect(Math.random() * 256, Math.random() * 128, Math.random() * 18 + 4, 1.5);
  }
  return new THREE.CanvasTexture(c);
}

// NASA SATELLITE BUILDER (ISS / Hubble Style)
function buildNasaSatellite(type = 'iss') {
  const group = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.9,
    roughness: 0.25,
  });
  const body = new THREE.Mesh(
    type === 'iss' ? new THREE.BoxGeometry(1.0, 1.0, 2.4) : new THREE.CylinderGeometry(0.7, 0.7, 2.4, 12),
    bodyMat
  );
  group.add(body);

  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    metalness: 0.85,
    roughness: 0.2,
  });
  const leftWing = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.08, 1.2), panelMat);
  leftWing.position.x = -2.0;
  group.add(leftWing);

  const rightWing = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.08, 1.2), panelMat);
  rightWing.position.x = 2.0;
  group.add(rightWing);

  const beaconMat = new THREE.MeshBasicMaterial({
    color: type === 'iss' ? 0x38bdf8 : 0xef4444,
  });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.4, 6, 6), beaconMat);
  beacon.position.y = 0.8;
  group.add(beacon);

  return { group, beaconMat };
}

// =============================================================================
// MAIN COMPONENT: 3D REALISTIC SOLAR SYSTEM (IDEA 2: INTERACTIVE IMAX SIMULATOR)
// =============================================================================
function RealisticSolarSystem() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // React state for HUD Telemetry inspection and 360 Explorer mode
  const [selectedBodyId, setSelectedBodyId] = useState(null);
  const [isExplorerMode, setIsExplorerMode] = useState(false);

  // Synchronized state ref for 120 FPS animation loop without re-triggering Three.js useEffect
  const selectedBodyRef = useRef(null);
  const selectBodyCallbackRef = useRef(null);
  const resetOrbitCallbackRef = useRef(null);

  // Keep ref synchronized with state
  useEffect(() => {
    selectedBodyRef.current = selectedBodyId;
  }, [selectedBodyId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspect = width / height;
    let isCurrentMobile = width < 768 || window.matchMedia('(pointer: coarse)').matches;
    const dpr = isCurrentMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);

    const calcFov = (w, h) => {
      const a = w / h;
      return a < 1.0 ? Math.min(68, Math.max(52, 46 / Math.pow(a, 0.45))) : 46;
    };

    let baseCamY = aspect < 1.0 ? 115 : 130;
    let baseCamZ = aspect < 1.0 ? 490 : 420;
    let baseLookY = aspect < 1.0 ? 68 : 75;
    let baseSysY = aspect < 1.0 ? 68 : 80;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.0004);

    const camera = new THREE.PerspectiveCamera(calcFov(width, height), aspect, 0.5, 6500);
    camera.position.set(0, baseCamY, baseCamZ);
    camera.lookAt(0, baseLookY, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);

    // =========================================================================
    // 2. DENSE COSMIC STARFIELD & EXPANSIVE MILKY WAY GALAXY
    // =========================================================================
    const cosmosGroup = new THREE.Group();
    scene.add(cosmosGroup);

    // A. Stars
    const starCount = isCurrentMobile ? 1800 : 4800;
    const starPos = [];
    const starColors = [];
    const starPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xfbbf24),
      new THREE.Color(0xa855f7),
      new THREE.Color(0xf472b6),
      new THREE.Color(0x60a5fa),
    ];
    for (let i = 0; i < starCount; i++) {
      starPos.push(
        (Math.random() - 0.5) * 4400,
        (Math.random() - 0.5) * 3200,
        -Math.random() * 2600 - 300
      );
      const c = starPalette[Math.floor(Math.random() * starPalette.length)];
      starColors.push(c.r, c.g, c.b);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    cosmosGroup.add(starField);

    // B. Milky Way Nebula Clouds
    const nebCount = isCurrentMobile ? 1200 : 3600;
    const nebPos = [];
    const nebColors = [];
    const nebPalette = [
      new THREE.Color(0x7c3aed),
      new THREE.Color(0xec4899),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xfbbf24),
      new THREE.Color(0x3b82f6),
      new THREE.Color(0xa855f7),
    ];

    for (let i = 0; i < nebCount; i++) {
      let u, v, w;
      if (i < nebCount * 0.55) {
        u = (Math.random() - 0.5) * 3200;
        v = u * 0.44 + (Math.random() - 0.5) * 320;
        w = -700 - Math.random() * 1100;
      } else if (i < nebCount * 0.78) {
        u = -1600 + (Math.random() - 0.5) * 1600;
        v = 400 + Math.random() * 1400;
        w = -800 - Math.random() * 1000;
      } else {
        u = 400 + Math.random() * 2000;
        v = -400 - Math.random() * 1400;
        w = -800 - Math.random() * 1000;
      }
      nebPos.push(u, v, w);
      const c = nebPalette[Math.floor(Math.random() * nebPalette.length)];
      nebColors.push(c.r, c.g, c.b);
    }
    const nebGeo = new THREE.BufferGeometry();
    nebGeo.setAttribute('position', new THREE.Float32BufferAttribute(nebPos, 3));
    nebGeo.setAttribute('color', new THREE.Float32BufferAttribute(nebColors, 3));
    const nebMat = new THREE.PointsMaterial({
      size: isCurrentMobile ? 8.0 : 13.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const nebulaField = new THREE.Points(nebGeo, nebMat);
    cosmosGroup.add(nebulaField);

    // =========================================================================
    // 3. ELEVATED SOLAR SYSTEM GROUP (ELEVATED VIEWPORT CENTERPIECE)
    // =========================================================================
    const solarSystem = new THREE.Group();
    solarSystem.position.set(0, baseSysY, 0);
    if (aspect < 1.0) {
      solarSystem.scale.setScalar(Math.min(0.68, Math.max(0.48, width / 720)));
    }
    scene.add(solarSystem);

    // Raycast pickable celestial meshes registry
    const pickableObjects = [];

    // =========================================================================
    // 4. CENTRAL SUN: WARM INCANDESCENT STAR
    // =========================================================================
    const SUN_RADIUS = 36.0;
    const sunTex = createSunTexture();
    const sunGeo = new THREE.SphereGeometry(SUN_RADIUS, 48, 48);
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTex,
      color: 0xffedd5,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.userData = { bodyId: 'sun', inspectDistance: 155 };
    solarSystem.add(sunMesh);
    pickableObjects.push(sunMesh);

    // Generous invisible hit-sphere for effortless touch & tap on mobile & desktop
    const sunHitGeo = new THREE.SphereGeometry(SUN_RADIUS + 16, 16, 16);
    const sunHitMat = new THREE.MeshBasicMaterial({ visible: false });
    const sunHitMesh = new THREE.Mesh(sunHitGeo, sunHitMat);
    sunHitMesh.userData = { bodyId: 'sun', inspectDistance: 155 };
    solarSystem.add(sunHitMesh);
    pickableObjects.push(sunHitMesh);

    // Point Light emitting from Sun to illuminate all 8 planets
    const sunLight = new THREE.PointLight(0xfffbeb, 4.0, 1800, 0.45);
    solarSystem.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.45);
    scene.add(ambientLight);

    // Corona flares
    const coronaMat1 = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(1.0, 0.65, 0.15, 1.0) * intensity * 2.2;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const coronaMesh1 = new THREE.Mesh(new THREE.SphereGeometry(SUN_RADIUS * 1.25, 32, 32), coronaMat1);
    solarSystem.add(coronaMesh1);

    const coronaMat2 = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.5);
          gl_FragColor = vec4(1.0, 0.35, 0.05, 1.0) * intensity * 1.8;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const coronaMesh2 = new THREE.Mesh(new THREE.SphereGeometry(SUN_RADIUS * 1.55, 32, 32), coronaMat2);
    solarSystem.add(coronaMesh2);

    // =========================================================================
    // 5. THE 8 PLANETS CONFIGURATION
    // =========================================================================
    const moonTex = createMoonTexture();

    const PLANET_CONFIG = [
      {
        id: 'mercury',
        name: 'Mercury',
        dist: SUN_RADIUS + 42,
        radius: 5.2,
        texture: createMercuryTexture(),
        orbitSpeed: 0.022,
        rotSpeed: 0.012,
        hasMoon: true,
        moonDist: 10,
        moonRadius: 1.3,
        inspectDistance: 32,
      },
      {
        id: 'venus',
        name: 'Venus',
        dist: SUN_RADIUS + 78,
        radius: 8.4,
        texture: createVenusTexture(),
        orbitSpeed: 0.016,
        rotSpeed: -0.008,
        hasMoon: false,
        inspectDistance: 42,
      },
      {
        id: 'earth',
        name: 'Earth',
        dist: SUN_RADIUS + 124,
        radius: 10.2,
        texture: createEarthTexture(),
        orbitSpeed: 0.012,
        rotSpeed: 0.018,
        hasMoon: true,
        moonDist: 23,
        moonRadius: 2.5,
        isEarth: true,
        inspectDistance: 50,
      },
      {
        id: 'mars',
        name: 'Mars',
        dist: SUN_RADIUS + 170,
        radius: 6.8,
        texture: createMarsTexture(),
        orbitSpeed: 0.0095,
        rotSpeed: 0.016,
        hasMoon: true,
        moonDist: 15,
        moonRadius: 1.6,
        inspectDistance: 38,
      },
      {
        id: 'jupiter',
        name: 'Jupiter',
        dist: SUN_RADIUS + 255,
        radius: 25.0,
        texture: createJupiterTexture(),
        orbitSpeed: 0.0065,
        rotSpeed: 0.026,
        hasMoon: true,
        moonDist: 42,
        moonRadius: 3.8,
        inspectDistance: 92,
      },
      {
        id: 'saturn',
        name: 'Saturn',
        dist: SUN_RADIUS + 340,
        radius: 19.5,
        texture: createSaturnTexture(),
        orbitSpeed: 0.0048,
        rotSpeed: 0.022,
        hasMoon: true,
        moonDist: 54,
        moonRadius: 3.2,
        hasRings: true,
        ringInner: 26,
        ringOuter: 52,
        inspectDistance: 95,
      },
      {
        id: 'uranus',
        name: 'Uranus',
        dist: SUN_RADIUS + 415,
        radius: 13.5,
        texture: createUranusTexture(),
        orbitSpeed: 0.0034,
        rotSpeed: 0.018,
        hasMoon: true,
        moonDist: 28,
        moonRadius: 2.4,
        inspectDistance: 68,
      },
      {
        id: 'neptune',
        name: 'Neptune',
        dist: SUN_RADIUS + 485,
        radius: 13.0,
        texture: createNeptuneTexture(),
        orbitSpeed: 0.0024,
        rotSpeed: 0.017,
        hasMoon: true,
        moonDist: 28,
        moonRadius: 2.4,
        inspectDistance: 68,
      },
    ];

    const planets = [];

    // Silver Hairline Glowing Orbit Line Material
    const orbitLineMat = new THREE.LineBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    let earthRef = null;
    let earthSatellites = [];

    PLANET_CONFIG.forEach((cfg, idx) => {
      // 1. Orbital Ring
      const orbitGeo = new THREE.BufferGeometry();
      const orbitPts = [];
      const segs = 128;
      for (let i = 0; i <= segs; i++) {
        const th = (i / segs) * Math.PI * 2;
        orbitPts.push(new THREE.Vector3(Math.cos(th) * cfg.dist, 0, Math.sin(th) * cfg.dist));
      }
      orbitGeo.setFromPoints(orbitPts);
      const orbitMesh = new THREE.Line(orbitGeo, orbitLineMat);
      solarSystem.add(orbitMesh);

      // 2. Planet Container Group
      const planetGroup = new THREE.Group();
      solarSystem.add(planetGroup);

      // 3. Planet Mesh
      const pGeo = new THREE.SphereGeometry(cfg.radius, 32, 32);
      const pMat = new THREE.MeshStandardMaterial({
        map: cfg.texture,
        roughness: 0.7,
        metalness: 0.1,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.userData = { bodyId: cfg.id, inspectDistance: cfg.inspectDistance };
      planetGroup.add(pMesh);
      pickableObjects.push(pMesh);

      // Generous invisible hit-sphere for effortless mobile/desktop finger tap
      const hitRadius = Math.max(22, cfg.radius * 2.4);
      const hitGeo = new THREE.SphereGeometry(hitRadius, 14, 14);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.userData = { bodyId: cfg.id, inspectDistance: cfg.inspectDistance };
      planetGroup.add(hitMesh);
      pickableObjects.push(hitMesh);

      // 4. Saturn Rings
      if (cfg.hasRings) {
        const ringGeo = new THREE.RingGeometry(cfg.ringInner, cfg.ringOuter, 64);
        const pos = ringGeo.attributes.position;
        const uvs = ringGeo.attributes.uv;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const r = Math.sqrt(x * x + y * y);
          const u = (r - cfg.ringInner) / (cfg.ringOuter - cfg.ringInner);
          uvs.setXY(i, u, 0.5);
        }
        ringGeo.uvsNeedUpdate = true;

        const ringMat = new THREE.MeshBasicMaterial({
          map: createSaturnRingTexture(),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
        });
        const saturnRing = new THREE.Mesh(ringGeo, ringMat);
        saturnRing.rotation.x = Math.PI / 2 + 0.45;
        planetGroup.add(saturnRing);
      }

      // 5. Orbiting Moon
      let moonMesh = null;
      if (cfg.hasMoon) {
        const mOrbitGeo = new THREE.BufferGeometry();
        const mPts = [];
        for (let i = 0; i <= 48; i++) {
          const th = (i / 48) * Math.PI * 2;
          mPts.push(new THREE.Vector3(Math.cos(th) * cfg.moonDist, 0, Math.sin(th) * cfg.moonDist));
        }
        mOrbitGeo.setFromPoints(mPts);
        const moonOrbitLine = new THREE.Line(
          mOrbitGeo,
          new THREE.LineBasicMaterial({
            color: 0x94a3b8,
            transparent: true,
            opacity: 0.24,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })
        );
        planetGroup.add(moonOrbitLine);

        const mGeo = new THREE.SphereGeometry(cfg.moonRadius, 16, 16);
        const mMat = new THREE.MeshStandardMaterial({
          map: moonTex,
          roughness: 0.85,
        });
        moonMesh = new THREE.Mesh(mGeo, mMat);
        planetGroup.add(moonMesh);
      }

      // 6. NASA SATELLITES AROUND EARTH
      if (cfg.isEarth) {
        earthRef = planetGroup;

        const sat1 = buildNasaSatellite('iss');
        planetGroup.add(sat1.group);

        const sat2 = buildNasaSatellite('hubble');
        planetGroup.add(sat2.group);

        const sat1LineGeo = new THREE.BufferGeometry();
        const sat1Pts = [];
        for (let i = 0; i <= 36; i++) {
          const th = (i / 36) * Math.PI * 2;
          sat1Pts.push(new THREE.Vector3(Math.cos(th) * 14.5, Math.sin(th) * 3, Math.sin(th) * 14.5));
        }
        sat1LineGeo.setFromPoints(sat1Pts);
        planetGroup.add(new THREE.Line(sat1LineGeo, new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.22, depthWrite: false })));

        const sat2LineGeo = new THREE.BufferGeometry();
        const sat2Pts = [];
        for (let i = 0; i <= 36; i++) {
          const th = (i / 36) * Math.PI * 2;
          sat2Pts.push(new THREE.Vector3(Math.cos(th) * 18.0, Math.sin(th) * -5, Math.sin(th) * 18.0));
        }
        sat2LineGeo.setFromPoints(sat2Pts);
        planetGroup.add(new THREE.Line(sat2LineGeo, new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.20, depthWrite: false })));

        earthSatellites = [
          { group: sat1.group, beacon: sat1.beaconMat, radius: 14.5, angle: 0, speed: 0.045, tiltY: 0.25 },
          { group: sat2.group, beacon: sat2.beaconMat, radius: 18.0, angle: Math.PI, speed: 0.032, tiltY: -0.4 },
        ];
      }

      const initialAngle = (idx * (Math.PI * 2)) / PLANET_CONFIG.length + Math.random() * 0.4;

      planets.push({
        id: cfg.id,
        group: planetGroup,
        mesh: pMesh,
        dist: cfg.dist,
        angle: initialAngle,
        orbitSpeed: cfg.orbitSpeed,
        rotSpeed: cfg.rotSpeed,
        hasMoon: cfg.hasMoon,
        moon: moonMesh,
        moonDist: cfg.moonDist,
        moonAngle: Math.random() * Math.PI * 2,
        moonSpeed: 0.045,
        inspectDistance: cfg.inspectDistance,
      });
    });

    // =========================================================================
    // 6. MAIN ASTEROID BELT (BETWEEN MARS AND JUPITER)
    // =========================================================================
    const asteroidBeltGroup = new THREE.Group();
    solarSystem.add(asteroidBeltGroup);

    const BELT_COUNT = isCurrentMobile ? 850 : 1800;
    const beltPositions = [];
    const beltColors = [];
    const beltPalette = [
      new THREE.Color(0xa8a29e), // Stone Gray
      new THREE.Color(0x78716c), // Carbon Silicate
      new THREE.Color(0x57534e), // Dark Basalt
      new THREE.Color(0xd6d3d1), // Metallic Chondrite
      new THREE.Color(0xf59e0b), // Subtle Amber Spec
    ];

    for (let i = 0; i < BELT_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 208 + Math.random() * 32; // Exactly between Mars (206) and Jupiter (291)
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 14;
      const z = Math.sin(angle) * radius;

      beltPositions.push(x, y, z);
      const c = beltPalette[Math.floor(Math.random() * beltPalette.length)];
      beltColors.push(c.r, c.g, c.b);
    }

    const beltGeo = new THREE.BufferGeometry();
    beltGeo.setAttribute('position', new THREE.Float32BufferAttribute(beltPositions, 3));
    beltGeo.setAttribute('color', new THREE.Float32BufferAttribute(beltColors, 3));

    const beltMat = new THREE.PointsMaterial({
      size: isCurrentMobile ? 1.8 : 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const asteroidBelt = new THREE.Points(beltGeo, beltMat);
    asteroidBelt.userData = { bodyId: 'asteroid-belt', inspectDistance: 310 };
    asteroidBeltGroup.add(asteroidBelt);
    pickableObjects.push(asteroidBelt);

    // =========================================================================
    // 7. SLOW-MOVING CRAGGY METEORITE WITH FIERY PLASMA TRAIL
    // =========================================================================
    const asteroidGroup = new THREE.Group();
    solarSystem.add(asteroidGroup);

    const astGeo = new THREE.DodecahedronGeometry(4.2, 1);
    const vPos = astGeo.attributes.position;
    for (let i = 0; i < vPos.count; i++) {
      const vx = vPos.getX(i);
      const vy = vPos.getY(i);
      const vz = vPos.getZ(i);
      const factor = 1 + (Math.sin(vx * 3) + Math.cos(vy * 3) + Math.sin(vz * 3)) * 0.12;
      vPos.setXYZ(i, vx * factor, vy * factor, vz * factor);
    }
    astGeo.computeVertexNormals();

    const astTex = createAsteroidTexture();
    const astMat = new THREE.MeshStandardMaterial({
      map: astTex,
      roughness: 0.9,
      metalness: 0.15,
      emissive: 0x7c2d12,
      emissiveIntensity: 0.45,
    });
    const asteroidStone = new THREE.Mesh(astGeo, astMat);
    asteroidGroup.add(asteroidStone);

    const astFireLight = new THREE.PointLight(0xf97316, 2.5, 60, 1.2);
    asteroidGroup.add(astFireLight);

    const FLAME_COUNT = 55;
    const flamePositions = new Float32Array(FLAME_COUNT * 3);
    const flameColors = new Float32Array(FLAME_COUNT * 3);
    const flameHistory = [];

    for (let i = 0; i < FLAME_COUNT; i++) {
      flamePositions[i * 3] = 0;
      flamePositions[i * 3 + 1] = 0;
      flamePositions[i * 3 + 2] = 0;

      const ratio = i / FLAME_COUNT;
      const r = 1.0;
      const g = 0.9 - ratio * 0.7;
      const b = 0.3 - ratio * 0.28;
      flameColors[i * 3] = r;
      flameColors[i * 3 + 1] = Math.max(0, g);
      flameColors[i * 3 + 2] = Math.max(0, b);

      flameHistory.push(new THREE.Vector3());
    }

    const flameGeo = new THREE.BufferGeometry();
    flameGeo.setAttribute('position', new THREE.BufferAttribute(flamePositions, 3));
    flameGeo.setAttribute('color', new THREE.BufferAttribute(flameColors, 3));

    const flameMat = new THREE.PointsMaterial({
      size: isCurrentMobile ? 3.8 : 5.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const flameTrail = new THREE.Points(flameGeo, flameMat);
    solarSystem.add(flameTrail);

    let asteroidProgress = 0;

    function getAsteroidPosition(t, currentEarthPos) {
      const startX = 360;
      const startY = 140;
      const startZ = -420;

      const missX = currentEarthPos.x + 38;
      const missY = currentEarthPos.y + 26;
      const missZ = currentEarthPos.z + 34;

      const endX = -380;
      const endY = -120;
      const endZ = 380;

      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;

      const x = uu * startX + 2 * u * t * missX + tt * endX;
      const y = uu * startY + 2 * u * t * missY + tt * endY;
      const z = uu * startZ + 2 * u * t * missZ + tt * endZ;

      return new THREE.Vector3(x, y, z);
    }

    // =========================================================================
    // 8. PERIODIC SHOOTING STAR COMET SYSTEM
    // =========================================================================
    const COMET_TRAIL_COUNT = 40;
    const cometGroup = new THREE.Group();
    scene.add(cometGroup);

    const cometHeadMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const cometHead = new THREE.Mesh(new THREE.SphereGeometry(1.6, 8, 8), cometHeadMat);
    cometGroup.add(cometHead);

    const cometLight = new THREE.PointLight(0x38bdf8, 3.0, 90, 1.0);
    cometGroup.add(cometLight);

    const cometTrailPos = new Float32Array(COMET_TRAIL_COUNT * 3);
    const cometTrailColors = new Float32Array(COMET_TRAIL_COUNT * 3);
    const cometTrailHistory = [];
    for (let i = 0; i < COMET_TRAIL_COUNT; i++) {
      cometTrailPos[i * 3] = 0;
      cometTrailPos[i * 3 + 1] = 0;
      cometTrailPos[i * 3 + 2] = 0;

      const ratio = i / COMET_TRAIL_COUNT;
      cometTrailColors[i * 3] = 0.2 + (1.0 - ratio) * 0.8;
      cometTrailColors[i * 3 + 1] = 0.7 + (1.0 - ratio) * 0.3;
      cometTrailColors[i * 3 + 2] = 1.0;
      cometTrailHistory.push(new THREE.Vector3());
    }

    const cometTrailGeo = new THREE.BufferGeometry();
    cometTrailGeo.setAttribute('position', new THREE.BufferAttribute(cometTrailPos, 3));
    cometTrailGeo.setAttribute('color', new THREE.BufferAttribute(cometTrailColors, 3));
    const cometTrailMat = new THREE.PointsMaterial({
      size: isCurrentMobile ? 3.0 : 4.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const cometTrail = new THREE.Points(cometTrailGeo, cometTrailMat);
    scene.add(cometTrail);

    const cometState = {
      active: false,
      pos: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      life: 0,
      maxLife: 130,
      spawnCooldown: 180, // initial launch in ~3s
    };

    function spawnShootingComet() {
      cometState.active = true;
      cometState.life = 0;
      cometState.maxLife = 120 + Math.random() * 40;

      // Start from upper-left background
      cometState.pos.set(
        -1200 + Math.random() * 400,
        500 + Math.random() * 300,
        -900 - Math.random() * 400
      );

      // Velocity vectors shooting down-right across screen
      cometState.vel.set(
        22 + Math.random() * 8,
        -14 - Math.random() * 6,
        18 + Math.random() * 8
      );

      cometGroup.visible = true;
      cometTrail.visible = true;
      for (let i = 0; i < COMET_TRAIL_COUNT; i++) {
        cometTrailHistory[i].copy(cometState.pos);
      }
    }

    cometGroup.visible = false;
    cometTrail.visible = false;

    // =========================================================================
    // 9. 360° INTERACTIVE ORBIT CONTROLS, GYRO TILT & CINEMATIC TARGET TRACKING
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2();

    const controlsState = {
      isDragging: false,
      pointerStartX: 0,
      pointerStartY: 0,
      pointerPrevX: 0,
      pointerPrevY: 0,
      totalDragDistance: 0,
      orbitTheta: 0,
      orbitPhi: 0.28,
      targetTheta: 0,
      targetPhi: 0.28,
      camDist: baseCamZ,
      targetDist: baseCamZ,
      lookTarget: new THREE.Vector3(0, baseSysY, 0),
      currentLook: new THREE.Vector3(0, baseSysY, 0),
      ambientParallaxX: 0,
      ambientParallaxY: 0,
    };

    // Ambient Cursor Move Parallax for Desktop (Follows right, left, up, down)
    const mouseParallax = {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    };

    // Dynamic Gyroscopic Spatial Orientation for Mobile Devices (Phone physical tilt & turn)
    let baseGamma = null;
    let baseBeta = null;
    const phoneTilt = {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    };

    const handleDeviceOrientation = (e) => {
      if (e.gamma === null || e.beta === null) return;

      // Adaptive baseline drift (centers smoothly regardless of how phone is held)
      if (baseGamma === null) {
        baseGamma = e.gamma;
        baseBeta = e.beta;
      } else {
        baseGamma += (e.gamma - baseGamma) * 0.006;
        baseBeta += (e.beta - baseBeta) * 0.006;
      }

      // e.gamma: left/right tilt [-90, 90]
      // e.beta: front/back tilt [-180, 180]
      const deltaX = (e.gamma - baseGamma) / 16;
      const deltaY = (e.beta - baseBeta) / 16;

      phoneTilt.targetX = Math.max(-1.8, Math.min(1.8, deltaX));
      phoneTilt.targetY = Math.max(-1.8, Math.min(1.8, deltaY));
    };

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const requestIOSPerm = () => {
          DeviceOrientationEvent.requestPermission()
            .then((state) => {
              if (state === 'granted') {
                window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
              }
            })
            .catch(() => {});
          window.removeEventListener('touchstart', requestIOSPerm);
        };
        window.addEventListener('touchstart', requestIOSPerm, { passive: true, once: true });
      } else {
        window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
      }
    }

    // Callback invoked when user selects a celestial body
    const selectBody = (bodyId) => {
      selectedBodyRef.current = bodyId;
      setSelectedBodyId(bodyId);

      if (!bodyId) {
        controlsState.lookTarget.set(0, baseSysY, 0);
        controlsState.targetDist = baseCamZ;
        controlsState.targetPhi = 0.28;
        return;
      }

      if (bodyId === 'sun') {
        controlsState.targetDist = 160;
        controlsState.targetPhi = 0.32;
      } else if (bodyId === 'asteroid-belt') {
        controlsState.targetDist = 310;
        controlsState.targetPhi = 0.45;
      } else {
        const found = planets.find((p) => p.id === bodyId);
        if (found) {
          controlsState.targetDist = found.inspectDistance || 55;
          controlsState.targetPhi = 0.22;
        }
      }
    };

    const resetOrbit = () => {
      selectedBodyRef.current = null;
      setSelectedBodyId(null);
      controlsState.lookTarget.set(0, baseSysY, 0);
      controlsState.targetDist = baseCamZ;
      controlsState.targetPhi = 0.28;
      controlsState.targetTheta = 0.42;
    };

    selectBodyCallbackRef.current = selectBody;
    resetOrbitCallbackRef.current = resetOrbit;

    // Pointer events for Canvas 360° Drag & Click-to-Inspect
    const handlePointerDown = (e) => {
      controlsState.isDragging = true;
      controlsState.pointerStartX = e.clientX;
      controlsState.pointerStartY = e.clientY;
      controlsState.pointerPrevX = e.clientX;
      controlsState.pointerPrevY = e.clientY;
      controlsState.totalDragDistance = 0;
    };

    const handlePointerMove = (e) => {
      // Dynamic ambient cursor parallax on desktop
      const normX = (e.clientX / width - 0.5) * 2;
      const normY = (e.clientY / height - 0.5) * 2;
      mouseParallax.targetX = normX;
      mouseParallax.targetY = normY;
      controlsState.ambientParallaxX = normX;
      controlsState.ambientParallaxY = normY;

      if (!controlsState.isDragging) return;

      const dx = e.clientX - controlsState.pointerPrevX;
      const dy = e.clientY - controlsState.pointerPrevY;
      controlsState.totalDragDistance += Math.hypot(dx, dy);

      // Smooth yaw and pitch rotation around current look target (Sun or moving planet!)
      controlsState.targetTheta -= (dx / width) * 3.8;
      controlsState.targetPhi = Math.max(0.04, Math.min(1.52, controlsState.targetPhi + (dy / height) * 2.5));

      controlsState.pointerPrevX = e.clientX;
      controlsState.pointerPrevY = e.clientY;
    };

    const handlePointerUp = (e) => {
      controlsState.isDragging = false;

      // Ignore pointerup if the click originated from HTML UI controls (buttons, notes, nav, etc.)
      if (e.target !== canvas) return;

      const wasClick = controlsState.totalDragDistance < 14;

      // Click detected on 3D canvas: Raycast test to inspect planet directly!
      if (wasClick) {
        mouseNDC.x = (e.clientX / width) * 2 - 1;
        mouseNDC.y = -(e.clientY / height) * 2 + 1;
        raycaster.setFromCamera(mouseNDC, camera);

        const hits = raycaster.intersectObjects(pickableObjects, true);
        if (hits.length > 0) {
          let target = hits[0].object;
          while (target && !target.userData.bodyId && target.parent) {
            target = target.parent;
          }
          if (target && target.userData && target.userData.bodyId) {
            selectBody(target.userData.bodyId);
            return;
          }
        } else if (selectedBodyRef.current) {
          // Tapped empty space while following a planet: smoothly return to full overview
          resetOrbit();
        }
      }
    };

    // Attach listeners to canvas / window (Zero scroll zoom: mouse wheel & touch pinch zoom removed!)
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      aspect = width / height;
      isCurrentMobile = width < 768 || window.matchMedia('(pointer: coarse)').matches;

      camera.aspect = aspect;
      camera.fov = calcFov(width, height);

      if (aspect < 1.0) {
        baseCamY = 115;
        baseCamZ = 490;
        baseLookY = 68;
        baseSysY = 68;
        solarSystem.position.set(0, baseSysY, 0);
        solarSystem.scale.setScalar(Math.min(0.68, Math.max(0.48, width / 720)));
      } else {
        baseCamY = 130;
        baseCamZ = 420;
        baseLookY = 75;
        baseSysY = 80;
        solarSystem.position.set(0, baseSysY, 0);
        solarSystem.scale.setScalar(1.0);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(isCurrentMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5));

      starMat.size = isCurrentMobile ? 1.6 : 2.2;
      nebMat.size = isCurrentMobile ? 8.0 : 13.0;
      flameMat.size = isCurrentMobile ? 3.8 : 5.5;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // =========================================================================
    // 10. ANIMATION LOOP (LOCKED 120 FPS FLUID RENDERING)
    // =========================================================================
    let animationFrameId;
    let beaconTime = 0;

    const animate = () => {
      // 1. Damped Spring Lerp for Desktop Cursor Move & Phone Gyro Tilt
      controlsState.orbitTheta += (controlsState.targetTheta - controlsState.orbitTheta) * 0.08;
      controlsState.orbitPhi += (controlsState.targetPhi - controlsState.orbitPhi) * 0.08;
      controlsState.camDist += (controlsState.targetDist - controlsState.camDist) * 0.08;

      mouseParallax.currentX += (mouseParallax.targetX - mouseParallax.currentX) * 0.06;
      mouseParallax.currentY += (mouseParallax.targetY - mouseParallax.currentY) * 0.06;

      phoneTilt.currentX += (phoneTilt.targetX - phoneTilt.currentX) * 0.085;
      phoneTilt.currentY += (phoneTilt.targetY - phoneTilt.currentY) * 0.085;

      // Desktop: cursor moves right, left, up, down -> camera perspective moves along with it!
      const cursorYaw = isCurrentMobile ? 0 : mouseParallax.currentX * 0.42;
      const cursorPitch = isCurrentMobile ? 0 : -mouseParallax.currentY * 0.28;

      // Mobile: physical phone tilt angle -> camera angle follows phone tilt!
      const gyroYaw = isCurrentMobile ? phoneTilt.currentX * 0.55 : 0;
      const gyroPitch = isCurrentMobile ? phoneTilt.currentY * 0.40 : 0;

      const effectiveTheta = controlsState.orbitTheta + cursorYaw + gyroYaw;
      const effectivePhi = Math.max(0.04, Math.min(1.52, controlsState.orbitPhi + cursorPitch + gyroPitch));

      // 2. Cinematic Target Tracking (Follows moving planet in real-time)
      const currentSelected = selectedBodyRef.current;
      if (currentSelected === 'sun') {
        controlsState.lookTarget.set(0, baseSysY, 0);
      } else if (currentSelected === 'asteroid-belt') {
        controlsState.lookTarget.set(0, baseSysY, 0);
      } else if (currentSelected) {
        const activePlanet = planets.find((p) => p.id === currentSelected);
        if (activePlanet) {
          const worldPos = new THREE.Vector3();
          activePlanet.group.getWorldPosition(worldPos);
          controlsState.lookTarget.copy(worldPos);
        }
      } else {
        // Standard overview look target
        controlsState.lookTarget.set(0, baseSysY, 0);
      }

      controlsState.currentLook.lerp(controlsState.lookTarget, 0.075);

      // 3. Spherical Camera Calculation around the tracked planet / center
      const cx = controlsState.currentLook.x + Math.sin(effectiveTheta) * Math.cos(effectivePhi) * controlsState.camDist;
      const cy = controlsState.currentLook.y + Math.sin(effectivePhi) * controlsState.camDist;
      const cz = controlsState.currentLook.z + Math.cos(effectiveTheta) * Math.cos(effectivePhi) * controlsState.camDist;

      camera.position.set(cx, cy, cz);
      camera.lookAt(controlsState.currentLook);

      // Subtle aerospace roll response to cursor/tilt
      camera.rotation.z = isCurrentMobile 
        ? -phoneTilt.currentX * 0.08 
        : -mouseParallax.currentX * 0.04;

      // 4. Starfield & Milky Way 3D dynamic parallax (Cursor move on desktop, Gyro tilt on mobile)
      cosmosGroup.rotation.y = (isCurrentMobile ? phoneTilt.currentX * 0.15 : mouseParallax.currentX * 0.18) + controlsState.orbitTheta * 0.04;
      cosmosGroup.rotation.x = isCurrentMobile ? phoneTilt.currentY * 0.12 : -mouseParallax.currentY * 0.14;

      // 5. Sun axial rotation & corona breathing
      sunMesh.rotation.y += 0.003;
      coronaMesh1.rotation.y -= 0.002;
      coronaMesh2.rotation.y += 0.0015;

      // 6. Update All 8 Planets
      planets.forEach((p) => {
        p.angle += p.orbitSpeed * 0.45;
        p.group.position.x = Math.cos(p.angle) * p.dist;
        p.group.position.z = Math.sin(p.angle) * p.dist;
        p.mesh.rotation.y += p.rotSpeed;

        if (p.hasMoon && p.moon) {
          p.moonAngle += p.moonSpeed;
          p.moon.position.x = Math.cos(p.moonAngle) * p.moonDist;
          p.moon.position.z = Math.sin(p.moonAngle) * p.moonDist;
          p.moon.rotation.y += 0.02;
        }
      });

      // 7. Update Main Asteroid Belt Rotation
      asteroidBeltGroup.rotation.y += 0.0012;

      // 8. Update Earth's Satellites
      beaconTime += 0.05;
      const beaconGlow = (Math.sin(beaconTime * 6) + 1) * 0.5;
      earthSatellites.forEach((sat) => {
        sat.angle += sat.speed;
        sat.group.position.set(
          Math.cos(sat.angle) * sat.radius,
          Math.sin(sat.angle) * sat.radius * sat.tiltY,
          Math.sin(sat.angle) * sat.radius
        );
        sat.group.rotation.y += 0.02;
        sat.group.rotation.x += 0.01;
        sat.beacon.color.setScalar(beaconGlow > 0.5 ? 1.0 : 0.2);
      });

      // 9. Update Slow-Moving Meteorite Flyby
      asteroidProgress += 0.00035;
      if (asteroidProgress > 1.0) asteroidProgress = 0;

      const earthCurrentPos = earthRef ? earthRef.position : new THREE.Vector3(124, 0, 0);
      const astPos = getAsteroidPosition(asteroidProgress, earthCurrentPos);
      asteroidGroup.position.copy(astPos);

      asteroidStone.rotation.x += 0.008;
      asteroidStone.rotation.y += 0.012;
      asteroidStone.rotation.z += 0.006;

      flameHistory.unshift(astPos.clone());
      if (flameHistory.length > FLAME_COUNT) flameHistory.pop();

      const fPositions = flameTrail.geometry.attributes.position.array;
      for (let i = 0; i < FLAME_COUNT; i++) {
        const histPos = flameHistory[i] || astPos;
        const jitter = (i / FLAME_COUNT) * 1.5;
        fPositions[i * 3] = histPos.x + (Math.random() - 0.5) * jitter;
        fPositions[i * 3 + 1] = histPos.y + (Math.random() - 0.5) * jitter;
        fPositions[i * 3 + 2] = histPos.z + (Math.random() - 0.5) * jitter;
      }
      flameTrail.geometry.attributes.position.needsUpdate = true;

      // 10. Update Periodic Shooting Comet
      if (cometState.active) {
        cometState.life++;
        cometState.pos.add(cometState.vel);
        cometGroup.position.copy(cometState.pos);

        cometTrailHistory.unshift(cometState.pos.clone());
        if (cometTrailHistory.length > COMET_TRAIL_COUNT) cometTrailHistory.pop();

        const cPositions = cometTrail.geometry.attributes.position.array;
        for (let i = 0; i < COMET_TRAIL_COUNT; i++) {
          const pt = cometTrailHistory[i] || cometState.pos;
          cPositions[i * 3] = pt.x;
          cPositions[i * 3 + 1] = pt.y;
          cPositions[i * 3 + 2] = pt.z;
        }
        cometTrail.geometry.attributes.position.needsUpdate = true;

        if (cometState.life >= cometState.maxLife) {
          cometState.active = false;
          cometGroup.visible = false;
          cometTrail.visible = false;
          cometState.spawnCooldown = 380 + Math.random() * 220; // 6-10s until next comet
        }
      } else {
        cometState.spawnCooldown--;
        if (cometState.spawnCooldown <= 0) {
          spawnShootingComet();
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // =========================================================================
    // 11. RESOURCE CLEANUP
    // =========================================================================
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      cancelAnimationFrame(animationFrameId);

      // Clean Three.js resources
      starGeo.dispose();
      starMat.dispose();
      nebGeo.dispose();
      nebMat.dispose();
      sunGeo.dispose();
      sunMat.dispose();
      coronaMesh1.geometry.dispose();
      coronaMesh2.geometry.dispose();
      astGeo.dispose();
      astMat.dispose();
      flameGeo.dispose();
      flameMat.dispose();
      beltGeo.dispose();
      beltMat.dispose();
      cometHead.geometry.dispose();
      cometTrailGeo.dispose();
      cometTrailMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Guided Navigation handlers
  const handleSelectBody = useCallback((bodyId) => {
    if (selectBodyCallbackRef.current) {
      selectBodyCallbackRef.current(bodyId);
    }
  }, []);

  const handleResetOrbit = useCallback(() => {
    if (resetOrbitCallbackRef.current) {
      resetOrbitCallbackRef.current();
    }
  }, []);

  const handleTourPrev = useCallback(() => {
    if (!selectedBodyId) {
      handleSelectBody(PLANET_ORDER[PLANET_ORDER.length - 1]);
      return;
    }
    const idx = PLANET_ORDER.indexOf(selectedBodyId);
    const prevIdx = (idx - 1 + PLANET_ORDER.length) % PLANET_ORDER.length;
    handleSelectBody(PLANET_ORDER[prevIdx]);
  }, [selectedBodyId, handleSelectBody]);

  const handleTourNext = useCallback(() => {
    if (!selectedBodyId) {
      handleSelectBody(PLANET_ORDER[0]);
      return;
    }
    const idx = PLANET_ORDER.indexOf(selectedBodyId);
    const nextIdx = (idx + 1) % PLANET_ORDER.length;
    handleSelectBody(PLANET_ORDER[nextIdx]);
  }, [selectedBodyId, handleSelectBody]);

  const toggleExplorer = useCallback(() => {
    setIsExplorerMode((prev) => !prev);
  }, []);

  const selectedData = selectedBodyId ? CELESTIAL_DATA[selectedBodyId] : null;

  const isInteractingActive = isExplorerMode || Boolean(selectedBodyId);

  return (
    <div
      ref={containerRef}
      className={`solar-system-container ${isInteractingActive ? 'explorer-active' : ''}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={`solar-system-canvas ${isInteractingActive ? 'interactive' : ''}`}
      />

      {/* WALL STICKY PAPER NOTE (Rendered at top-level via Portal so it floats cleanly above the portfolio) */}
      {selectedData && typeof document !== 'undefined' && createPortal(
        <div className="solar-sticky-note" role="dialog" aria-modal="true" onPointerDown={(e) => e.stopPropagation()}>
          {/* Frosted Tape Pin Strip at Top */}
          <div className="sticky-tape-pin" />

          {/* Header Row: Glyph + Planet Name + Close */}
          <div className="sticky-header-row">
            <div className="sticky-planet-id">
              <span className="sticky-symbol">{selectedData.symbol}</span>
              <div className="sticky-names">
                <span className="sticky-name">{selectedData.name}</span>
                <span className="sticky-type">{selectedData.category}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetOrbit}
              onTouchStart={(e) => e.stopPropagation()}
              className="sticky-close-btn"
              title="Close and return to overview"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Tech Badge */}
          <div className="sticky-badge-line">
            <span className="sticky-dot" />
            <span className="sticky-badge-text">{selectedData.techBadge}</span>
          </div>

          {/* Compact 4-cell Metrics Strip */}
          <div className="sticky-metrics-grid">
            <div className="sticky-metric">
              <span className="m-label">ORBIT</span>
              <span className="m-val amber">{selectedData.orbitPeriod.split(' ')[0]} {selectedData.orbitPeriod.toLowerCase().includes('yr') || selectedData.orbitPeriod.toLowerCase().includes('year') ? 'YR' : 'D'}</span>
            </div>
            <div className="sticky-metric">
              <span className="m-label">DIAMETER</span>
              <span className="m-val cyan">{selectedData.diameter}</span>
            </div>
            <div className="sticky-metric">
              <span className="m-label">TEMP</span>
              <span className="m-val">{selectedData.temp}</span>
            </div>
            <div className="sticky-metric">
              <span className="m-label">MOONS</span>
              <span className="m-val emerald">{selectedData.moons.split(' ')[0]}</span>
            </div>
          </div>

          {/* Footer Guided Tour Controls */}
          <div className="sticky-footer-row">
            <button
              type="button"
              onClick={handleTourPrev}
              onTouchStart={(e) => e.stopPropagation()}
              className="sticky-arrow-btn"
              aria-label="Previous Planet"
            >
              ◄ PREV
            </button>
            <button
              type="button"
              onClick={handleResetOrbit}
              onTouchStart={(e) => e.stopPropagation()}
              className="sticky-orbit-return-btn"
              title="Return to System Orbit"
              aria-label="Return to System Orbit"
            >
              ⟲ ORBIT ({PLANET_ORDER.indexOf(selectedData.id) + 1}/{PLANET_ORDER.length})
            </button>
            <button
              type="button"
              onClick={handleTourNext}
              onTouchStart={(e) => e.stopPropagation()}
              className="sticky-arrow-btn"
              aria-label="Next Planet"
            >
              NEXT ►
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Astronomical Telemetry HUD Overlay (Overview Architecture Metaphor) */}
      <div className="solar-telemetry-hud">
        <div className="solar-hud-left">
          <div className="solar-hud-row">
            <span className="solar-hud-dot" />
            <span className="solar-hud-title">DISTRIBUTED CLUSTER ARCHITECTURE // HELIOCENTRIC METAPHOR</span>
          </div>
          <div className="solar-hud-meta">CENTRAL EVENT BROKER: SUN · 8 AUTONOMOUS NODES · ASTEROID BELT STREAM · 7 EDGE AGENTS</div>
        </div>

        <div className="solar-hud-right">
          <div className="solar-hud-metric">MILKY WAY EXPANSIVE GALAXY · 4,800+ STARS</div>
          <div className="solar-hud-status">STATUS: GYRO TILT & 360° SURROUNDINGS FLIGHT READY · 120HZ</div>
        </div>
      </div>

      {/* Cinematic Vignette */}
      <div className="solar-vignette-mask" />
    </div>
  );
}

export default React.memo(RealisticSolarSystem);
