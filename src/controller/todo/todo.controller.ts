import { eq, gt, and, desc } from 'drizzle-orm';
import { Request, Response, NextFunction } from 'express';

import db from '../../db';
import { Exception } from '../../error/Exception';
import { Return } from '../../utils/successResponse';
import Todo from '../../db/postgres/schema/todo.schema';
import { STATUS_CODES } from '../../constants/statusCodes';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import preparecreatePayload from '../../service/todo/prepareTodoData';
import { getTodoReqParams } from '../../service/todo/getTodoReqParams';
import { TodoUpdate } from '../../interface/todo/todo.update.interface';
import { getSelectedTodoKeys } from '../../service/todo/getSelectedTodoKeys';
import { TodoCreatePayload } from '../../zod.domain/todo/todo.create.domain';

/**
 * Creates a Todo Record.
 * 
 * @param req - User Request.
 * @param res - User Response.
 * @param next - The next middleware function.
 */
export async function createTodo(req: Request, res: Response, next: NextFunction): Promise<any> {
  const { userId } = req.body.userId;
  const createPayload: TodoCreatePayload = req.body;

  try {
    if (!userId) throw new Exception(STATUS_CODES.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);

    const todoData = preparecreatePayload(createPayload, userId);

    const todo = (await db.insert(Todo)
      .values(todoData)
      .returning()).at(0);

    Return(res, STATUS_CODES.CREATED, { ...todo });
  } catch (err) {
    next(err);
  }
}

/**
 * Gets a todo by Id.
 * 
 * @param req - User Request.
 * @param res - User Response.
 * @param next - The next middleware function.
 */
export async function getATodo(req: Request, res: Response, next: NextFunction): Promise<any> {
  const todoId = req.params.id;
  const { userId } = req.body.userId;

  try {
    const todo = (await db.select()
      .from(Todo)
      .where(eq(Todo.id, todoId)))?.at(0);

    if (!todo) throw new Exception(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);

    if (todo.user !== userId) throw new Exception(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);

    Return(res, STATUS_CODES.OK, { data: todo });
  } catch (err) {
    next(err);
  }
}

/**
 * Gets a list of todo by cursor technique.
 * Note: createdAt is taken as default for sorting.
 * 
 * @param req - User Request.
 * @param res - User Response.
 * @param next - The next middleware function.
 */
export async function getTodosWithCursor(req: Request, res: Response, next: NextFunction): Promise<any> {
  const { userId } = req.body.userId;
  const { limit, lastCursor } = getTodoReqParams(req);

  console.log("cursor", lastCursor);
  console.log(new Date(lastCursor));

  try {
    // cursor example.
    const todos = await db.select()
      .from(Todo)
      .orderBy(desc(Todo.createdAt)) // Using createAt as default for descending sorting.
      .limit(limit)
      .where(and(eq(Todo.user, userId), gt(Todo.createdAt, new Date(lastCursor))));

    Return(res, STATUS_CODES.OK, { data: todos })
  } catch (err) {
    next(err);
  }
}

/**
 * Gets a list of todo by Offset technique.
 * Note: createdAt is taken as default for sorting.
 * 
 * @param req - User Request.
 * @param res - User Response.
 * @param next - The next middleware function.
 */
export async function getTodosWithOffSet(req: Request, res: Response, next: NextFunction): Promise<any> {
  const { userId } = req.body.userId;
  const { page, limit } = getTodoReqParams(req);

  try {
    // offset example.
    const todos = await db.select()
      .from(Todo)
      .orderBy(desc(Todo.createdAt)) // Using createdAt as default for sorting.
      .limit(limit)
      .offset((page - 1) * limit) // Skip this number of records from previous pages.
      .where(eq(Todo.user, userId));

    Return(res, STATUS_CODES.OK, todos);
  } catch (err) {
    next(err);
  }
}

/**
 * 
 * Updates a todo by given todo Id.
 * 
 * @param req - User Request.
 * @param res - User Response.
 * @param next - The next middleware function.
 */
export async function updateATodo(req: Request, res: Response, next: NextFunction): Promise<any> {
  const todoId = req.params.id;
  const { userId } = req.body.userId;
  const updatePayload: Partial<TodoUpdate> = getSelectedTodoKeys(req.body);

  try {
    if (!todoId) throw new Exception(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);

    if (!userId) throw new Exception(STATUS_CODES.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);

    const todo = (await db.select({
      id: Todo.id,
      user: Todo.user
    })
      .from(Todo)
      .where(eq(Todo.id, todoId)))?.at(0);

    if (!todo) throw new Exception(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);

    if (todo.user !== userId) throw new Exception(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);

    const updatedTodo = (await db.update(Todo)
      .set(updatePayload)
      .where(eq(Todo.id, todoId))
      .returning())?.at(0);

    Return(res, STATUS_CODES.OK, { data: updatedTodo });
  } catch (err) {
    next(err);
  }
}

/**
 * Deletes a given todo by given todo Id.
 * 
 * @param req - User Request.
 * @param res - User Response.
 * @param next - The next middleware function.
 */
export async function deleteATodo(req: Request, res: Response, next: NextFunction): Promise<any> {
  const todoId = req.params.id;
  const { userId } = req.body.userId;

  try {
    if (!todoId) throw new Exception(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);

    if (!userId) throw new Exception(STATUS_CODES.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN);

    const todo = await db.select({ id: Todo.id, userId: Todo.user }).from(Todo).where(eq(Todo.id, todoId));

    if (userId !== todo.at(0)?.userId) throw new Exception(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);

    await db.delete(Todo).where(eq(Todo.id, todoId)).returning();

    Return(res, STATUS_CODES.OK, {});
  } catch (err) {
    next(err);
  }
}
