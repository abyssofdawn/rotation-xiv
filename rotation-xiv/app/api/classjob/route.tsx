export const dynamic = 'force-dynamic'
export async function GET(requestin: Request) {
  const jobname = requestin.body
  console.log(jobname)
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
                    "ClassJob.Name_en": "warrior"
                  }
                }
              ]
            }
          },
          "from": 0,
          "size": 500
        }
      }
    )
  })

const res = await fetch(request).then(res => res.json())
return Response.json(res)

}