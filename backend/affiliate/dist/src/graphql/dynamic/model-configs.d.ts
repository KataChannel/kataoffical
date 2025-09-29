import { ModelConfig } from './dynamic-resolver.factory';
export declare const MODEL_CONFIGURATIONS: ModelConfig[];
export declare function registerAllModels(): void;
export declare function getModelConfig(modelName: string): ModelConfig | undefined;
