import { Skill } from "../utils";

export function SkillSquare(props: {skill: Skill}) {
return( 
  <div className='flex shrink-0 bg-light-bg-3 dark:bg-dark-bg-2 rounded-xl relative cursor-grab w-12 h-12'>
    <picture className="z-20">
      <img className='w-full h-full grow-0 outline-2 rounded-md border-2 shrink-0 skillshadow' src={'https://xivapi.com/'+props.skill.IconHD} alt={props.skill.Name} />
    </picture>
  </div>
  )
}