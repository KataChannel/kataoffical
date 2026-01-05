import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface ThanhToan {
  id: string;
  maThanhToan: string;
  donhangId: string;
  soTien: number;
  loai: 'CO_HOA_DON' | 'KHONG_HOA_DON' | 'TONG_HOP';
  phuongThuc: 'TIEN_MAT' | 'CHUYEN_KHOAN' | 'THE' | 'VI_DIEN_TU';
  ngayThanhToan: Date;
  trangThai: 'CHO_THANH_TOAN' | 'DA_THANH_TOAN' | 'HUY';
  nguoiTaoId?: string;
  ghichu?: string;
  createdAt: Date;
  updatedAt: Date;
  donhang?: any;
}

export interface CreateBulkThanhToanDto {
  items: {
    donhangId: string;
    soTien: number;
    ghichu?: string;
  }[];
  loai?: 'CO_HOA_DON' | 'KHONG_HOA_DON' | 'TONG_HOP';
  phuongThuc?: 'TIEN_MAT' | 'CHUYEN_KHOAN' | 'THE' | 'VI_DIEN_TU';
  ghichu?: string;
  ngayThanhToan?: string;
}

const GET_THANHTOAN_LIST = gql`
  query GetThanhToanList($skip: Int, $take: Int, $where: ThanhToanWhereInput, $orderBy: [ThanhToanOrderByInput!]) {
    thanhToanList(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
      items {
        id
        maThanhToan
        donhangId
        soTien
        loai
        phuongThuc
        ngayThanhToan
        trangThai
        ghichu
        createdAt
        updatedAt
        donhang {
          id
          madonhang
          khachhang {
            name
          }
        }
      }
      total
    }
  }
`;

const CREATE_THANHTOAN = gql`
  mutation CreateThanhToan($input: CreateThanhToanInput!) {
    createThanhToan(input: $input) {
      id
      maThanhToan
      trangThai
    }
  }
`;

const UPDATE_THANHTOAN = gql`
  mutation UpdateThanhToan($id: String!, $input: UpdateThanhToanInput!) {
    updateThanhToan(id: $id, input: $input) {
      id
      trangThai
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ThanhtoanService {
  private apiUrl = `${environment.APIURL}/thanhtoan`;

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  getList(params: {
    skip?: number;
    take?: number;
    where?: any;
    orderBy?: any;
  }): Observable<{ items: ThanhToan[]; total: number }> {
    // Convert generic params to backend-specific query params if needed
    // For now, mapping straightforward properties
    const queryParams: any = {};
    if (params.skip) queryParams.page = Math.floor(params.skip / (params.take || 10)) + 1;
    if (params.take) queryParams.limit = params.take;
    
    // Map 'where' clause to specific query params supported by controller
    if (params.where) {
       if (params.where.donhangId) queryParams.donhangId = params.where.donhangId;
       if (params.where.loai) queryParams.loai = params.where.loai;
       if (params.where.trangThai) queryParams.trangThai = params.where.trangThai;
       if (params.where.ngayThanhToan) {
          // Handle date ranges if backend supports it
          // queryParams.tuNgay = ...
       }
    }

    return this.http.get<{ items: ThanhToan[], total: number }>(this.apiUrl, { params: queryParams })
      .pipe(map((response: any) => {
         // Backend controller findAll returns { data: [], total: ..., ... } or just array? 
         // Looking at controller code (Step 363): return this.thanhToanService.findAll(...)
         // Service findAll (Step 353) returns { data: ..., total: ... }
         return {
            items: response.data || [],
            total: response.total || 0
         };
      }));
  }

  create(input: Partial<ThanhToan>): Observable<ThanhToan> {
    return this.apollo
      .mutate<any>({
        mutation: CREATE_THANHTOAN,
        variables: { input }
      })
      .pipe(map(result => result.data.createThanhToan));
  }

  update(id: string, input: Partial<ThanhToan>): Observable<ThanhToan> {
    return this.apollo
      .mutate<any>({
        mutation: UPDATE_THANHTOAN,
        variables: { id, input }
      })
      .pipe(map(result => result.data.updateThanhToan));
  }

  createBulk(data: CreateBulkThanhToanDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk`, data);
  }
}
