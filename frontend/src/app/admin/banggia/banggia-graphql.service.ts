import {  Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { GraphqlService } from '../../shared/services/graphql.service';

@Injectable({
  providedIn: 'root'
})
export class BanggiaService {
  private _GraphqlService = inject(GraphqlService);
  
  constructor(
    private _StorageService: StorageService,
    private router: Router,
  ) { }

  ListBanggia = signal<any[]>([]);
  DetailBanggia = signal<any>({});
  banggiaId = signal<string | null>(null);
  
  setBanggiaId(id: string | null) {
    this.banggiaId.set(id);
  }

  /**
   * Tạo bảng giá mới với sản phẩm và khách hàng sử dụng GraphQL
   */
  async CreateBanggia(dulieu: any) {
    try {
      // Chuẩn bị data cho GraphQL mutation
      const createData = {
        title: dulieu.title,
        mabanggia: dulieu.mabanggia || this.generateMaBanggia(),
        type: dulieu.type || 'bansi',
        batdau: dulieu.batdau ? new Date(dulieu.batdau).toISOString() : new Date().toISOString(),
        ketthuc: dulieu.ketthuc ? new Date(dulieu.ketthuc).toISOString() : new Date(Date.now() + 30*24*60*60*1000).toISOString(),
        order: dulieu.order || 1,
        ghichu: dulieu.ghichu || '',
        status: dulieu.status || 'baogia',
        isActive: dulieu.isActive !== false,
        isDefault: dulieu.isDefault || false,
        // Tạo sản phẩm trong bảng giá
        sanpham: dulieu.sanpham ? {
          create: dulieu.sanpham.map((sp: any) => ({
            sanphamId: sp.sanphamId || sp.id,
            giaban: Number(sp.giaban) || 0,
            order: sp.order || 1,
            isActive: sp.isActive !== false
          }))
        } : undefined,
        // Kết nối khách hàng
        khachhang: dulieu.khachhang ? {
          connect: dulieu.khachhang.map((kh: any) => ({ id: kh.id || kh }))
        } : undefined
      };

      const include = {
        sanpham: {
          include: {
            sanpham: {
              select: {
                id: true,
                title: true,
                masp: true,
                dvt: true
              }
            }
          }
        },
        khachhang: {
          select: {
            id: true,
            name: true,
            makh: true
          }
        }
      };

      const newBanggia = await this._GraphqlService.createOne('banggia', createData, { include });
      
      this.banggiaId.set(newBanggia.id);
      this.DetailBanggia.set(newBanggia);
      await this.getAllBanggia();
      
      return newBanggia;
    } catch (error) {
      console.error('Lỗi tạo bảng giá:', error);
      throw error;
    }
  }

  /**
   * Cập nhật bảng giá với sản phẩm và khách hàng sử dụng GraphQL
   */
  async updateBanggia(dulieu: any) {
    try {
      const updateData: any = {
        title: dulieu.title,
        mabanggia: dulieu.mabanggia,
        type: dulieu.type,
        batdau: dulieu.batdau ? new Date(dulieu.batdau).toISOString() : undefined,
        ketthuc: dulieu.ketthuc ? new Date(dulieu.ketthuc).toISOString() : undefined,
        order: dulieu.order,
        ghichu: dulieu.ghichu,
        status: dulieu.status,
        isActive: dulieu.isActive,
        isDefault: dulieu.isDefault,
        // Cập nhật sản phẩm - xóa tất cả và tạo mới
        sanpham: dulieu.sanpham ? {
          deleteMany: {},
          create: dulieu.sanpham.map((sp: any) => ({
            sanphamId: sp.sanphamId || sp.id,
            giaban: Number(sp.giaban) || 0,
            order: sp.order || 1,
            isActive: sp.isActive !== false
          }))
        } : undefined,
        // Cập nhật khách hàng - disconnect tất cả và connect mới
        khachhang: dulieu.khachhang ? {
          set: dulieu.khachhang.map((kh: any) => ({ id: kh.id || kh }))
        } : undefined
      };

      // Loại bỏ các field undefined
      Object.keys(updateData).forEach(key => {
        if ((updateData as any)[key] === undefined) {
          delete (updateData as any)[key];
        }
      });

      const include = {
        sanpham: {
          include: {
            sanpham: {
              select: {
                id: true,
                title: true,
                masp: true,
                dvt: true
              }
            }
          }
        },
        khachhang: {
          select: {
            id: true,
            name: true,
            makh: true,
            diachi: true,
            sdt: true,
            email: true
          }
        }
      };

      const updatedBanggia = await this._GraphqlService.updateOne(
        'banggia', 
        { id: dulieu.id }, 
        updateData, 
        { include }
      );

      this.DetailBanggia.set(updatedBanggia);
      await this.getAllBanggia();
      
      return updatedBanggia;
    } catch (error) {
      console.error('Lỗi cập nhật bảng giá:', error);
      throw error;
    }
  }

  /**
   * Lấy tất cả bảng giá sử dụng GraphQL
   */
  async getAllBanggia() {
    try {
      const options = {
        where: {},
        orderBy: { order: 'asc' },
        include: {
          sanpham: {
            include: {
              sanpham: {
                select: {
                  id: true,
                  title: true,
                  masp: true,
                  dvt: true
                }
              }
            }
          },
          khachhang: {
            select: {
              id: true,
              name: true,
              makh: true
            }
          },
          _count: {
            select: {
              sanpham: true,
              khachhang: true
            }
          }
        }
      };

      const data = await this._GraphqlService.findMany('banggia', options);
      this.ListBanggia.set(data);
      return data;
    } catch (error) {
      console.error('Lỗi lấy danh sách bảng giá:', error);
      throw error;
    }
  }

  /**
   * Lấy bảng giá theo ID sử dụng GraphQL
   */
  async getBanggiaByid(id: any) {
    try {
      const options = {
        include: {
          sanpham: {
            include: {
              sanpham: {
                select: {
                  id: true,
                  title: true,
                  masp: true,
                  dvt: true,
                  giagoc: true
                }
              }
            },
            orderBy: { order: 'asc' },
            take: 99999
          },
          khachhang: {
            select: {
              id: true,
              name: true,
              makh: true,
              diachi: true,
              sdt: true,
              email: true,
              loaikh: true,
              isActive: true
            },
            take: 99999
          },
        }
      };

      const data = await this._GraphqlService.findUnique('banggia', { id }, options);
      const resutl = this.transformDetailBanggia(data);
      console.log(resutl);
      
      this.DetailBanggia.set(resutl);
      return data;
    } catch (error) {
      console.error('Lỗi lấy chi tiết bảng giá:', error);
      throw error;
    }
  }
  private transformDetailBanggia(item:any){
    console.log(item);
    
     const listSanpham = item.sanpham?.map((sanpham: any) => ({
        ...sanpham,
        giaban: Number(sanpham.giaban) || 0,
        title: sanpham.sanpham.title,
        masp: sanpham.sanpham.masp,
        dvt: sanpham.sanpham.dvt,
      })) || []
      return {...item, sanpham: listSanpham}  
  }
  /**
   * Xóa bảng giá sử dụng backend API với transaction
   * Backend sẽ tự động xóa các bản ghi liên quan
   */
  async DeleteBanggia(item: any) {    
    try {
      const response = await fetch(`${environment.APIURL}/banggia/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to delete banggia: ${response.statusText}`);
      }

      // Refresh danh sách
      await this.getAllBanggia();
    } catch (error) {
      console.error('Lỗi xóa bảng giá:', error);
      throw error;
    }
  }

  /**
   * Xóa nhiều bảng giá cùng lúc sử dụng backend bulk delete API
   * Backend sẽ xử lý trong transaction, nhanh và an toàn hơn
   * @param items Array of banggia items to delete
   * @returns Result object with success/fail counts
   */
  async DeleteBulkBanggia(items: any[]) {
    try {
      const ids = items.map(item => item.id);
      
      const response = await fetch(`${environment.APIURL}/banggia/bulk-delete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to bulk delete banggia: ${response.statusText}`);
      }

      const result = await response.json();

      // Refresh danh sách
      await this.getAllBanggia();

      return result;
    } catch (error) {
      console.error('Lỗi bulk delete bảng giá:', error);
      throw error;
    }
  }

  /**
   * Thêm khách hàng vào bảng giá sử dụng GraphQL
   */
  async addKHtoBG(dulieu: any) {
    try {
      const updateData = {
        khachhang: {
          connect: dulieu.khachhangIds.map((id: string) => ({ id }))
        }
      };

      await this._GraphqlService.updateOne('banggia', { id: dulieu.banggiaId }, updateData);
      await this.getBanggiaByid(dulieu.banggiaId);
    } catch (error) {
      console.error('Lỗi thêm khách hàng vào bảng giá:', error);
      throw error;
    }
  }

  /**
   * Xóa khách hàng khỏi bảng giá sử dụng GraphQL
   */
  async removeKHfromBG(dulieu: any) {
    try {
      const updateData = {
        khachhang: {
          disconnect: dulieu.khachhangIds.map((id: string) => ({ id }))
        }
      };

      await this._GraphqlService.updateOne('banggia', { id: dulieu.banggiaId }, updateData);
      await this.getBanggiaByid(dulieu.banggiaId);
    } catch (error) {
      console.error('Lỗi xóa khách hàng khỏi bảng giá:', error);
      throw error;
    }
  }

  /**
   * Lấy tất cả bảng giá sản phẩm sử dụng GraphQL
   */
  async getAllBGSP() {
    try {
      const options = {
        include: {
          banggia: {
            select: {
              id: true,
              title: true,
              mabanggia: true,
              status: true
            }
          },
          sanpham: {
            select: {
              id: true,
              title: true,
              masp: true,
              dvt: true
            }
          }
        },
        orderBy: { order: 'asc' }
      };

      return await this._GraphqlService.findMany('banggiasanpham', options);
    } catch (error) {
      console.error('Lỗi lấy bảng giá sản phẩm:', error);
      throw error;
    }
  }

  /**
   * Lấy tất cả khách hàng theo bảng giá sử dụng GraphQL
   */
  async getAllBGKH() {
    try {
      const options = {
        where: {
          banggiaId: { not: null }
        },
        include: {
          banggia: {
            select: {
              id: true,
              title: true,
              mabanggia: true,
              status: true
            }
          }
        },
        orderBy: { name: 'asc' }
      };

      return await this._GraphqlService.findMany('khachhang', options);
    } catch (error) {
      console.error('Lỗi lấy khách hàng theo bảng giá:', error);
      throw error;
    }
  }

  /**
   * Import bảng giá từ dữ liệu Excel - GraphQL version
   */
  async ImportBanggia(dulieu: any) {
    try {
      const batchSize = 10;
      const batches = [];
      
      for (let i = 0; i < dulieu.length; i += batchSize) {
        batches.push(dulieu.slice(i, i + batchSize));
      }

      for (const batch of batches) {
        const createPromises = batch.map((item: any) => 
          this._GraphqlService.createOne('banggia', {
            title: item.title,
            mabanggia: item.mabanggia || this.generateMaBanggia(),
            type: item.type || 'bansi',
            status: item.status || 'baogia',
            isActive: item.isActive !== false
          })
        );
        
        await Promise.all(createPromises);
      }
      
      await this.getAllBanggia();
    } catch (error) {
      console.error('Lỗi import bảng giá:', error);
      throw error;
    }
  }

  /**
   * Import sản phẩm vào bảng giá - GraphQL version
   */
  async importSPBG(dulieu: any) {
    try {
      const batchSize = 10;
      const batches = [];
      
      for (let i = 0; i < dulieu.length; i += batchSize) {
        batches.push(dulieu.slice(i, i + batchSize));
      }

      for (const batch of batches) {
        const createPromises = batch.map((item: any) => 
          this._GraphqlService.createOne('banggiasanpham', {
            banggiaId: item.banggiaId,
            sanphamId: item.sanphamId,
            giaban: Number(item.giaban) || 0,
            order: item.order || 1,
            isActive: item.isActive !== false
          })
        );
        
        await Promise.all(createPromises);
      }
      
      await this.getAllBanggia();
    } catch (error) {
      console.error('Lỗi import sản phẩm bảng giá:', error);
      throw error;
    }
  }

  /**
   * Import bảng giá khách hàng - GraphQL version
   */
  async importBGKH(dulieu: any) {
    try {
      const updatePromises = dulieu.map((item: any) => 
        this._GraphqlService.updateOne('khachhang', 
          { id: item.khachhangId }, 
          { banggiaId: item.banggiaId }
        )
      );
      
      await Promise.all(updatePromises);
      await this.getAllBanggia();
    } catch (error) {
      console.error('Lỗi import bảng giá khách hàng:', error);
      throw error;
    }
  }

  /**
   * Tạo mã bảng giá tự động
   */
  private generateMaBanggia(): string {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `BG${year}${month}${day}${random}`;
  }

  /**
   * Error handler
   */
  private handleError(status: number) {
    let message = 'Lỗi không xác định';
    switch (status) {
      case 401:
        message = 'Vui lòng đăng nhập lại';
        break;
      case 403:
        message = 'Bạn không có quyền truy cập';
        break;
      case 500:
        message = 'Lỗi máy chủ, vui lòng thử lại sau';
        break;
    }
    const result = JSON.stringify({ code: status, title: message });
    this.router.navigate(['/errorserver'], { queryParams: { data: result } });
  }
}
