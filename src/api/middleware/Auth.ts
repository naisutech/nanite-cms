import Express from 'express'
import type express from 'express'
import passport from 'passport'
import flash from 'connect-flash'
import * as passportLocal from 'passport-local'
import User from '../models/User'
import addSessionSupport from './Session'
import env from '../../config/ServerEnvironment'
import { logger } from '../../config/Logging'
import type { NaniteUser } from '../../types/main'

const { CMS_BASE_PATH, API_VERSION } = env
const apiVersion = API_VERSION || 'v1'
const basePath = CMS_BASE_PATH || ''

// PASSPORT JS CONFIGURATION
passport.use(
  new passportLocal.Strategy({}, async function (
    username: string,
    password: string,
    done
  ) {
    return User.findOne({ username: username })
      .then(async (user) => {
        const validPassword = await user.checkPassword(password)
        if (!validPassword) throw new Error('Invalid username or password')
        return done(null, user)
      })
      .catch((e) => {
        return done(null, false, e.message)
      })
  })
)

passport.serializeUser(function (user: NaniteUser, done) {
  done(null, user.username)
})

passport.deserializeUser(async function (username, done) {
  try {
    const user = await User.findOne({ username })
    done(null, user)
  } catch (e) {
    done(e, false)
  }
})

export default passport

// EXPRESS APP CONFIG

export const addAuthSupport = (app: express.Application) => {
  app.use(Express.json())
  app.use(Express.urlencoded({ extended: true }))
  addSessionSupport(app)
  app.use(flash())
  app.use(passport.initialize())
  app.use(passport.session())
  app.post(
    basePath + `/login`,
    passport.authenticate('local', {
      successRedirect: basePath,
      failureRedirect: basePath + '/login',
      failureFlash: true
    })
  )
  app.get(basePath + '/logout', function (req, res) {
    req.logout()
    req.session.destroy(() => {})
    res.redirect(basePath + '/login')
  })

  app.use((req, res, next) => {
    // don't protect any static paths
    if (
      req.path.match(
        /.*(\.js$|\.css$|\.png$|\.svg$|\.jpg$|\.webp$|\.jpeg$|\.ico$|\.json$)/
      )
    )
      return next()

    // get the user from the session
    const user = req?.session?.passport?.user

    // check if the we're in app &&
    // redirect if user missing from session
    if (
      !user &&
      req.path !== basePath + '/login' &&
      req.path.includes(basePath)
    ) {
      return res.redirect(basePath + '/login')
    }

    // check if we're on login page and have a user
    // redirect to app if we're logged in
    if (user && req.path === basePath + '/login') {
      return res.redirect(basePath)
    }

    next()
  })
}
