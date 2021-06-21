import mongoose from 'mongoose'
import env from '../../config/ServerEnvironment'

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = env

export const connection = mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  authSource: 'admin',
  auth: {
    user: DB_USER,
    password: DB_PASSWORD
  }
})

export const client = mongoose.connection.getClient()

export default mongoose
