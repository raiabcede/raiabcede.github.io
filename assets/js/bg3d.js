(function () {
  'use strict';

  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.set(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  // ── Helper: scatter particles in a deep field ────────────────
  function makeLayer(count, spread, zDepth, size, color, opacity) {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      pos[i * 3 + 2] = -Math.random() * zDepth;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity,
      sizeAttenuation: true,
      depthWrite: false,
    });
    return new THREE.Points(geo, mat);
  }

  // Layer 1 — distant fine dust
  const dust = makeLayer(1800, 1600, 1200, 0.5, 0xe3242b, 0.10);
  scene.add(dust);

  // Layer 2 — mid-range particles
  const stars = makeLayer(600, 1200, 900, 1.2, 0xe3242b, 0.18);
  scene.add(stars);

  // Layer 3 — a handful of slightly larger near particles
  const bright = makeLayer(120, 700, 600, 2.2, 0xff6060, 0.20);
  scene.add(bright);

  // ── Scroll state ─────────────────────────────────────────────
  let targetScroll = 0;
  let smoothScroll  = 0;

  window.addEventListener('scroll', () => { targetScroll = window.scrollY; }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── Render loop ──────────────────────────────────────────────
  function animate() {
    requestAnimationFrame(animate);

    smoothScroll += (targetScroll - smoothScroll) * 0.06;
    const s = smoothScroll;

    // Fly through space — each layer at different parallax speeds
    dust.position.z   = s * 0.10;
    stars.position.z  = s * 0.18;
    bright.position.z = s * 0.30;

    // Subtle drift sideways and camera tilt
    camera.position.y  = -s * 0.005;
    camera.rotation.z  =  s * 0.00004;
    camera.rotation.x  =  s * 0.00008;

    renderer.render(scene, camera);
  }

  animate();
})();
