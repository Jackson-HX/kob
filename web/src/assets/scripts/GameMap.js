import { GameObject } from "./GameObject";
import { GridBlock } from "./GridBlock";

export class GameMap extends GameObject {
  constructor(ctx, parent) {
    super();

    this.ctx = ctx;
    this.parent = parent;
    this.L = 0;

    this.rows = 13;
    this.cols = 13;

    this.blocks = [];
    this.inner_blocks_cnt = 20;
  }

  is_connected(g, sx, sy, tx, ty) {
    if (sx == tx && sy == ty) return true;
    g[sx][sy] = true;
    let dx = [-1, 0, 1, 0],
      dy = [0, 1, 0, -1];
    for (let i = 0; i < 4; i++) {
      let new_x = sx + dx[i];
      let new_y = sy + dy[i];
      if (!g[new_x][new_y] && this.is_connected(g, new_x, new_y, tx, ty)) {
        return true;
      }
    }
    return false;
  }

  create_blocks() {
    const g = [];

    // init all grids
    for (let r = 0; r < this.rows; r++) {
      g[r] = [];
      for (let c = 0; c < this.cols; c++) {
        g[r][c] = false;
      }
    }

    // add blocks to surrounding grids
    for (let r = 0; r < this.rows; r++) {
      g[r][0] = g[r][this.cols - 1] = true;
    }
    for (let r = 0; r < this.cols; r++) {
      g[0][r] = g[this.rows - 1][r] = true;
    }

    // randomly generated inner blocks
    for (let i = 0; i < this.inner_blocks_cnt / 2; i++) {
      for (let j = 0; j < 1000; j++) {
        let r = parseInt(Math.random() * this.rows);
        let c = parseInt(Math.random() * this.cols);
        if (
          g[r][c] ||
          g[c][r] ||
          (r == this.rows - 2 && c == 1) ||
          (r == 1 && c == this.cols - 2)
        )
          continue;
        g[r][c] = g[c][r] = true;
        break;
      }
    }

    const copy_g = JSON.parse(JSON.stringify(g));
    if (!this.is_connected(copy_g, this.rows - 2, 1, 1, this.cols - 2))
      return false;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (g[r][c]) {
          this.blocks.push(new GridBlock(r, c, this));
        }
      }
    }

    return true;
  }

  start() {
    for (let i = 0; i < 1000; i++) {
      if (this.create_blocks()) {
        break;
      }
    }
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

  update() {
    this.update_size();
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
