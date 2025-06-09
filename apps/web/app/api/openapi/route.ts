import { createSwaggerSpec } from 'next-swagger-doc';
import output from '@/amplify_outputs.json'

export async function GET() {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'RePrecinct API',
        version: '1.0.0',
        description: 'API documentation for RePrecinct application',
      },
      servers: [
        {
          url: output.custom.API.httpApi.endpoint,
          description: 'API Server',
        },
      ],
      tags: [
        {
          name: 'attributes',
          description: 'Building attributes operations',
        },
      ],
      paths: {
        '/attribute': {
          get: {
            tags: ['attributes'],
            summary: 'Query building attributes',
            parameters: [
              {
                name: 'limit',
                in: 'query',
                description: 'Number of items to return',
                schema: { type: 'integer', default: 10 },
              },
              {
                name: 'next',
                in: 'query',
                description: 'Pagination token',
                schema: { type: 'string' },
              },
              {
                name: 'search',
                in: 'query',
                description: 'Search term for filtering attributes',
                schema: { type: 'string' },
              },
            ],
            responses: {
              '200': {
                description: 'Successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'array',
                          items: {
                            $ref: '#/components/schemas/Attribute',
                          },
                        },
                        next: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            tags: ['attributes'],
            summary: 'Create or update building attributes',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      buildingAttribute: {
                        type: 'string',
                      },
                    },
                    required: ['buildingAttribute']
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'Successfully processed attributes',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        data: {
                          $ref: '#/components/schemas/Attribute',
                        },
                      },
                    },
                  },
                },
              },
              '400': {
                description: 'Invalid input',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        message: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Attribute: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              buildingAttribute: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'buildingAttribute'],
          },
          AttributeInput: {
            type: 'object',
            properties: {
              buildingAttribute: { type: 'string' },
            },
            required: ['buildingAttribute'],
          },
        },
      },
    },
  });

  return Response.json(spec);
}
