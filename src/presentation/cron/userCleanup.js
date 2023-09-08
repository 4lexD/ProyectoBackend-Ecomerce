import logger from "../../shared/pino/logger.js"
import UserManager from "../../domain/managers/userManager.js"

export async function userCleanup() {
  try {
    const manager = new UserManager()
    const userClear = await manager.userCleanup();
    return userClear;
  } catch (error) {
    logger.error(error.message);
  }
}