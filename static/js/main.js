(function(window, document) {
  'use strict';

  // const forward = controller(document.getElementById('fController'), 'forward');
  // const backward = controller(document.getElementById('bController'), 'backward');
  // const left = controller(document.getElementById('lController'), 'left');
  // const right = controller(document.getElementById('rController'), 'right');
  const shutdown = document.getElementById('shutdown');

  let state = {forward: 0, backward: 0, left: 0, right: 0};
  let socket;

  function initialise() {
    socket = io.connect('picar.local:8080');
    bindEvents();
  }

  function bindEvents() {
    socket.on('connected', onSocketConnect);
    // forward.element.addEventListener('change', onControllerChange);
    // backward.element.addEventListener('change', onControllerChange);
    // left.element.addEventListener('change', onControllerChange);
    // right.element.addEventListener('change', onControllerChange);
    shutdown.addEventListener('click', onShutdownClick);

    if (window.DeviceMotionEvent != undefined) {
      window.ondevicemotion = onDeviceMotion;
    }
  }

  function onDeviceMotion(event) {
    let y = event.accelerationIncludingGravity.y;
    let z = event.accelerationIncludingGravity.z;

    if (z < -5) {
      state.forward = 1;
    } else if (z > 0) {
      state.backward = 1;
    } else {
      state.forward = 0;
      state.backward = 0;
    }

    if(y >= 3) {
      state.left = 1;
    } else if(y <= -3) {
      state.right = 1;
    } else {
      state.left = 0;
      state.right = 0;
    }
  }

  function onSocketConnect() {
    document.getElementById('status').className += ' isConnected';
  }

  // function onControllerChange(event) {
  //   state[event.detail.property] = event.detail.value;
  //   socket.emit('stateChangeRequest', state);
  // }

  function onShutdownClick() {
    socket.emit('shutdownRequest');
  }

  window.addEventListener('load', initialise);
}(window, document));
