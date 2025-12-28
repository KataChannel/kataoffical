import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

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
  constructor(private apollo: Apollo) {}

  getList(params: {
    skip?: number;
    take?: number;
    where?: any;
    orderBy?: any;
  }): Observable<{ items: ThanhToan[]; total: number }> {
    return this.apollo
      .query<any>({
        query: GET_THANHTOAN_LIST,
        variables: params,
        fetchPolicy: 'network-only'
      })
      .pipe(map(result => result.data.thanhToanList));
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
}
