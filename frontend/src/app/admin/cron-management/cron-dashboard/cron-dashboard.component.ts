import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CronExecutionLog, CronJob } from '../cron-management';
import { CronManagementService } from '../cron-management.service';

@Component({
  selector: 'app-cron-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './cron-dashboard.component.html',
  styleUrls: ['./cron-dashboard.component.scss']
})
export class CronDashboardComponent implements OnInit {
  loading = signal<boolean>(false);
  error = signal<string>('');
  showLogs = signal<boolean>(false);
  selectedDate = signal<string>(new Date().toISOString().split('T')[0]);
  toastMessage = signal<{ type: 'success' | 'error'; message: string } | null>(null);

  // Group jobs by category
  groupedJobs = computed(() => {
    const jobs = this.cronService.jobs();
    const groups = new Map<string, CronJob[]>();
    
    jobs.forEach(job => {
      const category = job.category || 'Khác';
      if (!groups.has(category)) {
        groups.set(category, []);
      }
      groups.get(category)!.push(job);
    });

    return Array.from(groups.entries()).map(([category, jobs]) => ({
      category,
      icon: this.cronService.getCategoryIcon(category),
      jobs
    }));
  });

  // Stats
  stats = computed(() => {
    const jobs = this.cronService.jobs();
    const logs = this.cronService.executionLogs();
    
    return {
      total: jobs.length,
      active: jobs.filter(j => j.status === 'active').length,
      running: this.cronService.runningJobs().size,
      recentSuccess: logs.filter(l => l.status === 'success').length,
      recentFailed: logs.filter(l => l.status === 'failed').length,
    };
  });

  constructor(public cronService: CronManagementService) {}

  ngOnInit() {
    this.loadJobs();
  }

  async loadJobs() {
    try {
      this.loading.set(true);
      this.error.set('');
      await this.cronService.getJobs();
    } catch (err: any) {
      this.error.set(err.message || 'Không thể tải danh sách cron jobs');
    } finally {
      this.loading.set(false);
    }
  }

  async runJob(job: CronJob) {
    if (this.cronService.isJobRunning(job.id)) return;

    try {
      let params: any = undefined;
      
      // If job requires date parameter
      if (job.id === 'manual-auto-complete') {
        params = { date: this.selectedDate() };
      }

      const result = await this.cronService.triggerJob(job.id, params);
      
      this.showToast(
        result.success ? 'success' : 'error',
        result.message
      );
    } catch (err: any) {
      this.showToast('error', err.message || 'Có lỗi khi chạy cron job');
    }
  }

  showToast(type: 'success' | 'error', message: string) {
    this.toastMessage.set({ type, message });
    setTimeout(() => this.toastMessage.set(null), 4000);
  }

  toggleLogs() {
    this.showLogs.update(v => !v);
  }

  clearLogs() {
    this.cronService.clearLogs();
  }

  formatTime(date: Date | string | undefined): string {
    if (!date) return '-';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  }

  formatDuration(log: CronExecutionLog): string {
    if (!log.endTime || !log.startTime) return '-';
    const duration = new Date(log.endTime).getTime() - new Date(log.startTime).getTime();
    if (duration < 1000) return `${duration}ms`;
    return `${(duration / 1000).toFixed(2)}s`;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'active': 'active',
      'inactive': 'inactive',
      'running': 'running',
      'success': 'success',
      'failed': 'error',
      'error': 'error'
    };
    return classes[status] || '';
  }

  trackByJob(index: number, job: CronJob): string {
    return job.id;
  }

  trackByLog(index: number, log: CronExecutionLog): string {
    return log.id;
  }

  trackByGroup(index: number, group: { category: string }): string {
    return group.category;
  }
}
