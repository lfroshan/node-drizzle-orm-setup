import { Router } from "express";

import { redisCachingTest } from "../../controller/test/test.controller";

const testRouter = Router();

testRouter.get('/redis', redisCachingTest);

export default testRouter;
