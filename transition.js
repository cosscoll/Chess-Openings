// Transition 3D "traversée de pièces d'échecs", jouée entre l'accueil et
// une ouverture (et inversement). La caméra fonce à travers un couloir de
// pièces d'échecs flottantes ; le contenu de la page est échangé pendant
// que le calque (opaque) couvre tout l'écran, invisible pour l'utilisateur.
//
// Conçu pour ne JAMAIS rester bloqué (leçon tirée d'un bug précédent avec
// une transition en CSS clip-path) :
// - la boucle d'animation est basée sur le temps écoulé (performance.now),
//   jamais sur un évènement DOM qui pourrait ne pas se déclencher ;
// - un filet de sécurité (setTimeout) force la fin de la transition même
//   en cas de souci imprévu ;
// - si la création du contexte WebGL échoue, on bascule instantanément
//   sur la page suivante plutôt que de laisser un écran vide ou figé.
const ChessTransition = (function () {
  let active = false;

  function isMobile() {
    return window.matchMedia('(max-width:640px)').matches;
  }

  function latheFromPoints(pts, scale) {
    const vectors = pts.map(([x, y]) => new THREE.Vector2(x * scale, y * scale));
    return new THREE.LatheGeometry(vectors, 20);
  }

  // Profils simplifiés de pièces d'échecs (surfaces de révolution),
  // construits une seule fois et réutilisés à chaque transition.
  let geometriesCache = null;
  function getGeometries() {
    if (geometriesCache) return geometriesCache;
    const s = 1.1;
    geometriesCache = [
      latheFromPoints([[0,0],[0.28,0],[0.28,0.04],[0.16,0.10],[0.14,0.30],[0.22,0.36],[0.22,0.44],[0.10,0.50],[0.10,0.56],[0.20,0.64],[0,0.70]], s), // pion
      latheFromPoints([[0,0],[0.3,0],[0.3,0.05],[0.16,0.12],[0.14,0.4],[0.24,0.46],[0.24,0.54],[0.08,0.62],[0.1,0.68],[0.18,0.72],[0.06,0.8],[0.1,0.86],[0,0.92]], s), // fou
      latheFromPoints([[0,0],[0.3,0],[0.3,0.05],[0.17,0.12],[0.15,0.4],[0.25,0.46],[0.25,0.54],[0.09,0.62],[0.14,0.7],[0.26,0.76],[0.06,0.82],[0,0.86]], s), // dame
      latheFromPoints([[0,0],[0.32,0],[0.32,0.05],[0.18,0.12],[0.16,0.42],[0.26,0.48],[0.26,0.56],[0.1,0.64],[0.12,0.72],[0.22,0.76],[0.08,0.86],[0.14,0.92],[0,0.98]], s), // roi
      latheFromPoints([[0,0],[0.3,0],[0.3,0.05],[0.18,0.12],[0.16,0.4],[0.24,0.46],[0.24,0.6],[0.3,0.66],[0.3,0.72],[0,0.72]], s), // tour
    ];
    return geometriesCache;
  }

  // Palette reprise des couleurs du site (--accent, --accent-2, --ink).
  const PALETTE = [0x3ddc97, 0x7c5cff, 0xf2efe6];
  const BG_COLOR = 0x08090c;

  function play(callback) {
    // Une seule transition à la fois, et jamais d'animation si
    // l'utilisateur préfère moins de mouvement.
    if (active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      callback();
      return;
    }
    if (typeof THREE === 'undefined') { callback(); return; }
    active = true;

    let canvas, renderer, scene, camera, particles, meshes = [];
    let rafId = null;
    let cleaned = false;
    let swapped = false;

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function cleanup() {
      if (cleaned) return;
      cleaned = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      meshes.forEach((m) => { if (m.material) m.material.dispose(); });
      if (particles) { particles.geometry.dispose(); particles.material.dispose(); }
      if (renderer) renderer.dispose();
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
      active = false;
    }

    function finish() {
      if (!swapped) { swapped = true; callback(); }
      cleanup();
    }

    try {
      canvas = document.createElement('canvas');
      canvas.style.cssText = 'position:fixed;inset:0;z-index:400;width:100vw;height:100vh;display:block;';
      document.body.appendChild(canvas);

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile() ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(BG_COLOR, 1);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0, 6);

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const l1 = new THREE.PointLight(0x3ddc97, 2.2, 30); l1.position.set(3, 3, 2); scene.add(l1);
      const l2 = new THREE.PointLight(0x7c5cff, 2.2, 30); l2.position.set(-3, -2, -8); scene.add(l2);

      const geos = getGeometries();
      const CORRIDOR = 26;
      const count = isMobile() ? 14 : 24;
      for (let i = 0; i < count; i++) {
        const geo = geos[Math.floor(Math.random() * geos.length)];
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        const wireframe = Math.random() > 0.55;
        const mat = wireframe
          ? new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.75 })
          : new THREE.MeshStandardMaterial({ color, roughness: 0.25, metalness: 0.6, emissive: color, emissiveIntensity: 0.25 });
        const mesh = new THREE.Mesh(geo, mat);
        const z = -1 - Math.random() * CORRIDOR;
        const spread = 4.2;
        mesh.position.set((Math.random() - 0.5) * spread * 2, (Math.random() - 0.5) * spread * 1.3, z);
        const s = 0.5 + Math.random() * 0.8;
        mesh.scale.setScalar(s);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        mesh.userData.spinX = (Math.random() - 0.5) * 0.03;
        mesh.userData.spinY = (Math.random() - 0.5) * 0.03;
        scene.add(mesh);
        meshes.push(mesh);
      }

      if (!isMobile()) {
        const pCount = 500;
        const positions = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 18;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
          positions[i * 3 + 2] = -Math.random() * (CORRIDOR + 6);
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const pMat = new THREE.PointsMaterial({ color: 0xf2efe6, size: 0.025, transparent: true, opacity: 0.5, depthWrite: false });
        particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);
      }

      window.addEventListener('resize', onResize);

      const duration = 1000;
      const swapAt = 0.42; // on échange le contenu une fois le couloir bien "refermé" autour de la caméra — déjà invisible, masqué par le calque opaque
      const startZ = 6;
      const endZ = -(CORRIDOR + 3);
      const t0 = performance.now();

      function step(now) {
        try {
          const raw = Math.min(1, (now - t0) / duration);
          const eased = raw * raw * (3 - 2 * raw); // smoothstep
          camera.position.z = startZ + (endZ - startZ) * eased;
          camera.lookAt(0, 0, camera.position.z - 8);

          meshes.forEach((m) => {
            m.rotation.x += m.userData.spinX;
            m.rotation.y += m.userData.spinY;
          });
          if (particles) particles.rotation.y += 0.0015;

          if (!swapped && raw >= swapAt) { swapped = true; callback(); }

          renderer.render(scene, camera);

          if (raw < 1) {
            rafId = requestAnimationFrame(step);
          } else {
            canvas.style.transition = 'opacity .25s ease';
            canvas.style.opacity = '0';
            setTimeout(cleanup, 260);
          }
        } catch (err) {
          finish();
        }
      }
      rafId = requestAnimationFrame(step);

      // Filet de sécurité absolu : quoi qu'il arrive, on ne reste jamais
      // bloqué sur ce calque plus longtemps que la durée prévue + marge.
      setTimeout(finish, duration + 700);

    } catch (err) {
      // Échec de création du contexte WebGL (mémoire GPU limitée, trop de
      // contextes déjà ouverts...) : on bascule instantanément plutôt que
      // de laisser un écran vide ou figé.
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
      active = false;
      callback();
    }
  }

  return { play };
})();
