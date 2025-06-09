import { Schema } from "../data/resource";
import { APIGatewayProxyEvent, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { Client } from "aws-amplify/data";
import { BaseSchema, InferOutput } from "valibot";

export type Handler<T = any> = (params: {
    input: T;
    data: Client<Schema>;
    event: APIGatewayProxyEventV2 | APIGatewayProxyEvent;
  }) => Promise<APIGatewayProxyResultV2>;
  
export type RouteConfig<T extends BaseSchema<any, any, any>> = {
    validations?: T;
    handler: Handler<InferOutput<T>>;
};
  