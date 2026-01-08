import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import moment from 'moment';
import { Observable, map } from 'rxjs';
import { TimezoneService } from '../../shared/services/timezone.service';

export interface ComprehensiveDashboardData {
  summary: {
    totalDonhang: number;
    totalDathang: number;
    totalSanpham: number;
    totalKhachhang: number;
    totalNhacungcap: number;
    totalRevenue: number;
    totalProfit: number;
  };
}

export interface DailyMonthlyReport {
  period: string;
  totalDonhang: number;
  totalRevenue: number;
  totalProfit: number;
}

export interface TopProductData {
  sanpham: {
    id: number;
    title: string;
    masp: string;
  };
  totalQuantity: number;
  totalValue: number;
}

export interface TopProductsResponse {
  byQuantity: TopProductData[];
  byValue: TopProductData[];
}

// GraphQL Queries
const GET_COMPREHENSIVE_DASHBOARD = gql`
  query GetComprehensiveDashboard($batdau: String!, $ketthuc: String!) {
    donhangStats: aggregateDonhang(batdau: $batdau, ketthuc: $ketthuc) {
      _count {
        _all
      }
      _sum {
        tongtien
        tongvat
      }
    }
    
    dathangStats: aggregateDathang(batdau: $batdau, ketthuc: $ketthuc) {
      _count {
        _all
      }
      _sum {
        tongtien
      }
    }
    
    sanphamCount: aggregateSanpham {
      _count {
        _all
      }
    }
    
    khachhangCount: aggregateKhachhang {
      _count {
        _all
      }
    }
    
    nhacungcapCount: aggregateNhacungcap {
      _count {
        _all
      }
    }
  }
`;

const GET_DAILY_MONTHLY_REPORT = gql`
  query GetDailyMonthlyReport($batdau: String!, $ketthuc: String!, $groupBy: String!) {
    dailyMonthlyReport(batdau: $batdau, ketthuc: $ketthuc, groupBy: $groupBy) {
      period
      totalDonhang
      totalRevenue
      totalProfit
    }
  }
`;

const GET_TOP_PRODUCTS = gql`
  query GetTopProducts($batdau: String!, $ketthuc: String!, $limit: Int!) {
    topProductsByQuantity: topProductsByQuantity(
      batdau: $batdau
      ketthuc: $ketthuc
      limit: $limit
    ) {
      sanpham {
        id
        title
        masp
      }
      totalQuantity
      totalValue
    }
    
    topProductsByValue: topProductsByValue(
      batdau: $batdau
      ketthuc: $ketthuc
      limit: $limit
    ) {
      sanpham {
        id
        title
        masp
      }
      totalQuantity
      totalValue
    }
  }
`;

const GET_FINANCIAL_SUMMARY = gql`
  query GetFinancialSummary($batdau: String, $ketthuc: String) {
    financialSummary(batdau: $batdau, ketthuc: $ketthuc)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private apollo: Apollo,
    private timezoneService: TimezoneService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders() {
    // Simple token from localStorage for now
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Lấy dữ liệu tổng hợp từ dathang, donhang, sanpham, khachhang, nhacungcap
   */
  getComprehensiveDashboard(batdau: string, ketthuc: string): Observable<ComprehensiveDashboardData> {
    const startDate = moment(batdau).startOf('day').utc().toISOString();
    const endDate = moment(ketthuc).endOf('day').utc().toISOString();
    return this.apollo.query({
      query: GET_COMPREHENSIVE_DASHBOARD,
      variables: {
        batdau: startDate,
        ketthuc: endDate
      },
      context: {
        headers: this.getHeaders()
      }
    }).pipe(
      map((result: any) => {
        const data = result.data;
        
        return {
          summary: {
            totalDonhang: data.donhangStats._count._all || 0,
            totalDathang: data.dathangStats._count._all || 0,
            totalSanpham: data.sanphamCount._count._all || 0,
            totalKhachhang: data.khachhangCount._count._all || 0,
            totalNhacungcap: data.nhacungcapCount._count._all || 0,
            totalRevenue: data.donhangStats._sum.tongtien || 0,
            totalProfit: (data.donhangStats._sum.tongtien || 0) - (data.dathangStats._sum.tongtien || 0)
          }
        };
      })
    );
  }

  /**
   * Báo cáo đơn hàng theo ngày, tháng, năm
   */
  getDailyMonthlyReport(
    batdau: string, 
    ketthuc: string, 
    groupBy: 'day' | 'month' | 'year' = 'day'
  ): Observable<DailyMonthlyReport[]> {
    const startDate = moment(batdau).startOf('day').utc().toISOString();
    const endDate = moment(ketthuc).endOf('day').utc().toISOString();

    return this.apollo.query({
      query: GET_DAILY_MONTHLY_REPORT,
      variables: {
        batdau: startDate,
        ketthuc: endDate,
        groupBy: groupBy
      },
      context: {
        headers: this.getHeaders()
      }
    }).pipe(
      map((result: any) => result.data.dailyMonthlyReport || [])
    );
  }

  /**
   * Top 10 sản phẩm bán chạy theo số lượng và giá trị
   */
  getTopProducts(batdau: string, ketthuc: string, limit: number = 10): Observable<TopProductsResponse> {
    const startDate = moment(batdau).startOf('day').utc().toISOString();
    const endDate = moment(ketthuc).endOf('day').utc().toISOString();

    return this.apollo.query({
      query: GET_TOP_PRODUCTS,
      variables: {
        batdau: startDate,
        ketthuc: endDate,
        limit: limit
      },
      context: {
        headers: this.getHeaders()
      }
    }).pipe(
      map((result: any) => ({
        byQuantity: result.data.topProductsByQuantity || [],
        byValue: result.data.topProductsByValue || []
      }))
    );
  }

  // Legacy methods for backward compatibility
  getDashboardData(batdau: string, ketthuc: string): Observable<any> {
    return this.getComprehensiveDashboard(batdau, ketthuc);
  }

  /**
   * Lấy tóm tắt tài chính (AR/AP)
   */
  getFinancialSummary(batdau: string, ketthuc: string): Observable<any> {
    const startDate = batdau ? moment(batdau).startOf('day').utc().toISOString() : null;
    const endDate = ketthuc ? moment(ketthuc).endOf('day').utc().toISOString() : null;

    return this.apollo.query({
      query: GET_FINANCIAL_SUMMARY,
      variables: {
        batdau: startDate,
        ketthuc: endDate
      },
      context: {
        headers: this.getHeaders()
      }
    }).pipe(
      map((result: any) => result.data.financialSummary)
    );
  }
}
