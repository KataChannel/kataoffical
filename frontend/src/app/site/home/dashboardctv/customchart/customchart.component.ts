import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface ChartData {
  timeData: { [key: string]: number };
  categoryData: { [key: string]: number };
  totalCount?: number;
}

export interface ChartConfig {
  pieChartTitle: string;
  barChartTitle: string;
  barChart: {
    title: string;
    yAxisTitle: string;
    seriesName: string;
    color: string;
  };
  pieChart: {
    title: string;
    colors: string[];
  };
  // Thêm các nhãn tiếng Việt
  labels: {
    dashboard: string;
    analytics: string;
    totalCount: string;
    daysActive: string;
    dailyAverage: string;
    peakValue: string;
    timeRange: string;
    from: string;
    to: string;
    refreshData: string;
    exportData: string;
    loadingAnalytics: string;
    errorLoadingData: string;
    noDataAvailable: string;
    noDataMessage: string;
    categoryDistribution: string;
    temporalAnalysis: string;
    categoryBreakdown: string;
    peakDay: string;
    timeAnalytics: string;
    activeDays: string;
    peakPerformanceDay: string;
    highestValue: string;
    dataInsights: string;
    detailedBreakdown: string;
  };
}

@Component({
  selector: 'app-customchart',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    NgApexchartsModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule,
    MatTooltipModule
  ],
  templateUrl: './customchart.component.html',
  styleUrls: ['./customchart.component.scss']
})
export class CustomchartComponent implements OnInit, OnChanges {
  @Input() chartData: ChartData = {
    timeData: {},
    categoryData: {}
  };
  @Input() config: ChartConfig = {
      barChart: {
          title: 'Dữ liệu theo thời gian',
          yAxisTitle: 'Số lượng',
          seriesName: 'Dữ liệu',
          color: '#4CAF50'
      },
      pieChart: {
          title: 'Phân bổ dữ liệu',
          colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63', '#F44336']
      },
      pieChartTitle: 'Biểu đồ tròn',
      barChartTitle: 'Biểu đồ cột',
      labels: {
        dashboard: 'Bảng điều khiển',
        analytics: 'Phân tích',
        totalCount: 'Tổng số',
        daysActive: 'Ngày hoạt động',
        dailyAverage: 'Trung bình/ngày',
        peakValue: 'Giá trị cao nhất',
        timeRange: 'Khoảng thời gian',
        from: 'Từ ngày',
        to: 'Đến ngày',
        refreshData: 'Làm mới dữ liệu',
        exportData: 'Xuất dữ liệu',
        loadingAnalytics: 'Đang tải dữ liệu phân tích...',
        errorLoadingData: 'Lỗi khi tải dữ liệu',
        noDataAvailable: 'Không có dữ liệu',
        noDataMessage: 'Không có dữ liệu trong khoảng thời gian đã chọn. Thử điều chỉnh bộ lọc hoặc làm mới dữ liệu.',
        categoryDistribution: 'Phân bổ theo danh mục',
        temporalAnalysis: 'Phân tích thời gian',
        categoryBreakdown: 'Chi tiết phân loại',
        peakDay: 'Ngày cao điểm',
        timeAnalytics: 'Phân tích thời gian',
        activeDays: 'Ngày hoạt động',
        peakPerformanceDay: 'Ngày hiệu suất cao nhất',
        highestValue: 'Giá trị cao nhất',
        dataInsights: 'Thông tin chi tiết',
        detailedBreakdown: 'Phân tích chi tiết và thống kê'
      }
  };

  @Input() rawData: any[] = [];
  @Input() dateField: string = 'createdAt';
  @Input() categoryField: string = 'platform';

  private cdr = inject(ChangeDetectorRef);
  
  // Date range properties
  startDay: Date = new Date(new Date().setDate(new Date().getDate() - 7)); // Default 7 days ago
  endDay: Date = new Date();
  
  // Quick date range options
  dateRangeOptions = [
    { label: '7 ngày qua', value: 7 },
    { label: '30 ngày qua', value: 30 },
    { label: '90 ngày qua', value: 90 },
    { label: 'Tùy chỉnh', value: 'custom' }
  ];
  selectedDateRange: number | string = 7;

  // Processed data
  processedTimeData: { [key: string]: number } = {};
  processedCategoryData: { [key: string]: number } = {};

  // Bar Chart Data
  barChartSeries: any[] = [
    {
      name: 'Data',
      data: []
    }
  ];

