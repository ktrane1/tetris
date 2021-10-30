import Matrix from "../../classes/Matrix";

export default function handleRotateRight(m: Matrix) {
  const parent = m.activeShape;
  if (!parent) return;
  parent.rotateRight();
}
