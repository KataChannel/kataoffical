import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TrackingService } from '../../../admin/tracking/tracking.service';
import { UserService } from '../../../admin/user/user.service';
import { LichhenService } from '../../../admin/lichhen/lichhen.service';

export interface DashboardData {
  registrations: any[];
  pageViews: any[];
  appointments: any[];
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
}

export interface ChartDataProcessed {
  timeData: { [key: string]: number };
  categoryData: { [key: string]: number };
  totalCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardChartService {
  private _TrackingService = inject(TrackingService);
  private _UserService = inject(UserService);
  private _LichhenService = inject(LichhenService);

  private dashboardDataSubject = new BehaviorSubject<DashboardData>({
    registrations: [],
    pageViews: [],
    appointments: [],
    dateRange: {
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date()
    }
  });

  public dashboardData$ = this.dashboardDataSubject.asObservable();
  private isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();

  constructor() {
    this.loadInitialData();
  }

  async loadInitialData(): Promise<void> {
    try {
      this.isLoading.next(true);
      await this._UserService.getProfile();
      await this.refreshAllData();
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      this.isLoading.next(false);
    }
  }

  async refreshAllData(): Promise<void> {
    try {
      this.isLoading.next(true);
      const profile = this._UserService.profile();
      
      if (!profile?.phone) {
        throw new Error('User profile not available');
      }

      // Load registrations data
      await this._TrackingService.getTrackingBy({
        refCode: profile.phone,
        eventType: 'register',
        pageType: 'DangkyHV'
      });
      const registrations = this._TrackingService.ListTracking() || [];

      // Load page views data
      await this._TrackingService.getTrackingBy({
        refCode: profile.phone,
        eventType: 'page_view'
      });
      const pageViews = this._TrackingService.ListTracking() || [];

      // Load appointments data
      const listphone = profile.referrals?.map((item: any) => item.phone) || [];
      const appointmentsResponse = await this._LichhenService.SearchBy({
        listphone,
        pageSize: 9999
      });
      const appointments = appointmentsResponse?.data || [];

      // Update dashboard data
      const currentData = this.dashboardDataSubject.value;
      this.dashboardDataSubject.next({
        ...currentData,
        registrations,
        pageViews,
        appointments
      });

    } catch (error) {
      console.error('Error refreshing dashboard data:', error);
      throw error;
    } finally {
      this.isLoading.next(false);
    }
  }

  updateDateRange(startDate: Date, endDate: Date): void {
    const currentData = this.dashboardDataSubject.value;
    this.dashboardDataSubject.next({
      ...currentData,
      dateRange: { startDate, endDate }
    });
  }

  // Process registration data for charts
  processRegistrationData(startDate?: Date, endDate?: Date): ChartDataProcessed {
    const data = this.dashboardDataSubject.value.registrations;
    return this.processDataByDateAndCategory(
      data,
      'createdAt',
      'sharePlatform',
      startDate,
      endDate
    );
  }

  // Process page views data for charts
  processPageViewsData(startDate?: Date, endDate?: Date): ChartDataProcessed {
    const data = this.dashboardDataSubject.value.pageViews;
    return this.processDataByDateAndCategory(
      data,
      'createdAt',
      'sharePlatform',
      startDate,
      endDate
    );
  }

  // Process appointments data for charts
  processAppointmentsData(startDate?: Date, endDate?: Date): ChartDataProcessed {
    const data = this.dashboardDataSubject.value.appointments;
    return this.processDataByDateAndCategory(
      data,
      'createdAt',
      'branchName',
      startDate,
      endDate
    );
  }

  private processDataByDateAndCategory(
    data: any[],
    dateField: string,
    categoryField: string,
    startDate?: Date,
    endDate?: Date
  ): ChartDataProcessed {
    // Filter by date range if provided
    let filteredData = data;
    if (startDate && endDate) {
      filteredData = data.filter(item => {
        const itemDate = new Date(item[dateField]);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    // Process time data
    const timeData = filteredData.reduce((acc, item) => {
      const date = new Date(item[dateField]);
      const formattedDate = this.formatDate(date);
      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Process category data
    const categoryData = filteredData.reduce((acc, item) => {
      const category = item[categoryField] || 'Unknown';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return {
      timeData,
      categoryData,
      totalCount: filteredData.length
    };
  }

  private formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  // Get summary statistics
  getSummaryStats(): {
    totalRegistrations: number;
    totalPageViews: number;
    totalAppointments: number;
    avgRegistrationsPerDay: number;
    conversionRate: number;
  } {
    const data = this.dashboardDataSubject.value;
    const totalRegistrations = data.registrations.length;
    const totalPageViews = data.pageViews.length;
    const totalAppointments = data.appointments.length;

    // Calculate days in current range
    const { startDate, endDate } = data.dateRange;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    const avgRegistrationsPerDay = days > 0 ? totalRegistrations / days : 0;
    const conversionRate = totalPageViews > 0 ? (totalRegistrations / totalPageViews) * 100 : 0;

    return {
      totalRegistrations,
      totalPageViews,
      totalAppointments,
      avgRegistrationsPerDay: Number(avgRegistrationsPerDay.toFixed(2)),
      conversionRate: Number(conversionRate.toFixed(2))
    };
  }

  // Export all data
  exportAllData(): any {
    const data = this.dashboardDataSubject.value;
    const stats = this.getSummaryStats();
    
    return {
      summary: stats,
      dateRange: data.dateRange,
      rawData: {
        registrations: data.registrations,
        pageViews: data.pageViews,
        appointments: data.appointments
      },
      processedData: {
        registrations: this.processRegistrationData(),
        pageViews: this.processPageViewsData(),
        appointments: this.processAppointmentsData()
      },
      exportedAt: new Date().toISOString()
    };
  }

  // Get chart configurations for different data types
  getRegistrationChartConfig() {
    return {
      barChart: {
        title: 'Lượt Đăng Ký Theo Thời Gian',
        yAxisTitle: 'Số Lượt Đăng Ký',
        seriesName: 'Đăng Ký Thành Công',
        color: '#22C55E'
      },
      pieChart: {
        title: 'Phân Bố Nguồn Đăng Ký',
        colors: ['#3B82F6', '#EF4444', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899']
      }
    };
  }

  getPageViewsChartConfig() {
    return {
      barChart: {
        title: 'Lượt Truy Cập Theo Thời Gian',
        yAxisTitle: 'Số Lượt Truy Cập',
        seriesName: 'Truy Cập',
        color: '#3B82F6'
      },
      pieChart: {
        title: 'Phân Bố Nguồn Truy Cập',
        colors: ['#06B6D4', '#84CC16', '#F97316', '#8B5CF6', '#EC4899', '#6366F1']
      }
    };
  }

  getAppointmentsChartConfig() {
    return {
      barChart: {
        title: 'Lượt Hẹn Theo Thời Gian',
        yAxisTitle: 'Số Lượt Hẹn',
        seriesName: 'Lịch Hẹn',
        color: '#8B5CF6'
      },
      pieChart: {
        title: 'Phân Bố Chi Nhánh',
        colors: ['#EC4899', '#6366F1', '#14B8A6', '#F59E0B', '#EF4444', '#22C55E']
      }
    };
  }
}
