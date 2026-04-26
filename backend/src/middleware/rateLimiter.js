import ratelimit from "../../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");
    // const { success } = await ratelimit.limit("user_id"); // Use this if already have user authentication and want to limit based on user ID

    if (!success) {
      return res.status(429).json({ message: "Too many request." });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(error);
  }
};

export default rateLimiter;