'use client'

import { useRef, useEffect, useState } from "react";
import { Timeline } from "../utils";
import * as d3 from "d3";

export function TimelineComponent(props: {timeline?: Timeline}) {
    const svgRef = useRef<SVGSVGElement>(null)
    const [transform, setTransform] = useState(new d3.ZoomTransform(1, 0, 0))
    
    const height = 96

    useEffect(() => {

        if(!svgRef.current) return

        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const svg = d3.select(svgRef.current)

        const bt = 2*parseInt(svg.style('border'), 10)
        const fw = parseInt(svg.style('width'), 10) - bt
        const fh = parseInt(svg.style('height'), 10) - bt
        const maxzoom = 64
        const time = 100
        const pps = 24 
        const x = d3.scaleLinear([0, time], [0, pps*(time)])

        
        const g = svg.selectAll('g').data([null]).join('g')
        const im = svg.selectAll('g').data([null]).join('g')
        
        g.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 2 )
          .attr('height', 30)
          .attr('fill', 'red')
        im.selectAll('image')
          .data(data)
          .enter()
          .append('image')
          .attr('x', 0)
          .attr('y', 25)
          .attr('width', 40)
          .attr('height', 40)
          .attr('href', (d) => `https://xivapi.com/i/000000/00000${d}.png`)


        im.selectAll<SVGRectElement, null>('image').nodes().forEach((element: SVGRectElement, i) => {
          let x = element.getAttribute('x')
          if(!x) return
          element.setAttribute('transform', 'translate('+(transform.k*pps*data[i])+', 0) scale(1)')
        })
        im.selectAll<SVGRectElement, null>('rect').nodes().forEach((element: SVGRectElement, i) => {
          let x = element.getAttribute('x')
          if(!x) return
          element.setAttribute('transform', 'translate('+(transform.k*pps*data[i])+', 0) scale(1)')
        })


        g.attr("transform", 'translate('+transform.x+',0) scale(1)')

        const gx = svg.append("g");
        gx.attr("transform", `translate(0,${0})`)

        gx.call(d3.axisBottom(transform.rescaleX(x).interpolate(d3.interpolateRound)).ticks(fw/(pps*4), d3.timeFormat(".1f")));

        const zoomBehavior = d3
          .zoom<SVGSVGElement, unknown>()
          .scaleExtent([1/(maxzoom), maxzoom])
          .translateExtent([
            [0, 0],
            [pps*time, fh],
          ])
          .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
            const zoomState = event.transform;

            setTransform(new d3.ZoomTransform(zoomState.k, zoomState.x,zoomState.y))
          });
          svg.call(zoomBehavior);
          
      }, [transform]);

    return (
        <div className="h-24" id="owner">
          <svg ref={svgRef} className="w-full h-full rounded-md border-2"/>
        </div>
    )
}