import { connection } from './api/db/connection'
import sirv from 'sirv'
import Express from 'express'
import type express from 'express'
import compression from 'compression'
import * as sapper from '@sapper/server'
import morgan from 'morgan'
import env from './config/ServerEnvironment'
import passport, { addAuthSupport } from './api/middleware/Auth'
import { logger } from './config/Logging'
import { setupAdminUser } from './config/AdminUser'
import {
  createDefaultErrorPage,
  createGlobalSettingsPage
} from './config/DefaultPages'
import { addErrorPage } from './api/middleware/ErrorPage'

// ENVIRONMENT SET UP
const { PORT, NODE_ENV, CMS_BASE_PATH } = env
const dev = NODE_ENV === 'development'

const app = Express()

app.use(morgan('common')) // add logging

addAuthSupport(app) // add middleware need to support session auth

app // set up sapper app
  .use(
    CMS_BASE_PATH,
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req: express.Request) => {
        const user = req.session.passport ? req.session.passport.user : null
        const flash = req.session.flash ? req.session.flash : null
        return { user, flash }
      }
    })
  )

app.set('view engine', 'html')
addErrorPage(app)

/**
 * 1. Connect to db
 * 2. Check admin user exists (or create it)
 * 3. Launch app
 */
connection
  .then(() => {
    logger('Database connected!')
    logger('Checking admin user...')
    return setupAdminUser()
  })
  .then(() => {
    logger('Checking for presence of global settings page...')
    return createGlobalSettingsPage()
  })
  .then(() => {
    logger('Checking for presence of error page...')
    return createDefaultErrorPage()
  })
  .then(() => {
    logger('Starting app...')
    app.listen(PORT, () => {
      logger('App started on port: ' + PORT + '!')
      if (dev) {
        logger('All Routes available: \n' + availableRoutesList())
      }
    })
  })
  .catch(() => {
    logger('Failed to connect to databse :(')
  })

// DEVELOPMENT
function availableRoutesList() {
  return app._router.stack
    .filter((r: any) => r.route)
    .map(
      (r: any) =>
        Object.keys(r.route.methods)[0].toUpperCase().padEnd(7) + r.route.path
    )
    .join('\n')
}
