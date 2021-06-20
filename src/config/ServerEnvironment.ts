import Dotenv from 'dotenv'
import type { AppEnv } from '../types/main'
import { info } from './Logging'
Dotenv.config()

/**
 * Will collect all process ENVs into simple importable object AND
 * relabel any client ENVs for use on server-side libs
 */
export default Object.entries(process.env).reduce<AppEnv>((env, next) => {
  env[next[0]] = next[1]
  if (next[0].startsWith('SAPPER_APP')) {
    env[next[0].slice(11)] = next[1]
  }
  return env
}, {})
