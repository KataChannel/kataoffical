import { CallbackDataInput } from './dto/callback-data-input.dto';
import { CallbackDataOutput } from './dto/callback-data-output.dto';
export declare class CallbackService {
    private readonly appId;
    processCallback(param: CallbackDataInput): Promise<CallbackDataOutput>;
    private doCallBackData;
    private saveCallBack;
    private deleteCallBack;
    private generateSHA256HMAC;
}
