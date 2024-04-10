import parse from 'html-react-parser'

async function SkillIcon() {
    let skilldata: { IconHD: string; Name_en: string; Description: string;};
    let icon;
    let name;
    let description = "";
    await fetch('https://xivapi.com/Action/24283')
        .then(res => res.json())
        .then(data => skilldata = data)
        .then(() => {
            if(skilldata){
                icon = "https://xivapi.com/" + skilldata.IconHD;
                name = skilldata.Name_en;
                description = skilldata.Description;
                description = description.replaceAll("\n", "<br>");
            }
        })
    return(
        <div className="flex gap-2 items-center">

            <img className="border-dark-bg-5 rounded-md border-2 w-8" src={icon} title={name}/>
            <p>{name}:</p>
            <div>{parse('<span>'+description)}</div>
        </div>
    )
}


export default async function Page() {
return(
<div className="p-2 max-w-lg mx-auto dark:bg-dark-bg-2 rounded-md shadow-lg flex items-center gap-x-2">
    <SkillIcon />
</div>
);
}