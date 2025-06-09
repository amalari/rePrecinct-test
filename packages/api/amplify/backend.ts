import { defineBackend, defineData } from '@aws-amplify/backend';
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from "aws-cdk-lib/aws-apigatewayv2";
import { Stack } from "aws-cdk-lib";

import { data } from './data/resource';
import { attributeApi } from './attribute/resource';
import { auth } from './auth/resource';

// console.log({ env })
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  data,
  auth,
  attributeApi,
});

const apiStack = backend.createStack("api-stack");
const httpLambdaIntegration = new HttpLambdaIntegration(
  "LambdaIntegration",
  backend.attributeApi.resources.lambda
);

const httpApi = new HttpApi(apiStack, "HttpApi", {
  apiName: "httpApi",
  corsPreflight: {
    // Modify the CORS settings below to match your specific requirements
    allowMethods: [
      CorsHttpMethod.GET,
      CorsHttpMethod.POST,
      CorsHttpMethod.PUT,
      CorsHttpMethod.DELETE,
    ],
    // Restrict this to domains you trust
    allowOrigins: ["*"],
    // Specify only the headers you need to allow
    allowHeaders: ["*"],
  },
  createDefaultStage: true,
});

httpApi.addRoutes({
  path: "/attribute",
  methods: [HttpMethod.GET, HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE],
  integration: httpLambdaIntegration,
});
httpApi.addRoutes({
  path: "/attribute/{proxy+}",
  methods: [HttpMethod.ANY],
  integration: httpLambdaIntegration,
});
httpApi.addRoutes({
  path: "/attribute/{proxy+}",
  methods: [HttpMethod.OPTIONS],
  integration: httpLambdaIntegration,
});

backend.addOutput({
  custom: {
    API: {
      [httpApi.httpApiName!]: {
        endpoint: httpApi.url,
        region: Stack.of(httpApi).region,
        apiName: httpApi.httpApiName,
      },
    },
  },
});