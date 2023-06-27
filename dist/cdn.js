(() => {
  // src/index.js
  function src_default(Alpine) {
    Alpine.directive("statamic-responsive-images", (el, {}, {cleanup}) => {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          el.parentNode.querySelectorAll("source").forEach((source) => {
            source.sizes = Math.ceil(el.getBoundingClientRect().width / window.innerWidth * 100) + "vw";
          });
        });
      });
      observer.observe(el);
      cleanup(() => {
        observer.disconnect();
      });
    });
  }

  // builds/cdn.js
  document.addEventListener("alpine:init", () => {
    window.Alpine.plugin(src_default);
  });
})();
