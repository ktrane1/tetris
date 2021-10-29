import Matrix from "../../classes/Matrix";
import generateCoords from "./generateCoords";

export default function handleLeft(m: Matrix) {
  const coordinates = generateCoords(m);
  const isLeft = Array.from(coordinates).some((val) => val[1] === 0);
  if (isLeft) return;
  for (let i = 0; i < 4; i++) {
    const pair = Array.from(coordinates)[i];
    const row = pair[0];
    const col = pair[1];
    if (m.matrix[row][col - 1] === 2) {
      return;
    }
  }
  coordinates.forEach((pair) => {
    const row = pair[0];
    const col = pair[1];
    if (m.matrix[row][col - 1] === 2) {
      return;
    } else {
      m.matrix[row][col - 1] = 1;
      m.matrix[row][col] = 0;
    }
  });
  console.log(m.matrix);
}
