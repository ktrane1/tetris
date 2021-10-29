import React from "react";
import Matrix from "../classes/Matrix";
import Shape from "../classes/Shape";
import "./Canvas.css";

export default function Canvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  // w: 10 cells h: 20 cells
  const [factor, setFactor] = React.useState(50);
  const [dim] = React.useState({ w: 500, h: 1000 });
  const [num, setNum] = React.useState(0);

  React.useEffect(() => {
    const matrix = new Matrix(dim.w, dim.h, factor);
    matrix.spawnShape();

    function render() {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas ref is empty");

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Cannot get context");
      // check if matrix has active element
      if (!matrix.checkActive()) {
        // if not active element, spawnShape()
        matrix.spawnShape();
      }

      ctx.clearRect(0, 0, dim.w, dim.h);
      matrix.draw(ctx);
      matrix.move();

      setTimeout(() => {
        requestAnimationFrame(render);
      }, 100);
    }

    render();
  }, [dim.h, dim.w]);

  return (
    <>
      <canvas
        ref={canvasRef}
        height={`${dim.h}px`}
        width={`${dim.w}px`}
        style={{ backgroundColor: "lightgrey" }}
      ></canvas>
    </>
  );
}
