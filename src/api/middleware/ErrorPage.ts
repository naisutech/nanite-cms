import type express from 'express'
import { buildHTMLPageByName } from '../../services/PageBuilder'

export const addErrorPage = (app: express.Application) => {
  app.use(async (_, res) => {
    const htmlString = await buildHTMLPageByName('error404')
    return res.send(htmlString)
  })
}
