import Matrix from "../../classes/Matrix";
import generateCoords from "./generateCoords";

export default function handleRight(m: Matrix) {
  const coordinates = generateCoords(m);
  const isRight = Array.from(coordinates).some((val) => val[1] === m.width - 1);
  if (isRight) return;
  const rev = Array.from(coordinates).reverse();
  rev.forEach((pair) => {
    const row = pair[0];
    const col = pair[1];
    m.matrix[row][col] = 0;
    m.matrix[row][col + 1] = 1;
  });
}
