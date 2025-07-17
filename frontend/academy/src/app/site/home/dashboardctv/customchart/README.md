# Custom Chart Component Documentation

## Overview
`CustomchartComponent` là một component Angular động có thể hiển thị cả bar chart và pie chart với date range picker. Component này được thiết kế để tái sử dụng across các trang dashboard khác nhau.

## Features
- ✅ Dynamic bar chart và pie chart
- ✅ Date range picker với preset options (7, 30, 90 ngày)
- ✅ Custom date range selection
- ✅ Loading và error states
- ✅ Empty state handling
- ✅ Export functionality
- ✅ Responsive design
- ✅ Customizable colors và titles
- ✅ Real-time data processing

## Installation & Usage

### 1. Import Component
```typescript
import { CustomchartComponent, ChartData, ChartConfig } from '../customchart/customchart.component';

@Component({
  imports: [CustomchartComponent],
  // ...
})
```

### 2. Basic Usage với Raw Data
```html
<app-customchart 
  [rawData]="trackingData"
  [config]="chartConfig"
  [dateField]="'createdAt'"
  [categoryField]="'sharePlatform'">
</app-customchart>
```

### 3. Usage với Processed Data
```html
<app-customchart 
  [chartData]="processedChartData"
  [config]="chartConfig">
</app-customchart>
```

## Input Properties

### `rawData: any[]`
Array dữ liệu thô cần được process thành charts.
```typescript
rawData = [
  { createdAt: '2024-01-15', sharePlatform: 'Facebook', eventType: 'register' },
  { createdAt: '2024-01-16', sharePlatform: 'TikTok', eventType: 'register' },
  // ...
];
```

### `chartData: ChartData`
Dữ liệu đã được process sẵn.
```typescript
interface ChartData {
  timeData: { [key: string]: number };    // Data theo ngày
  categoryData: { [key: string]: number }; // Data theo category
}

// Example:
chartData = {
  timeData: {
    '15/01/2024': 5,
    '16/01/2024': 8,
    '17/01/2024': 3
  },
  categoryData: {
    'Facebook': 25,
    'TikTok': 35,
    'Website': 8
  }
};
```

### `config: ChartConfig`
Configuration cho titles, colors, và labels.
```typescript
interface ChartConfig {
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
}

// Example:
config = {
  barChart: {
    title: 'Lượt Đăng Ký Theo Thời Gian',
    yAxisTitle: 'Số Lượt Đăng Ký',
    seriesName: 'Đăng Ký Thành Công',
    color: '#22C55E'
  },
  pieChart: {
    title: 'Phân Bố Nguồn Đăng Ký',
    colors: ['#3B82F6', '#EF4444', '#F59E0B', '#10B981']
  }
};
```

### `dateField: string` (default: 'createdAt')
Tên field chứa date trong raw data.

### `categoryField: string` (default: 'platform')
Tên field chứa category trong raw data.

## Public Methods

### `updateData(newData: any[], dateField?: string, categoryField?: string)`
Cập nhật data từ parent component.
```typescript
// In parent component
@ViewChild(CustomchartComponent) chartComponent!: CustomchartComponent;

updateChartData() {
  this.chartComponent.updateData(newData, 'createdAt', 'platform');
}
```

### `updateDateRange(startDate: Date, endDate: Date)`
Cập nhật date range từ parent component.
```typescript
changeDateRange() {
  const start = new Date('2024-01-01');
  const end = new Date('2024-01-31');
  this.chartComponent.updateDateRange(start, end);
}
```

### `refresh()`
Làm mới charts với data hiện tại.

### `exportData()`
Export all chart data và configuration.

## Usage Examples

### Example 1: Registration Charts
```typescript
// Component
export class RegistrationComponent {
  registrationData = [
    { createdAt: '2024-01-15', sharePlatform: 'Facebook' },
    { createdAt: '2024-01-16', sharePlatform: 'TikTok' },
    // ...
  ];

  registrationConfig = {
    barChart: {
      title: 'Lượt Đăng Ký Theo Ngày',
      yAxisTitle: 'Số Lượt Đăng Ký',
      seriesName: 'Đăng Ký Mới',
      color: '#22C55E'
    },
    pieChart: {
      title: 'Phân Bố Nền Tảng Đăng Ký',
      colors: ['#3B82F6', '#EF4444', '#F59E0B', '#10B981']
    }
  };
}
```

