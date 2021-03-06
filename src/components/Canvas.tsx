import React from "react";
import Matrix from "../classes/Matrix";
import keyHandle from "../utils/keyHandle";
import "./Canvas.css";

export default function Canvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  // w: 10 cells h: 20 cells
  const [factor] = React.useState(50);
  const [dim] = React.useState({ w: 500, h: 1000 });

  React.useEffect(() => {
    const matrix = new Matrix(dim.w, dim.h, factor);
    matrix.spawnShape();

    function render() {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas ref is empty");

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Cannot get context");

      if (!matrix.activeShape) {
        matrix.spawnShape();
      }

      ctx.clearRect(0, 0, dim.w, dim.h);
      matrix.blobCheck();
      matrix.shapeDraw();
      matrix.draw(ctx);
      matrix.shapeMove();

      setTimeout(() => {
        requestAnimationFrame(render);
      }, 200);
    }
    render();
    document.addEventListener("keydown", keyHandle(matrix));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
