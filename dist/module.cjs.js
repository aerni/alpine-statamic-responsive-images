var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// builds/module.js
__markAsModule(exports);
__export(exports, {
  default: () => module_default
});

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

// builds/module.js
var module_default = src_default;
