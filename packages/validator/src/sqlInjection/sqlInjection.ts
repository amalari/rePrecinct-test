import { SQL_INJECTION_REGEX } from '../regex';

type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export const validateSQLInjection = (value: string): ValidationResult => {
  if (typeof value !== 'string') {
    return { isValid: true };
  }

  if (SQL_INJECTION_REGEX.test(value)) {
    return {
      isValid: false,
      message: `Potential SQL injection attempt detected: ${value} matches pattern ${SQL_INJECTION_REGEX}`
    };
  }

  return { isValid: true };
};

export const sqlInjectionValidation = (value: unknown): boolean => {
  if (typeof value !== 'string') return true;
  return validateSQLInjection(value).isValid;
};