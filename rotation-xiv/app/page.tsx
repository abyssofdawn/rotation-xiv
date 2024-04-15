'use client';
import { useState } from 'react';
import { Skill, class_names, parse_description, skills_for_class } from './utils';

import { SkillSquare } from './components/skillsquare';
import TimelineSkill from './components/skillintimeline';
import Timeline from './components/timeline';

type Search = {Pagination: {}, Results: [Skill], SpeedMs: number}

const classnames = class_names();
function GetSkillsForClass({classjob = 'white mage'}) {

  if(!classnames.includes(classjob)) return <div>invalid class name</div>

  const {skills, skillserror, skillsloading} = skills_for_class(classjob);  

  if(skillsloading) return <div>Loading...</div>;
  if(skillserror) return <div>Error</div>;

  const skilllist: Skill[] = skills.Results

  skilllist.forEach((skill: Skill) => {

    skill.Description = parse_description(skill.Description)
  });
  
  return (
    <div className='h-full ml-2 flex flex-col gap-2 justify-start'>
    {skilllist.map((skill: Skill) => 
      <div key={skill.ID} className='grow-0 w-fit'>
          <div><SkillSquare skill={skill}/></div>
      </div>
    )}
    </div>
  )
}

export default function Page() {
  
  const [ classjob, setClassjob ] = useState('gunbreaker');
  const [ gcd, setGcd ] = useState(2.5); 

  const [ cwidth, setCwidth ] = useState(200);

  const enableDropping = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('skill');
    console.log(`${id}`)
  }

  const handleClick = () => {
    const canvas: HTMLElement | null = document.getElementById('timeline')
    if(canvas) {
      const ctx = (canvas as HTMLCanvasElement).getContext('2d')
      if(!ctx) return;
      ctx.fillStyle = "rgb(128,128,128)"
      ctx.fillRect(cwidth, 50, 50, 50)
    }
    
  }

  return (
    <div className='flex-col relative'>
      <input 
        onChange={e => setClassjob(e.target.value)}
        value={classjob}
        className='hinput'
      />
      <br />
      <input 
        type='number'
        onChange={e => setGcd(e.target.valueAsNumber)}
        value={gcd}
        className='hinput'
        step={0.1}
      />
      <br />
      <button
        onClick={handleClick}
        value={cwidth}
        className='hbutton w-8 h-8 border-white border-2'
      />      
      <button
        onClick={e => setCwidth(cwidth+100)}
        value={cwidth}
        className='hbutton w-8 h-8 border-white border-2'
      />
      <TimelineSkill time={200}></TimelineSkill>
      <Timeline width={cwidth} height={200} className='border-2 border-white rounded-md'/>
      <div className='w-20 h-20 border-2' onDragOver={enableDropping} onDrop={handleDrop}></div>
      <div className='grow'>
        <GetSkillsForClass classjob={classjob}/>
      </div>
    </div>
);
}