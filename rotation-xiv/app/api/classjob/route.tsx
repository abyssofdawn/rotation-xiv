import { type NextRequest } from "next/server";

export async function GET(requestin: NextRequest) {
  const jobname = requestin.nextUrl.searchParams.get("job");
  const headers: Headers = new Headers();
  headers.set("Content-Type", "application/json");

  headers.set("Accept", "application/json");

  const request: RequestInfo = new Request("https://xivapi.com/search", {
    method: "POST",
    headers: headers,
    mode: "cors",
    body: JSON.stringify({
      indexes: "Action",
      columns: "ID,Name,IconHD,Description,ActionCategory",
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  "ClassJob.Name_en": jobname ? jobname : "warrior",
                },
              },
            ],
            filter: [
              {
                match: {
                  IsPvP: 0,
                },
              },
            ],
          },
        },

        from: 0,
        size: 500,
      },
    }),
  });

  const res = await fetch(request).then((res) => res.json());
  return Response.json(res);
}
