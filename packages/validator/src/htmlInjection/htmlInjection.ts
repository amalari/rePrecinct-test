import { HTML_INJECTION_PATTERNS } from '../regex';

type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export const validateHTMLInjection = (value: string): ValidationResult => {
  if (typeof value !== 'string') {
    return { isValid: true };
  }

  for (const pattern of HTML_INJECTION_PATTERNS) {
    if (pattern.test(value)) {
      return {
        isValid: false,
        message: `Potential HTML/JS injection (XSS) attempt detected: ${value} matches pattern ${pattern}`
      };
    }
  }

  return { isValid: true };
};

export const htmlInjectionValidation = (value: unknown): boolean => {
  if (typeof value !== 'string') return true;
  return validateHTMLInjection(value).isValid;
};