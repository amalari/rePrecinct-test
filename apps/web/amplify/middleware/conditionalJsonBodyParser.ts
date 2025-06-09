import { parseQueryParams } from "../util/parseQueryParams";
import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export const conditionalJsonBodyParser = (): MiddlewareObj<APIGatewayProxyEventV2, any> => {
    return {
        before: async (request) => {
            const event = request.event as APIGatewayProxyEventV2;
            const contentType = event.headers?.['content-type'] || event.headers?.['Content-Type'] || '';
            if (event.requestContext.http.method === 'GET') {
                event.body = event.queryStringParameters ? parseQueryParams(event.queryStringParameters) : {} as any;
            }
            if (
                (event.requestContext.http.method === 'POST' || event.requestContext.http.method === 'PUT') &&
                contentType.includes('application/json') &&
                typeof event.body === 'string'
            ) {
                try {
                    event.body = JSON.parse(event.body);
                } catch {
                    // Optionally handle JSON parse error
                    throw new Error("Invalid JSON body");
                }
            }
        },
    };
};