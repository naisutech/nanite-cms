import { Model } from 'mongoose'

// server-side
interface AppEnv {
  API_VERSION?: string
  CMS_BASE_PATH?: string
  SESSION_SECRET?: string
  DB_USER?: string
  DB_PASSWORD?: string
  DB_HOST?: string
  DB_NAME?: string
  PORT?: string
  NODE_ENV?: string
  DEBUG?: string
  ADMIN_USER?: string
  ADMIN_PASSWORD?: string
}

// front-end
interface NavPage {
  href: string
  title: string
  navPosition: string
}

// User management related
interface NaniteUser {
  username: string
  password: string
  checkPassword: (suppliedPassword: string) => Promise<boolean>
}

interface CMSLoginCredentials {
  username: string
  password: string
}

// API requests
type postLoginRequest = (credentials: CMSLoginCredentials) => Promise<void>

// Page builder related
interface NaniteSetting {
  value: string | void
  overridesGlobal: boolean
}

interface NanitePageDescription {
  value: string | void
  overridesGlobal: boolean
}

interface NaniteScriptDefinition {
  value: string
  defer: boolean
  async: boolean
  module: boolean
}

interface NanitePageModel {
  name: string
  published: boolean
  canDelete: boolean
  canEdit: boolean
  canList: boolean
  title: NaniteSetting
  description: NaniteSetting
  head: NaniteSetting
  headScript: NaniteSetting
  headScripts: NaniteScriptDefinition[]
  body: string
  headStyle: NaniteSetting
  headStyles: string[]
  bodyScript: NaniteSetting
  bodyScripts: NaniteScriptDefinition[]
}

interface NanitePageModelInstance extends Model<NanitePageModel> {}
