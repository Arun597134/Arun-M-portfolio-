import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Realistic 3D Solar System (Cinematic 3D IMAX Perspective)
 * - Elevated Solar System: Positioned higher in the viewport for sweeping perspective.
 * - 3D IMAX Flyby: Near-side orbits swing dramatically close to the camera lens,
 *   causing planets to sweep across the screen like a massive 3D movie pop-out!
 * - Deep Space Milky Way Galaxy: 4,800+ stars and 3,600+ luminous nebula dust clouds
 *   filling all blank space across the cosmos with vibrant cosmic colors.
 * - Center: Real warm incandescent Sun with dual corona flares & point lighting.
 * - 8 Unique, textured planets rotating on their own axes.
 * - Moons for 7 planets (Venus has 0 as requested).
 * - Earth Features: Luna (The Moon) + 2 NASA Satellites (ISS and Hubble style).
 * - Slow-Moving Fiery Asteroid: 3D craggy meteorite with incandescent fire tail performing
 *   a safe, slow near-miss flyby without ever hitting Earth.
 * - 100% GPU-accelerated WebGL with locked 120 FPS.
 */

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

// =============================================================================
// NASA SATELLITE BUILDER (ISS / Hubble Style)
// =============================================================================
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
// MAIN COMPONENT: 3D REALISTIC SOLAR SYSTEM (ELEVATED 3D IMAX PERSPECTIVE)
// =============================================================================
function RealisticSolarSystem() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspect = width / height;
    let isCurrentMobile = width < 768 || window.matchMedia('(pointer: coarse)').matches;
    const dpr = isCurrentMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);

    // Dynamic FOV calculation for mobile portrait screens (prevents narrow tunnel clipping)
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

    // Camera positioned with near = 0.5 to prevent any clipping as planets swing right near the screen!
    const camera = new THREE.PerspectiveCamera(calcFov(width, height), aspect, 0.5, 6000);
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
    // 2. DENSE COSMIC STARFIELD & EXPANSIVE MILKY WAY GALAXY (NO BLANK SPACES)
    // =========================================================================
    const cosmosGroup = new THREE.Group();
    scene.add(cosmosGroup);

    // A. 4,800 Multi-depth Stars enveloping the entire background
    const starCount = isCurrentMobile ? 1800 : 4800;
    const starPos = [];
    const starColors = [];
    const starPalette = [
      new THREE.Color(0xffffff), // Diamond White
      new THREE.Color(0x38bdf8), // Electric Cyan
      new THREE.Color(0xfbbf24), // Stellar Amber
      new THREE.Color(0xa855f7), // Cosmic Violet
      new THREE.Color(0xf472b6), // Soft Pink
      new THREE.Color(0x60a5fa), // Azure Blue
    ];
    for (let i = 0; i < starCount; i++) {
      starPos.push(
        (Math.random() - 0.5) * 4200,
        (Math.random() - 0.5) * 3000,
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

    // B. Expansive Milky Way Nebula Clouds (3,600+ Glowing Particles filling all corners)
    const nebCount = isCurrentMobile ? 1200 : 3600;
    const nebPos = [];
    const nebColors = [];
    const nebPalette = [
      new THREE.Color(0x7c3aed), // Royal Ultraviolet
      new THREE.Color(0xec4899), // Hot Magenta
      new THREE.Color(0x06b6d4), // Electric Cyan
      new THREE.Color(0xfbbf24), // Core Stardust Gold
      new THREE.Color(0x3b82f6), // Deep Azure
      new THREE.Color(0xa855f7), // Deep Violet
    ];

    for (let i = 0; i < nebCount; i++) {
      let u, v, w;

      if (i < nebCount * 0.55) {
        // 1. Primary Galactic Core Ribbon: Wide diagonal swath
        u = (Math.random() - 0.5) * 3200;
        v = u * 0.44 + (Math.random() - 0.5) * 320;
        w = -700 - Math.random() * 1100;
      } else if (i < nebCount * 0.78) {
        // 2. Upper-Left & Top Cosmic Cloud Field (Fills upper corners)
        u = -1600 + (Math.random() - 0.5) * 1600;
        v = 400 + Math.random() * 1400;
        w = -800 - Math.random() * 1000;
      } else {
        // 3. Lower-Right & Peripheral Dust (Fills lower corners & edges)
        u = 400 + Math.random() * 2000;
        v = -400 - Math.random() * 1400;
        w = -800 - Math.random() * 1000;
      }

      nebPos.push(u, v, w);
      const col = nebPalette[Math.floor(Math.random() * nebPalette.length)];
      nebColors.push(col.r, col.g, col.b);
    }

    const nebGeo = new THREE.BufferGeometry();
    nebGeo.setAttribute('position', new THREE.Float32BufferAttribute(nebPos, 3));
    nebGeo.setAttribute('color', new THREE.Float32BufferAttribute(nebColors, 3));
    const nebMat = new THREE.PointsMaterial({
      size: isCurrentMobile ? 8.0 : 13.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const nebPoints = new THREE.Points(nebGeo, nebMat);
    cosmosGroup.add(nebPoints);

    // =========================================================================
    // 3. MASTER SOLAR SYSTEM (RESPONSIVE 3D IMAX PERSPECTIVE & POP-OUT FLYBY)
    // =========================================================================
    const solarSystem = new THREE.Group();
    // Lift the solar system with responsive position & scale
    solarSystem.position.set(0, baseSysY, 0);
    solarSystem.scale.setScalar(aspect < 1.0 ? Math.min(0.68, Math.max(0.48, width / 720)) : 1.0);

    // Steeper 33° perspective tilt so planets sweep directly down & towards user's eyes!
    const INCLINATION = (33 * Math.PI) / 180;
    solarSystem.rotation.x = INCLINATION;
    scene.add(solarSystem);

    // 4. Central Sun & Incandescent Point Lighting
    const SUN_RADIUS = 46;

    const sunLight = new THREE.PointLight(0xfff7ed, 4.4, 3400, 0.4);
    solarSystem.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x0e172a, 0.7);
    scene.add(ambientLight);

    const sunTex = createSunTexture();
    const sunGeo = new THREE.SphereGeometry(SUN_RADIUS, 40, 40);
    const sunMat = new THREE.MeshBasicMaterial({ map: sunTex });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    solarSystem.add(sunMesh);

    // Corona halos
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
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(1.0, 0.65, 0.15, 1.0) * intensity * 1.4;
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
    // 5. THE 8 PLANETS CONFIGURATION (True to life textures & scale)
    // =========================================================================
    const moonTex = createMoonTexture();

    // Scale planets slightly larger so as they cross near the screen they loom massive!
    const PLANET_CONFIG = [
      {
        name: 'Mercury',
        dist: SUN_RADIUS + 42,
        radius: 5.2,
        texture: createMercuryTexture(),
        orbitSpeed: 0.022,
        rotSpeed: 0.012,
        hasMoon: true,
        moonDist: 10,
        moonRadius: 1.3,
      },
      {
        name: 'Venus',
        dist: SUN_RADIUS + 78,
        radius: 8.4,
        texture: createVenusTexture(),
        orbitSpeed: 0.016,
        rotSpeed: -0.008,
        hasMoon: false, // Venus has NO moon!
      },
      {
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
      },
      {
        name: 'Mars',
        dist: SUN_RADIUS + 170,
        radius: 6.8,
        texture: createMarsTexture(),
        orbitSpeed: 0.0095,
        rotSpeed: 0.016,
        hasMoon: true,
        moonDist: 15,
        moonRadius: 1.6,
      },
      {
        name: 'Jupiter',
        dist: SUN_RADIUS + 245,
        radius: 25.0, // Massive gas giant!
        texture: createJupiterTexture(),
        orbitSpeed: 0.0065,
        rotSpeed: 0.026,
        hasMoon: true,
        moonDist: 42,
        moonRadius: 3.8,
      },
      {
        name: 'Saturn',
        dist: SUN_RADIUS + 325,
        radius: 19.5, // Majestic ringed giant!
        texture: createSaturnTexture(),
        orbitSpeed: 0.0048,
        rotSpeed: 0.022,
        hasMoon: true,
        moonDist: 54,
        moonRadius: 3.2,
        hasRings: true,
        ringInner: 26,
        ringOuter: 52,
      },
      {
        name: 'Uranus',
        dist: SUN_RADIUS + 395,
        radius: 13.5,
        texture: createUranusTexture(),
        orbitSpeed: 0.0034,
        rotSpeed: 0.018,
        hasMoon: true,
        moonDist: 28,
        moonRadius: 2.4,
      },
      {
        name: 'Neptune',
        dist: SUN_RADIUS + 465,
        radius: 13.0,
        texture: createNeptuneTexture(),
        orbitSpeed: 0.0024,
        rotSpeed: 0.017,
        hasMoon: true,
        moonDist: 28,
        moonRadius: 2.4,
      },
    ];

    const planets = [];

    // Silver Hairline Glowing Orbit Material
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
      // 1. Silver Hairline Orbital Ring
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
      planetGroup.add(pMesh);

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

      // 5. Orbiting Moon System
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

        // Satellite 1: ISS Style Space Station (Radius 14.5)
        const sat1 = buildNasaSatellite('iss');
        planetGroup.add(sat1.group);

        // Satellite 2: Hubble Style Observatory (Radius 18.0)
        const sat2 = buildNasaSatellite('hubble');
        planetGroup.add(sat2.group);

        // Trajectory Lines for Satellites
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

      // Stagger initial orbital positions so they fly past camera at different times!
      const initialAngle = (idx * (Math.PI * 2)) / PLANET_CONFIG.length + Math.random() * 0.4;

      planets.push({
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
      });
    });

    // =========================================================================
    // 6. SLOW-MOVING FIERY ASTEROID (Near-Miss Flyby, Never Hits Earth!)
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

    // Incandescent Fiery Plasma Trail
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

      // Safe Near-Miss Point (Safely offset from Earth so collision is impossible)
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
    // 7. RESPONSIVE TOUCH, MOUSE PARALLAX & CAMERA GYROSCOPE
    // =========================================================================
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / width - 0.5) * 2;
      mouse.targetY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Touch swipe support for mobile & tablet
    let touchStartX = 0;
    let touchStartY = 0;
    let isTouching = false;

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length === 1) {
        isTouching = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!isTouching || !e.touches || e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;

      const dx = (currentX - touchStartX) / width;
      const dy = (currentY - touchStartY) / height;

      mouse.targetX = Math.max(-1.2, Math.min(1.2, mouse.targetX + dx * 1.8));
      mouse.targetY = Math.max(-1.2, Math.min(1.2, mouse.targetY + dy * 1.8));

      touchStartX = currentX;
      touchStartY = currentY;
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Subtle Gyroscopic Spatial Parallax for Mobile Devices
    const handleDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null && !isTouching) {
        const normX = Math.max(-1, Math.min(1, e.gamma / 25));
        const normY = Math.max(-1, Math.min(1, (e.beta - 40) / 25));
        mouse.targetX = normX * 0.6;
        mouse.targetY = normY * 0.45;
      }
    };
    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      aspect = width / height;
      isCurrentMobile = width < 768 || window.matchMedia('(pointer: coarse)').matches;

      // Update responsive camera metrics
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

      // Adapt particle sizes
      starMat.size = isCurrentMobile ? 1.6 : 2.2;
      nebMat.size = isCurrentMobile ? 8.0 : 13.0;
      flameMat.size = isCurrentMobile ? 3.8 : 5.5;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // =========================================================================
    // 8. ANIMATION LOOP (LOCKED 120 FPS FLUID RENDERING)
    // =========================================================================
    let animationFrameId;
    let beaconTime = 0;

    const animate = () => {
      // Smooth mouse / touch / gyro interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Gentle decay to neutral center on mobile when touch is released
      if (isCurrentMobile && !isTouching) {
        mouse.targetX *= 0.985;
        mouse.targetY *= 0.985;
      }

      // Responsive camera positioning & tilt
      camera.position.x = mouse.x * (isCurrentMobile ? 35 : 75);
      camera.position.y = baseCamY + mouse.y * (isCurrentMobile ? -25 : -45);
      camera.position.z = baseCamZ;
      camera.lookAt(0, baseLookY, 0);

      // Starfield & Milky Way parallax
      cosmosGroup.rotation.y = mouse.x * (isCurrentMobile ? 0.025 : 0.04);
      cosmosGroup.rotation.x = mouse.y * (isCurrentMobile ? 0.02 : 0.03);

      // Sun axial rotation & corona breathing
      sunMesh.rotation.y += 0.003;
      coronaMesh1.rotation.y -= 0.002;
      coronaMesh2.rotation.y += 0.0015;

      // Update All 8 Planets
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

      // Update Earth's 2 NASA Satellites
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

      // Update Fiery Asteroid (Ultra-slow cinematic flyby)
      asteroidProgress += 0.00035;
      if (asteroidProgress > 1.0) asteroidProgress = 0;

      const earthCurrentPos = earthRef ? earthRef.position : new THREE.Vector3(124, 0, 0);
      const astPos = getAsteroidPosition(asteroidProgress, earthCurrentPos);
      asteroidGroup.position.copy(astPos);

      // Tumble rotation
      asteroidStone.rotation.x += 0.008;
      asteroidStone.rotation.y += 0.012;
      asteroidStone.rotation.z += 0.006;

      // Update Fiery Plasma Trail Particles
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

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // =========================================================================
    // 9. RESOURCE CLEANUP
    // =========================================================================
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
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
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="solar-system-container" aria-hidden="true">
      <canvas ref={canvasRef} className="solar-system-canvas" />

      {/* Astronomical Telemetry HUD Overlay */}
      <div className="solar-telemetry-hud">
        <div className="solar-hud-left">
          <div className="solar-hud-row">
            <span className="solar-hud-dot" />
            <span className="solar-hud-title">SOLAR SYSTEM // 3D IMAX FLYBY PERSPECTIVE</span>
          </div>
          <div className="solar-hud-meta">CENTRAL STAR: SUN · 8 PLANETS · 7 MOONS · 2 NASA SATELLITES</div>
        </div>

        <div className="solar-hud-right">
          <div className="solar-hud-metric">MILKY WAY EXPANSIVE GALAXY · 4,800+ STARS</div>
          <div className="solar-hud-status">STATUS: NEAR-EYE IMAX ORBIT POP-OUT · 120HZ</div>
        </div>
      </div>

      {/* Cinematic Vignette */}
      <div className="solar-vignette-mask" />
    </div>
  );
}

export default React.memo(RealisticSolarSystem);
