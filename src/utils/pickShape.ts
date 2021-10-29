import { Shape } from "../classes/shapes/ShapeEnum";
export default function pickShape(shapeArray: Shape[]) {
  return shapeArray[Math.floor(Math.random() * shapeArray.length)];
}
