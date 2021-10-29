import pickShape from "../utils/pickShape"
// import Shape from "./Shape"
import I from "./shapes/I"
import { ShapeArray, Shape } from "./shapes/ShapeEnum"

class Matrix {
  matrix: number[][]
  width: number
  height: number
  factor: number
  constructor(width: number, height: number, factor: number) {
    this.width= width / factor
    this.height= height / factor
    this.factor = factor
    this.matrix = Array(height).fill([]).map(() => Array(width).fill(0))
  }

  spawnShape() {
    // should pick random shame from I, J, L, O, S, T, Z
    // const pickedShape = pickShape(ShapeArray)
    const pickedShape = Shape.I
    const position = Math.floor(Math.random() * this.width)
    console.log(pickedShape, position)
    // const shape = new I()
    switch (pickedShape) {
      case Shape.I:
        this.addI(position)
        break;
    
      default:
        break;
    }
    // shape.setUp()

  }

  addI(pos: number) {
    pos = pos + 4 > this.width ? this.width - 4 : pos
    this.matrix[0][pos] = 1
    this.matrix[0][pos + 1] = 1;
    this.matrix[0][pos + 2] = 1;
    this.matrix[0][pos + 3] = 1
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let y = 0; y < this.height; y += 1) {

      for (let x = 0; x < this.width; x += 1) {
        const currentVal = this.matrix[y][x]

        if (currentVal === 1) {
          // if val is one, render square
          ctx.beginPath()
          ctx.fillStyle = 'white'
          ctx.fillRect(x * this.factor, y * this.factor, this.factor, this.factor)
        }

        if (currentVal === 2) {
          ctx.beginPath()
          ctx.fillStyle = 'green'
          ctx.fillRect(x * this.factor, y * this.factor, this.factor, this.factor)
        }

      }

    }
  }

  checkActive() {
    // see if matrix contains any values that are 1
    for (let subarr of this.matrix) {
      if (subarr.some(val => val === 1)) {
        return true
      }
    }
    return false
  }
}

export default Matrix