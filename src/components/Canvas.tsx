import React from 'react'
import Matrix from '../classes/Matrix'
import './Canvas.css'

export default function Canvas () {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  // w: 10 cells h: 20 cells
  const [dim] = React.useState({ w: 500, h: 1000})

  React.useEffect(() => {
    const matrix = new Matrix(dim.w, dim.h, 50)
    console.log(matrix)

    function render() {
      const canvas = canvasRef.current
      if (!canvas) throw new Error('Canvas ref is empty')

      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Cannot get context')

      ctx.clearRect(0, 0, dim.w, dim.h)

      ctx.fillStyle = 'white'

      ctx.fillRect(50, 100, 20, 50)


      requestAnimationFrame(render)
    }

    render()
  }, [dim])

  return (
    <>
      <canvas ref={canvasRef} height={`${dim.h}px`} width={`${dim.w}px`} style={{backgroundColor: 'lightgrey'}}></canvas>
    </>
  )
}