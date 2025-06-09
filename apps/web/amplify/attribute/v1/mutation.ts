import { nonEmpty, object, pipe, string } from "valibot";
import { RouteConfig } from "@/types/handler";

const schema = object({
    buildingAttribute: pipe(
        string(),
        nonEmpty(),
    ),
})

export const mutation: RouteConfig<typeof schema>  = {
    validations: schema,
    handler: async ({ data, input }) => {
        const { data: attributes } = await data.models.Attribute.list({
            filter: {
                buildingAttribute: { eq: input.buildingAttribute }
            },
        })

        if(attributes.length > 0) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    data: attributes[0],
                })
            }
        }

        const { data: createdAttribute } = await data.models.Attribute.create({
            buildingAttribute: input.buildingAttribute,
        })

        return {
            statusCode: 200,
            body: JSON.stringify({
                data: createdAttribute,
            })
        }
    }
}