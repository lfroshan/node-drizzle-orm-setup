import { Router } from 'express';

import { validateSchema } from '../../middleware/validateSchema.middleware';
import { TodoCreateSchema } from '../../zod.domain/todo/todo.create.domain';
import validateAccessToken from '../../middleware/verifyAccessToken.middleware';
import { validateGetParamsForCursor, validateGetParamsForOffset } from '../../middleware/validateGetParams.middleware';
import { createTodo, deleteATodo, getATodo, getTodosWithCursor, getTodosWithOffSet, updateATodo } from '../../controller/todo/todo.controller';

const todoRouter = Router();

todoRouter.post('/', validateAccessToken, validateSchema(TodoCreateSchema), createTodo);

todoRouter.get('/byId/:id', validateAccessToken, getATodo);

todoRouter.post('/:id', validateAccessToken, updateATodo);

todoRouter.get('/offset', validateAccessToken, validateGetParamsForOffset, getTodosWithOffSet);

todoRouter.get('/cursor', validateAccessToken, validateGetParamsForCursor, getTodosWithCursor);

todoRouter.delete('/:id', validateAccessToken, deleteATodo);

export default todoRouter;
