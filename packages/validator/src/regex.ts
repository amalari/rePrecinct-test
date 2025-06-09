// Common SQL injection patterns
export const SQL_INJECTION_REGEX = /(\b(SELECT|UPDATE|DELETE|INSERT|DROP|ALTER|CREATE|EXEC|UNION|--|;)\b)/i;

// Common XSS/HTML injection patterns
export const HTML_INJECTION_PATTERNS: RegExp[] = [
  // HTML tags
  new RegExp('<[a-z][\\s\\S]*?>', 'i'),
  // JavaScript event handlers
  new RegExp('on\\w+\\s*='), // No 'i' flag to be case-sensitive for event handlers
  // JavaScript URIs
  new RegExp('javascript:', 'i'),
  // Data URIs
  new RegExp('data:', 'i'),
  // HTML entities
  new RegExp('&[#\\w]+;'),
  // Script tags
  new RegExp('<script[\\s\\S]*?>[\\s\\S]*?<\\/script>', 'i'),
];