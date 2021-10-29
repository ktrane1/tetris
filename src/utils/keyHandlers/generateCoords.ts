import Matrix from "../../classes/Matrix";

export default function generateCoords(m: Matrix) {
  // find coordinates of all values that are one and store in set
  const coordinates: Set<number[]> = new Set();

  for (let r = 0; r < m.height; r += 1) {
    for (let c = 0; c < m.width; c += 1) {
      if (m.matrix[r][c] === 1) {
        coordinates.add([r, c]);
      }
    }
  }

  return coordinates;
}
