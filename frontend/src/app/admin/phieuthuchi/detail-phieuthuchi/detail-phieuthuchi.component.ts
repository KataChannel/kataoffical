import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { DathangService } from '../../dathang/dathang.service';
import { KhachhangService } from '../../khachhang/khachhang.service';
import { NhacungcapService } from '../../nhacungcap/nhacungcap.service';
import { CreatePhieuThuChiDto } from '../phieuthuchi';
import { PhieuThuChiService } from '../phieuthuchi.service';

@Component({
  selector: 'app-detail-phieuthuchi',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './detail-phieuthuchi.component.html',
  styleUrls: ['./detail-phieuthuchi.component.scss']
})
export class DetailPhieuthuchiComponent implements OnInit {
  isNew = signal(true);
  phieuId = signal<string | null>(null);
  
  formData = signal<CreatePhieuThuChiDto>({
    loai: 'THU',
    soTien: 0,
    doiTuong: 'KHACHHANG',
    phuongThuc: 'TIEN_MAT',
    coHoaDon: false,
    ghichu: '',
    lydo: ''
  });

  listKhachhang = signal<any[]>([]);
  listNhacungcap = signal<any[]>([]);
  listDathang = signal<any[]>([]);
  
  filterKhachhang = signal<any[]>([]);
  filterNhacungcap = signal<any[]>([]);
  filterDathang = signal<any[]>([]);

