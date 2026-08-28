// Moteur d'échiquier 3D (Three.js) : construit la scène, place les pièces,
// joue les coups un par un et gère la caméra (y compris l'animation d'arrivée « flyIn »).
const ChessEngine = (function () {

  const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const BOARD_OFFSET = 3.5;
  const GLYPH = { pawn: '♟', knight: '♞', bishop: '♝', rook: '♜', queen: '♛', king: '♚' };
  const SYMBOL_FONT = '"Noto Sans Symbols 2"';

  // Préchargement de la police de symboles d'échecs.
  let fontReady = false;
  const textureRegistry = [];
  if (window.document && document.fonts) {
    document.fonts.load('900 200px ' + SYMBOL_FONT).catch(() => {});
    document.fonts.ready.then(() => {
      fontReady = true;
      textureRegistry.forEach((entry) => { drawGlyph(entry.ctx, entry.type, entry.colorKey); entry.texture.needsUpdate = true; });
    });
  }

  function squareToColRow(square) {
    const file = square[0];
    const rank = parseInt(square[1], 10);
    // row=0 correspond au rang 8 (fond, côté Noirs) et row=7 au rang 1
    // (premier plan, côté Blancs) — c'est ce mapping, combiné à la
    // position de la caméra ci-dessous, qui place a1 en bas à gauche
    // tout en gardant le texte des pièces bien droit à l'écran.
    return { col: FILES.indexOf(file), row: 8 - rank };
  }

  function drawGlyph(ctx, type, colorKey) {
    const size = 256;
    ctx.clearRect(0, 0, size, size);
    const fill = colorKey === 'w' ? '#e9e5d6' : '#20222a';
    const stroke = colorKey === 'w' ? '#20222a' : '#e9e5d6';
    ctx.font = `900 210px ${SYMBOL_FONT}, "Segoe UI Symbol", "Apple Symbols", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 7;
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.strokeText(GLYPH[type], size / 2, size / 2 + 8);
    ctx.fillText(GLYPH[type], size / 2, size / 2 + 8);
  }

  const TEXTURE_CACHE = {};
  function pieceTexture(type, colorKey) {
    const key = type + '_' + colorKey;
    if (TEXTURE_CACHE[key]) return TEXTURE_CACHE[key];

    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    drawGlyph(ctx, type, colorKey);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    TEXTURE_CACHE[key] = texture;
    textureRegistry.push({ ctx, type, colorKey, texture });
    return texture;
  }

  const LABEL_CACHE = {};
  function labelTexture(text, onGreen) {
    const key = text + '_' + onGreen;
    if (LABEL_CACHE[key]) return LABEL_CACHE[key];
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.font = '700 30px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = onGreen ? 'rgba(238,238,210,0.9)' : 'rgba(118,150,86,0.9)';
    ctx.fillText(text, 4, size - 4);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    LABEL_CACHE[key] = texture;
    return texture;
  }

  /* -----------------------------------------------------------
   * Fabrique de pièces — jeton rond (relief) + icône gravée à plat
   * ----------------------------------------------------------- */

  const DISC_GEO = new THREE.CylinderGeometry(0.36, 0.38, 0.09, 28);
  const RIM_MAT = new THREE.MeshStandardMaterial({ color: 0x3d3f47, roughness: 0.5, metalness: 0.25 });
  const ICON_GEO = new THREE.PlaneGeometry(0.62, 0.62);

  const ICON_MAT_CACHE = {};
  function iconMaterial(type, colorKey) {
    const key = type + '_' + colorKey;
    if (ICON_MAT_CACHE[key]) return ICON_MAT_CACHE[key];
    const mat = new THREE.MeshBasicMaterial({ map: pieceTexture(type, colorKey), transparent: true });
    ICON_MAT_CACHE[key] = mat;
    return mat;
  }

  function buildPiece(type, colorKey) {
    const g = new THREE.Group();
    const disc = new THREE.Mesh(DISC_GEO, RIM_MAT);
    g.add(disc);
    const icon = new THREE.Mesh(ICON_GEO, iconMaterial(type, colorKey));
    icon.rotation.x = -Math.PI / 2;
    icon.position.y = 0.046; // juste au-dessus du sommet du jeton
    g.add(icon);
    return g;
  }

  function create(options) {
    const canvas = options.canvas;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x08090c, 13, 28);

    const camera = new THREE.PerspectiveCamera(36, (canvas.clientWidth || 1) / (canvas.clientHeight || 1), 0.1, 100);
    // Caméra fixe, côté Blancs (rang 1 au premier plan / bas d'écran,
    // rang 8 au fond / haut d'écran) — orientation standard.
    camera.position.set(0, 13.6, 3.0);
    camera.lookAt(0, 0, 0.1);
    const basePosition = { x: 0, y: 13.6, z: 3.0 };

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.85);
    keyLight.position.set(3, 12, 5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-4, 7, -3);
    scene.add(fillLight);

    const boardGroup = new THREE.Group();
    scene.add(boardGroup);

    const GREEN = 0x769656;
    const CREAM = 0xeeeed2;
    const greenMat = new THREE.MeshBasicMaterial({ color: GREEN });
    const creamMat = new THREE.MeshBasicMaterial({ color: CREAM });
    const squareGeo = new THREE.PlaneGeometry(1, 1);
    const labelGeo = new THREE.PlaneGeometry(0.42, 0.42);

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isGreen = (row + col) % 2 === 1;
        const mesh = new THREE.Mesh(squareGeo, isGreen ? greenMat : creamMat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(col - BOARD_OFFSET, 0, row - BOARD_OFFSET);
        boardGroup.add(mesh);

        const label = new THREE.Mesh(labelGeo, new THREE.MeshBasicMaterial({ map: labelTexture(FILES[col] + (8 - row), isGreen), transparent: true }));
        label.rotation.x = -Math.PI / 2;
        label.position.set(col - BOARD_OFFSET - 0.27, 0.001, row - BOARD_OFFSET - 0.27);
        boardGroup.add(label);
      }
    }

    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.PlaneGeometry(8.02, 8.02)),
      new THREE.LineBasicMaterial({ color: 0x2b2d33, transparent: true, opacity: 0.7 })
    );
    frame.rotation.x = -Math.PI / 2;
    frame.position.y = 0.002;
    boardGroup.add(frame);

    let pieces, captured;

    function homePosition() {
      pieces = [];
      captured = { w: 0, b: 0 };
      // a1 = tour, b1 = cavalier, c1 = fou, d1 = dame, e1 = roi... (standard)
      const BACK_ROW = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

      boardGroup.children
        .filter((c) => c.userData && c.userData.isPiece)
        .forEach((c) => boardGroup.remove(c));

      function spawn(type, colorKey, square) {
        const { col, row } = squareToColRow(square);
        const mesh = buildPiece(type, colorKey);
        const homeY = 0.05;
        mesh.position.set(col - BOARD_OFFSET, homeY, row - BOARD_OFFSET);
        mesh.userData = { square, col, row, homeY, alive: true, colorKey, isPiece: true };
        boardGroup.add(mesh);
        pieces.push(mesh);
      }

      // Les Blancs jouent depuis le rang 1 (near/bas d'écran), les
      // Noirs depuis le rang 8 — les Blancs commencent toujours.
      BACK_ROW.forEach((type, i) => {
        spawn(type, 'w', FILES[i] + '1');
        spawn(type, 'b', FILES[i] + '8');
      });
      for (let i = 0; i < 8; i++) {
        spawn('pawn', 'w', FILES[i] + '2');
        spawn('pawn', 'b', FILES[i] + '7');
      }
    }

    function findAt(square) {
      for (const mesh of pieces) {
        if (mesh.userData.alive && mesh.userData.square === square) return mesh;
      }
      return null;
    }

    function benchPosition(colorKey, index) {
      const side = colorKey === 'w' ? 5.6 : -5.6;
      return { x: side, y: 0.05, z: -3.2 + index * 0.7 };
    }

    function removeToBench(mesh) {
      mesh.userData.alive = false;
      const key = mesh.userData.colorKey;
      const idx = captured[key]++;
      const pos = benchPosition(key, idx);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.scale.setScalar(0.6);
    }

    function placeInstant(mesh, square) {
      const { col, row } = squareToColRow(square);
      mesh.position.set(col - BOARD_OFFSET, mesh.userData.homeY, row - BOARD_OFFSET);
      mesh.userData.square = square;
      mesh.userData.col = col;
      mesh.userData.row = row;
    }

    function spawnImpactRing(x, z, color) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.08, 0.13, 28),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(x, 0.03, z);
      boardGroup.add(ring);
      const start = performance.now();
      const duration = 480;
      function step(now) {
        const t = Math.min(1, (now - start) / duration);
        const scale = 1 + t * 3.2;
        ring.scale.set(scale, scale, scale);
        ring.material.opacity = 0.85 * (1 - t);
        if (t < 1) requestAnimationFrame(step);
        else boardGroup.remove(ring);
      }
      requestAnimationFrame(step);
    }

    function animateTo(mesh, square, duration) {
      const { col, row } = squareToColRow(square);
      const start = performance.now();
      const from = { x: mesh.position.x, z: mesh.position.z };
      const to = { x: col - BOARD_OFFSET, z: row - BOARD_OFFSET };
      const homeY = mesh.userData.homeY;
      const lift = 0.95;
      const glow = mesh.userData.colorKey === 'w' ? 0xe9e5d6 : 0x8fd6b0;

      function step(now) {
        const raw = Math.min(1, (now - start) / duration);
        // Course horizontale : accélère puis ralentit en douceur.
        const eased = raw < 0.5
          ? 4 * raw * raw * raw
          : 1 - Math.pow(-2 * raw + 2, 3) / 2;
        mesh.position.x = from.x + (to.x - from.x) * eased;
        mesh.position.z = from.z + (to.z - from.z) * eased;

        // Trajectoire en arc avec un léger rebond à l'atterrissage.
        const arc = Math.sin(Math.PI * Math.min(1, raw / 0.88));
        const settle = raw > 0.88 ? Math.sin((raw - 0.88) / 0.12 * Math.PI) * 0.06 * (1 - (raw - 0.88) / 0.12) : 0;
        mesh.position.y = homeY + arc * lift + (raw > 0.88 ? settle : 0);

        // Petit effet "pièce soulevée" : légère bascule + pulsation.
        mesh.rotation.z = Math.sin(Math.PI * raw) * 0.14;
        mesh.rotation.x = Math.sin(Math.PI * raw) * 0.08;
        const scale = 1 + Math.sin(Math.PI * raw) * 0.16;
        mesh.scale.setScalar(scale);

        if (raw < 1) requestAnimationFrame(step);
        else {
          mesh.position.y = homeY;
          mesh.rotation.z = 0;
          mesh.rotation.x = 0;
          mesh.scale.setScalar(1);
          mesh.userData.square = square;
          mesh.userData.col = col;
          mesh.userData.row = row;
          spawnImpactRing(to.x, to.z, glow);
        }
      }
      requestAnimationFrame(step);
    }

    function applyMove(move, animated) {
      const mover = findAt(move.from);
      if (!mover) return;

      if (move.capture) {
        const capturedPiece = findAt(move.capture);
        if (capturedPiece && capturedPiece !== mover) removeToBench(capturedPiece);
      }

      if (animated && !reduceMotion) animateTo(mover, move.to, 900);
      else placeInstant(mover, move.to);

      if (move.castle) {
        const rook = findAt(move.castle.rookFrom);
        if (rook) {
          if (animated && !reduceMotion) animateTo(rook, move.castle.rookTo, 900);
          else placeInstant(rook, move.castle.rookTo);
        }
      }
    }

    homePosition();

    let currentIndex = -1;

    function goToIndex(moves, targetIndex) {
      targetIndex = Math.max(-1, Math.min(moves.length - 1, targetIndex));
      if (targetIndex === currentIndex) return;

      if (targetIndex === currentIndex + 1) {
        applyMove(moves[targetIndex], true);
        currentIndex = targetIndex;
        return;
      }

      homePosition();
      for (let i = 0; i <= targetIndex; i++) {
        applyMove(moves[i], i === targetIndex);
      }
      currentIndex = targetIndex;
    }

    function reset() {
      homePosition();
      currentIndex = -1;
    }

    // Animation d'arrivée en 3D : la caméra "plonge" depuis un point plus
    // haut et plus reculé jusqu'à sa position normale. On capture la
    // position cible APRÈS le dernier resize() (donc déjà adaptée au
    // mobile) pour que le mouvement reste cohérent sur tous les formats.
    let flyToken = 0;
    function flyIn(duration) {
      if (reduceMotion) return;
      const target = camera.position.clone();
      const start = new THREE.Vector3(target.x, target.y * 1.85, target.z * 1.85 + 4.5);
      camera.position.copy(start);
      camera.lookAt(0, 0, 0.1);
      boardGroup.scale.setScalar(0.92);
      const myToken = ++flyToken;
      const t0 = performance.now();
      function step(now) {
        if (myToken !== flyToken) return; // une arrivée plus récente a pris le relais
        const raw = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - raw, 3);
        camera.position.lerpVectors(start, target, eased);
        camera.lookAt(0, 0, 0.1);
        boardGroup.scale.setScalar(0.92 + 0.08 * eased);
        if (raw < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    function resize() {
      const w = canvas.clientWidth || window.innerWidth || 1;
      const h = canvas.clientHeight || window.innerHeight || 1;
      if (w < 2 || h < 2) return; // taille pas encore stabilisée, on ignore
      const aspect = w / h;
      camera.aspect = aspect;
      // Sur un écran étroit (portrait, mobile), le champ de vision
      // horizontal se resserre et rogne les bords du plateau : on recule
      // la caméra proportionnellement pour que le plateau reste entier.
      // On borne la compensation pour éviter tout calcul aberrant sur
      // des ratios extrêmes ou transitoires. On ajoute aussi une petite
      // marge de sécurité (SAFETY_MARGIN) pour ne jamais rogner un bord,
      // même en cas de léger écart de mesure du viewport.
      const SAFETY_MARGIN = 1.08;
      const distanceScale = (aspect < 1 ? Math.min(3, 1 / aspect) : 1) * SAFETY_MARGIN;
      camera.position.set(basePosition.x * distanceScale, basePosition.y * distanceScale, basePosition.z * distanceScale);
      camera.lookAt(0, 0, 0.1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    // Filet de sécurité : certains contextes d'affichage (panneaux
    // redimensionnables, iframes) ne déclenchent pas toujours
    // l'événement 'resize' de la fenêtre de façon fiable. On observe
    // directement la taille réelle du canevas en plus.
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => resize());
      ro.observe(canvas);
    }

    // Plateau totalement fixe : aucune dérive, aucun effet de souris.
    function tick() {
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    tick();

    return { goToIndex, reset, flyIn, resize };
  }

  return { create };
})();

