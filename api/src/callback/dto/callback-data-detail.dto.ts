export class CallbackDataDetail {
  org_refid: string;
  success: boolean;
  error_code?: string;
  error_message: string = '';
  session_id?: string;
  error_call_back_message?: string;
  voucher_type?: number;
}