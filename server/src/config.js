import "dotenv/config";

const config = {
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  mongo: process.env.MONGO,
  sessionSecret: process.env.sessionSecret
};

export default config;
