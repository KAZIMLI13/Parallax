window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  const bg = document.querySelector(".layer-bg");
  const buildings = document.querySelector(".layer-buildings");
  const fog = document.querySelector(".layer-fog");
  const lights = document.querySelector(".layer-lights");
  const front = document.querySelector(".layer-front");

  bg.style.transform = `translateY(${scrollY * 0.1}px)`;
  buildings.style.transform = `translateY(${scrollY * 0.3}px)`;
  fog.style.transform = `translateY(${scrollY * 0.5}px)`;
  lights.style.transform = `translateY(${scrollY * 0.7}px)`;
  front.style.transform = `translateY(${scrollY * 1.0}px)`;
});
