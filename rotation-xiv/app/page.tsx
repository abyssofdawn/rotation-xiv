import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NextApiRequest, NextApiResponse } from 'next';
import parse from 'html-react-parser'


async function GetSkillsForClass(): Promise<any> {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')

  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request('https://xivapi.com/search', {
    method: 'POST',
    headers: headers,
    mode: 'cors',
    body: JSON.stringify(
      {
        "indexes": "Action",
        "columns": "ID,Name,IconHD,Description",
        "body": {
          "query": {
            "bool": {
              "must": [
                {
                  "match": {
                    "ClassJob.Name_en": "white mage"
                  }
                }
              ],
              "filter": [
                {
                  "term": {
                    "IsPvP": 0
                  }
                }
              ]
            }
          },
          "from": 0,
          "size": 50
        }
      }
    )
  })

  const res = await fetch(request)
  if(!res.ok){
    throw new Error("failed to fetch skills")
  }
  type Skill = { ID: number, Name: string, IconHD: string, Description: string }
  type Search = {Pagination: {}, Results: [Skill], SpeedMs: number}


  const data: Search = await res.json()
  
  const skills: Skill[] = data.Results
  console.log(skills)
  return(
    <div>
    {skills.map(skill => 
      <li key={skill.ID} className='top shrink-0 max-w-lg mx-auto my-2 bg-light-bg-3 dark:bg-dark-bg-2 rounded-md border dark:border-dark-bg-5 border-light-grey-0 flex gap-2'>
        <div/>
        <div className='shrink-0 my-2'>
          <img className='w-10' src={'https://xivapi.com/'+skill.IconHD} alt={skill.Name} />
        </div>
        
        <div className='divide-y-[1px] grow divide-dark-bg-5'>
          <h1>{skill.Name}</h1>
          <div className='max-h-28 overflow-y-scroll text-sm mb-2'>
            {
              parse(
                skill.Description
                  .replaceAll("<br />", "\n")
                  .replaceAll("\n\n", "")
                  .replaceAll(".", ".<br>")
                  .replaceAll('<br><span', '<span')
                  .replaceAll('<span style="color:#00cc22;">', '<br/><span className="text-light-green dark:text-dark-faded-green">')
                  .replaceAll('<span style="color:#ffff66;">', '<span className="text-light-yellow dark:text-dark-faded-yellow">')
                  .replaceAll('<span style="color:#ff7b1a;">', '<span className="text-light-orange dark:text-dark-faded-orange">')
              )
            }
          </div>
        </div>
      </li>
    )}
    </div>
  )
}

export default async function Page() {


return (
  <div className="padded">
    <h1>Hello, Next.js!</h1>
    <button type="button">
      Dashboard 
    </button>
    <GetSkillsForClass />
  </div>
);
}