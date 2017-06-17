(function(window, document) {
  'use strict';

  const forward = controller(document.getElementById('fController'), 'forward');
  const backward = controller(document.getElementById('bController'), 'backward');
  const left = controller(document.getElementById('lController'), 'left');
  const right = controller(document.getElementById('rController'), 'right');

  let state = {forward: 0, backward: 0, left: 0, right: 0};
  let socket;

  function initialise() {
    socket = io.connect('picar.local:8080');
    bindEvents();
  }

  function bindEvents() {
    socket.on('connected', onSocketConnect);
    forward.element.addEventListener('change', onControllerChange);
    backward.element.addEventListener('change', onControllerChange);
    left.element.addEventListener('change', onControllerChange);
    right.element.addEventListener('change', onControllerChange);
  }

  function onSocketConnect() {
    document.getElementById('status').className += ' isConnected';
  }

  function onControllerChange(event) {
    state[event.detail.property] = event.detail.value;
    socket.emit('stateChangeRequest', state);
  }

  window.onload = function() {
    initialise();
  };
}(window, document));
