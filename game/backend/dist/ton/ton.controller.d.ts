import { TonService } from './ton.service';
export declare class TonController {
    private readonly tonService;
    constructor(tonService: TonService);
    initializeWallet(body: {
        mnemonic: string[];
    }): Promise<{
        address: string;
    }>;
    getWalletBalance(address: string): Promise<{
        balance: bigint;
    }>;
    sendTransaction(body: {
        mnemonic: string[];
        toAddress: string;
        amount: string;
        message?: string;
    }): Promise<{
        success: boolean;
    }>;
}
