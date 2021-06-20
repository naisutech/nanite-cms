import type express from 'express'
import type { NanitePageModel } from '../types/main'
import NanitePage from '../api/models/Page'
import { logger } from '../config/Logging'

interface NanitePageNode {
  open: string
  close?: string
  content?: NanitePageNode[]
  inject?: string[]
}

const templateSettings: NanitePageModel = {
  name: null,
  published: null,
  canDelete: null,
  canEdit: null,
  canList: null,
  title: null,
  description: null,
  head: null,
  headScript: null,
  headScripts: [],
  body: null,
  headStyle: null,
  headStyles: [],
  bodyScript: null,
  bodyScripts: []
}

export const addSitePages = (app: express.Application) => {}

export const buildHTMLPageByName = async (name: string) => {
  try {
    // fetch global settings
    const globalSettings = await NanitePage.findOne({
      name: 'GLOBAL_SITE_SETTINGS'
    })
    if (!globalSettings)
      throw new Error(
        "Nanite page with name: GLOBAL_SITE_SETTINGS doesn't exist"
      )

    // fetch requested page settings
    const page = await NanitePage.findOne({ name })
    if (!page)
      throw new Error('Nanite page with name: ' + name + "doesn't exist")

    // merge global with page settings
    const mergedSettings: Partial<NanitePageModel> = Object.assign(
      {},
      templateSettings
    )

    Object.keys(mergedSettings).reduce(
      (merged: Partial<NanitePageModel>, next) => {
        if (typeof page[next] === 'object' && !Array.isArray(page[next])) {
          if (page[next].overridesGlobal) {
            mergedSettings[next] = page[next].value
          } else {
            mergedSettings[next] = globalSettings[next].value
          }
        } else {
          if (Array.isArray(page[next])) {
            mergedSettings[next] = globalSettings[next].concat(page[next])
          } else {
            mergedSettings[next] = page[next]
          }
        }
        return mergedSettings
      },
      {}
    )

    return parseStructure(htmlStructure, '', mergedSettings)
  } catch (e) {
    logger(e.message)
    throw new Error(e)
  }
}

const parseStructure = (
  structure: NanitePageNode[],
  pageHTMLString = '',
  model: Partial<NanitePageModel>
): string => {
  const result = structure.reduce(
    (html: string, next: NanitePageNode): string => {
      let currentHtml = html
      // open containing tag
      if (next.open) {
        currentHtml += next.open
      }

      // go down into the next level of content if it exists
      if (next.content && next.content.length > 0) {
        currentHtml += parseStructure(next.content, html, model)
      }

      //  deal with any injected values
      if (next.inject && next.inject.length > 0) {
        currentHtml += next.inject.reduce((html, next) => {
          return html + inject(next, model)
        }, '')
      }

      // close the tag
      if (next.close) {
        currentHtml += next.close
      }

      // return the html
      return currentHtml
    },
    pageHTMLString
  )
  return result
}

const htmlStructure: NanitePageNode[] = [
  {
    open: '<!DOCTYPE html>',
    close: null
  },
  {
    open: '<html>',
    close: '</html>',
    content: [
      {
        open: '<head>',
        close: '</head>',
        content: [
          {
            open: '<meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86">',
            close: null
          }
        ],
        inject: [
          'title',
          'description',
          'head',
          'headStyles',
          'headStyle',
          'headScripts',
          'headScript'
        ]
      },
      {
        open: '<body>',
        close: '</body>',
        inject: ['body']
      }
    ],
    inject: ['bodyScripts', 'bodyScript']
  }
]

const inject = (injectedType: string, model: Partial<NanitePageModel>) => {
  if (!injectors[injectedType]) return ''
  return injectors[injectedType](model)
}

const injectors = {
  getString: function (toAppend = null, tag = '', attributes = {}) {
    if (!toAppend) return ''
    if (!tag) return toAppend
    if (tag === 'meta') {
      return `<meta name="${attributes['name']}" content="${toAppend}">`
    }
    if (tag === 'link') {
      return `<link rel="stylesheet" href="${toAppend}">`
    }

    if (tag === 'external-script') {
      return `<script src="${toAppend}" type="text/javascript"></script>`
    }

    return (
      `${tag ? '<' + tag + '>' : ''}` +
      toAppend +
      `${tag ? '</' + tag + '>' : ''}`
    )
  },
  getStrings: function (toAppend = [], tag = 'script') {
    let nextHTML = ''
    toAppend.forEach((item) => {
      nextHTML += this.getString(item, tag)
    })
    return nextHTML
  },
  title: function (model: Partial<NanitePageModel>) {
    return this.getString(model.title, 'title')
  },
  description: function (model: Partial<NanitePageModel>, htmlString = '') {
    return this.getString(model.description, 'meta', {
      name: 'description'
    })
  },
  head: function (model: Partial<NanitePageModel>) {
    return this.getString(model.head)
  },
  headStyle: function (model: Partial<NanitePageModel>) {
    return this.getString(model.headStyle, 'style')
  },
  headStyles: function (model: Partial<NanitePageModel>, htmlString = '') {
    return this.getStrings(model.headStyles, 'link')
  },
  headScript: function (model: Partial<NanitePageModel>) {
    return this.getString(model.headScript, 'script')
  },
  body: function (model: Partial<NanitePageModel>) {
    return this.getString(model.body)
  },
  headScripts: function (model: Partial<NanitePageModel>, htmlString = '') {
    return this.getStrings(model.headScripts, 'external-script')
  },
  bodyScript: function (model: Partial<NanitePageModel>) {
    return this.getString(model.bodyScript, 'script')
  },
  bodyScripts: function (model: Partial<NanitePageModel>, htmlString = '') {
    return this.getStrings(model.bodyScripts, htmlString, 'external-script')
  }
}
