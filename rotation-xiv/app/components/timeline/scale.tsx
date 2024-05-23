/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { scaleUtc, ScaleTime } from 'd3-scale';
import React, { useContext, useEffect, useLayoutEffect, useMemo } from 'react';
import { createContext, useState } from 'react';

const ZOOM_FACTOR = 2;
const MAX_ZOOM = 2;

interface ScaleValue {
  scale: ScaleTime<number, number>;
}
const fallbackScale = scaleUtc();
export const ScaleContext = createContext<ScaleValue>({
  scale: fallbackScale,
});
export const useScale = () => useContext(ScaleContext);

export function ScaleProvider({
  children,
  duration,
}: {
  children: React.ReactNode;
  duration: number;
}) {
  const [width, setWidth] = useState(1);
  const [zoom, setZoom] = useState(0);
  const [sides, setSides] = useState([0, duration]);
  const [zoomMid, setZoomMid] = useState(0);
  const [zoomMidProp, setZoomMinProp] = useState(1 / 2);
  const [dragging, setDragging] = useState(true);
  const [minZoom, setMinZoom] = useState(
    -Math.ceil(Math.log(duration / 1000) / Math.log(ZOOM_FACTOR)),
  );
  const [baseWidth, setBaseWidth] = useState(60000);
  const scale = useMemo(() => {
    return scaleUtc().domain(sides).range([0, width]);
  }, [width, sides, zoom]);

  const divref = React.useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (divref.current) {
      const { width } = divref.current.getBoundingClientRect();
      setWidth(Math.floor(width));
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (divref.current && dragging) {
      console.log('mouse move');
      event.preventDefault();

      setZoomMinProp(
        1 +
          (event.clientX - divref.current.getBoundingClientRect().width) /
            width,
      );
      updateSides();
    }
  };
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    if(divref.current)
    setZoomMid(
      scale
        .invert(event.clientX - divref.current.getBoundingClientRect().width)
        .getTime() +
        scale.domain()[1].getTime() -
        scale.domain()[0].getTime(),
    );
    console.log('mouse down');
    setDragging(true);
  };
  const handleMouseUp = () => {
    console.log('mouse up');
    setDragging(false);
  };

  useEffect(() => {
    setBaseWidth(Math.min(60000, duration));

    setMinZoom(0);
  }, [duration]);

  const handleScroll = (event: WheelEvent) => {
    //stops page scrolling
    event.preventDefault();
    //find how much is scrolled
    let dirty = false;
    if (zoom > minZoom && Math.sign(event.deltaY) == 1) {
      setZoom(Math.max(zoom - event.deltaY / 100, minZoom));
      dirty = true;
    }
    if (zoom < MAX_ZOOM && Math.sign(event.deltaY) == -1) {
      setZoom(Math.min(zoom - event.deltaY / 100, MAX_ZOOM));
      dirty = true;
    }
    if (divref.current && dirty) {
      setZoomMid(
        scale
          .invert(event.clientX - divref.current.getBoundingClientRect().width)
          .getTime() +
          scale.domain()[1].getTime() -
          scale.domain()[0].getTime(),
      );
      setZoomMinProp(
        1 +
          (event.clientX - divref.current.getBoundingClientRect().width) /
            width,
      );
    }
    updateSides();
    if (divref.current) {
      divref.current.removeEventListener('wheel', handleScroll);
    }
  };

  const updateSides = () => {
    /* 
      zoommid: what time the cursor is at
      zoom mid prop: proportion of box that is left of cursor
      zoom: how zoomed in (positive) or out (negative) you are
      algorithm:
        width of scale: min(base width / zoom factor^zoom, duration) => (60000, 2 -> 60000/1.1^2)
        if width of scale != duration
          shift = width of scale
        else
          shift = 0
        
    
    */
    const viewwidth = baseWidth / Math.pow(ZOOM_FACTOR, zoom);
    const dl = Math.floor(viewwidth * zoomMidProp);
    const l = Math.min(Math.max(zoomMid - dl, 0), duration - viewwidth);
    const r = Math.max(Math.min(l + viewwidth, duration), viewwidth);
    console.log(
      `view width: ${viewwidth} dl: ${dl} l: ${l} r:${r} zoom: ${zoom} zoom mid: ${zoomMid}`,
    );

    setSides([l, r]);
  };

  useEffect(() => {
    if (divref.current) {
      divref.current.addEventListener('wheel', handleScroll, {
        passive: false,
      });
    }
  }, [zoom, sides, zoomMid, zoomMidProp]);
  useEffect(() => {
    updateSides();
  }, []);

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener('mouseup', handleMouseUp);

    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <ScaleContext.Provider value={{ scale }}>
      <div
        ref={divref}
        onMouseMove={(event: React.MouseEvent) => handleMouseMove(event)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {children}
      </div>
    </ScaleContext.Provider>
  );
}
