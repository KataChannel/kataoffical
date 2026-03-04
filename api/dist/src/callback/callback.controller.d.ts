import { CallbackService } from './callback.service';
import { CallbackDataInput } from './dto/callback-data-input.dto';
import { CallbackDataOutput } from './dto/callback-data-output.dto';
export declare class CallbackController {
    private readonly callbackService;
    constructor(callbackService: CallbackService);
    callBackData(param: CallbackDataInput): Promise<CallbackDataOutput>;
}
