'use client';

import { useScale } from './scale';

export function TimelineComponent() {
  const {scale} = useScale();

  return (
    <div>
      <svg id="axis" className="w-full h-full border-2">{scale.ticks().map((tick, index) => {
        return (
          <g key={'tick sec' + index}>
            <line
              x1={scale(tick)}
              x2={scale(tick)}
              y1={0}
              y2={15}
              className="stroke-slate-500 dark:stroke-slate-100 stroke-2"
            />
            <text
              x={scale(tick) + 1}
              y={15}
              className="text-xs fill-slate-500 dark:fill-slate-100"
            >
              {tick.getSeconds()}s
            </text>
          </g>
        );
      })}
      {scale.ticks().map((tick, index) => {
        if (tick.getSeconds() % 60 === 0)
          return (
            <g key={'tick min' + index}>
              <line
                x1={scale(tick)}
                x2={scale(tick)}
                y1={15}
                y2={30}
                className="stroke-slate-500 dark:stroke-slate-100 stroke-2"
              />
              <text
                x={scale(tick) + 1}
                y={30}
                className="text-xs fill-slate-500 dark:fill-slate-100"
              >
                {tick.getMinutes()}m
              </text>
            </g>
          );
      })}</svg>
    </div>
  );
}
