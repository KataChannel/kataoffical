export interface ImportConfig {
  entityType: string;
  validationRules?: any[]; // ValidationRule
  requiredFields?: string[];
  maxRows?: number;
  allowedFileTypes?: string[];
}

export interface ImportResult {
  success: boolean;
  validData: any[];
  invalidData: any[];
  errors: any[];
  message: string;
}
