import checkIfCollideNextMove from "../utils/checkIfCollideNextMove";
import pickShape from "../utils/pickShape";
// import Shape from "./Shape"
import I from "./shapes/I";
import { ShapeArray, Shape } from "./shapes/ShapeEnum";

class Matrix {
  matrix: number[][];
  width: number;
  height: number;
  factor: number;
  constructor(width: number, height: number, factor: number) {
    this.width = width / factor;
    this.height = height / factor;
    this.factor = factor;
    this.matrix = Array(this.height)
      .fill([])
      .map(() => Array(this.width).fill(0));
  }

  spawnShape() {
    // should pick random shame from I, J, L, O, S, T, Z
    const pickedShape = pickShape(ShapeArray);
    // const pickedShape = Shape.J
    const position = Math.floor(Math.random() * this.width);
    switch (pickedShape) {
      case Shape.I:
        this.addI(position);
        break;
      case Shape.J:
        this.addJ(position);
        break;
      case Shape.L:
        this.addL(position);
        break;
      case Shape.O:
        this.addO(position);
        break;
      case Shape.S:
        this.addS(position);
        break;
      case Shape.Z:
        this.addZ(position);
        break;
      default:
        break;
    }
  }

  move() {
    let isChecked = false;
    let willCollide = false;
    for (let r = this.height - 1; r >= 0; r -= 1) {
      for (let c = 0; c < this.width; c += 1) {
        if (this.matrix[r][c] === 1) {
          if (!isChecked) {
            willCollide = checkIfCollideNextMove(this.matrix, r, c);
            isChecked = true;
          }
          if (willCollide) {
            this.kill(r, c);
          } else {
            this.matrix[r][c] = 0;
            this.matrix[r + 1][c] = 1;
          }
        }
      }
    }
  }

  kill(r: number, c: number) {
    if (!this.matrix[r]) return;
    if (!this.matrix[r][c]) return;
    if (r >= this.height || r < 0) return;
    if (c >= this.width || c < 0) return;
    if (this.matrix[r][c] === 2) return;
    if (this.matrix[r][c] === 0) return;
    this.matrix[r][c] = 2;
    this.kill(r + 1, c);
    this.kill(r - 1, c);
    this.kill(r, c + 1);
    this.kill(r, c - 1);
  }

  addI(pos: number) {
    pos = pos + 4 > this.width ? this.width - 4 : pos;
    this.matrix[0][pos] = 1;
    this.matrix[0][pos + 1] = 1;
    this.matrix[0][pos + 2] = 1;
    this.matrix[0][pos + 3] = 1;
  }

  addJ(pos: number) {
    pos = pos + 3 > this.width ? this.width - 3 : pos;
    this.matrix[0][pos] = 1;
    this.matrix[1][pos] = 1;
    this.matrix[1][pos + 1] = 1;
    this.matrix[1][pos + 2] = 1;
  }

  addL(pos: number) {
    pos = pos + 3 > this.width ? this.width - 3 : pos;
    this.matrix[1][pos] = 1;
    this.matrix[0][pos] = 1;
    this.matrix[0][pos + 1] = 1;
    this.matrix[0][pos + 2] = 1;
  }

  addO(pos: number) {
    pos = pos + 2 > this.width ? this.width - 3 : pos;
    this.matrix[0][pos] = 1;
    this.matrix[0][pos + 1] = 1;
    this.matrix[1][pos] = 1;
    this.matrix[1][pos + 1] = 1;
  }

  addS(pos: number) {
    pos = pos + 3 > this.width ? this.width - 3 : pos;
    this.matrix[1][pos] = 1;
    this.matrix[1][pos + 1] = 1;
    this.matrix[0][pos + 1] = 1;
    this.matrix[0][pos + 2] = 1;
  }

  addZ(pos: number) {
    pos = pos + 3 > this.width ? this.width - 3 : pos;
    this.matrix[0][pos] = 1;
    this.matrix[0][pos + 1] = 1;
    this.matrix[1][pos + 1] = 1;
    this.matrix[1][pos + 2] = 1;
  }

  addT(pos: number) {
    pos = pos + 3 > this.width ? this.width - 3 : pos;
    this.matrix[0][pos] = 1;
    this.matrix[0][pos + 1] = 1;
    this.matrix[0][pos + 2] = 1;
    this.matrix[1][pos + 1] = 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const currentVal = this.matrix[y][x];
        if (currentVal === 1) {
          ctx.beginPath();
          ctx.fillStyle = "white";
          ctx.fillRect(
            x * this.factor,
            y * this.factor,
            this.factor,
            this.factor
          );
        }
        if (currentVal === 2) {
          ctx.beginPath();
          ctx.fillStyle = "green";
          ctx.fillRect(
            x * this.factor,
            y * this.factor,
            this.factor,
            this.factor
          );
        }
      }
    }
  }

  checkActive() {
    // see if matrix contains any values that are 1
    for (let subarr of this.matrix) {
      if (subarr.some((val) => val === 1)) {
        return true;
      }
    }
    return false;
  }
}

export default Matrix;
