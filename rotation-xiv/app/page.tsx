"use client";
import { useState } from "react";
import {
  Skill,
  class_names,
  parse_description,
  useSkillsForClass,
  Timeline,
} from "./utils";

import { SkillSquare } from "./components/skillsquare";
import { Draggable } from "./components/draggable";
import { TimelineComponent } from "./components/timeline";
import React from "react";

type Search = { Pagination: {}; Results: [Skill]; SpeedMs: number };

const classnames = class_names();
function GetSkillsForClass({ classjob = "white mage" }) {
  let validClassName = classnames.includes(classjob);

  const { skills, skillserror, skillsloading } = useSkillsForClass(
    validClassName ? classjob : "none",
  );
  if (!classnames.includes(classjob)) {
    return <div>invalid class name</div>;
  }

  if (skillsloading) return <div>Loading...</div>;
  if (skillserror) return <div>Error</div>;

  const skilllist: Skill[] = skills.Results;

  skilllist.forEach((skill: Skill) => {
    skill.Description = parse_description(skill.Description);
  });

  const handleDrag = (skill: Skill, offset: number[]) => {
    console.log(`${offset[0]} ${offset[1]}`);
    console.log(skill.ID);
  };

  const handleClick = (skill: Skill) => {
    console.log(skill.ID);
  };

  return (
    <div className="h-full ml-2 flex flex-col gap-2 justify-start">
      {skilllist.map((skill: Skill) => (
        <Draggable
          key={skill.ID}
          dragObject={skill}
          onDrag={(skill: Skill, offset: number[]) => handleDrag(skill, offset)}
          onMouseUp={(skill: Skill) => handleClick(skill)}
        >
          <div className="grow-0 w-fit">
            <SkillSquare skill={skill} />
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default function Page() {
  const [classjob, setClassjob] = useState("gunbreaker");
  const [gcd, setGcd] = useState(2.5);
  const [timeline, setTimeline] = useState<Timeline>({ skills: [] });

  const [cwidth, setCwidth] = useState(200);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("skill");
    console.log(`${id}`);
  };

  const handleClick = () => {
    const canvas: HTMLElement | null = document.getElementById("timeline");
    if (canvas) {
      const ctx = (canvas as HTMLCanvasElement).getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "rgb(128,128,128)";
      ctx.fillRect(cwidth, 50, 50, 50);
    }
  };

  return (
    <div className="flex-col relative">
      <input
        onChange={(e) => setClassjob(e.target.value)}
        value={classjob}
        className="hinput"
      />
      <br />
      <input
        type="number"
        onChange={(e) => setGcd(e.target.valueAsNumber)}
        value={gcd}
        className="hinput"
        step={0.1}
      />
      <br />
      <button
        onClick={handleClick}
        value={cwidth}
        className="hbutton w-8 h-8 border-white border"
      />
      <button
        onClick={(e) => setCwidth(cwidth + 100)}
        value={cwidth}
        className="hbutton w-8 h-8 border-white border"
      />

      <TimelineComponent />

      <div className="grow">
        <GetSkillsForClass classjob={classjob} />
      </div>
    </div>
  );
}
