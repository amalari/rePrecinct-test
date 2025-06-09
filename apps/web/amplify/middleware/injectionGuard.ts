import { MiddlewareObj } from "@middy/core";
import { validateHTMLInjection, validateSQLInjection } from "@workspace/validator";
import { APIGatewayProxyEventV2 } from "aws-lambda";

const checkForInjection = (data: unknown, path = ''): { isValid: boolean; message: string } | null => {
  if (data === null || data === undefined) {
    return null;
  }
  if (typeof data === 'string') {
    const sqlCheck = validateSQLInjection(data);
    if (!sqlCheck.isValid) {
      return { isValid: false, message: `Security validation failed at ${path || 'root'}: ${sqlCheck.message}` };
    }
    const htmlCheck = validateHTMLInjection(data);
    if (!htmlCheck.isValid) {
      return { isValid: false, message: `Security validation failed at ${path || 'root'}: ${htmlCheck.message}` };
    }
  } else if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const result = checkForInjection(data[i], `${path}[${i}]`);
      if (result && !result.isValid) {
        return result;
      }
    }
  } else if (typeof data === 'object') {
    for (const [key, value] of Object.entries(data)) {
      const result = checkForInjection(value, path ? `${path}.${key}` : key);
      if (result && !result.isValid) {
        return result;
      }
    }
  }
  return null;
};

// Middy middleware
export const injectionGuard = (): MiddlewareObj<APIGatewayProxyEventV2, any> => ({
  before: async (request) => {
    const event = request.event;
    // Check both body and query params
    let dataToCheck: any = {};
    if (event.body) {
      try {
        dataToCheck = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
      } catch {
        dataToCheck = event.body;
      }
      const injectionResult = checkForInjection(dataToCheck, "body");
      if (injectionResult && !injectionResult.isValid) {
        request.response = {
          statusCode: 400,
          body: JSON.stringify({ message: injectionResult.message }),
        };
        return;
      }
    }
    if (event.queryStringParameters) {
      const injectionResult = checkForInjection(event.queryStringParameters, "query");
      if (injectionResult && !injectionResult.isValid) {
        request.response = {
          statusCode: 400,
          body: JSON.stringify({ message: injectionResult.message }),
        };
        return;
      }
    }
  }
});