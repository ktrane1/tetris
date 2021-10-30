import Matrix from "../../classes/Matrix";
import generateCoords from "./generateCoords";

export default function handleRight(m: Matrix) {
  const parent = m.activeShape;

  if (!parent) return;

  const isOutside = parent.rightBound(m.matrix, m.width);

  if (!isOutside) {
    parent.col += 1;
    parent.children.forEach((child) => {
      child.col += 1;
    });
  } else {
    return;
  }
}
