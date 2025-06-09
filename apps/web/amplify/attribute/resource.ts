import { a, defineFunction } from '@aws-amplify/backend';

export const attributeModel = a
  .model({
    id: a.id().default(() => crypto.randomUUID()),
    buildingAttribute: a.string().required(),
  })
  .authorization((allow) => [allow.guest()])
export const TABLE_NAME = "Attribute"

export const attributeApi = defineFunction({
  name: 'attribute-api',
})