```html
<!-- Template -->
<app-customchart 
  [rawData]="registrationData"
  [config]="registrationConfig"
  [dateField]="'createdAt'"
  [categoryField]="'sharePlatform'">
</app-customchart>
```

### Example 2: Page Views Charts
```typescript
// Component
export class PageViewsComponent {
  pageViewsData = [
    { createdAt: '2024-01-15', device: 'Mobile', pageUrl: '/home' },
    { createdAt: '2024-01-16', device: 'Desktop', pageUrl: '/products' },
    // ...
  ];

  pageViewsConfig = {
    barChart: {
      title: 'Lượt Truy Cập Theo Ngày',
      yAxisTitle: 'Số Lượt Truy Cập',
      seriesName: 'Page Views',
      color: '#3B82F6'
    },
    pieChart: {
      title: 'Phân Bố Thiết Bị',
      colors: ['#06B6D4', '#84CC16', '#F97316']
    }
  };
}
```

### Example 3: Using với Service
```typescript
// Component với service integration
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardChartService);
  
  chartData: ChartData = { timeData: {}, categoryData: {} };
  chartConfig = this.dashboardService.getRegistrationChartConfig();
  isLoading$ = this.dashboardService.isLoading$;

  async ngOnInit() {
    // Subscribe to data changes
    this.dashboardService.dashboardData$.subscribe(data => {
      this.chartData = this.dashboardService.processRegistrationData();
    });

    // Load initial data
    await this.dashboardService.refreshAllData();
  }

  onDateRangeChange(start: Date, end: Date) {
    this.dashboardService.updateDateRange(start, end);
    this.chartData = this.dashboardService.processRegistrationData(start, end);
  }
}
```

## Styling Customization

### CSS Classes
- `.custom-chart-container` - Main container
- `.chart-wrapper` - Chart wrapper
- `.stats-card` - Statistics cards
- `.legend-item` - Pie chart legend items

### Custom Colors
```typescript
// Custom color schemes
const customColors = {
  primary: ['#3B82F6', '#1E40AF', '#1D4ED8'],
  success: ['#22C55E', '#16A34A', '#15803D'],
  warning: ['#F59E0B', '#D97706', '#B45309'],
  danger: ['#EF4444', '#DC2626', '#B91C1C']
};

chartConfig = {
  pieChart: {
    title: 'Custom Colors',
    colors: customColors.primary
  }
};
```

## Best Practices

1. **Data Preparation**: Ensure consistent date format trong raw data
2. **Performance**: Sử dụng pagination cho large datasets
3. **Error Handling**: Implement proper error states
4. **Responsive**: Test trên mobile devices
5. **Accessibility**: Thêm proper ARIA labels

## Integration với Dashboard Services

### Using với DashboardChartService
```typescript
// Inject service
private dashboardService = inject(DashboardChartService);

// Get pre-configured chart configs
registrationConfig = this.dashboardService.getRegistrationChartConfig();
pageViewsConfig = this.dashboardService.getPageViewsChartConfig();
appointmentsConfig = this.dashboardService.getAppointmentsChartConfig();

// Process data automatically
registrationData = this.dashboardService.processRegistrationData();
```

## Error Handling

Component tự động handle các trường hợp:
- Empty data states
- Loading states
- Error states
- Invalid date ranges
- Network errors

## Performance Considerations

- Component sử dụng `OnPush` change detection strategy
- Data processing được optimize cho large datasets
- Charts chỉ re-render khi cần thiết
- Memory efficient với proper cleanup

## Browser Support

- Chrome 70+
- Firefox 60+
- Safari 12+
- Edge 79+

## Dependencies

- Angular 17+
- ng-apexcharts
- Angular Material
- RxJS 7+
