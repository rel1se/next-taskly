import {z} from "zod"

import {List} from "@prisma/client";

import {UpdateList} from "@/actions/update-list/schema";
import {ActionState} from "@/lib/create-safe-action";

export type InputType = z.infer<typeof UpdateList>
export type ReturnType = ActionState<InputType, List>