import { error } from "../config/Logging";
import Http from "../lib/Http";

export const postLoginRequest = async (
  credentials: CMSLoginCredentials
): Promise<void> => {
  try {
    await Http.post("/login", credentials);
  } catch (e) {
    error("Log in failed", e.message);
    throw new Error("Cannot log in");
  }
};
