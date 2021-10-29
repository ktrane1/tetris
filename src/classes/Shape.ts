import pickShape from "../utils/pickShape";
import I from "./shapes/I";
import { ShapeArray } from "./shapes/ShapeEnum";

class Shape {
  matrix: number[][]
  constructor(matrix: number[][]) {
    this.matrix = matrix

  }

  static generateShape(width: number, factor: number) {
    // should pick random shame from I, J, L, O, S, T, Z
    const pickedShape = pickShape(ShapeArray)
    // const blocks = width / factor;
    // const position = Math.random() * blocks
    // const shape = new I(Math.floor(position))
    console.log(pickedShape)
    // shape.setUp()

  }

}

export default Shape