  constructor(
    public phieuThuChiService: PhieuThuChiService,
    private khachhangService: KhachhangService,
    private nhacungcapService: NhacungcapService,
    private dathangService: DathangService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadInitialData();
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isNew.set(false);
      this.phieuId.set(id);
      await this.loadDetail(id);
    } else {
      // Pre-fill from query parameters
      const dathangId = this.route.snapshot.queryParamMap.get('dathangId');
      const loai = this.route.snapshot.queryParamMap.get('loai');
      const doiTuong = this.route.snapshot.queryParamMap.get('doiTuong');
      const doiTuongId = this.route.snapshot.queryParamMap.get('doiTuongId');

      if (loai) this.updateField('loai', loai);
      if (doiTuong) this.updateField('doiTuong', doiTuong);
      
      if (dathangId) {
        this.updateField('dathangId', dathangId);
        this.updateField('doiTuong', 'NHACUNGCAP');
        this.updateField('loai', 'CHI');
        this.loadDathangDetail(dathangId);
      } else if (doiTuongId) {
        this.updateField('doiTuongId', doiTuongId);
        // Find name from lists if already loaded
        this.updateNameFromLists(doiTuong, doiTuongId);
      }
    }
  }

  private updateNameFromLists(type: string | null, id: string) {
    if (type === 'KHACHHANG') {
      const kh = this.listKhachhang().find(k => k.id === id);
      if (kh) this.updateField('tenDoiTuong', kh.name);
    } else if (type === 'NHACUNGCAP') {
      const ncc = this.listNhacungcap().find(n => n.id === id);
      if (ncc) {
        this.updateField('tenDoiTuong', ncc.name);
        this.loadDathangsByNCC(id);
      }
    }
  }

  async loadInitialData() {
    try {
      const [khs, nccs] = await Promise.all([
        this.khachhangService.getKhachhangforselect(),
        this.nhacungcapService.getAllNhacungcap({ pageSize: 1000 })
      ]);
      this.listKhachhang.set(khs || []);
      this.listNhacungcap.set(nccs || []);
      this.filterKhachhang.set(khs || []);
      this.filterNhacungcap.set(nccs || []);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  }

  async loadDathangDetail(id: string) {
    try {
      await this.dathangService.getDathangByid(id);
      const detail = this.dathangService.DetailDathang();
      if (detail) {
        this.updateField('doiTuongId', detail.nhacungcapId);
        this.updateField('tenDoiTuong', detail.nhacungcap?.name);
        this.updateField('soTien', detail.tongtien);
        this.updateField('maDathang', detail.madncc);
        this.updateField('lydo', `Thanh toán đơn hàng ${detail.madncc}`);
      }
    } catch (error) {
      console.error('Error loading dathang detail:', error);
    }
  }

  async loadDetail(id: string) {
    try {
      const data = await this.phieuThuChiService.getDetail(id);
      this.formData.set({
        loai: data.loai,
        soTien: data.soTien,
        donhangId: data.donhangId,
        dathangId: data.dathangId,
        doiTuong: data.doiTuong,
        doiTuongId: data.doiTuongId,
        tenDoiTuong: data.tenDoiTuong,
        phuongThuc: data.phuongThuc,
        coHoaDon: data.coHoaDon,
        ghichu: data.ghichu,
        lydo: data.lydo,
        maDathang: data.dathang?.madncc
      });
      if (data.doiTuong === 'NHACUNGCAP' && data.doiTuongId) {
        this.loadDathangsByNCC(data.doiTuongId);
      }
    } catch (error) {
      console.error('Error loading detail:', error);
      alert('Có lỗi khi tải dữ liệu');
    }
  }

  async loadDathangsByNCC(nccId: string) {
    try {
      await this.dathangService.getDathangBy({ nhacungcapId: nccId, pageSize: 100 });
      const orders = this.dathangService.ListDathang();
      this.listDathang.set(orders || []);
      this.filterDathang.set(orders || []);
    } catch (error) {
      console.error('Error loading dathangs:', error);
    }
  }

  doFilter(type: 'KH' | 'NCC' | 'DH', event: any) {
    const val = (event.target.value || '').toLowerCase();
    if (type === 'KH') {
      this.filterKhachhang.set(this.listKhachhang().filter(i => 
        (i.name || '').toLowerCase().includes(val) || (i.makh && i.makh.toLowerCase().includes(val))
      ));
    } else if (type === 'NCC') {
      this.filterNhacungcap.set(this.listNhacungcap().filter(i => 
        (i.name || '').toLowerCase().includes(val) || (i.mancc && i.mancc.toLowerCase().includes(val))
      ));
    } else if (type === 'DH') {
      this.filterDathang.set(this.listDathang().filter(i => 
        (i.madncc || '').toLowerCase().includes(val)
      ));
    }
  }

  onSelectEntity(type: 'KH' | 'NCC', entity: any) {
    this.updateField('doiTuongId', entity.id);
    this.updateField('tenDoiTuong', entity.name);
    if (type === 'NCC') {
      this.loadDathangsByNCC(entity.id);
    }
  }

  onSelectDathang(order: any) {
    this.updateField('dathangId', order.id);
    this.updateField('maDathang', order.madncc);
    this.updateField('soTien', order.tongtien); // Optional: auto-fill amount
    this.updateField('lydo', `Thanh toán đơn hàng ${order.madncc}`);
  }

  onDoiTuongChange(newType: any) {
    this.formData.update(data => ({ 
      ...data, 
      doiTuong: newType,
      doiTuongId: undefined,
      tenDoiTuong: undefined,
      dathangId: undefined,
      maDathang: undefined
    }));
    this.listDathang.set([]);
    this.filterDathang.set([]);
  }

  async onSubmit() {
    if (!this.formData().soTien || this.formData().soTien <= 0) {
      alert('Vui lòng nhập số tiền hợp lệ');
      return;
    }

    try {
      console.log('Submitting PhieuThuChi:', this.formData());
      if (this.isNew()) {
        await this.phieuThuChiService.create(this.formData());
        alert('Tạo phiếu thành công!');
      } else {
        await this.phieuThuChiService.update(this.phieuId()!, this.formData());
        alert('Cập nhật thành công!');
      }
      this.router.navigate(['/admin/phieuthuchi']);
    } catch (error: any) {
      console.error('Error saving PhieuThuChi:', error);
      alert('Có lỗi xảy ra khi lưu: ' + (error.message || 'Lỗi không xác định'));
    }
  }

  goBack() {
    this.router.navigate(['/admin/phieuthuchi']);
  }

  updateField(field: string, value: any) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }
}
