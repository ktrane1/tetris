import Matrix from "../Matrix";
import { Shape } from "../shapes/ShapeEnum";
import ShapeChild from "./ShapeChild";

export default class ShapeCenter {
  row: number;
  col: number;
  children: ShapeChild[];
  shapeId: Shape;

  constructor(row: number, col: number, shapeId: Shape) {
    this.row = row;
    this.col = col;
    this.children = [];
    this.shapeId = shapeId;
  }

  addChildren(...children: ShapeChild[]) {
    children.forEach((child) => {
      this.children.push(child);
    });
  }

  checkCollide(m: number[][]) {
    // height is 20
    if (this.row + 1 >= 20) return true;

    for (let child of this.children) {
      if (child.row + 1 >= 20) {
        return true;
      }
    }

    if (m[this.row + 1][this.col] === 2) {
      return true;
    }

    for (let child of this.children) {
      if (m[child.row + 1][child.col] === 2) {
        return true;
      }
    }

    return false;
  }

  leftBound(m: number[][], width: number) {
    if (this.col - 1 < 0 || m[this.row][this.col - 1] === 2) {
      return true;
    }
    for (let child of this.children) {
      if (child.col - 1 < 0 || m[child.row][child.col - 1] === 2) {
        return true;
      }
    }
    return false;
  }

  rightBound(m: number[][], width: number) {
    if (this.col + 1 >= width || m[this.row][this.col + 1] === 2) {
      return true;
    }
    for (let child of this.children) {
      if (child.col + 1 >= width || m[child.row][child.col + 1] === 2) {
        return true;
      }
    }
    return false;
  }

  removeChildren() {
    this.children = [];
  }

  rotateLeft() {
    if (this.shapeId === Shape.O) return;
    const mapMat = Array(3)
      .fill([])
      .map(() => Array(3).fill(0));
    // center element is parent
    const diffRow = Math.abs(this.row - 1);
    const diffCol = Math.abs(this.col - 1);

    mapMat[1][1] = 1;
    this.children.forEach((child) => {
      mapMat[child.row - diffRow][child.col - diffCol] = 1;
    });

    for (let x = 0; x < 3 / 2; x++) {
      for (let y = x; y < 3 - x - 1; y++) {
        let temp = mapMat[x][y];
        mapMat[x][y] = mapMat[y][3 - 1 - x];
        mapMat[y][3 - 1 - x] = mapMat[3 - 1 - x][3 - 1 - y];
        mapMat[3 - 1 - x][3 - 1 - y] = mapMat[3 - 1 - y][x];
        mapMat[3 - 1 - y][x] = temp;
      }
    }
    this.removeChildren();
    mapMat.forEach((_, row) => {
      _.forEach((val, col) => {
        if (val === 1) {
          this.children.push(new ShapeChild(row + diffRow, col + diffCol));
        }
      });
    });
  }

  rotateRight() {
    if (this.shapeId === Shape.O) return;
    const mapMat = Array(3)
      .fill([])
      .map(() => Array(3).fill(0));
    // center element is parent
    const diffRow = Math.abs(this.row - 1);
    const diffCol = Math.abs(this.col - 1);

    mapMat[1][1] = 1;
    this.children.forEach((child) => {
      mapMat[child.row - diffRow][child.col - diffCol] = 1;
    });

    for (let x = 0; x < 3 / 2; x++) {
      for (let y = x; y < 3 - x - 1; y++) {
        let temp = mapMat[x][y];
        mapMat[x][y] = mapMat[3 - 1 - y][x];
        mapMat[3 - 1 - y][x] = mapMat[3 - 1 - x][3 - 1 - y];
        mapMat[3 - 1 - x][3 - 1 - y] = mapMat[y][3 - 1 - x];
        mapMat[y][3 - 1 - x] = temp;
      }
    }
    this.removeChildren();
    mapMat.forEach((_, row) => {
      _.forEach((val, col) => {
        if (val === 1) {
          this.children.push(new ShapeChild(row + diffRow, col + diffCol));
        }
      });
    });
  }
}
