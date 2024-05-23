import { Skill } from '../utils';
import parse from 'html-react-parser';

export function DescriptionCard({ skill }: { skill: Skill }) {
  return (
    <>
      <div className="flex flex-row gap-2 w-full shrink-0 max-w-lg mx-auto bg-white dark:bg-slate-800 rounded-md border dark:border-slate-600 border-slate-300">
        <div className="divide-y-2 grow dark:divide-slate-600 divide-slate-300">
          <div className="flex flex-row align-middle">
            <picture>
              <img
                className="grow-0 outline-2 rounded-md w-5 h-5 ml-1 my-1"
                src={'https://xivapi.com/' + skill.IconHD}
                alt={skill.Name}
              />
            </picture>
            <div>
              <h1 className="mx-1 mt-1">
                {skill.Name} ({skill.ID})
              </h1>
            </div>
          </div>
          <div className="overflow-y-scroll text-sm mb-1 px-2">
            {parse(skill.Description)}
          </div>
        </div>
      </div>
    </>
  );
}
