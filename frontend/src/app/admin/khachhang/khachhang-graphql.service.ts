import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';
import { GraphqlService } from '../../shared/services/graphql.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorLogService } from '../../shared/services/errorlog.service';
import { SharedSocketService } from '../../shared/services/sharedsocket.service';

@Injectable({
  providedIn: 'root'
})
export class KhachhangGraphqlService {
  private _GraphqlService = inject(GraphqlService);
  private _StorageService = inject(StorageService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private _ErrorLogService = inject(ErrorLogService);
  private _sharedSocketService = inject(SharedSocketService);
  
  private socket: any;

  // Signals for reactive state management
  ListKhachhang = signal<any[]>([]);
  DetailKhachhang = signal<any>({});
  page = signal<number>(1);
  totalPages = signal<number>(1);
  total = signal<number>(0);
  pageSize = signal<number>(50);
  khachhangId = signal<string | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.socket = this._sharedSocketService.getSocket();
    this.listenKhachhangUpdates();
  }

  setKhachhangId(id: string | null) {
    this.khachhangId.set(id);
  }

  /**
   * Lấy toàn bộ danh sách khách hàng (không pagination)
   */
  async getAllKhachhang(searchParam: any = {}) {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Optimized select - chỉ lấy các field cần thiết cho list view
      const select = {
        id: true,
        makh: true,
        name: true,
        diachi: true,
        quan: true,
        email: true,
        sdt: true,
        mst: true,
        gionhanhang: true,
        loaikh: true,
        ghichu: true,
        isActive: true,
        createdAt: true,
        banggiaId: true,
        banggia: {
          select: {
            id: true,
            title: true,
            mabanggia: true
          }
        }
      };

      // Xây dựng where clause từ searchParam
      const where: any = { 
        isActive: true  // Chỉ lấy khách hàng active
      };

      if (searchParam.subtitle) {
        where.OR = [
          { name: { contains: searchParam.subtitle, mode: 'insensitive' } },
          { makh: { contains: searchParam.subtitle, mode: 'insensitive' } },
          { email: { contains: searchParam.subtitle, mode: 'insensitive' } },
          { sdt: { contains: searchParam.subtitle, mode: 'insensitive' } }
        ];
      }

      if (searchParam.loaikh) {
        where.loaikh = searchParam.loaikh;
      }

      if (searchParam.banggiaId) {
        where.banggiaId = searchParam.banggiaId;
      }

      // Ordering không pagination - lấy tất cả
      const orderBy = { createdAt: 'desc' };

      // Fetch tất cả data với GraphQL (không skip/take)
      const result = await this._GraphqlService.findMany('khachhang', {
        where,
        orderBy,
        select
      });

      const totalCount = result?.length || 0;
      
      // Update signals với toàn bộ data
      this.ListKhachhang.set(result || []);
      this.total.set(totalCount);
      this.totalPages.set(1); // Chỉ có 1 trang vì load tất cả
      this.page.set(1); // Reset về trang 1

      return result;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách khách hàng:', error);
      this.error.set('Không thể tải danh sách khách hàng');
      this._ErrorLogService.logError('getAllKhachhang', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Tìm kiếm khách hàng (không pagination)
   */
  async getKhachhangBy(searchParam: any) {
    try {
      // Không reset trang vì không có pagination
      return await this.getAllKhachhang(searchParam);
    } catch (error) {
      console.error('Lỗi tìm kiếm khách hàng:', error);
      throw error;
    }
  }

  /**
   * Lấy chi tiết khách hàng với đầy đủ thông tin liên quan
   */
  async getKhachhangById(id: string) {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Detailed select với tất cả relations cần thiết
      const include = {
        banggia: {
          select: {
            id: true,
            title: true,
            mabanggia: true,
            type: true,
            status: true
          }
        }
      };
      const khachhang = await this._GraphqlService.findUnique('khachhang', 
        { id },
        { include }
      );
      console.log(khachhang);

      if (khachhang) {
        this.DetailKhachhang.set(khachhang);
        this.setKhachhangId(id);
      }

      return khachhang;
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết khách hàng:', error);
      this.error.set('Không thể tải thông tin khách hàng');
      this._ErrorLogService.logError('getKhachhangById', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Tạo khách hàng mới với GraphQL
   */


  async createKhachhang(dulieu: any) {
    try {
      this.loading.set(true);
      this.error.set(null);

      const createData = {
        makh: dulieu.makh || await this.generateMaKhachHang(dulieu.loaikh),
        subtitle: dulieu.subtitle || '',
        tenfile: dulieu.tenfile || '',
        name: dulieu.name,
        diachi: dulieu.diachi || '',
        quan: dulieu.quan || '',
        email: dulieu.email || '',
        sdt: dulieu.sdt || '',
        mst: dulieu.mst || '',
        gionhanhang: dulieu.gionhanhang || '',
        loaikh: dulieu.loaikh || 'banle',
        ghichu: dulieu.ghichu || '',
        isActive: dulieu.isActive !== false,
        isshowvat: dulieu.isshowvat,
        hiengia: dulieu.hiengia,
        istitle2: dulieu.istitle2,
        banggiaId: dulieu.banggiaId || null
      };

      const include = {
        banggia: {
          select: {
            id: true,
            title: true,
            mabanggia: true
          }
        }
      };

      const newKhachhang = await this._GraphqlService.createOne('khachhang', createData, { include });
      
      this.khachhangId.set(newKhachhang.id);
      this.DetailKhachhang.set(newKhachhang);
      
      // Refresh list
      await this.getAllKhachhang();
      
      this._snackBar.open('Tạo khách hàng thành công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      return newKhachhang;
    } catch (error) {
      console.error('Lỗi tạo khách hàng:', error);
      this.error.set('Không thể tạo khách hàng');
      this._snackBar.open('Lỗi tạo khách hàng', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Cập nhật khách hàng với GraphQL
   */
  async updateKhachhang(id: string, dulieu: any) {
    try {
      this.loading.set(true);
      this.error.set(null);

      const updateData = {
        name: dulieu.name,
        subtitle: dulieu.subtitle,
        tenfile: dulieu.tenfile,
        diachi: dulieu.diachi,
        quan: dulieu.quan,
        email: dulieu.email,
        sdt: dulieu.sdt,
        mst: dulieu.mst,
        gionhanhang: dulieu.gionhanhang,
        loaikh: dulieu.loaikh,
        ghichu: dulieu.ghichu,
        isActive: dulieu.isActive,
        isshowvat: dulieu.isshowvat,
        hiengia: dulieu.hiengia,
        istitle2: dulieu.istitle2,
        banggiaId: dulieu.banggiaId
      };

      const include = {
        banggia: {
          select: {
            id: true,
            title: true,
            mabanggia: true
          }
        }
      };

      const updatedKhachhang = await this._GraphqlService.updateOne('khachhang', 
        { id },
        updateData,
        { include }
      );

      this.DetailKhachhang.set(updatedKhachhang);
      
      // Refresh list
      await this.getAllKhachhang();
      
      this._snackBar.open('Cập nhật khách hàng thành công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      return updatedKhachhang;
    } catch (error) {
      console.error('Lỗi cập nhật khách hàng:', error);
      this.error.set('Không thể cập nhật khách hàng');
      this._snackBar.open('Lỗi cập nhật khách hàng', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Xóa khách hàng với GraphQL
   */
  async deleteKhachhang(id: string) {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Soft delete by setting isActive = false
      const deletedKhachhang = await this._GraphqlService.updateOne('khachhang', 
        { id }, 
        { isActive: false }
      );

      // Refresh list
      await this.getAllKhachhang();
      
      this._snackBar.open('Xóa khách hàng thành công', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      return deletedKhachhang;
    } catch (error) {
      console.error('Lỗi xóa khách hàng:', error);
      this.error.set('Không thể xóa khách hàng');
      this._snackBar.open('Lỗi xóa khách hàng', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Import khách hàng với batch operation và xử lý trùng lặp mã
   */
  async importKhachhang(dulieu: any[]) {
    try {
      this.loading.set(true);
      this.error.set(null);

      // Add index to each customer for mapping codes back
      const customersWithIndex = dulieu.map((item, index) => ({ ...item, index }));
      
      // Filter customers that need code generation
      const customersNeedingCodes = customersWithIndex.filter(item => !item.makh);
      const customersWithCodes = customersWithIndex.filter(item => item.makh);

      let generatedCodeMap: { [key: string]: string } = {};

      // Generate codes for customers that need them
      if (customersNeedingCodes.length > 0) {
        console.log(`Generating codes for ${customersNeedingCodes.length} customers...`);
        generatedCodeMap = await this.generateBatchMaKhachHang(customersNeedingCodes);
      }

      // Prepare data for batch create
      const batchData = customersWithIndex.map((item) => ({
        makh: item.makh || generatedCodeMap[item.index] || `FALLBACK-${item.index}-${Date.now()}`,
        name: item.name,
        diachi: item.diachi || '',
        quan: item.quan || '',
        email: item.email || '',
        sdt: item.sdt || '',
        mst: item.mst || '',
        gionhanhang: item.gionhanhang || '',
        loaikh: item.loaikh || 'banle',
        ghichu: item.ghichu || '',
        isActive: item.isActive !== false,
        banggiaId: item.banggiaId || null
      }));

      console.log(`Creating ${batchData.length} customers...`);
      const result = await this._GraphqlService.batchCreate('khachhang', batchData);
      
      // Refresh list
      await this.getAllKhachhang();
      
      this._snackBar.open(`Import thành công ${result.length} khách hàng`, '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      return result;
    } catch (error) {
      console.error('Lỗi import khách hàng:', error);
      this.error.set('Không thể import khách hàng');
      this._snackBar.open('Lỗi import khách hàng', '', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Thay đổi trang (không cần thiết vì đã bỏ pagination)
   * Giữ lại để tương thích với code cũ
   */
  async changePage(newPage: number, pageSize?: number) {
    // Không làm gì vì đã load tất cả data
    console.log('Pagination disabled - all data loaded');
    return this.ListKhachhang();
  }

  /**
   * Socket listener cho real-time updates
   */
  private listenKhachhangUpdates() {
    if (this.socket) {
      this.socket.on('khachhang:created', (data: any) => {
        const current = this.ListKhachhang();
        this.ListKhachhang.set([data, ...current]);
        this.total.set(this.total() + 1);
      });

      this.socket.on('khachhang:updated', (data: any) => {
        const current = this.ListKhachhang();
        const index = current.findIndex(item => item.id === data.id);
        if (index !== -1) {
          current[index] = data;
          this.ListKhachhang.set([...current]);
        }
        
        // Update detail if it's the same record
        if (this.khachhangId() === data.id) {
          this.DetailKhachhang.set(data);
        }
      });

      this.socket.on('khachhang:deleted', (data: any) => {
        const current = this.ListKhachhang();
        const filtered = current.filter(item => item.id !== data.id);
        this.ListKhachhang.set(filtered);
        this.total.set(this.total() - 1);
      });
    }
  }

  /**
   * Generate mã khách hàng tự động theo logic backend với xử lý trùng lặp
   */
  async generateMaKhachHang(loaikh: string = 'khachle', maxRetries: number = 10): Promise<string> {
    const prefix = loaikh === 'khachsi' ? 'TG-KS' : 'TG-KL';
    let attempts = 0;

    while (attempts < maxRetries) {
      try {
        // Tìm mã khách hàng cuối cùng với prefix tương ứng
        const latestRecords = await this._GraphqlService.findMany('khachhang', {
          where: { 
            makh: { 
              startsWith: prefix 
            } 
          },
          orderBy: { makh: 'desc' },
          select: { makh: true },
          take: 1
        });

        let nextNumber = 1;
        if (latestRecords && latestRecords.length > 0 && latestRecords[0].makh) {
          const lastNumber = parseInt(latestRecords[0].makh.slice(prefix.length), 10);
          if (!isNaN(lastNumber)) {
            nextNumber = lastNumber + 1;
          }
        }

        // Thêm offset để tránh trùng lặp trong trường hợp tạo đồng thời
        nextNumber += attempts;
        const newMakh = `${prefix}${nextNumber.toString().padStart(5, '0')}`;

        // Kiểm tra xem mã đã tồn tại chưa
        const existingCustomer = await this._GraphqlService.findMany('khachhang', {
          where: { makh: newMakh },
          select: { id: true },
          take: 1
        });

        // Nếu không có trùng lặp, trả về mã này
        if (!existingCustomer || existingCustomer.length === 0) {
          console.log(`Generated unique customer code: ${newMakh} (attempt ${attempts + 1})`);
          return newMakh;
        }

        console.warn(`Customer code ${newMakh} already exists, retrying... (attempt ${attempts + 1})`);
        attempts++;

      } catch (error) {
        console.error(`Error generating customer code (attempt ${attempts + 1}):`, error);
        attempts++;
        
        // Nếu là lần thử cuối cùng, sử dụng fallback
        if (attempts >= maxRetries) {
          break;
        }
        
        // Đợi một chút trước khi thử lại
        await new Promise(resolve => setTimeout(resolve, 100 * attempts));
      }
    }

    // Fallback: Sử dụng timestamp và random để đảm bảo tính duy nhất
    console.warn('Max retries reached, using fallback generation method');
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 3);
    const fallbackCode = `${prefix}${timestamp}${random}`.toUpperCase();
    
    // Kiểm tra fallback code có trùng không (chỉ check 1 lần)
    try {
      const existingFallback = await this._GraphqlService.findMany('khachhang', {
        where: { makh: fallbackCode },
        select: { id: true },
        take: 1
      });
      
      if (existingFallback && existingFallback.length > 0) {
        // Nếu vẫn trùng, thêm timestamp hiện tại vào cuối
        const uniqueCode = `${prefix}${timestamp}${random}${Date.now().toString(36).slice(-2)}`.toUpperCase();
        console.warn(`Fallback code collision, using: ${uniqueCode}`);
        return uniqueCode;
      }
      
      return fallbackCode;
    } catch (error) {
      // Nếu không thể check, trả về fallback code với timestamp bổ sung
      const uniqueCode = `${prefix}${timestamp}${random}${Date.now().toString(36).slice(-2)}`.toUpperCase();
      console.error('Error checking fallback code, using ultimate fallback:', uniqueCode);
      return uniqueCode;
    }
  }

  /**
   * Batch generate unique customer codes for import operations
   */
  async generateBatchMaKhachHang(customers: any[]): Promise<{ [key: string]: string }> {
    const codeMap: { [key: string]: string } = {};
    const generatedCodes = new Set<string>();
    
    try {
      // Group customers by type
      const khachsiCustomers = customers.filter(c => c.loaikh === 'khachsi');
      const khachleCustomers = customers.filter(c => c.loaikh !== 'khachsi');
      
      // Get current max numbers for both prefixes
      const [ksRecords, klRecords] = await Promise.all([
        this._GraphqlService.findMany('khachhang', {
          where: { makh: { startsWith: 'TG-KS' } },
          orderBy: { makh: 'desc' },
          select: { makh: true },
          take: 1
        }),
        this._GraphqlService.findMany('khachhang', {
          where: { makh: { startsWith: 'TG-KL' } },
          orderBy: { makh: 'desc' },
          select: { makh: true },
          take: 1
        })
      ]);

      let ksNextNumber = 1;
      let klNextNumber = 1;

      if (ksRecords?.[0]?.makh) {
        const lastKsNumber = parseInt(ksRecords[0].makh.slice(5), 10);
        ksNextNumber = isNaN(lastKsNumber) ? 1 : lastKsNumber + 1;
      }

      if (klRecords?.[0]?.makh) {
        const lastKlNumber = parseInt(klRecords[0].makh.slice(5), 10);
        klNextNumber = isNaN(lastKlNumber) ? 1 : lastKlNumber + 1;
      }

      // Generate sequential codes for each group
      for (let i = 0; i < khachsiCustomers.length; i++) {
        const customer = khachsiCustomers[i];
        let attempts = 0;
        let code: string;
        
        do {
          code = `TG-KS${(ksNextNumber + i + attempts).toString().padStart(5, '0')}`;
          attempts++;
        } while (generatedCodes.has(code) && attempts < 100);
        
        generatedCodes.add(code);
        codeMap[customer.index || i] = code;
      }

      for (let i = 0; i < khachleCustomers.length; i++) {
        const customer = khachleCustomers[i];
        let attempts = 0;
        let code: string;
        
        do {
          code = `TG-KL${(klNextNumber + i + attempts).toString().padStart(5, '0')}`;
          attempts++;
        } while (generatedCodes.has(code) && attempts < 100);
        
        generatedCodes.add(code);
        codeMap[customer.index || (i + khachsiCustomers.length)] = code;
      }

      console.log(`Generated ${Object.keys(codeMap).length} unique customer codes for batch import`);
      return codeMap;
      
    } catch (error) {
      console.error('Error in batch code generation, falling back to individual generation:', error);
      
      // Fallback: Generate codes individually
      for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];
        try {
          const code = await this.generateMaKhachHang(customer.loaikh);
          codeMap[customer.index || i] = code;
        } catch (err) {
          console.error(`Failed to generate code for customer ${i}:`, err);
          // Use timestamp-based fallback
          const timestamp = Date.now().toString(36);
          const random = Math.random().toString(36).substr(2, 3);
          const prefix = customer.loaikh === 'khachsi' ? 'TG-KS' : 'TG-KL';
          codeMap[customer.index || i] = `${prefix}${timestamp}${random}${i}`.toUpperCase();
        }
      }
      
      return codeMap;
    }
  }


  /**
   * Lấy các mã đã được cập nhật (legacy support)
   */
  async getUpdatedCodeIds() {
    try {
      const result = await this._GraphqlService.findMany('khachhang', {
        where: { isActive: true },
        select: { id: true, makh: true },
        orderBy: { updatedAt: 'desc' },
        take: 100
      });
      return result;
    } catch (error) {
      console.error('Lỗi lấy updated code IDs:', error);
      return [];
    }
  }

  /**
   * Clear cache và reset state
   */
  clearCache() {
    this.ListKhachhang.set([]);
    this.DetailKhachhang.set({});
    this.khachhangId.set(null);
    this.error.set(null);
    this.page.set(1);
  }
}
