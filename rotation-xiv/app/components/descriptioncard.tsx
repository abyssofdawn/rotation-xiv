import { ParsedDescription, Skill } from "../utils";
import parse  from "html-react-parser";

export function DescriptionCard({skill}: {skill: Skill}) {
  return (
    <>    
      <div className='flex flex-row gap-2 w-full shrink-0 max-w-lg mx-auto bg-light-bg-3 dark:bg-dark-bg-2 rounded-md border-2 dark:border-dark-bg-5 border-light-grey-0'>
        <div className='divide-y-2 grow dark:divide-dark-bg-5 divide-light-grey-0'>
          <div className='flex flex-row align-middle'><img className='grow-0 outline-2 rounded-md w-5 h-5 ml-1 my-1' src={'https://xivapi.com/'+skill.IconHD} alt={skill.Name} />
          <div><h1 className="mx-1 mt-1">{skill.Name} ({skill.ID})</h1></div></div>
          <div className='overflow-y-scroll text-sm mb-1 px-2'>
            {parse(skill.Description)}
          </div>
        </div>
      </div>
    </>
  );
}