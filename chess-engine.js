// Moteur d'échiquier 3D (Three.js) : construit la scène, place les pièces,
// joue les coups un par un et gère la caméra (y compris l'animation d'arrivée « flyIn »).
const ChessEngine = (function () {

  const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const BOARD_OFFSET = 3.5;
  function squareToColRow(square) {
    const file = square[0];
    const rank = Number.parseInt(square[1], 10);
    return { col: FILES.indexOf(file), row: 8 - rank };
  }

  // V4 : pièces plates, vues du dessus. Les six silhouettes normalisées sont
  // volontairement beaucoup plus lisibles que les anciens volumes Staunton.
  const GLYPHS = {
    pawn: '♟', knight: '♞', bishop: '♝',
    rook: '♜', queen: '♛', king: '♚'
  };
  const TOKEN_COLORS = {
    w: { disc: 0xdfe9de, rim: 0x15291d, symbol: '#10221a', outline: '#f5fff7' },
    b: { disc: 0x0d1913, rim: 0xa3cdb0, symbol: '#e9f4e8', outline: '#0c1812' }
  };
  const TOKEN_RADIUS = 0.385;
  const TOKEN_GEO = new THREE.CylinderGeometry(TOKEN_RADIUS, TOKEN_RADIUS, 0.045, 48);
  const TOKEN_RING_GEO = new THREE.TorusGeometry(0.358, 0.014, 6, 48);
  const TOKEN_ICON_GEO = new THREE.PlaneGeometry(0.68, 0.68);
  const TOKEN_FACE_MATS = {
    w: new THREE.MeshBasicMaterial({ color: TOKEN_COLORS.w.disc, toneMapped: false }),
    b: new THREE.MeshBasicMaterial({ color: TOKEN_COLORS.b.disc, toneMapped: false })
  };
  const TOKEN_RING_MATS = {
    w: new THREE.MeshBasicMaterial({ color: TOKEN_COLORS.w.rim, toneMapped: false }),
    b: new THREE.MeshBasicMaterial({ color: TOKEN_COLORS.b.rim, toneMapped: false })
  };
  const TOKEN_ICON_CACHE = new Map();
  function drawTokenIcon(entry) {
    const ctx = entry.ctx;
    const c = TOKEN_COLORS[entry.color];
    const glyph = GLYPHS[entry.type];
    const size = 384;
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '300px "Noto Sans Symbols 2", "Segoe UI Symbol", "DejaVu Sans", sans-serif';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 9;
    ctx.strokeStyle = c.outline;
    ctx.fillStyle = c.symbol;
    ctx.strokeText(glyph, size / 2, size / 2 + 6);
    ctx.fillText(glyph, size / 2, size / 2 + 6);
    ctx.restore();
    entry.texture.needsUpdate = true;
  }
  function iconMaterial(type, color) {
    const key = type + '-' + color;
    if (TOKEN_ICON_CACHE.has(key)) return TOKEN_ICON_CACHE.get(key).material;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 384;
    const texture = new THREE.CanvasTexture(canvas);
    texture.encoding = THREE.sRGBEncoding;
    const entry = {
      type, color, texture, ctx: canvas.getContext('2d'),
      material: new THREE.MeshBasicMaterial({
        map: texture, transparent: true, alphaTest: 0.02,
        depthWrite: false, toneMapped: false, side: THREE.DoubleSide
      })
    };
    drawTokenIcon(entry);
    TOKEN_ICON_CACHE.set(key, entry);
    return entry.material;
  }
  if (document.fonts) {
    // Les pictogrammes s'affichent même avant le chargement de la police;
    // une seconde passe garantit la forme définitive une fois celle-ci prête.
    document.fonts.load('300px "Noto Sans Symbols 2"')
      .then(() => TOKEN_ICON_CACHE.forEach(drawTokenIcon))
      .catch(() => {});
  }
  function buildPiece(type, colorKey) {
    const group = new THREE.Group();
    const disc = new THREE.Mesh(TOKEN_GEO, TOKEN_FACE_MATS[colorKey]);
    disc.position.y = 0.026;
    group.add(disc);
    const rim = new THREE.Mesh(TOKEN_RING_GEO, TOKEN_RING_MATS[colorKey]);
    rim.rotation.x = -Math.PI / 2;
    rim.position.y = 0.051;
    group.add(rim);
    const icon = new THREE.Mesh(TOKEN_ICON_GEO, iconMaterial(type, colorKey));
    icon.rotation.x = -Math.PI / 2;
    icon.position.y = 0.056;
    group.add(icon);
    return group;
  }

  const LABEL_CACHE = {};
  function labelTexture(text, onGreen) {
    const key = text + '_' + onGreen;
    if (LABEL_CACHE[key]) return LABEL_CACHE[key];
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.font = '700 25px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = onGreen ? 'rgba(221,237,224,0.9)' : 'rgba(130,177,149,0.9)';
    ctx.fillText(text, 4, size - 4);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    LABEL_CACHE[key] = texture;
    return texture;
  }

  function create(options) {
    const canvas = options.canvas;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030706);
    scene.fog = new THREE.Fog(0x030706, 16, 34);

    const camera = new THREE.PerspectiveCamera(36, (canvas.clientWidth || 1) / (canvas.clientHeight || 1), 0.1, 100);
    // Caméra fixe, côté Blancs (rang 1 au premier plan / bas d'écran,
    // rang 8 au fond / haut d'écran) — orientation standard.
    camera.position.set(0, 16.5, 2.3);
    camera.lookAt(0, 0, 0.1);
    const basePosition = { x: 0, y: 16.5, z: 2.3 };

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.88;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    // Contrastes maîtrisés : lumière diffuse douce et léger liseré sur les pièces noires.
    scene.add(new THREE.AmbientLight(0xe4efe8, 0.56));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.10);
    keyLight.position.set(3, 12, 5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x88bd9e, 0.30);
    fillLight.position.set(-4, 7, -3);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xaad6ba, 0.5);
    rimLight.position.set(0, 8, -8);
    scene.add(rimLight);

    const boardGroup = new THREE.Group();
    scene.add(boardGroup);

    // Matériaux non affectés par la lumière : vert forêt et noir restent fidèles
    // aux couleurs choisies quel que soit le GPU ou la position de caméra.
    const GREEN = 0x20543c;
    const BLACK = 0x0b110f;
    const greenMat = new THREE.MeshBasicMaterial({ color: GREEN, toneMapped: false });
    const blackMat = new THREE.MeshBasicMaterial({ color: BLACK, toneMapped: false });
    const squareGeo = new THREE.PlaneGeometry(1, 1);
    const labelGeo = new THREE.PlaneGeometry(0.42, 0.42);

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isGreen = (row + col) % 2 === 1;
        const mesh = new THREE.Mesh(squareGeo, isGreen ? greenMat : blackMat);
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
      new THREE.LineBasicMaterial({ color: 0x638b73, transparent: true, opacity: 0.68 })
    );
    frame.rotation.x = -Math.PI / 2;
    frame.position.y = 0.002;
    boardGroup.add(frame);

    let pieces, captured;
    let animationGeneration = 0;
    const motionTokens = new WeakMap();
    function cancelPieceMotion(mesh) { motionTokens.set(mesh, (motionTokens.get(mesh) || 0) + 1); }
    function cancelAllMotions() {
      animationGeneration++;
      if (pieces) pieces.forEach(cancelPieceMotion);
    }

    function homePosition() {
      cancelAllMotions();
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
        const homeY = 0.005;
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
      cancelPieceMotion(mesh);
      mesh.rotation.set(0, 0, 0);
      mesh.userData.alive = false;
      const key = mesh.userData.colorKey;
      const idx = captured[key]++;
      const pos = benchPosition(key, idx);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.scale.setScalar(0.65);
    }

    function placeInstant(mesh, square) {
      cancelPieceMotion(mesh);
      mesh.scale.setScalar(1);
      mesh.rotation.set(0, 0, 0);
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
      const token = (motionTokens.get(mesh) || 0) + 1;
      motionTokens.set(mesh, token);
      const generation = animationGeneration;
      const from = { x: mesh.position.x, z: mesh.position.z };
      const to = { x: col - BOARD_OFFSET, z: row - BOARD_OFFSET };
      const homeY = mesh.userData.homeY;
      const lift = 0.25;
      const glow = mesh.userData.colorKey === 'w' ? 0xe9e5d6 : 0x8fd6b0;

      function step(now) {
        if (motionTokens.get(mesh) !== token || generation !== animationGeneration) return;
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
        mesh.rotation.z = Math.sin(Math.PI * raw) * 0.04;
        mesh.rotation.x = Math.sin(Math.PI * raw) * 0.03;
        const scale = 1 + Math.sin(Math.PI * raw) * 0.06;
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

      // On met à jour la position logique (case/col/row) immédiatement,
      // avant même que l'animation visuelle ne démarre. Sans ça, en cas de
      // défilement rapide (plusieurs coups joués avant que l'animation de
      // 900ms du précédent ne se termine), une capture pouvait chercher une
      // pièce sur une case qu'elle n'avait "logiquement" pas encore atteinte
      // : la pièce mangée n'était alors jamais retirée, et deux pièces se
      // retrouvaient sur la même case.
      const dest = squareToColRow(move.to);
      mover.userData.square = move.to;
      mover.userData.col = dest.col;
      mover.userData.row = dest.row;

      if (animated && !reduceMotion) animateTo(mover, move.to, 560);
      else placeInstant(mover, move.to);

      if (move.castle) {
        const rook = findAt(move.castle.rookFrom);
        if (rook) {
          const rookDest = squareToColRow(move.castle.rookTo);
          rook.userData.square = move.castle.rookTo;
          rook.userData.col = rookDest.col;
          rook.userData.row = rookDest.row;
          if (animated && !reduceMotion) animateTo(rook, move.castle.rookTo, 560);
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
        applyMove(moves[i], false);
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
      ++flyToken;
      if (reduceMotion) return;
      const target = camera.position.clone();
      const start = new THREE.Vector3(target.x, target.y * 1.85, target.z * 1.85 + 4.5);
      camera.position.copy(start);
      camera.lookAt(0, 0, 0.1);
      boardGroup.scale.setScalar(0.92);
      const myToken = flyToken;
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
      ++flyToken;
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
      const SAFETY_MARGIN = 1.12;
      const distanceScale = (aspect < 1 ? Math.min(3, 1 / aspect) : 1) * SAFETY_MARGIN;
      camera.position.set(basePosition.x * distanceScale, basePosition.y * distanceScale, basePosition.z * distanceScale);
      camera.lookAt(0, 0, 0.1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 700 ? 1.35 : 1.75));
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
      if (!document.hidden && canvas.getClientRects().length && canvas.clientWidth > 1) renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    tick();

    return { goToIndex, reset, flyIn, resize };
  }

  return { create };
})();

