(function () {
  const telaBrasa = document.getElementById('emberCanvas');
  const telaFogo  = document.getElementById('leafCanvas');
  if (!telaBrasa || !telaFogo) return;
  const ctxBrasa = telaBrasa.getContext('2d');
  const ctxFogo  = telaFogo.getContext('2d');

  function redimensionar() {
    for (const c of [telaBrasa, telaFogo]) {
      c.width = innerWidth;
      c.height = innerHeight;
    }
  }
  redimensionar();
  addEventListener('resize', redimensionar);

  const brasas = [];
  const QTD_CINZAS = 12;
  function criarBrasa(inicial = false) {
    const ehCinza = Math.random() < 0.55;
    brasas.push({
      x: Math.random() * innerWidth,
      y: inicial ? Math.random() * innerHeight : innerHeight + 10,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.3 - Math.random() * 0.9,
      raio: ehCinza ? 0.6 + Math.random() * 1.2 : 1 + Math.random() * 2,
      vida: 0,
      vidaMax: 300 + Math.random() * 4,
      cinza: ehCinza,
      cintilar: Math.random() * Math.PI * 2,
    });
  }
  for (let i = 0; i < QTD_CINZAS; i++) criarBrasa(true);

  const fagulhas = [];
  let ultimoSpawn = 0;
  let mouseX = -9999, mouseY = -9999;

  addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const agora = performance.now();
    if (agora - ultimoSpawn < 12) return;
    ultimoSpawn = agora;
    criarFagulhas(e.clientX, e.clientY, 4);
  });

  function criarFagulhas(px, py, qtd) {
    for (let i = 0; i < qtd; i++) {
      const angulo = Math.random() * Math.PI * 2;
      const velocidade = 0.3 + Math.random() * 1.4;
      fagulhas.push({
        x: px + (Math.random() - 0.5) * 6,
        y: py + (Math.random() - 0.5) * 6,
        vx: Math.cos(angulo) * velocidade * 0.5,
        vy: -0.6 - Math.random() * 1.6,
        tamanho: 2 + Math.random() * 4,
        vida: 0,
        vidaMax: 40 + Math.random() * 40,
        matiz: 10 + Math.random() * 40, 
      });
    }
  }

  function desenharFagulha(ctx, f) {
    const a = Math.max(0, 1 - f.vida / f.vidaMax);
    const tam = f.tamanho * (0.4 + a * 0.8);
    
    const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, tam * 3);
    grad.addColorStop(0, `hsla(${f.matiz}, 100%, 70%, ${a})`);
    grad.addColorStop(0.4, `hsla(${f.matiz - 5}, 100%, 50%, ${a * 0.6})`);
    grad.addColorStop(1, `hsla(${f.matiz - 10}, 100%, 30%, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(f.x, f.y, tam * 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = `hsla(${f.matiz + 10}, 100%, 85%, ${a})`;
    ctx.beginPath();
    ctx.arc(f.x, f.y, tam * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  function loop() {
    
    ctxBrasa.clearRect(0, 0, telaBrasa.width, telaBrasa.height);
    if (brasas.length < QTD_CINZAS + 60) criarBrasa();
    for (let i = brasas.length - 1; i >= 0; i--) {
      const p = brasas[i];
      p.vida++;
      p.x += p.vx + Math.sin((p.vida + p.cintilar) * 0.04) * 0.3;
      p.y += p.vy;
      const a = Math.max(0, 1 - p.vida / p.vidaMax);
      if (p.cinza) {
        ctxBrasa.fillStyle = `rgba(190,180,165,${a * 0.45})`;
      } else {
        const brilho = 0.6 + Math.sin(p.vida * 0.2 + p.cintilar) * 0.4;
        ctxBrasa.fillStyle = `rgba(255,${120 + brilho * 80 | 0},40,${a})`;
        ctxBrasa.shadowColor = 'rgba(255,140,30,0.95)';
        ctxBrasa.shadowBlur = 10;
      }
      ctxBrasa.beginPath();
      ctxBrasa.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
      ctxBrasa.fill();
      ctxBrasa.shadowBlur = 0;
      if (p.vida >= p.vidaMax || p.y < -10) brasas.splice(i, 1);
    }

    ctxFogo.clearRect(0, 0, telaFogo.width, telaFogo.height);
    ctxFogo.globalCompositeOperation = 'lighter';
    for (let i = fagulhas.length - 1; i >= 0; i--) {
      const f = fagulhas[i];
      f.vida++;
      f.vy += 0.005; 
      f.vx *= 0.98;
      f.x += f.vx + (Math.random() - 0.5) * 0.4;
      f.y += f.vy;
      desenharFagulha(ctxFogo, f);
      if (f.vida >= f.vidaMax) fagulhas.splice(i, 1);
    }
    ctxFogo.globalCompositeOperation = 'source-over';

    requestAnimationFrame(loop);
  }
  loop();
})();
