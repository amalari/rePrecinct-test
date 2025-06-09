import { Amplify } from "aws-amplify";
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from "../../.amplify/generated/env/attribute-api";
import { query } from "./v1/query";
import { mutation } from "./v1/mutation";
import { router } from "../util/router";

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env as any);
Amplify.configure(resourceConfig, libraryOptions);
export const handler = router({ query, mutation })  
