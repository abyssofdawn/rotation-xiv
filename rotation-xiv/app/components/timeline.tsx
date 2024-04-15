import { useEffect, useRef } from "react"

export default function Timeline(props: {}) {
    const canvasRef = useRef(null)

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.fillRect(10, 10, ctx.canvas.width-10, ctx.canvas.height-10)
    }

    useEffect(() => {
        const canvas: HTMLElement | null = canvasRef.current as (HTMLElement | null)
        if(canvas){
            const context = (canvas as HTMLCanvasElement).getContext('2d')
            if(context) {
                draw(context)
            }
        }
    })

    return <canvas ref={canvasRef}></canvas>
}