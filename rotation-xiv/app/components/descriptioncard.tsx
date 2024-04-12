import { Button, Popover } from "flowbite-react";
import { ParsedDescription, Skill } from "../utils";
import parse  from "html-react-parser";

export function DescriptionCard({skill}: {skill: Skill}) {
  return (
    <>    
      <div className='z-flex flex-row gap-2 w-full shrink-0 max-w-lg h-28 mx-auto my-2 bg-light-bg-3 dark:bg-dark-bg-2 rounded-md border-2 dark:border-dark-bg-5 border-light-grey-0'>
        <div className='divide-y-2 grow dark:divide-dark-bg-5 divide-light-grey-0'>
          <h1>{skill.Name} ({skill.ID})</h1>
          <div className='max-h-20 overflow-y-scroll text-sm mb-2'>
            {parse(skill.Description)}
          </div>
        </div>
      </div>
    </>
  );
}