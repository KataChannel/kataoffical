import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

export interface HoaDonDienTu {
  id: string;
  donhangId: string;
  soHoaDon: string;
  mauSo?: string;
  kyHieu?: string;
  ngayLap: Date;
  tongTien: number;
  tongVAT: number;
  tongThanhToan: number;
  trangThai: 'NHAP' | 'DA_XUAT' | 'HUY';
  pdfUrl?: string;
  nguoiTaoId?: string;
  nguoiDuyetId?: string;
  ngayDuyet?: Date;
  ghichu?: string;
  createdAt: Date;
  updatedAt: Date;
  donhang?: any;
}

const GET_HOADON_LIST = gql`
  query GetHoaDonList($skip: Int, $take: Int, $where: HoaDonDienTuWhereInput, $orderBy: [HoaDonDienTuOrderByInput!]) {
    hoaDonDienTuList(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
      items {
        id
        donhangId
        soHoaDon
        mauSo
        kyHieu
        ngayLap
        tongTien
        tongVAT
        tongThanhToan
        trangThai
        pdfUrl
        ghichu
        createdAt
        updatedAt
        donhang {
          id
          madonhang
          khachhang {
            name
            mst
          }
        }
      }
      total
    }
  }
`;

const GET_HOADON_DETAIL = gql`
  query GetHoaDon($id: String!) {
    hoaDonDienTu(id: $id) {
      id
      donhangId
      soHoaDon
      mauSo
      kyHieu
      ngayLap
      tongTien
      tongVAT
      tongThanhToan
      trangThai
      pdfUrl
      nguoiTaoId
      nguoiDuyetId
      ngayDuyet
      ghichu
      createdAt
      updatedAt
      donhang {
        id
        madonhang
        ngaygiao
        khachhang {
          name
          diachi
          sdt
          mst
        }
        sanpham {
          id
          soluong
          gia
          vat
          thanhtien
          sanpham {
            title
            masp
            dvt
          }
        }
      }
    }
  }
`;

const CREATE_HOADON = gql`
  mutation CreateHoaDon($input: CreateHoaDonDienTuInput!) {
    createHoaDonDienTu(input: $input) {
      id
      soHoaDon
      trangThai
    }
  }
`;

const UPDATE_HOADON = gql`
  mutation UpdateHoaDon($id: String!, $input: UpdateHoaDonDienTuInput!) {
    updateHoaDonDienTu(id: $id, input: $input) {
      id
      trangThai
    }
  }
`;

const XUAT_HOADON = gql`
  mutation XuatHoaDon($id: String!) {
    xuatHoaDon(id: $id) {
      id
      trangThai
      pdfUrl
      ngayDuyet
    }
  }
`;

const GENERATE_PDF = gql`
  mutation GenerateHoaDonPDF($id: String!) {
    generateHoaDonPDF(id: $id) {
      pdfUrl
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class HoadonService {
  constructor(private apollo: Apollo) {}

  getList(params: {
    skip?: number;
    take?: number;
    where?: any;
    orderBy?: any;
  }): Observable<{ items: HoaDonDienTu[]; total: number }> {
    return this.apollo
      .query<any>({
        query: GET_HOADON_LIST,
        variables: params,
        fetchPolicy: 'network-only'
      })
      .pipe(map(result => result.data.hoaDonDienTuList));
  }

  getDetail(id: string): Observable<HoaDonDienTu> {
    return this.apollo
      .query<any>({
        query: GET_HOADON_DETAIL,
        variables: { id },
        fetchPolicy: 'network-only'
      })
      .pipe(map(result => result.data.hoaDonDienTu));
  }

  create(input: Partial<HoaDonDienTu>): Observable<HoaDonDienTu> {
    return this.apollo
      .mutate<any>({
        mutation: CREATE_HOADON,
        variables: { input }
      })
      .pipe(map(result => result.data.createHoaDonDienTu));
  }

  update(id: string, input: Partial<HoaDonDienTu>): Observable<HoaDonDienTu> {
    return this.apollo
      .mutate<any>({
        mutation: UPDATE_HOADON,
        variables: { id, input }
      })
      .pipe(map(result => result.data.updateHoaDonDienTu));
  }

  xuatHoaDon(id: string): Observable<HoaDonDienTu> {
    return this.apollo
      .mutate<any>({
        mutation: XUAT_HOADON,
        variables: { id }
      })
      .pipe(map(result => result.data.xuatHoaDon));
  }

  generatePDF(id: string): Observable<{ pdfUrl: string }> {
    return this.apollo
      .mutate<any>({
        mutation: GENERATE_PDF,
        variables: { id }
      })
      .pipe(map(result => result.data.generateHoaDonPDF));
  }
}
