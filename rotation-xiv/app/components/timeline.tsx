import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"


export default function Timeline(props: React.CanvasHTMLAttributes<HTMLCanvasElement> | React.HTMLAttributes<HTMLCanvasElement>) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.fillRect(10, 10, ctx.canvas.width-10, ctx.canvas.height-10)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if(!canvas) return
    
        const ctx = (canvas as HTMLCanvasElement).getContext('2d')
        if(!ctx) return

        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, 100, 100)        
    
    }, [])

    return <canvas ref={canvasRef} className={props.className}></canvas>
}