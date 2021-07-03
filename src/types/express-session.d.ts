import session from 'express-session'

interface PassportSessionData {
  user: NaniteUser
}

interface ConnectFlashErrors {
  error: string[]
}

interface ConnectFlashSessionData {
  error: string[]
}

declare module 'express-session' {
  export interface SessionData {
    passport: PassportSessionData
    flash: ConnectFlashSessionData
  }
}
