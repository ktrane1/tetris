import I from "./shapes/I";

class Shape {
  matrix: number[][]
  constructor(matrix: number[][]) {
    this.matrix = matrix

  }

  static generateShape(width: number, factor: number) {
    // should pick random shame from I, J, L, O, S, T, Z
    const blocks = width / factor;
    const position = Math.random() * blocks
    const shape = new I(Math.floor(position))

    shape.setUp()

  }

}

export default Shape