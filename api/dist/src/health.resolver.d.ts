export declare class HealthResolver {
    health(): Promise<{
        status: string;
        timestamp: string;
        version: string;
        graphql: string;
        features: string[];
    }>;
}
