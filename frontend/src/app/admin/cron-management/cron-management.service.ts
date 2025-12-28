import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { CronExecutionLog, CronJob, CronJobProgress, CronJobResult } from './cron-management';

@Injectable({
  providedIn: 'root'
})
export class CronManagementService {
  constructor(private storageService: StorageService) {}

  jobs = signal<CronJob[]>([]);
  executionLogs = signal<CronExecutionLog[]>([]);
  loading = signal<boolean>(false);
  runningJobs = signal<Set<string>>(new Set());
  jobProgress = signal<Map<string, CronJobProgress>>(new Map());

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.storageService.getItem('token')
    };
  }

  async getJobs(): Promise<CronJob[]> {
    try {
      this.loading.set(true);
      const response = await fetch(
        `${environment.APIURL}/cron-management/jobs`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      this.jobs.set(result || []);
      return result;
    } catch (error) {
      console.error('Error fetching cron jobs:', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  updateProgress(jobId: string, progress: CronJobProgress) {
    this.jobProgress.update(map => {
      const newMap = new Map(map);
      newMap.set(jobId, progress);
      return newMap;
    });
    
    // Also update log entry
    this.executionLogs.update(logs => 
      logs.map(l => l.jobId === jobId && l.status === 'running' ? {
        ...l,
        progress
      } : l)
    );
  }

  getProgress(jobId: string): CronJobProgress | undefined {
    return this.jobProgress().get(jobId);
  }

  async triggerJob(jobId: string, params?: any): Promise<CronJobResult> {
    const startTime = Date.now();
    const initialProgress: CronJobProgress = {
      current: 0,
      total: 100,
      percentage: 0,
      currentStep: 'Đang khởi tạo...',
      details: [],
      startTime: new Date()
    };

    const log: CronExecutionLog = {
      id: `log-${Date.now()}`,
      jobId,
      jobName: this.jobs().find(j => j.id === jobId)?.name || jobId,
      startTime: new Date(),
      status: 'running',
      progress: initialProgress
    };

    // Add to running jobs
    this.runningJobs.update(set => {
      const newSet = new Set(set);
      newSet.add(jobId);
      return newSet;
    });

    // Initialize progress
    this.updateProgress(jobId, initialProgress);

    // Add log entry
    this.executionLogs.update(logs => [log, ...logs.slice(0, 49)]);

    try {
      // Start progress simulation for better UX
      const progressInterval = this.startProgressSimulation(jobId);

      const response = await fetch(
        `${environment.APIURL}/cron-management/trigger/${jobId}`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: params ? JSON.stringify(params) : undefined
        }
      );

      // Stop simulation
      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: CronJobResult = await response.json();

      // Final progress
      const finalProgress: CronJobProgress = {
        current: 100,
        total: 100,
        percentage: 100,
        currentStep: result.success ? 'Hoàn thành!' : 'Có lỗi xảy ra',
        details: this.extractProgressDetails(result),
        startTime: new Date(startTime)
      };

      this.updateProgress(jobId, finalProgress);

      // Update log entry
      this.executionLogs.update(logs => 
        logs.map(l => l.id === log.id ? {
          ...l,
          endTime: new Date(),
          status: result.success ? 'success' as const : 'failed' as const,
          message: result.message,
          error: result.error,
          progress: finalProgress
        } : l)
      );

      // Clear progress after delay
      setTimeout(() => {
        this.jobProgress.update(map => {
          const newMap = new Map(map);
          newMap.delete(jobId);
          return newMap;
        });
      }, 3000);

      return result;
    } catch (error: any) {
      // Update log entry with error
      const errorProgress: CronJobProgress = {
        current: 0,
        total: 100,
        percentage: 0,
        currentStep: 'Lỗi: ' + error.message,
        details: []
      };

      this.updateProgress(jobId, errorProgress);

      this.executionLogs.update(logs => 
        logs.map(l => l.id === log.id ? {
          ...l,
          endTime: new Date(),
          status: 'failed' as const,
          error: error.message,
          progress: errorProgress
        } : l)
      );

      // Clear progress after delay
      setTimeout(() => {
        this.jobProgress.update(map => {
          const newMap = new Map(map);
          newMap.delete(jobId);
          return newMap;
        });
      }, 3000);

      throw error;
    } finally {
      // Remove from running jobs
      this.runningJobs.update(set => {
        const newSet = new Set(set);
        newSet.delete(jobId);
        return newSet;
      });
    }
  }

  private startProgressSimulation(jobId: string): any {
    let progress = 0;
    const steps = [
      'Đang khởi tạo...',
      'Đang kết nối...',
      'Đang xử lý dữ liệu...',
      'Đang đồng bộ...',
      'Đang hoàn tất...'
    ];
    
    return setInterval(() => {
      if (progress < 90) {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        
        const stepIndex = Math.min(
          Math.floor(progress / 20),
          steps.length - 1
        );

        this.updateProgress(jobId, {
          current: Math.round(progress),
          total: 100,
          percentage: Math.round(progress),
          currentStep: steps[stepIndex],
          details: []
        });
      }
    }, 500);
  }

  private extractProgressDetails(result: CronJobResult): string[] {
    const details: string[] = [];
    
    if (result.result) {
      if (typeof result.result === 'object') {
        // Extract meaningful info from result
        if (result.result.syncedCount !== undefined) {
          details.push(`Đã đồng bộ: ${result.result.syncedCount} bản ghi`);
        }
        if (result.result.updatedCount !== undefined) {
          details.push(`Đã cập nhật: ${result.result.updatedCount} bản ghi`);
        }
        if (result.result.processedCount !== undefined) {
          details.push(`Đã xử lý: ${result.result.processedCount} bản ghi`);
        }
        if (result.result.message) {
          details.push(result.result.message);
        }
      } else if (typeof result.result === 'string') {
        details.push(result.result);
      }
    }

    if (result.executionTime) {
      details.push(`Thời gian: ${(result.executionTime / 1000).toFixed(2)}s`);
    }

    return details;
  }

  isJobRunning(jobId: string): boolean {
    return this.runningJobs().has(jobId);
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      'Database': '🗄️',
      'Đơn hàng': '📦',
      'System': '⚙️',
      'default': '🔧'
    };
    return icons[category] || icons['default'];
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      'active': '#10b981',
      'inactive': '#6b7280',
      'running': '#3b82f6',
      'success': '#10b981',
      'failed': '#ef4444'
    };
    return colors[status] || '#6b7280';
  }

  clearLogs() {
    this.executionLogs.set([]);
  }
}
