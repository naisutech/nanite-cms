import NanitePage from '../api/models/Page'
import { logger } from './Logging'

export const createGlobalSettingsPage = async (): Promise<any> => {
  try {
    const existingErrorPage = await NanitePage.findOne({
      name: 'GLOBAL_SITE_SETTINGS'
    })
    if (existingErrorPage) {
      logger("'Global settings' page already exists, exiting...")
      return false
    }

    logger("'Global settings' page does not exist, creating...")
    NanitePage.create({
      name: 'GLOBAL_SITE_SETTINGS',
      published: true,
      canDelete: false,
      canEdit: true,
      canList: false,
      title: {
        value: 'Your first NaniteCMS site',
        overridesGlobal: true
      },
      description: {
        value: 'This is the default description meta for a nanite site',
        overridesGlobal: true
      },
      head: {
        value: '',
        overridesGlobal: true
      },
      headScript: {
        value: '',
        overridesGlobal: true
      },
      headScripts: [],
      headStyle: {
        value: '',
        overridesGlobal: true
      },
      headStyles: [
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css'
      ],
      body: null,
      bodyScript: {
        value: '',
        overridesGlobal: true
      },
      bodyScripts: []
    })

    return true
  } catch (e) {
    logger("Couldn't create global settings page page!")
    process.exit(1)
  }
}

export const createDefaultErrorPage = async (): Promise<any> => {
  try {
    const existingErrorPage = await NanitePage.findOne({ name: 'error404' })
    if (existingErrorPage) {
      logger("'Error 404' page already exists, exiting...")
      return false
    }

    logger("'Error 404' page does not exist, creating...")
    NanitePage.create({
      name: 'error404',
      published: true,
      canDelete: false,
      canEdit: true,
      canList: true,
      title: {
        value: 'Nanite CMS - 404',
        overridesGlobal: true
      },
      description: {
        value: 'default 404 error page',
        overridesGlobal: true
      },
      head: {
        value: null,
        overridesGlobal: true
      },
      headScript: {
        value: null,
        overridesGlobal: true
      },
      headScripts: [],
      headStyle: {
        value: null,
        overridesGlobal: false
      },
      headStyles: [],
      body: `<h1>404</h1><p>Nanite's default 404 page</p>`,
      bodyScript: {
        value: null,
        overridesGlobal: false
      },
      bodyScripts: []
    })

    return true
  } catch (e) {
    logger("Couldn't create default error page!")
    process.exit(1)
  }
}
