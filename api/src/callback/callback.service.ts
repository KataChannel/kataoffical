import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import { CallbackDataInput } from './dto/callback-data-input.dto';
import { CallbackDataOutput } from './dto/callback-data-output.dto';
import { CallbackDataDetail } from './dto/callback-data-detail.dto';
import { CallBackDataType } from './enums/callback-data-type.enum';

@Injectable()
export class CallbackService {
  private readonly appId = '2d4b6324-04aa-4dbc-a85c-815fb0099057'; // Replace with your MISA-provided app_id

  async processCallback(param: CallbackDataInput): Promise<CallbackDataOutput> {
    const result = new CallbackDataOutput();

    try {
      // Validate signature
      const signature = this.generateSHA256HMAC(param.data || '', this.appId);
      if (signature !== param.signature) {
        result.Success = false;
        result.ErrorCode = 'InvalidParam';
        result.ErrorMessage = 'Signature invalid';
        return result;
      }

      // Process callback in a non-blocking way
      this.doCallBackData(param).catch((err) =>
        console.error('Error processing callback:', err),
      );
    } catch (ex) {
      result.Success = false;
      result.ErrorCode = 'Exception';
      result.ErrorMessage = ex.message;
    }

    return result;
  }

  private async doCallBackData(param: CallbackDataInput): Promise<void> {
    if (!param) return;

    // Save callback data (implement your storage logic)
    this.saveCallBack(param);

    switch (param.data_type) {
      case CallBackDataType.SaveVoucher:
      case CallBackDataType.DeleteVoucher:
        const data: CallbackDataDetail[] = param.data
          ? JSON.parse(param.data)
          : [];
        if (data && data.length > 0) {
          for (const item of data) {
            // Update status for each org_refid (implement your logic)
            console.log(`Processing org_refid: ${item.org_refid}`);
          }
        }
        break;
      default:
        break;
    }

    // Delete callback after processing (implement your storage logic)
    this.deleteCallBack(param);
  }

  private saveCallBack(param: CallbackDataInput): void {
    // Implement storage logic (e.g., save to DB or file)
    console.log('Saving callback:', param);
  }

  private deleteCallBack(param: CallbackDataInput): void {
    // Implement deletion logic (e.g., remove from DB or file)
    console.log('Deleting callback:', param);
  }

  private generateSHA256HMAC(input: string, key: string): string {
    input = input || '';
    const hmac = createHmac('sha256', key);
    hmac.update(input);
    return hmac.digest('hex').toLowerCase();
  }
}