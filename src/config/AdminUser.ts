import env from "./ServerEnvironment";
import User from "../api/models/User";
import { logger } from "./Logging";
const { ADMIN_USER, ADMIN_PASSWORD } = env;

const username = ADMIN_USER || null;
const password = ADMIN_PASSWORD || null;

export const setupAdminUser = async () => {
  try {
    logger("Looking up existing admin user: " + username);
    const user = await User.findOne({ username });
    if (!user)
      throw new Error(
        "Failed to find existing admin user: " + username + "  on boot"
      );
    logger("Found existing admin user: " + username);
    return true;
  } catch (e1) {
    logger(e1.message);

    if (!username || !password) {
      logger("No admin user or password provided provided");
      process.exit(1);
    }
    if (password.length < 8) {
      logger("Admin password must be 8 or characters");
      process.exit(1);
    }

    try {
      logger("Creating admin user");
      await User.create({
        username,
        password,
      });
      return true;
    } catch (e2) {
      logger("Failed to create admin user on boot: " + e2.message);
      process.exit(1);
    }
  }
};
