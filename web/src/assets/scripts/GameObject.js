const GAME_OBJECTS = [];

export class GameObject {
  constructor() {
    GAME_OBJECTS.push(this);

    this.timedealta = 0;
    this.started = false;
  }

  start() {}

  update() {}

  on_destroy() {}

  destroy() {
    this.on_destroy();

    for (let i in GAME_OBJECTS) {
      const obj = GAME_OBJECTS[i];
      if (obj === this) {
        GAME_OBJECTS.splice(i);
        break;
      }
    }
  }
}

let last_timestamp;
const step = (timestamp) => {
  for (let i of GAME_OBJECTS) {
    if (!i.started) {
      i.started = true;
      i.start();
    } else {
      i.timedealta = timestamp - last_timestamp;
      i.update();
    }
  }

  last_timestamp = timestamp;
  requestAnimationFrame(step);
};

requestAnimationFrame(step);
