import type express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { client } from "../db/connection";
import env from "../../config/ServerEnvironment";

const SESSION_SECRET = env.SESSION_SECRET || "super_secret_session_madness";
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = env;

export default (app: express.Application): void => {
  app.use(
    session({
      secret: SESSION_SECRET,
      store: MongoStore.create({
        client,
      }),
      resave: false,
      saveUninitialized: true,
    })
  );
};
