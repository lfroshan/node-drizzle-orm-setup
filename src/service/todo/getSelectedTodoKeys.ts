import { TodoUpdate } from "../../interface/todo/todo.update.interface";

export function getSelectedTodoKeys(payload: any) {
  const allowedKeys: Array<keyof TodoUpdate> = ['title', 'description', 'done', 'updatedAt'];

  return Object.fromEntries(
    allowedKeys.map((key) => [key, payload[key]])
  );
}
