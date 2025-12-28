import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePhieuThuChiDto } from '../phieuthuchi';
import { PhieuThuChiService } from '../phieuthuchi.service';

@Component({
  selector: 'app-detail-phieuthuchi',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(
    public phieuThuChiService: PhieuThuChiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isNew.set(false);
      this.phieuId.set(id);
      this.loadDetail(id);
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
        lydo: data.lydo
      });
    } catch (error) {
      console.error('Error loading detail:', error);
      alert('Có lỗi khi tải dữ liệu');
    }
  }

  async onSubmit() {
    try {
      if (this.isNew()) {
        await this.phieuThuChiService.create(this.formData());
        alert('Tạo phiếu thành công!');
      } else {
        await this.phieuThuChiService.update(this.phieuId()!, this.formData());
        alert('Cập nhật thành công!');
      }
      this.router.navigate(['/admin/phieuthuchi']);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Có lỗi xảy ra khi lưu');
    }
  }

  goBack() {
    this.router.navigate(['/admin/phieuthuchi']);
  }

  updateField(field: string, value: any) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }
}
