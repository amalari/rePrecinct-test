import { RouteConfig } from "@/types/handler";
import { number, object, optional, string } from "valibot";

const schema = object({
    limit: optional(number()),
    next: optional(string()),
    search: optional(string()),
})

export const query: RouteConfig<typeof schema> = {
    validations: schema,
    handler: async ({ input, data }) => {
        const limit = input.limit ?? 10;
        const next = input.next;

        const { data: attributes, nextToken } = await data.models.Attribute.list({
            limit,
            nextToken: next,
            filter: input.search ? {
                buildingAttribute: {
                    contains: input.search,
                }
            } : undefined,
        })

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: attributes,
                next: nextToken,
            })
        }
    }
}