document.querySelectorAll('.legible-text-area').forEach(function(elem) {
  applyLegibleOpacityToElement(elem, elem.querySelector(".overlay"));
});