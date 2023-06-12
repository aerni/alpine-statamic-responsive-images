// src/index.js
function src_default(Alpine) {
  Alpine.directive("statamic-responsive-images", (el, {}, {cleanup}) => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        el.parentNode.querySelectorAll("source").forEach((source) => {
          source.sizes = Math.ceil(el.parentNode.getBoundingClientRect().width / window.innerWidth * 100) + "vw";
        });
      });
    });
    observer.observe(el);
    cleanup(() => {
      observer.disconnect();
    });
  });
}

// builds/module.js
var module_default = src_default;
export {
  module_default as default
};
