import Matrix from "../classes/Matrix";
import { Key } from "./keyEnum";
import handleLeft from "./keyHandlers/handleLeft";
import handleRight from "./keyHandlers/handleRight";
import handleRotateLeft from "./keyHandlers/handleRotateLeft";
import handleRotateRight from "./keyHandlers/handleRotateRight";

export default function keyHandle(m: Matrix) {
  return function innerKeyHandle({ key }: KeyboardEvent) {
    switch (key) {
      case Key.Left:
        handleLeft(m);
        break;
      case Key.Right:
        handleRight(m);
        break;
      case Key.RotateLeft:
        handleRotateLeft(m);
        break;
      case Key.RotateRight:
        handleRotateRight(m);
        break;

      default:
        break;
    }
  };
}
