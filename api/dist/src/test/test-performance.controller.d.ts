export declare class TestPerformanceController {
    testFastOperation(): Promise<{
        message: string;
        duration: string;
    }>;
    testSlowOperation(): Promise<{
        message: string;
        duration: string;
    }>;
    testErrorOperation(): Promise<{
        error: any;
        caught: boolean;
    }>;
    testBulkOperations(): Promise<{
        message: string;
        results: {
            success: boolean;
            result?: any;
            error?: string;
        }[];
        summary: {
            total: number;
            successful: number;
            failed: number;
        };
    }>;
}
