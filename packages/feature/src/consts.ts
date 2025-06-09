import outputs from "@workspace/api/amplify_outputs.json" with { type: "json" }

export const BASE_API_URL = outputs.custom.API.httpApi.endpoint