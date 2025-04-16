import { WalletContractV4 } from '@ton/ton';
export declare class TonService {
    private tonClient;
    constructor();
    initializeWallet(mnemonic: string[]): Promise<{
        address: string;
        contract: import("@ton/ton").OpenedContract<WalletContractV4>;
        keyPair: import("@ton/crypto").KeyPair;
    }>;
    getWalletBalance(address: string): Promise<bigint>;
    sendTransaction(walletInfo: any, toAddress: string, amount: string, message?: string): Promise<{
        success: boolean;
    }>;
}
