'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NextApiRequest, NextApiResponse } from 'next';
import parse from 'html-react-parser'
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { DarkThemeToggle, ParsedDescription, ThemeSwitch, class_names, skills_for_class } from './utils';

import {Flowbite} from 'flowbite-react'

type Skill = { ID: number, Name: string, IconHD: string, Description: string }
type Search = {Pagination: {}, Results: [Skill], SpeedMs: number}

const classnames = class_names();
function GetSkillsForClass({classjob = 'white mage'}) {

  if(!classnames.includes(classjob)) return <div>invalid class name</div>

  const {skills, skillserror, skillsloading} = skills_for_class(classjob);  

  if(skillsloading) return <div>Loading...</div>;
  if(skillserror) return <div>Error</div>;

  const skilllist = skills.Results
  
  return (
    <div>
    {skilllist.map((skill: Skill) => 
      <li key={skill.ID} className='top '>
        <div/>
        <div className='shrink-0 my-2 flex-col flex'>
          <img className='w-10 grow-0 outline-2 rounded-md' src={'https://xivapi.com/'+skill.IconHD} alt={skill.Name} />
          <div className=''></div>
        </div>
        
        <div className='divide-y-2 grow dark:divide-dark-bg-5 divide-light-grey-0'>
          <h1>{skill.Name} ({skill.ID})</h1>
          <div className='max-h-20 overflow-y-scroll text-sm mb-2'>
            <ParsedDescription description={skill.Description} />
          </div>
        </div>
      </li>
    )}
    </div>
  )
}

export default function Page() {
  
  const [ classjob, setClassjob ] = useState('gunbreaker');
  
  return (
  <Flowbite>
    <ThemeSwitch/>
    <div className="padded">
      <h1>Hello, Next.js!</h1>
      <button type="button">
        Dashboard 
      </button>
      <input 
        onChange={e => setClassjob(e.target.value)}
        value={classjob}
        ></input>
      <GetSkillsForClass classjob={classjob}/>
    </div>
  </Flowbite>
);
}