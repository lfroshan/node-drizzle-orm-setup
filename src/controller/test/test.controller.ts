import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

import redisInstance from '../../redis';
import { Return } from '../../utils/successResponse';
import { ENV_CONFIGS } from '../../config/envConfigs';
import { STATUS_CODES } from '../../constants/statusCodes';

export async function redisCachingTest(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    let data = await redisInstance.getCache(req.body.animal);

    if (data) {
      Return(res, STATUS_CODES.OK, { redisCache: true, data: data });
      return;
    }

    data = await axios.get(ENV_CONFIGS.testApi);

    await redisInstance.setVolatileCache(req.body.animal, JSON.stringify(data?.data));

    Return(res, STATUS_CODES.OK, { redisCache: false, data: data?.data });
  } catch (err) {
    next(err);
  }
}
