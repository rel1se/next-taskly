import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export async function GET(
    req: Request,
    {params}: {params: {cardId: string}}
) {
    try {
        const {userId, orgId} = auth()

        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const card = await db.card.findUnique({
            where: {
                id: params.cardId,
                list: {
                    board: {
                        orgId,
                    }
                },
            },
            include: {
                list: {
                    select: {
                        title: true,
                    }
                }
            }
        })

        return NextResponse.json(card)

    } catch {
        return new NextResponse("Internal error", {status: 500})
    }
}