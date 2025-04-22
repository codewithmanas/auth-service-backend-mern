import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";

const redisClient = new Redis(); // default: 127.0.0.1:6379

// host: 'localhost', // or container IP / redis service name
// port: 6379,


// IP-based: Max 5 registration attempts per IP in 15 minutes
export const rateLimiterByIP = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rl_ip",
    points: 5,
    duration: 15 * 60 // 15 mins
})



// Email-based: Max 5 registration attempts per email in 15 minutes
export const rateLimiterByEmail = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rl_email",
    points: 5,
    duration: 15 * 60 // 15 mins
})

// Verify Token Based:
export const rateLimiterByVerifyToken = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rl_verify_token',
    points: 5,           // 5 attempts
    duration: 15 * 60,   // 15 minutes — same as token expiry
  })