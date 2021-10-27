class Matrix {
  matrix: number[][]
  width: number
  height: number
  constructor(width: number, height: number, factor: number) {
    this.width= width / factor
    this.height= height / factor
    this.matrix = Array(this.height).fill(new Array(this.width))
  }
}

export default Matrix