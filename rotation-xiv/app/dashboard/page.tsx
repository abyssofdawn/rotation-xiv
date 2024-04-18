import parse from "html-react-parser";

async function SkillIcon() {
  let skilldata: { IconHD: string; Name_en: string; Description: string };
  let icon;
  let name;
  let description = "";
  await fetch("https://xivapi.com/Action/16138")
    .then((res) => res.json())
    .then((data) => (skilldata = data))
    .then(() => {
      if (skilldata) {
        icon = "https://xivapi.com/" + skilldata.IconHD;
        name = skilldata.Name_en;
        description = skilldata.Description;
        if (description) {
          description = description.replaceAll("\n\n", "<br>");
        }
      }
    });
  return (
    <div className="flex gap-2 items-center">
      <picture>
        <img
          alt="blah blah"
          className="border-dark-bg-5 rounded-md border w-12"
          src={icon}
          title={name}
        />
      </picture>
      <div className=" divide-y w-fit">
        <h1>{name}</h1>
        <div>{parse("<span>" + description)}</div>
      </div>
    </div>
  );
}

export default async function Page() {
  return (
    <div className="p-2 max-w-lg mx-auto dark:bg-dark-bg-2 rounded-md shadow-lg flex items-center gap-x-2">
      <SkillIcon />
    </div>
  );
}
