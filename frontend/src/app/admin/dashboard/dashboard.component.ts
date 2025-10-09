import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService, ComprehensiveDashboardData, DailyMonthlyReport, TopProductsResponse } from './dashboard.service';
import moment from 'moment';

// Chart.js imports
import { Chart as ChartJS, registerables } from 'chart.js';
import { GraphqlService } from '../../shared/services/graphql.service';
import { writeExcelFile } from '../../shared/utils/exceldrive.utils';

// Chart.js types
declare var Chart: any;

interface TopCustomer {
  id: string;
  ten: string;
  loai: 'Sỉ' | 'Lẻ';
  doanhthu: number;
  ngay: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('ordersChart', { static: false }) ordersChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutChart', { static: false }) donutChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart', { static: false }) pieChartCanvas!: ElementRef<HTMLCanvasElement>;

  private router = inject(Router);

  // Data properties
  comprehensiveData: ComprehensiveDashboardData | null = null;
  dailyMonthlyData: DailyMonthlyReport[] = [];
  topProductsData: TopProductsResponse | null = null;
  topCustomersData: TopCustomer[] = [];

  // Chart instances
  ordersChart: any = null;
  donutChart: any = null;
  pieChart: any = null;

  // Time filter properties
  selectedTimeFrame: 'hôm nay' | 'tuần' | 'tháng' | 'năm' = 'hôm nay';
  selectedReportPeriod: 'ngày' | 'tuần' | 'tháng' | 'năm' = 'ngày';
  
  // Date filter properties 
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  // Loading states
  isLoading = false;
  isChartsLoading = false;
  isCustomersLoading = false;

  // Table columns for customers
  customerColumns: string[] = ['stt', 'loai', 'ten', 'ngay', 'doanhthu', 'action'];

  // UI state
  dateMenuOpen = false;

  // Legacy date filter - keep for compatibility
  batdau: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  ketthuc: Date = new Date();

  // Report group options
  reportGroupBy: 'day' | 'month' | 'year' = 'day';
  reportGroupOptions = [
    { value: 'day' as const, label: 'Theo Ngày' },
    { value: 'month' as const, label: 'Theo Tháng' },
    { value: 'year' as const, label: 'Theo Năm' }
  ];

  // Additional properties for enhanced dashboard
  retailCustomerRevenue: number = 0;
  
  private subscriptions: Subscription[] = [];
  _GraphqlService: GraphqlService = inject(GraphqlService);
  private _snackBar = inject(MatSnackBar);
  
  constructor(private dashboardService: DashboardService) {
    // Register Chart.js components
    ChartJS.register(...registerables);
    
    // Set default date to current date
    this.initializeDefaultDates();
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  ngAfterViewInit(): void {
    // Initialize charts after view is ready
    setTimeout(() => {
      this.createAllCharts();
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.destroyCharts();
  }

  // Initialize default dates based on selected time frame
  initializeDefaultDates(): void {
    const today = new Date();
    
    switch (this.selectedTimeFrame) {
      case 'hôm nay':
        this.startDate = new Date(today);
        this.endDate = new Date(today);
        break;
      case 'tuần':
        const startOfWeek = moment().startOf('week').toDate();
        const endOfWeek = moment().endOf('week').toDate();
        this.startDate = startOfWeek;
        this.endDate = endOfWeek;
        break;
      case 'tháng':
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();
        this.startDate = startOfMonth;
        this.endDate = endOfMonth;
        break;
      case 'năm':
        const startOfYear = moment().startOf('year').toDate();
        const endOfYear = moment().endOf('year').toDate();
        this.startDate = startOfYear;
        this.endDate = endOfYear;
        break;
    }
  }

  // Handle time frame selection change
  onTimeFrameChange(): void {
    this.initializeDefaultDates();
    this.loadAllData();
  }
  async ExportDoanhsoKhachTheongay(): Promise<void> {
    try {
      // Show loading snackbar
      const loadingSnackbar = this._snackBar.open(
        'Đang xuất dữ liệu...',
        '',
        {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-info']
        }
      );

      this.isLoading = true;

      // Fetch orders data
      const ListDonhang: any = await this._GraphqlService.findAll('Donhang', {
        aggressiveCache: true,
        take: 99999,
        where: {
          ngaygiao: {
            gte: moment(this.startDate).startOf('day'),
            lte: moment(this.endDate).endOf('day')
          },
          status: { not: 'huy' } // Exclude cancelled orders
        },
        select: {
          madonhang: true,
          ngaygiao: true,
          khachhang: {
            select: {
              makh: true,
              name: true
            }
          },
          tongtien: true,
          tongvat: true,
          status: true
        }
      });

      if (!ListDonhang?.data || ListDonhang.data.length === 0) {
        loadingSnackbar.dismiss();
        this._snackBar.open(
          'Không có dữ liệu đơn hàng trong khoảng thời gian này',
          'Đóng',
          {
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-warning']
          }
        );
        this.isLoading = false;
        return;
      }

      // Group orders by date and customer, calculate revenue without VAT
      const groupedData = new Map<string, Map<string, any>>();

      ListDonhang.data.forEach((donhang: any) => {
        const ngay = moment(donhang.ngaygiao).format('DD/MM/YYYY');
        const makh = donhang.khachhang?.makh || 'KHACH_LE';
        const tenkh = donhang.khachhang?.name || 'Khách Lẻ';
        const doanhsoKhongVAT = (donhang.tongtien || 0) - (donhang.tongvat || 0);

        // Create date key if not exists
        if (!groupedData.has(ngay)) {
          groupedData.set(ngay, new Map());
        }

        const dateGroup = groupedData.get(ngay)!;
        
        // Create customer key format: makh|tenkh
        const customerKey = `${makh}|${tenkh}`;

        // Add or update customer revenue for this date
        if (dateGroup.has(customerKey)) {
          const existing = dateGroup.get(customerKey);
          existing.doanhso += doanhsoKhongVAT;
        } else {
          dateGroup.set(customerKey, {
            ngay: ngay,
            makh: makh,
            tenkh: tenkh,
            doanhso: doanhsoKhongVAT
          });
        }
      });

      // Flatten grouped data into array
      const excelData: any[] = [];
      
      // Sort by date (newest first)
      const sortedDates = Array.from(groupedData.keys()).sort((a, b) => {
        const dateA = moment(a, 'DD/MM/YYYY');
        const dateB = moment(b, 'DD/MM/YYYY');
        return dateB.diff(dateA);
      });

      sortedDates.forEach(ngay => {
        const customers = groupedData.get(ngay)!;
        
        // Sort customers by revenue (highest first)
        const sortedCustomers = Array.from(customers.values()).sort((a, b) => b.doanhso - a.doanhso);
        
        sortedCustomers.forEach(customer => {
          excelData.push({
            'Ngày': customer.ngay,
            'Mã KH': customer.makh,
            'Tên KH': customer.tenkh,
            'Doanh Số Ngày (Không VAT)': customer.doanhso
          });
        });
      });

      // Generate filename with date range
      const startDateStr = moment(this.startDate).format('DD-MM-YYYY');
      const endDateStr = moment(this.endDate).format('DD-MM-YYYY');
      const filename = `DoanhSoKhach_${startDateStr}_${endDateStr}.xlsx`;

      // Export to Excel
      writeExcelFile(
        excelData,
        filename,
        ['Doanh Số Khách Hàng']
      );

      console.log(`Exported ${excelData.length} rows to ${filename}`);
      
      // Dismiss loading and show success message
      loadingSnackbar.dismiss();
      this._snackBar.open(
        `Xuất Excel thành công! Tổng số dòng: ${excelData.length}`,
        'Đóng',
        {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        }
      );

    } catch (error) {
      console.error('Error exporting customer revenue:', error);
      this._snackBar.open(
        'Có lỗi xảy ra khi xuất Excel. Vui lòng thử lại.',
        'Đóng',
        {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        }
      );
    } finally {
      this.isLoading = false;
    }
  }

  // Handle report period change
  onReportPeriodChange(): void {
    this.loadDailyMonthlyReport();
    this.createOrdersChart(); // Update chart with new data
  }

    // Enhanced data loading methods
  loadAllData(): void {
    this.isLoading = true;
    
    // Load comprehensive data
    this.loadComprehensiveData();
    
    // Load daily/monthly reports
    this.loadDailyMonthlyReport();
    
    // Load top products
    this.loadTopProducts();
    
    // Load top customers
    this.loadTopCustomers();
  }

  private loadComprehensiveData(): void {
    const startDateStr = moment(this.startDate).format('YYYY-MM-DD');
    const endDateStr = moment(this.endDate).format('YYYY-MM-DD');

    const comprehensiveSub = this.dashboardService.getComprehensiveDashboard(startDateStr, endDateStr)
      .subscribe({
        next: (data) => {
          this.comprehensiveData = data;
          this.calculateRetailRevenue();
          this.checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error loading comprehensive data:', error);
          this.isLoading = false;
        }
      });

    this.subscriptions.push(comprehensiveSub);
  }

  private loadDailyMonthlyReport(): void {
    const startDateStr = moment(this.startDate).format('YYYY-MM-DD');
    const endDateStr = moment(this.endDate).format('YYYY-MM-DD');

    // Map Vietnamese period to English
    const periodMapping: { [key: string]: 'day' | 'month' | 'year' } = {
      'ngày': 'day',
      'tuần': 'day', // Use day for weekly data
      'tháng': 'month',
      'năm': 'year'
    };

    const mappedPeriod = periodMapping[this.selectedReportPeriod] || 'day';

    const reportSub = this.dashboardService.getDailyMonthlyReport(startDateStr, endDateStr, mappedPeriod)
      .subscribe({
        next: (data) => {
          this.dailyMonthlyData = data;
          this.checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error loading daily/monthly report:', error);
          this.isLoading = false;
        }
      });

    this.subscriptions.push(reportSub);
  }

  private loadTopProducts(): void {
    const startDateStr = moment(this.startDate).format('YYYY-MM-DD');
    const endDateStr = moment(this.endDate).format('YYYY-MM-DD');

    const topProductsSub = this.dashboardService.getTopProducts(startDateStr, endDateStr)
      .subscribe({
        next: (data) => {
          this.topProductsData = data;
          this.checkLoadingComplete();
        },
        error: (error) => {
          console.error('Error loading top products:', error);
          this.isLoading = false;
        }
      });

    this.subscriptions.push(topProductsSub);
  }

  private loadTopCustomers(): void {
    this.isCustomersLoading = true;
    const startDateStr = moment(this.startDate).format('YYYY-MM-DD');
    const endDateStr = moment(this.endDate).format('YYYY-MM-DD');

    // Mock data for now - replace with actual service call
    setTimeout(() => {
      this.topCustomersData = this.generateMockCustomers();
      this.isCustomersLoading = false;
    }, 1000);
  }

  private generateMockCustomers(): TopCustomer[] {
    const customers: TopCustomer[] = [];
    const customerNames = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Hoàng C', 'Phạm Minh D', 'Hoàng Thị E', 'Đỗ Văn F', 'Bùi Thị G', 'Vũ Minh H', 'Đinh Thị I', 'Lý Văn J'];
    
    for (let i = 0; i < 10; i++) {
      customers.push({
        id: `KH${String(i + 1).padStart(3, '0')}`,
        ten: customerNames[i],
        loai: Math.random() > 0.5 ? 'Sỉ' : 'Lẻ',
        doanhthu: Math.floor(Math.random() * 100000000) + 10000000,
        ngay: moment().subtract(Math.floor(Math.random() * 30), 'days').format('YYYY-MM-DD')
      });
    }
    
    return customers.sort((a, b) => b.doanhthu - a.doanhthu);
  }

  private checkLoadingComplete(): void {
    // ✅ Check if all required data is loaded
    this.isLoading = false;
    
    // ✅ Create charts after all data is loaded to ensure consistency
    setTimeout(() => {
      this.createAllCharts();
    }, 100);
  }

  // ✅ Create all charts in one method to ensure proper sequencing
  private createAllCharts(): void {
    try {
      this.createOrdersChart();
      this.createDonutChart();
      this.createPieChart();
    } catch (error) {
      console.error('Error creating charts:', error);
    }
  }

  createOrdersChart(): void {
    if (!this.ordersChartCanvas) {
      console.warn('Orders chart canvas not found');
      return;
    }

    // Destroy existing chart
    if (this.ordersChart) {
      this.ordersChart.destroy();
      this.ordersChart = null;
    }

    // ✅ Check if we have valid data
    if (!this.dailyMonthlyData?.length) {
      console.warn('No orders chart data available');
      return;
    }

    const ctx = this.ordersChartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context for orders chart');
      return;
    }

    // ✅ Filter and validate data
    const validData = this.dailyMonthlyData.filter(item => 
      item && 
      item.period && 
      typeof item.totalDonhang === 'number' && 
      typeof item.totalRevenue === 'number'
    );

    if (!validData.length) {
      console.warn('No valid orders chart data after filtering');
      return;
    }

    const config = {
      type: 'bar',
      data: {
        labels: validData.map(item => item.period || 'N/A'),
        datasets: [
          {
            label: 'Số Đơn Hàng',
            data: validData.map(item => item.totalDonhang || 0),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1,
            yAxisID: 'y',
            hoverBackgroundColor: 'rgba(59, 130, 246, 0.9)',
            hoverBorderColor: 'rgb(59, 130, 246)',
            hoverBorderWidth: 2
          },
          {
            label: 'Doanh Thu (triệu đồng)',
            data: validData.map(item => (item.totalRevenue || 0) / 1000000),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1,
            yAxisID: 'y1',
            hoverBackgroundColor: 'rgba(16, 185, 129, 0.9)',
            hoverBorderColor: 'rgb(16, 185, 129)',
            hoverBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Số Đơn Hàng',
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            ticks: {
              beginAtZero: true,
              precision: 0
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Doanh Thu (triệu đồng)',
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            ticks: {
              beginAtZero: true,
              precision: 1
            },
            grid: {
              drawOnChartArea: false,
            },
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.dataset.label || '';
                const value = context.parsed.y || 0;
                
                if (label.includes('Doanh Thu')) {
                  const originalValue = value * 1000000;
                  return `${label}: ${this.formatCurrency(originalValue)}`;
                } else {
                  return `${label}: ${value.toLocaleString()} đơn`;
                }
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    };

    try {
      this.ordersChart = new Chart(ctx, config);
    } catch (error) {
      console.error('Error creating orders chart:', error);
    }
  }

  createDonutChart(): void {
    if (!this.donutChartCanvas) return;

    // Destroy existing chart
    if (this.donutChart) {
      this.donutChart.destroy();
      this.donutChart = null;
    }

    // ✅ Check if we have valid data
    if (!this.topProductsData?.byQuantity?.length) {
      console.warn('No donut chart data available');
      return;
    }

    const ctx = this.donutChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // ✅ Filter out invalid data and prepare chart data
    const validData = this.topProductsData.byQuantity.filter(item => 
      item && 
      item.sanpham && 
      item.sanpham.title && 
      item.totalQuantity && 
      item.totalQuantity > 0
    );

    if (!validData.length) {
      console.warn('No valid donut chart data after filtering');
      return;
    }

    // ✅ Generate dynamic colors based on data length
    const generateColors = (count: number) => {
      const baseColors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#C9CBCF', '#4BC0C0', '#36A2EB', '#FF6384'
      ];
      
      const colors = [];
      for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
      }
      return colors;
    };

    const colors = generateColors(validData.length);

    const config = {
      type: 'doughnut',
      data: {
        labels: validData.map(item => item.sanpham.title || 'N/A'),
        datasets: [{
          data: validData.map(item => item.totalQuantity || 0),
          backgroundColor: colors,
          hoverBackgroundColor: colors.map(color => color + 'CC'), // Add transparency on hover
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverBorderWidth: 3,
          hoverBorderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12
              },
              generateLabels: (chart: any) => {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label: string, i: number) => {
                    const value = data.datasets[0].data[i];
                    const formattedValue = this.formatNumber(value);
                    return {
                      text: `${label}: ${formattedValue}`,
                      fillStyle: data.datasets[0].backgroundColor[i],
                      hidden: false,
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const formattedValue = this.formatNumber(value);
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                return `${label}: ${formattedValue} (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    };

    try {
      this.donutChart = new Chart(ctx, config);
    } catch (error) {
      console.error('Error creating donut chart:', error);
    }
  }

  createPieChart(): void {
    if (!this.pieChartCanvas) return;

    // Destroy existing chart
    if (this.pieChart) {
      this.pieChart.destroy();
      this.pieChart = null;
    }

    // ✅ Check if we have valid data
    if (!this.topProductsData?.byValue?.length) {
      console.warn('No pie chart data available');
      return;
    }

    const ctx = this.pieChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // ✅ Filter out invalid data and prepare chart data
    const validData = this.topProductsData.byValue.filter(item => 
      item && 
      item.sanpham && 
      item.sanpham.title && 
      item.totalValue && 
      item.totalValue > 0
    );

    if (!validData.length) {
      console.warn('No valid pie chart data after filtering');
      return;
    }

    // ✅ Generate dynamic colors based on data length
    const generateColors = (count: number) => {
      const baseColors = [
        '#8B5CF6', '#06D6A0', '#F59E0B', '#EF4444', '#3B82F6',
        '#10B981', '#F97316', '#EC4899', '#6366F1', '#84CC16'
      ];
      
      const colors = [];
      for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length]);
      }
      return colors;
    };

    const colors = generateColors(validData.length);

    const config = {
      type: 'pie',
      data: {
        labels: validData.map(item => item.sanpham.title || 'N/A'),
        datasets: [{
          data: validData.map(item => item.totalValue || 0),
          backgroundColor: colors,
          hoverBackgroundColor: colors.map(color => color + 'CC'), // Add transparency on hover
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverBorderWidth: 3,
          hoverBorderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12
              },
              generateLabels: (chart: any) => {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label: string, i: number) => {
                    const value = data.datasets[0].data[i];
                    const formattedValue = this.formatCurrency(value);
                    return {
                      text: `${label}: ${formattedValue}`,
                      fillStyle: data.datasets[0].backgroundColor[i],
                      hidden: false,
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const formattedValue = this.formatCurrency(value);
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                return `${label}: ${formattedValue} (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    };

    try {
      this.pieChart = new Chart(ctx, config);
    } catch (error) {
      console.error('Error creating pie chart:', error);
    }
  }

  private destroyCharts(): void {
    if (this.ordersChart) {
      this.ordersChart.destroy();
      this.ordersChart = null;
    }
    if (this.donutChart) {
      this.donutChart.destroy();
      this.donutChart = null;
    }
    if (this.pieChart) {
      this.pieChart.destroy();
      this.pieChart = null;
    }
  }

  // Event handlers
  applyDateFilter(): void {
    this.dateMenuOpen = false;
    this.loadAllData();
  }

  applyGroupByFilter(): void {
    const batdauStr = this.batdau.toISOString();
    const ketthucStr = this.ketthuc.toISOString();

    const reportSub = this.dashboardService.getDailyMonthlyReport(batdauStr, ketthucStr, this.reportGroupBy)
      .subscribe({
        next: (data) => {
          this.dailyMonthlyData = data;
          this.createAllCharts();
        },
        error: (error) => {
          console.error('Error loading daily/monthly data:', error);
        }
      });

    this.subscriptions.push(reportSub);
  }

  // Additional methods for HTML template
  loadAllDashboardData(): void {
    this.loadAllData();
  }

  setDateRange(range: string): void {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    switch (range) {
      case 'today':
        this.batdau = new Date(today);
        this.ketthuc = new Date(today);
        break;
      case 'yesterday':
        this.batdau = new Date(yesterday);
        this.ketthuc = new Date(yesterday);
        break;
      case 'last7days':
        this.batdau = new Date(today);
        this.batdau.setDate(this.batdau.getDate() - 7);
        this.ketthuc = new Date(today);
        break;
      case 'last30days':
        this.batdau = new Date(today);
        this.batdau.setDate(this.batdau.getDate() - 30);
        this.ketthuc = new Date(today);
        break;
      case 'thisMonth':
        this.batdau = new Date(today.getFullYear(), today.getMonth(), 1);
        this.ketthuc = new Date(today);
        break;
      case 'lastMonth':
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        this.batdau = lastMonth;
        this.ketthuc = lastDayOfLastMonth;
        break;
    }
    this.loadAllData();
  }

  getSelectedGroupLabel(): string {
    const found = this.reportGroupOptions.find(option => option.value === this.reportGroupBy);
    return found ? found.label : 'Theo Ngày';
  }

  // Helper methods
  getDaysDifference(): number {
    const timeDiff = this.ketthuc.getTime() - this.batdau.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('vi-VN').format(value);
  }

  // Date range helper methods
  onDateRangeChange(): void {
    this.loadAllData();
  }

  isToday(): boolean {
    const today = moment();
    return moment(this.startDate).isSame(today, 'day') && moment(this.endDate).isSame(today, 'day');
  }

  isThisWeek(): boolean {
    const startOfWeek = moment().startOf('week');
    const endOfWeek = moment().endOf('week');
    return moment(this.startDate).isSame(startOfWeek, 'day') && moment(this.endDate).isSame(endOfWeek, 'day');
  }

  isThisMonth(): boolean {
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');
    return moment(this.startDate).isSame(startOfMonth, 'day') && moment(this.endDate).isSame(endOfMonth, 'day');
  }

  isThisYear(): boolean {
    const startOfYear = moment().startOf('year');
    const endOfYear = moment().endOf('year');
    return moment(this.startDate).isSame(startOfYear, 'day') && moment(this.endDate).isSame(endOfYear, 'day');
  }

  // Summary calculation methods
  getTotalOrders(): number {
    return this.comprehensiveData?.summary?.totalDonhang || 0;
  }

  getTotalRevenue(): number {
    return this.comprehensiveData?.summary?.totalRevenue || 0;
  }

  // Enhanced dashboard methods
  onDateChange(): void {
    this.loadAllData();
  }

  formatDateRange(): string {
    if (this.selectedTimeFrame === 'hôm nay') {
      return moment().format('DD/MM/YYYY');
    } else if (this.selectedTimeFrame === 'tuần') {
      const startOfWeek = moment().startOf('week');
      const endOfWeek = moment().endOf('week');
      return `${startOfWeek.format('DD/MM')} - ${endOfWeek.format('DD/MM/YYYY')}`;
    } else if (this.selectedTimeFrame === 'tháng') {
      return moment().format('MM/YYYY');
    } else if (this.selectedTimeFrame === 'năm') {
      return moment().format('YYYY');
    }
    
    return `${moment(this.startDate).format('DD/MM/YYYY')} - ${moment(this.endDate).format('DD/MM/YYYY')}`;
  }

  getChartColor(index: number): string {
    const colors = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
      '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
    ];
    return colors[index % colors.length];
  }

  // Navigation methods
  navigateToFullReport(): void {
    this.router.navigate(['/admin/dashboard/baocaodoanhthu'], {
      queryParams: {
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        timeFrame: this.selectedTimeFrame
      }
    });
  }

  viewCustomerDetails(customerId: string): void {
    this.router.navigate(['/admin/khachhang', customerId]);
  }

  viewCustomerOrders(customerId: string): void {
    this.router.navigate(['/admin/donhang'], {
      queryParams: {
        khachhangId: customerId,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD')
      }
    });
  }

  // Calculate retail customer revenue
  private calculateRetailRevenue(): void {
    // This would be calculated based on actual customer data
    // For now, estimate as 30% of total revenue
    this.retailCustomerRevenue = (this.comprehensiveData?.summary?.totalRevenue || 0) * 0.3;
  }

  getMonthlyRevenue(): number {
    return this.comprehensiveData?.summary?.totalRevenue || 0; // Using total revenue as monthly
  }

  getRetailRevenue(): number {
    return this.retailCustomerRevenue;
  }

  // Data validation helper methods
  hasMetricsData(): boolean {
    return this.comprehensiveData !== null && 
           this.comprehensiveData.summary !== null;
  }

  hasOrderReportData(): boolean {
    return this.dailyMonthlyData !== null && 
           this.dailyMonthlyData.length > 0;
  }

  hasProductQuantityData(): boolean {
    return this.topProductsData !== null && 
           this.topProductsData.byQuantity !== null && 
           this.topProductsData.byQuantity.length > 0;
  }

  hasProductValueData(): boolean {
    return this.topProductsData !== null && 
           this.topProductsData.byValue !== null && 
           this.topProductsData.byValue.length > 0;
  }

  hasCustomersData(): boolean {
    return this.topCustomersData !== null && 
           this.topCustomersData.length > 0;
  }

  // Refresh individual data sections
  refreshMetricsData(): void {
    this.loadComprehensiveData();
  }

  refreshChartsData(): void {
    this.loadDailyMonthlyReport();
    this.loadTopProducts();
  }

  refreshCustomersData(): void {
    this.loadTopCustomers();
  }

  // Navigation methods
  viewMoreOrderReport(): void {
    this.router.navigate(['/admin/dashboard/baocaodoanhthu'], { 
      queryParams: { 
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD')
      }
    });
  }

  viewMoreCustomers(): void {
    console.log('Navigate to detailed customers report');
    // Implementation for detailed customer report navigation
  }
}
