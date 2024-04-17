import React, { useEffect } from "react";
import { Timeline } from "../utils";
import * as d3 from "d3";

export function TimelineComponent(props: {timeline?: Timeline}) {
    const svgRef = React.useRef<HTMLDivElement>(null)
    const height = 500
    const width = 500
    
    
    useEffect(() => {
        const data = [10, 20, 30, 40, 50];
        // Create an SVG container
        const svg = d3.select(svgRef.current)
          .append('svg')
          .attr('width', 500)
          .attr('height', 500);
        // Define scales


        svg.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('x', (_, i) => i)
          .attr('y', (d) => d)
          .attr('width', (d => d))
          .attr('height', (d) => (d))
          .attr('fill', 'blue');


      }, []);

    return (
        <div className="w-fit h-fit" ref={svgRef}/>
    )
}