import {z} from 'zod'

export const CreateList = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"
    }).min(3, {
        message: 'Title is too short',
    }).max(20, {
        message: 'Title is too long'
    }),
    boardId: z.string()
})