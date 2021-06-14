import debug from "debug";

export const logger = debug("nanitecms");

const clientLogger =
  (type = "info") =>
  (...args: any[]) => {
    if (process.env.NODE_ENV !== "development") return;
    console[type](...args);
  };

export const info = clientLogger("info");
export const error = clientLogger("error");
export const log = clientLogger("log");
