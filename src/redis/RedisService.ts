import * as redis from 'redis';
import { RedisClientType } from 'redis';
import { ENV_CONFIGS } from '../config/envConfigs';

/**
 * Redis Service class following Singleton Pattern.
 */
export default class RedisService {
  private static instance: RedisService;
  private redisClient: RedisClientType;

  private constructor() {
    this.redisClient = redis.createClient({
      password: ENV_CONFIGS.redisPassword,
      socket: {
        host: ENV_CONFIGS.redisHOST,
        port: ENV_CONFIGS.redisPORT
      }
    });

    this.redisClient.on('error', (err) => {
      console.error(err);
    })
  }

  public async initializeRedis(): Promise<void> {
    await this.redisClient.connect();

    console.info('Connected to redis...');

    // Will cause error if not successful
    this.redisClient.ping();
  }

  /**
   * Gets the instance of the Redis Service for use.
   * 
   * @returns - instance of the Redis Server.
   */
  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }

    return RedisService.instance;
  }

  /**
   * Sets a normal cache in redis server.
   * 
   * @param {string} key - The key to set in redis server for future access.
   * @param {object} data - The data to be cached.
   */
  public async setCache(key: string, data: string) {
    await this.redisClient?.set(key, data);
  }

  /**
   * Sets temporary Cache in redis server.
   * 
   * @param {string} key - The key to set in redis server for future access.
   * @param {object} data - The data to be cached.
   * @param expirationTime - The duration to store cache in redis server.
   */
  public async setVolatileCache(key: string, data: string, expirationTime: number = ENV_CONFIGS.redisCacheDuration) {
    await this.redisClient?.setEx(key, expirationTime, data);
  }

  /**
   * Get the cache data by key.
   * 
   * @param {string} key - The key to set in redis server for future access.
   * @returns - Cached data in redis server.
   */
  public async getCache(key: string): Promise<any> {
    return await this.redisClient?.get(key);
  }

  /**
   * Deletes the cached data in redis server.
   * 
   * @param key - The key of cahce set in redis server.
   */
  public async removeCache(key: string) {
    await this.redisClient?.del(key);
  }
};
