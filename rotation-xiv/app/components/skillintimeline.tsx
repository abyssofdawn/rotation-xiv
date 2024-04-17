import { Skill } from "../utils";

export default function TimelineSkill (props: { skill: Skill, time: number }) {
const pos: string = `left-[${props.time}px]`

return (
    <div 
        className="absolute"
        style={{left: `${props.time}px`}}
    >
        {props.time}
    </div>
)
}

