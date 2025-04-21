import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";

const redisClient = new Redis(); // default: 127.0.0.1:6379

// host: 'localhost', // or container IP / redis service name
// port: 6379,

// Email-based: Max 5 registration attempts per email in 15 minutes
export const rateLimiterByEmail = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rl_email",
    points: 5,
    duration: 15 * 60 // 15 mins
})