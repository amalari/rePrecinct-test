import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { query } from "./v1/query";
import { mutation } from "./v1/mutation";
import { router } from "@/util/router";

Amplify.configure(outputs);
export const handler = router({ query, mutation })  
