import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";

const redisClient = new Redis(); // default: 127.0.0.1:6379

// host: 'localhost', // or container IP / redis service name
// port: 6379,

// For Register Limiter
// IP-based: Max 5 registration attempts per IP in 15 minutes
export const rateLimiterByIP = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "register_rl_ip",
    points: 5,
    duration: 15 * 60 // 15 mins
})

// Email-based: Max 5 registration attempts per email in 15 minutes
export const rateLimiterByEmail = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "register_rl_email",
    points: 2,
    duration: 1 * 60 // 15 mins
})

// Verify Token Based:
export const rateLimiterByVerifyToken = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rl_verify_token',
    points: 5,           // 5 attempts
    duration: 15 * 60,   // 15 minutes — same as token expiry
  })


// For Login Limiter
// IP-based: Max 10 login attempts per IP in 15 minutes
export const loginRateLimiterByIP = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "login_rl_ip",
    points: 20,
    duration: 15 * 60 // 15 mins
})

// Email-based: Max 5 login attempts per email in 15 minutes
// export const loginRateLimiterByEmail = new RateLimiterRedis({
//     storeClient: redisClient,
//     keyPrefix: "login_rl_email",
//     points: 5,
//     duration: 15 * 60 // 15 mins
// })

// Progressive delay limiter per email
export const loginRateLimiterByEmailDelay = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "login_rl_email_delay",
    points: 5, // 5 free attempts
    duration: 15 * 60, // 15 minutes window
    blockDuration: 5 * 60, // Optional: block completely after limit reached (5 mins)
})