  barChartOptions: Partial<any> = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true
      }
    },
    colors: ['#4CAF50'],
    xaxis: {
      categories: [],
      title: { text: 'Ngày' },
      labels: {
        rotate: -45
      }
    },
    yaxis: {
      title: { text: 'Số lượng' },
      min: 0
    },
    title: {
      text: 'Data Over Time',
      align: 'center'
    },
    legend: {
      position: 'top'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      borderColor: '#f1f1f1'
    }
  };

  // Pie Chart Data
  pieChartSeries: number[] = [];
  pieChartOptions: Partial<any> = {
    chart: {
      type: 'pie',
      height: 350
    },
    labels: [],
    colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63', '#F44336'],
    title: {
      text: 'Data Distribution',
      align: 'center'
    },
    legend: {
      position: 'bottom'
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + '%';
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };
  ngOnInit(): void {
    this.processData();
    this.updateChartConfiguration();
    this.updateChartData();
  }
  Object_keys(item:any){
    return Object.keys(item);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] || changes['config'] || changes['rawData']) {
      this.processData();
      this.updateChartConfiguration();
      this.updateChartData();
    }
  }

  processData(): void {
    // If chartData is provided, use it directly
    if (this.chartData && Object.keys(this.chartData.timeData).length > 0) {
      this.processedTimeData = this.chartData.timeData;
      this.processedCategoryData = this.chartData.categoryData;
      return;
    }

    // Process raw data if available
    if (this.rawData && this.rawData.length > 0) {
      this.processRawData(this.rawData);
    }
  }

  processRawData(data: any[]): void {
    // Process time data
    this.processedTimeData = data.reduce((acc, item) => {
      const date = new Date(item[this.dateField]);
      const formattedDate = this.formatDate(date);
      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Process category data
    this.processedCategoryData = data.reduce((acc, item) => {
      const category = item[this.categoryField] || 'Unknown';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  updateChartConfiguration(): void {
    // Update chart titles and colors from config
    this.barChartOptions = {
      ...this.barChartOptions,
      title: {
        ...this.barChartOptions['title'],
        text: this.config.barChart.title
      },
      yaxis: {
        ...this.barChartOptions['yaxis'],
        title: { text: this.config.barChart.yAxisTitle }
      },
      colors: [this.config.barChart.color]
    };

    this.pieChartOptions = {
      ...this.pieChartOptions,
      title: {
        ...this.pieChartOptions['title'],
        text: this.config.pieChart.title
      },
      colors: this.config.pieChart.colors
    };

    this.barChartSeries[0].name = this.config.barChart.seriesName;
  }

  onDateRangeChange(): void {
    if (this.selectedDateRange !== 'custom') {
      const days = this.selectedDateRange as number;
      this.startDay = new Date(new Date().setDate(new Date().getDate() - days));
      this.endDay = new Date();
      this.updateChartData();
    }
  }

  onCustomDateChange(): void {
    if (this.selectedDateRange === 'custom') {
      this.updateChartData();
    }
  }

  updateChartData(): void {
    this.updateBarChartData();
    this.updatePieChartData();
    this.cdr.detectChanges();
  }

  updateBarChartData(): void {
    // Generate date range from startDay to endDay
    const dateRange: string[] = [];
    const data: number[] = [];
    
    const currentDate = new Date(this.startDay);
    const end = new Date(this.endDay);
    
    while (currentDate <= end) {
      const formattedDate = this.formatDate(currentDate);
      dateRange.push(formattedDate);
      data.push(this.processedTimeData[formattedDate] || 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Update chart options and series
    this.barChartOptions = {
      ...this.barChartOptions,
      xaxis: {
        ...this.barChartOptions['xaxis'],
        categories: dateRange
      }
    };
    
    this.barChartSeries = [
      {
        name: this.config.barChart.seriesName,
        data: data
      }
    ];
  }

  updatePieChartData(): void {
    const categoryData = this.processedCategoryData;
    
    if (Object.keys(categoryData).length > 0) {
      const labels = Object.keys(categoryData);
      const data = Object.values(categoryData) as number[];
      
      this.pieChartSeries = data;
      this.pieChartOptions = {
        ...this.pieChartOptions,
        labels: labels
      };
    } else {
      // Default empty state
      this.pieChartSeries = [];
      this.pieChartOptions = {
        ...this.pieChartOptions,
        labels: []
      };
    }
  }

  // Utility method to get summary statistics
  getSummaryStats() {
    const totalDays = Object.keys(this.processedTimeData).length;
    const totalCount = Object.values(this.processedTimeData).reduce((sum, val) => sum + val, 0);
    const avgPerDay = totalDays > 0 ? (totalCount / totalDays).toFixed(2) : '0';
    
    return {
      totalCount,
      totalDays,
      avgPerDay,
      dateRange: `${this.formatDate(this.startDay)} - ${this.formatDate(this.endDay)}`
    };
  }

  private formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  // Method to refresh data (can be called from parent component)
  refresh(): void {
    this.processData();
    this.updateChartData();
  }

  // Public method to update data from parent component
  updateData(newData: any[], dateField?: string, categoryField?: string): void {
    this.rawData = newData;
    if (dateField) this.dateField = dateField;
    if (categoryField) this.categoryField = categoryField;
    this.processData();
    this.updateChartData();
  }

  // Public method to update date range from parent component
  updateDateRange(startDate: Date, endDate: Date): void {
    this.startDay = startDate;
    this.endDay = endDate;
    this.updateChartData();
  }

  // Method to export chart data
  exportData(): any {
    return {
      config: this.config,
      chartData: {
        timeData: this.processedTimeData,
        categoryData: this.processedCategoryData
      },
      dateRange: {
        startDay: this.startDay,
        endDay: this.endDay
      },
      summary: this.getSummaryStats()
    };
  }

  // Additional utility methods for template
  getMaxDay(): string {
    const timeData = this.processedTimeData;
    if (Object.keys(timeData).length === 0) return 'N/A';
    
    const maxEntry = Object.entries(timeData).reduce((max, current) => 
      current[1] > max[1] ? current : max
    );
    return maxEntry[0];
  }

  getMaxValue(): number {
    const timeData = this.processedTimeData;
    if (Object.keys(timeData).length === 0) return 0;
    
    return Math.max(...Object.values(timeData));
  }

  // Method to handle loading states
  isLoading = false;

  setLoading(loading: boolean): void {
    this.isLoading = loading;
    this.cdr.detectChanges();
  }

  // Method to handle errors
  hasError = false;
  errorMessage = '';

  setError(error: string): void {
    this.hasError = true;
    this.errorMessage = error;
    this.cdr.detectChanges();
  }

  clearError(): void {
    this.hasError = false;
    this.errorMessage = '';
    this.cdr.detectChanges();
  }
}
