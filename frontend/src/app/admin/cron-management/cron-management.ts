export interface CronJob {
  id: string;
  name: string;
  description: string;
  schedule: string;
  scheduleDescription: string;
  lastRun?: Date | null;
  nextRun?: string;
  status: 'active' | 'inactive';
  category: string;
  endpoint: string;
  method: 'GET' | 'POST';
}

export interface CronJobResult {
  success: boolean;
  jobId: string;
  jobName: string;
  message: string;
  executionTime?: number;
  result?: any;
  error?: string;
  timestamp: string;
  progress?: CronJobProgress;
}

export interface CronJobProgress {
  current: number;
  total: number;
  percentage: number;
  currentStep: string;
  details?: string[];
  startTime?: Date;
  estimatedEndTime?: Date;
}

export interface CronExecutionLog {
  id: string;
  jobId: string;
  jobName: string;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'success' | 'failed';
  message?: string;
  error?: string;
  progress?: CronJobProgress;
}
