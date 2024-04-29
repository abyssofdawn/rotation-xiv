'use client';
import {
  useRef,
  useEffect,
  useState,
  MouseEvent,
  DragEventHandler,
} from 'react';
import { Timeline } from '../utils';
import * as d3 from 'd3';

function pxToSec(p: number, transform: d3.ZoomTransform, timeScale: number) {
  return (p - transform.x) * timeScale;
}

function secToPx(s: number, scale: number, pps: number, t: d3.ZoomTransform) {
  return s * scale * pps * t.k;
}

export function TimelineComponent(props: { resetTimeline: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [transform, setTransform] = useState(new d3.ZoomTransform(1, 0, 0));
  const [timeScale, setTimeScale] = useState(1);
  const [cursorLine, setCursorLine] = useState(0);
  const [dirty, setDirty] = useState(true);

  const [timeline, setTimeline] = useState<Timeline>({
    skills: [
      {
        gcd: {
          skill: 16139,
          icon: 'https://xivapi.com/i/003000/003403_hr1.png',
          delay: 0,
        },
        start: 10,
        end: 0,
      },
      {
        gcd: {
          skill: 16139,
          icon: 'https://xivapi.com/i/003000/003403_hr1.png',
          delay: 0,
        },
        start: 7.5,
        end: 0,
      },
    ],
  });

  //length of timeline in seconds
  const time = 60;
  //pixels per second, useful for scaling data transforms
  const pps = 20;
  //set max zoom for d3.zoom
  const maxzoom = 64;

  useEffect(() => {
    setTimeline({ skills: [] });
    console.log('reset!');
  }, [props.resetTimeline]);

  useEffect(() => {
    if (!svgRef.current) return;
    //temp
    //const data = [1, 2, 3, 4, 5, 6, 7, 8, 9.5];

    //get svg (if it exists)
    const svg = d3.select(svgRef.current);
    //get border thickness, frame width, frame height
    const bt = 2 * parseInt(svg.style('border'), 10);
    const fw = parseInt(svg.style('width'), 10) - bt;
    const fh = parseInt(svg.style('height'), 10) - bt;
    //get ratio by which frame width is larger than pixels for time
    const scalebyfw = fw / (pps * time);
    //seconds axis
    const x = d3.scaleLinear([0, time], [0, fw]);

    //im is all groups
    const im = svg.selectAll('g').data([null]).join('g');

    //generate images based on data input
    im.selectAll('image')
      .data(timeline.skills)
      .join(
        function (enter) {
          return enter
            .append('image')
            .attr('x', 0)
            .attr('y', 25)
            .attr('width', 48)
            .attr('height', 48)
            .attr('href', (d: { gcd: { icon: any } }) => `${d.gcd.icon}`);
        },
        function (update) {
          return update;
        },
        function (exit) {
          return exit.remove();
        },
      );

    //update transform for images without scaling
    im.selectAll<SVGRectElement, null>('image')
      .nodes()
      .forEach((element: SVGRectElement, i) => {
        let x = element.getAttribute('x');
        if (!x) return;
        element.setAttribute(
          'transform',
          'translate(' +
            secToPx(timeline.skills[i].start, scalebyfw, pps, transform) +
            ', 0) scale(1)',
        );
      });

    //shift groups by transform.x
    im.attr('transform', 'translate(' + transform.x + ',0) scale(1)');

    //group for axis
    const gx = svg.append('g');

    //axis based on x (seconds axis)
    gx.call(
      d3
        .axisBottom(transform.rescaleX(x).interpolate(d3.interpolateRound))
        .ticks(fw / (pps * 4)),
    );

    //upon click/drag and scroll, update the transform
    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, maxzoom])
      .translateExtent([
        [0, 0],
        [fw, fh],
      ])
      .on('zoom', (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        //set new transform based on what just updated
        const zoomState = event.transform;

        setTransform(
          new d3.ZoomTransform(zoomState.k, zoomState.x, zoomState.y),
        );
      });

    //time scale is used for pixel coord => previous second
    setTimeScale(time / fw / transform.k);

    svg.call(zoomBehavior);
    setDirty(false);
  }, [transform, dirty, timeline.skills]);

  return (
    <div className="h-24">
      <svg
        ref={svgRef}
        className="w-full h-full rounded-md border-2"
        onMouseMove={(e: MouseEvent) => {
          let point = pxToSec(d3.pointer(e)[0] - 24, transform, timeScale);
          setCursorLine(point);
        }}
        onDragOver={(e: React.DragEvent<SVGSVGElement>) => {
          let point = pxToSec(
            d3.pointer(e)[0] - parseInt(e.dataTransfer.getData('dragx'), 10),
            transform,
            timeScale,
          );
          setCursorLine(point);

          e.stopPropagation();
          e.preventDefault();
        }}
        onDragEnter={(e: React.DragEvent<SVGSVGElement>) => {
          console.log(e.dataTransfer.getData('skill'));
        }}
        onDrop={(e: React.DragEvent<SVGSVGElement>) => {
          console.log(e.dataTransfer.getData('skill'));
          const icon = `https://xivapi.com${e.dataTransfer.getData('icon')}`;
          console.log(icon);
          setTimeline(() => {
            timeline.skills.push({
              gcd: {
                skill: parseInt(e.dataTransfer.getData('skill'), 10),
                delay: 0,
                icon: icon,
              },
              end: 0,
              start: Math.max(cursorLine, 0),
            });
            return timeline;
          });
          setDirty(true);
        }}
      />
    </div>
  );
}
