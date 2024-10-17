import { Redis } from 'ioredis';

let redis: Redis | null = null;

export const getRedisClient = (): Redis => {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL as string);
  }
  return redis;
};

export default getRedisClient();
