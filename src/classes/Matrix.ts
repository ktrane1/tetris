import pickShape from "../utils/pickShape";
import ShapeCenter from "./shapeCell/ShapeCenter";
import ShapeChild from "./shapeCell/ShapeChild";
import { ShapeArray, Shape } from "./shapes/ShapeEnum";

class Matrix {
  matrix: number[][];
  width: number;
  height: number;
  factor: number;
  activeShape: ShapeCenter | null;
  constructor(width: number, height: number, factor: number) {
    this.width = width / factor;
    this.height = height / factor;
    this.factor = factor;
    this.matrix = Array(this.height)
      .fill([])
      .map(() => Array(this.width).fill(0));
    this.activeShape = null;
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
      case Shape.T:
        this.addT(position);
        break;
      default:
        break;
    }
  }

  shapeMove() {
    const parent = this.activeShape;
    if (!parent) throw new Error("activeShape is null");
    // check if next move down will cause collision
    const check = parent.checkCollide(this.matrix);

    if (!check) {
      this.matrix[parent.row][parent.col] = 0;
      parent.row += 1;
      parent.children.forEach((child) => {
        this.matrix[child.row][child.col] = 0;
        child.row += 1;
      });
    } else {
      this.activeShape = null;
      this.matrix[parent.row][parent.col] = 2;
      parent.children.forEach((child) => {
        this.matrix[child.row][child.col] = 2;
      });
    }
  }

  addI(pos: number) {
    pos = pos + 4 > this.width ? this.width - 4 : pos;
    this.matrix[0][pos] = 1;
    this.matrix[0][pos + 1] = 1;
    this.matrix[0][pos + 2] = 1;
    this.matrix[0][pos + 3] = 1;

    const center = new ShapeCenter(0, pos + 1, Shape.I);
    const child1 = new ShapeChild(0, pos);
    const child2 = new ShapeChild(0, pos + 2);
    const child3 = new ShapeChild(0, pos + 3);

    center.addChildren(child1, child2, child3);

    this.activeShape = center;
  }

  addJ(pos: number) {
    pos = pos + 3 > this.width ? this.width - 3 : pos;
    // construct ShapeChild + ShapeCenter
    const center = new ShapeCenter(1, pos + 1, Shape.J);
    const child1 = new ShapeChild(0, pos);
    const child2 = new ShapeChild(1, pos);
    const child3 = new ShapeChild(1, pos + 2);

    center.addChildren(child1, child2, child3);

    this.activeShape = center;
  }

  addL(pos: number) {
    pos = pos + 3 > this.width ? this.width - 3 : pos;
    this.matrix[1][pos] = 1;
    this.matrix[0][pos] = 1;
    this.matrix[0][pos + 1] = 1;
    this.matrix[0][pos + 2] = 1;

    const center = new ShapeCenter(0, pos + 1, Shape.L);
    const child1 = new ShapeChild(1, pos);
    const child2 = new ShapeChild(0, pos);
    const child3 = new ShapeChild(0, pos + 2);

    center.addChildren(child1, child2, child3);

    this.activeShape = center;
  }

  addO(pos: number) {
    pos = pos + 2 > this.width ? this.width - 3 : pos;
    this.matrix[0][pos] = 1;
    this.matrix[0][pos + 1] = 1;
    this.matrix[1][pos] = 1;
    this.matrix[1][pos + 1] = 1;

    const center = new ShapeCenter(0, pos, Shape.O);
    const child1 = new ShapeChild(0, pos + 1);
    const child2 = new ShapeChild(1, pos);
    const child3 = new ShapeChild(1, pos + 1);

    center.addChildren(child1, child2, child3);

    this.activeShape = center;
  }

  addS(pos: number) {
    pos = pos + 3 > this.width ? this.width - 3 : pos;
    this.matrix[1][pos] = 1;
    this.matrix[1][pos + 1] = 1;
    this.matrix[0][pos + 1] = 1;
    this.matrix[0][pos + 2] = 1;

    const center = new ShapeCenter(1, pos + 1, Shape.S);
    const child1 = new ShapeChild(1, pos);
    const child2 = new ShapeChild(0, pos + 1);
    const child3 = new ShapeChild(0, pos + 2);

    center.addChildren(child1, child2, child3);

    this.activeShape = center;
  }

  addZ(pos: number) {
    pos = pos + 3 > this.width ? this.width - 3 : pos;
    this.matrix[0][pos] = 1;
    this.matrix[0][pos + 1] = 1;
    this.matrix[1][pos + 1] = 1;
    this.matrix[1][pos + 2] = 1;

    const center = new ShapeCenter(0, pos + 1, Shape.Z);
    const child1 = new ShapeChild(0, pos);
    const child2 = new ShapeChild(1, pos + 1);
    const child3 = new ShapeChild(1, pos + 2);

    center.addChildren(child1, child2, child3);

    this.activeShape = center;
  }

  addT(pos: number) {
    pos = pos + 3 > this.width ? this.width - 3 : pos;
    this.matrix[0][pos] = 1;
    this.matrix[0][pos + 1] = 1;
    this.matrix[0][pos + 2] = 1;
    this.matrix[1][pos + 1] = 1;

    const center = new ShapeCenter(0, pos + 1, Shape.T);
    const child1 = new ShapeChild(0, pos);
    const child2 = new ShapeChild(0, pos + 2);
    const child3 = new ShapeChild(1, pos + 1);

    center.addChildren(child1, child2, child3);

    this.activeShape = center;
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

  shapeDraw() {
    // renderParent
    const parent = this.activeShape;
    if (!parent) throw new Error("activeShape is null");
    this.matrix[parent.row][parent.col] = 1;

    parent.children.forEach((child) => {
      this.matrix[child.row][child.col] = 1;
    });
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
