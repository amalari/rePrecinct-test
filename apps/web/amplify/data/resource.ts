import { TABLE_NAME as attributeTableName, attributeModel, attributeApi } from '../attribute/resource';
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  [attributeTableName]: attributeModel,
}).authorization((allow) => [allow.resource(attributeApi)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
  },
});
