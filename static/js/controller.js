(function() {
  'use strict';

  function controller(element, property) {
    element.addEventListener('touchstart', () => dispatch(property, 1));
    element.addEventListener('touchend', () => dispatch(property, 0));

    function dispatch(property, value) {
      element.dispatchEvent(new CustomEvent('change', {
        detail: {
          property: property,
          value: value
        }
      }));
    }

    return {
      element
    };
  }

  window.controller = controller;
}());
