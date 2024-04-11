export const dynamic = 'force-dynamic'
export async function GET() {
    let j = {
        Names: [
            "gunbreaker",
            "warrior"
        ]
    }
    return Response.json(j)
}