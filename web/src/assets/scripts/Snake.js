import { GameObject } from "./GameObject";
import { SingleGrid } from "./SingleGrid";

export class Snake extends GameObject {
  constructor(info, gamemap) {
    super();
    this.id = info.id;
    this.color = info.color;
    this.gamemap = gamemap;

    this.grids = [new SingleGrid(info.r, info.c)]; // body

    this.next_grid = null;
    this.speed = 5; // Snake's speed
    this.direction = -1;
    this.status = "idle"; // idle, moving, dead
    this.dr = [-1, 0, 1, 0];
    this.dc = [0, 1, 0, -1];

    this.step = 0;
    this.eps = 1e-2;

    this.eye_direction = 0;
    if (this.id === 1) this.eye_direction = 2;
    this.eye_dx = [
      // eye dx
      [-1, 1],
      [1, 1],
      [1, -1],
      [-1, -1],
    ];
    this.eye_dy = [
      // eye dy
      [-1, -1],
      [-1, 1],
      [1, 1],
      [1, -1],
    ];
  }

  start() {}

  set_direction(d) {
    this.direction = d;
  }

  check_tail_increasing() {
    if (this.step <= 10) return true;
    if (this.step % 3 === 1) return true;
    return false;
  }

  next_step() {
    const d = this.direction;
    this.next_grid = new SingleGrid(
      this.grids[0].r + this.dr[d],
      this.grids[0].c + this.dc[d]
    );
    this.direction = -1;
    this.status = "move";
    this.step++;

    const k = this.grids.length;
    for (let i = k; i > 0; i--) {
      this.grids[i] = JSON.parse(JSON.stringify(this.grids[i - 1]));
    }
  }

  update_body() {
    const dx = this.next_grid.x - this.grids[0].x;
    const dy = this.next_grid.y - this.grids[0].y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < this.eps) {
      this.grids[0] = this.next_grid;
      this.next_grid = null;
      this.status = "idle";

      if (!this.check_tail_increasing()) {
        this.grids.pop();
      }
    } else {
      const move_dist = (this.speed * this.timedealta) / 1000;
      this.grids[0].x += (move_dist * dx) / dist;
      this.grids[0].y += (move_dist * dy) / dist;

      if (!this.check_tail_increasing()) {
        const k = this.grids.length;
        const tail = this.grids[k - 1],
          tail_target = this.grids[k - 2];
        const tail_dx = tail_target.x - tail.x;
        const tail_dy = tail_target.y - tail.y;
        tail.x += (move_dist * tail_dx) / dist;
        tail.y += (move_dist * tail_dy) / dist;
      }
    }
  }

  update() {
    if (this.status === "move") {
      this.update_body();
    }
    this.render();
  }

  render() {
    const L = this.gamemap.L;
    const ctx = this.gamemap.ctx;

    ctx.fillStyle = this.color;
    if (this.status === "die") {
      ctx.fillStyle = "white";
    }

    for (const grid of this.grids) {
      ctx.beginPath();
      ctx.arc(grid.x * L, grid.y * L, (L / 2) * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 1; i < this.grids.length; i++) {
      const a = this.grids[i - 1],
        b = this.grids[i];
      if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps)
        continue;
      if (Math.abs(a.x - b.x) < this.eps) {
        ctx.fillRect(
          (a.x - 0.4) * L,
          Math.min(a.y, b.y) * L,
          L * 0.8,
          Math.abs(a.y - b.y) * L
        );
      } else {
        ctx.fillRect(
          Math.min(a.x, b.x) * L,
          (a.y - 0.4) * L,
          Math.abs(a.x - b.x) * L,
          L * 0.8
        );
      }
    }

    ctx.fillStyle = "black";
    for (let i = 0; i < 2; i++) {
      const eye_x =
        (this.grids[0].x + this.eye_dx[this.eye_direction][i] * 0.15) * L;
      const eye_y =
        (this.grids[0].y + this.eye_dy[this.eye_direction][i] * 0.15) * L;

      ctx.beginPath();
      ctx.arc(eye_x, eye_y, L * 0.05, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
