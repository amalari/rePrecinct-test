import { BaseSchema, InferOutput, safeParse } from 'valibot';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { Handler, RouteConfig } from '@/types/handler';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '@/data/resource';
import middy from '@middy/core';
import httpEventNormalizer from '@middy/http-event-normalizer';
import { injectionGuard } from '@/middleware/injectionGuard';
import cors from '@middy/http-cors'
import { conditionalJsonBodyParser } from '@/middleware/conditionalJsonBodyParser';

export const router = <T extends BaseSchema<any, any, any>, Y extends BaseSchema<any, any, any>>({
    query,
    mutation,
}: {
    query?: RouteConfig<T>,
    mutation?: RouteConfig<Y>,
}) => {
    const client = generateClient<Schema>();
    const validateAndHandle = ({
        schema,
        handler,
        event,
    }: {
        schema: T | Y | undefined,
        handler: Handler<InferOutput<T | Y>>,
        event: APIGatewayProxyEventV2,
    }) => {
        let input = event.body
        if(schema){
            const result = safeParse(schema, input);

            if (!result.success) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: "Validation Error",
                        errors: result.issues,
                    }),
                };
            }
            input = result.output
        }
        return handler({ input, data: client, event });
    }

    return middy()
        .use(httpEventNormalizer())
        .use(conditionalJsonBodyParser())
        .use(injectionGuard())
        .use(cors())
        .handler(async (event) => {
            const method = event.requestContext.http.method;
            
            if(method === 'GET' && query?.handler) {
                return validateAndHandle({
                    schema: query.validations,
                    handler: query.handler,
                    event,
                });
            }
            if(method === 'POST' && mutation?.handler) {
                return validateAndHandle({
                    schema: mutation.validations,
                    handler: mutation.handler,
                    event,
                });
            }

            return {
                statusCode: 405,
                body: JSON.stringify({ message: 'Method Not Allowed' }),
              };
        })
    }