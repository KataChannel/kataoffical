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
  private isLoading = signal(false);
  private currentLoadId: string | null = null;
  private lastSetId: string | null = null; // Track last set ID to prevent duplicate sets
  
  setBanggiaId(id: string | null) {
    // Chỉ set nếu ID thay đổi - tránh trigger effect không cần thiết
    if (this.lastSetId !== id) {
      console.log('[SERVICE] setBanggiaId from', this.lastSetId, 'to', id);
      this.lastSetId = id;
      this.banggiaId.set(id);
    } else {
      console.log('[SERVICE] setBanggiaId called with same ID, skipping:', id);
    }
  }

  /**
   * Kiểm tra xem mabanggia + batdau + ketthuc đã tồn tại chưa
   */
  async checkBanggiaExists(mabanggia: string, batdau: Date, ketthuc: Date, excludeId?: string): Promise<boolean> {
    try {
      const where: any = {
        AND: [
          { mabanggia: { equals: mabanggia } },
          { batdau: { equals: batdau.toISOString() } },
          { ketthuc: { equals: ketthuc.toISOString() } }
        ]
      };

      // Nếu đang update, loại trừ bảng giá hiện tại
      if (excludeId) {
        where.AND.push({ id: { not: excludeId } });
      }

      const existing = await this._GraphqlService.findMany('banggia', {
        where,
        take: 1
      });

      return existing && existing.length > 0;
    } catch (error) {
      console.error('[VALIDATE] Error checking banggia exists:', error);
      return false;
    }
  }

  /**
   * Tạo bảng giá mới với sản phẩm và khách hàng sử dụng GraphQL
   */
  async CreateBanggia(dulieu: any) {
    try {
      // Chuẩn bị data
      const mabanggia = dulieu.mabanggia || this.generateMaBanggia();
      const batdau = dulieu.batdau ? new Date(dulieu.batdau) : new Date();
      const ketthuc = dulieu.ketthuc ? new Date(dulieu.ketthuc) : new Date(Date.now() + 30*24*60*60*1000);

      // ✅ Kiểm tra unique constraint
      const exists = await this.checkBanggiaExists(mabanggia, batdau, ketthuc);
      if (exists) {
        throw new Error(`Bảng giá với mã "${mabanggia}" và khoảng thời gian từ ${batdau.toLocaleDateString()} đến ${ketthuc.toLocaleDateString()} đã tồn tại!`);
      }

      // Chuẩn bị data cho GraphQL mutation
      const createData = {
        title: dulieu.title,
        mabanggia: mabanggia,
        type: dulieu.type || 'bansi',
        batdau: batdau.toISOString(),
        ketthuc: ketthuc.toISOString(),
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
      console.log('[UPDATE-BG] ========== START UPDATE ==========');
      console.log('[UPDATE-BG] Input dulieu:', JSON.stringify(dulieu, null, 2));
      
      // ✅ Kiểm tra unique constraint nếu có thay đổi mabanggia/batdau/ketthuc
      if (dulieu.mabanggia && dulieu.batdau && dulieu.ketthuc) {
        const batdau = new Date(dulieu.batdau);
        const ketthuc = new Date(dulieu.ketthuc);
        const exists = await this.checkBanggiaExists(dulieu.mabanggia, batdau, ketthuc, dulieu.id);
        if (exists) {
          throw new Error(`Bảng giá với mã "${dulieu.mabanggia}" và khoảng thời gian từ ${batdau.toLocaleDateString()} đến ${ketthuc.toLocaleDateString()} đã tồn tại!`);
        }
      }

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
        // Cập nhật khách hàng - hỗ trợ cả array và Prisma relation structure
        khachhang: dulieu.khachhang ? (() => {
          console.log('[UPDATE-BG] Processing khachhang:', dulieu.khachhang);
          
          // ✅ Nếu là array, chuyển thành Prisma set structure
          if (Array.isArray(dulieu.khachhang)) {
            const result = {
              set: dulieu.khachhang.map((kh: any) => ({ id: kh.id || kh }))
            };
            console.log('[UPDATE-BG] khachhang is array, converted to set:', result);
            return result;
          }
          
          // ✅ Nếu đã là Prisma structure (có disconnect/connect), dùng trực tiếp
          if (dulieu.khachhang.disconnect !== undefined || dulieu.khachhang.connect !== undefined) {
            const result = {
              disconnect: dulieu.khachhang.disconnect || [],
              connect: dulieu.khachhang.connect || []
            };
            console.log('[UPDATE-BG] khachhang is Prisma structure:', result);
            console.log('[UPDATE-BG] Disconnect count:', result.disconnect.length);
            console.log('[UPDATE-BG] Connect count:', result.connect.length);
            return result;
          }
          
          // ✅ Fallback: treat as set
          const result = {
            set: [{ id: dulieu.khachhang.id || dulieu.khachhang }]
          };
          console.log('[UPDATE-BG] khachhang fallback to set:', result);
          return result;
        })() : undefined
      };

      console.log('[UPDATE-BG] updateData before cleanup:', JSON.stringify(updateData, null, 2));

      // Loại bỏ các field undefined
      Object.keys(updateData).forEach(key => {
        if ((updateData as any)[key] === undefined) {
          delete (updateData as any)[key];
        }
      });

      console.log('[UPDATE-BG] updateData after cleanup:', JSON.stringify(updateData, null, 2));

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

      console.log('[UPDATE-BG] Calling GraphQL updateOne with ID:', dulieu.id);
      const updatedBanggia = await this._GraphqlService.updateOne(
        'banggia', 
        { id: dulieu.id }, 
        updateData, 
        { include }
      );

      console.log('[UPDATE-BG] GraphQL response khachhang count:', updatedBanggia?.khachhang?.length || 0);
      console.log('[UPDATE-BG] GraphQL response khachhang:', updatedBanggia?.khachhang);

      // ✅ CRITICAL: Invalidate Redis cache for banggia
      console.log('[UPDATE-BG] Invalidating cache for banggia...');
      try {
        // Gọi API backend để clear Redis cache
        const response = await fetch(`${environment.APIURL}/cache/invalidate/banggia`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          console.log('[UPDATE-BG] ✅ Cache invalidated successfully');
        } else {
          console.warn('[UPDATE-BG] ⚠️ Cache invalidation returned:', response.status);
        }
      } catch (cacheError) {
        console.warn('[UPDATE-BG] ⚠️ Cache invalidation error:', cacheError);
        // Không throw error, chỉ warn - update vẫn thành công
      }

      this.DetailBanggia.set(updatedBanggia);
      await this.getAllBanggia();
      
      console.log('[UPDATE-BG] ========== END UPDATE SUCCESS ==========');
      return updatedBanggia;
    } catch (error) {
      console.error('[UPDATE-BG] ========== END UPDATE FAILED ==========');
      console.error('[UPDATE-BG] Lỗi cập nhật bảng giá:', error);
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
    console.log(`[SERVICE] getBanggiaByid called with ID: ${id}`);
    console.log(`[SERVICE] Current state - isLoading: ${this.isLoading()}, currentLoadId: ${this.currentLoadId}`);
    
    // Prevent concurrent loads of DIFFERENT IDs
    if (this.isLoading() && this.currentLoadId !== id) {
      console.log(`[SERVICE] Skipping load for ${id}, already loading ${this.currentLoadId}`);
      return;
    }
    
    // If currently loading the SAME ID, wait for it
    if (this.isLoading() && this.currentLoadId === id) {
      console.log(`[SERVICE] Already loading ${id}, skipping duplicate call`);
      return;
    }
    
    // Set loading state BEFORE API call
    console.log(`[SERVICE] Setting loading state to true for ${id}`);
    this.isLoading.set(true);
    this.currentLoadId = id;
    
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

      console.log(`[SERVICE] Fetching banggia data from API for ${id}...`);
      const data = await this._GraphqlService.findUnique('banggia', { id }, options);
      console.log(`[SERVICE] API returned data for ${id}`);
      
      // Only update if this is still the current requested ID
      if (this.currentLoadId === id) {
        console.log('[SERVICE] Transforming data...');
        const result = this.transformDetailBanggia(data);
        
        console.log('[SERVICE] Updating DetailBanggia signal...');
        this.DetailBanggia.set(result);
        console.log(`[SERVICE] DetailBanggia updated for ${id}`);
      } else {
        console.log(`[SERVICE] Load completed for ${id}, but current ID is now ${this.currentLoadId}. Skipping update.`);
      }
      
      return data;
    } catch (error) {
      console.error('[SERVICE] Error fetching banggia:', error);
      throw error;
    } finally {
      console.log(`[SERVICE] Resetting isLoading to false for ${id}`);
      this.isLoading.set(false);
      // Don't reset currentLoadId here to allow comparison
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
