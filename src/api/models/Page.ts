import { Schema, Model, model } from 'mongoose'
import type {
  NaniteSetting,
  NanitePageModel,
  NanitePageModelInstance,
  NaniteScriptDefinition
} from '../../types/main'

const pageSetting = new Schema<NaniteSetting>({
  value: {
    type: String,
    required: false,
    default: null,
    trim: true
  },
  overridesGlobal: {
    type: Boolean,
    required: true,
    default: false
  }
})

const pageExternalScript = new Schema<NaniteScriptDefinition>({
  value: {
    type: String,
    required: false,
    default: null
  },
  defer: {
    type: Boolean,
    required: true,
    default: false
  },
  async: {
    type: Boolean,
    required: true,
    default: false
  },
  module: {
    type: Boolean,
    required: true,
    default: false
  }
})

const pageSchema = new Schema<
  NanitePageModel,
  NanitePageModelInstance,
  NanitePageModel
>({
  name: {
    type: String,
    required: true,
    trim: true,
    private: false,
    unique: true
  },
  canDelete: {
    type: Boolean,
    required: true,
    default: true,
    private: false
  },
  canEdit: {
    type: Boolean,
    required: true,
    default: true,
    private: false
  },
  canList: {
    type: Boolean,
    required: true,
    default: true,
    private: false
  },
  published: { type: Boolean, required: true, default: false, private: false },
  title: pageSetting,
  description: pageSetting,
  head: pageSetting,
  headScript: pageSetting,
  headScripts: [pageExternalScript],
  headStyle: pageSetting,
  headStyles: [{ type: String, required: false, default: '', trim: true }],
  body: { type: String, required: false, default: '', trim: true },
  bodyScript: pageSetting,
  bodyScripts: [pageExternalScript]
})

const Page = model<NanitePageModel>('Page', pageSchema)

export default Page
