import Matrix from "../../classes/Matrix";

export default function handleRotateLeft(m: Matrix) {
  const parent = m.activeShape;
  if (!parent) return;
  parent.rotateLeft();
}
