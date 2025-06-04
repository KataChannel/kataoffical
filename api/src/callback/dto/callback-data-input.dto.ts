export class CallbackDataInput {
  success: boolean;
  error_code?: string;
  error_message: string = '';
  signature: string;
  data_type: number;
  data: string;
  org_company_code: string;
  app_id: string;
}