import { GameObject } from "./GameObject";
import { GridBlock } from "./GridBlock";
import { Snake } from "./Snake";

export class GameMap extends GameObject {
  constructor(ctx, parent, store) {
    super();

    this.ctx = ctx;
    this.parent = parent;
    this.store = store;
    this.L = 0;

    this.rows = 13;
    this.cols = 14;

    this.blocks = [];
    this.inner_blocks_cnt = 20;

    this.snakes = [
      new Snake({ id: 0, color: "#4876EC", r: this.rows - 2, c: 1 }, this),
      new Snake({ id: 1, color: "#F94848", r: 1, c: this.cols - 2 }, this),
    ];
  }

  create_blocks() {
    const g = this.store.state.pk.gamemap;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (g[r][c]) {
          this.blocks.push(new GridBlock(r, c, this));
        }
      }
    }
  }

  add_listening_events() {
    this.ctx.canvas.focus();
    this.ctx.canvas.addEventListener("keydown", (e) => {
      let d = -1;
      if (e.key === "w") d = 0;
      else if (e.key === "d") d = 1;
      else if (e.key === "s") d = 2;
      else if (e.key === "a") d = 3;

      if (d >= 0) {
        this.store.state.pk.socket.send(
          JSON.stringify({
            event: "move",
            direction: d,
          })
        );
      }
    });
  }

  start() {
    this.create_blocks();

    this.add_listening_events();
  }

  update_size() {
    this.L = parseInt(
      Math.min(
        this.parent.clientWidth / this.cols,
        this.parent.clientHeight / this.rows
      )
    );
    this.ctx.canvas.width = this.L * this.cols;
    this.ctx.canvas.height = this.L * this.rows;
  }

  check_ready() {
    // check if both are ready
    for (const snake of this.snakes) {
      if (snake.status !== "idle") return false;
      if (snake.direction === -1) return false;
    }
    return true;
  }

  next_step() {
    for (const snake of this.snakes) {
      snake.next_step();
    }
  }

  check_valid(grid) {
    // check if target is valid, neither snake nor block
    for (const blk of this.blocks) {
      if (blk.r === grid.r && blk.c === grid.c) {
        return false;
      }
    }

    for (const snake of this.snakes) {
      let k = snake.grids.length;
      if (!snake.check_tail_increasing()) {
        k--;
      }
      for (let i = 0; i < k; i++) {
        if (snake.grids[i].r === grid.r && snake.grids[i].c === grid.c) {
          return false;
        }
      }
    }

    return true;
  }

  update() {
    this.update_size();
    if (this.check_ready()) {
      this.next_step();
    }
    this.render();
  }

  render() {
    const color_even = "#AAD751";
    const color_odd = "#A2D149";
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if ((r + c) % 2 == 0) {
          this.ctx.fillStyle = color_even;
        } else {
          this.ctx.fillStyle = color_odd;
        }
        this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
      }
    }
  }
}
