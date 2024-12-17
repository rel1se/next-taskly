"use server"
import {InputType, ReturnType} from "@/actions/delete-board/types";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {createSafeAction} from "@/lib/create-safe-action";
import {DeleteBoard} from "@/actions/delete-board/schema";
import {redirect} from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
    const {userId, orgId} = auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const {id} = data
    let board;
    try {
        board = await db.board.delete({
            where: {
                id,
                orgId
            },
        })
    } catch (error) {
        return {
            error: 'Failed to delete'
        }
    }
    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)