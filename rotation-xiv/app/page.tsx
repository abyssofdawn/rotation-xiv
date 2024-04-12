'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NextApiRequest, NextApiResponse } from 'next';
import parse from 'html-react-parser'
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { DarkThemeToggle, ParsedDescription, Skill, ThemeSwitch, class_names, parse_description, skills_for_class } from './utils';

import {Button, Flowbite, Popover} from 'flowbite-react'
import { DescriptionCard } from './components/descriptioncard';

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
    <div className='ml-2 h-full flex flex-wrap gap-0'>
    {skilllist.map((skill: Skill) => 
      <div key={skill.ID} className='mx-auto'>
        <Popover
          content={<DescriptionCard skill={skill} />}
        >
          <div className='flex shrink-0 w-fit p-2 mx-auto bg-light-bg-3 dark:bg-dark-bg-2 rounded-md border-2 dark:border-dark-bg-5 border-light-grey-0'>
            <img className='w-10 grow-0 outline-2 rounded-md shrink-0' src={'https://xivapi.com/'+skill.IconHD} alt={skill.Name} />
          </div>
        </Popover>
      </div>
    )}
    </div>
  )
}

export default function Page() {
  
  const [ classjob, setClassjob ] = useState('gunbreaker');
  
  return (
  <Flowbite>
    <div className='flex-col'>
      <input 
        onChange={e => setClassjob(e.target.value)}
        value={classjob}
        ></input>
      <div className='grow'>
        <GetSkillsForClass classjob={classjob}/>
      </div>
    </div>
  </Flowbite>
);
}