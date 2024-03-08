import { TodoCreatePayload } from "../../zod.domain/todo/todo.create.domain";

export default function prepareTodoPayload(todoPayload: TodoCreatePayload, userId: string) {
  return {
    ...todoPayload,
    user: userId,
  }
}
