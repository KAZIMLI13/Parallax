(function(){
  const layers = [
    {sel: '.layer-deep', speed: 0.08},
    {sel: '.layer-veil', speed: 0.22},
    {sel: '.layer-flora', speed: 0.36},
    {sel: '.layer-creatures', speed: 0.52},
    {sel: '.layer-bubbles', speed: 0.72},
    {sel: '.layer-foreground', speed: 0.95}
  ].map(o => ({el: document.querySelector(o.sel), speed: o.speed}));

  let lastScroll = window.scrollY;
  let ticking = false;

  function updatePositions(scrollY){
    layers.forEach(item => {
      if(!item.el) return;
      const y = scrollY * item.speed;
      item.el.style.transform = `translateX(-50%) translateY(${y}px)`;
    });
    const hero = document.querySelector('.hero-title');
    if(hero) hero.style.opacity = String(Math.max(0.18, 1 - window.scrollY / 450));
  }

  window.addEventListener('scroll', () => {
    lastScroll = window.scrollY;
    if(!ticking){
      window.requestAnimationFrame(() => {
        updatePositions(lastScroll);
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});

  function pointerParallax(e){
    const cx = window.innerWidth/2;
    const cy = window.innerHeight/2;
    const x = (e.clientX - cx) / cx;
    const y = (e.clientY - cy) / cy;
    layers.forEach((item, idx) => {
      if(!item.el) return;
      const rx = x * (idx * 6);
      const ry = y * (idx * 4);
      const current = item.el.style.transform || 'translateX(-50%) translateY(0px)';
      const tyMatch = current.match(/translateY\((-?\d+\.?\d*)px\)/);
      const ty = tyMatch ? parseFloat(tyMatch[1]) : 0;
      item.el.style.transform = `translateX(calc(-50% + ${rx}px)) translateY(${ty + ry}px)`;
    });
  }

  window.addEventListener('mousemove', pointerParallax, {passive:true});
  window.addEventListener('touchmove', (ev) => {
    if(ev.touches && ev.touches[0]) pointerParallax(ev.touches[0]);
  }, {passive:true});

  updatePositions(window.scrollY);
})();
