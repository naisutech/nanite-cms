// server-side
interface AppEnv {
  API_VERSION?: string;
  CMS_BASE_PATH?: string;
  SESSION_SECRET?: string;
  DB_USER?: string;
  DB_PASSWORD?: string;
  DB_HOST?: string;
  DB_NAME?: string;
  PORT?: string;
  NODE_ENV?: string;
  DEBUG?: string;
  ADMIN_USER?: string;
  ADMIN_PASSWORD?: string;
}

// front-end
interface NavPage {
  href: string;
  title: string;
  navPosition: string;
}

// User management related
interface NaniteUser {
  username: string;
  password: string;
  checkPassword: (suppliedPassword: string) => Promise<boolean>;
}

interface CMSLoginCredentials {
  username: string;
  password: string;
}

// API requests
type postLoginRequest = (credentials: CMSLoginCredentials) => Promise<void>;
