import { Skill } from "../utils";

export function SkillSquare(props: {skill: Skill}) {

const handleDragStart = (e: React.DragEvent<HTMLDivElement|HTMLSpanElement>) => {
  e.dataTransfer.setData('skill', `${props.skill.ID}`)
}

return( 
  <div className='flex shrink-0 w-fit bg-light-bg-3 dark:bg-dark-bg-2 rounded-xl border-2 dark:border-dark-bg-5 border-light-grey-0 relative cursor-grab'>
    <span draggable={true} className="w-full h-full z-10 absolute" onDragStart={handleDragStart}/>
    <img className='w-10 grow-0 outline-2 rounded-md shrink-0 m-2' src={'https://xivapi.com/'+props.skill.IconHD} alt={props.skill.Name} />
  </div>
  )
}