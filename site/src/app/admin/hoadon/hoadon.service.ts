import { inject, Inject, Injectable, signal, Signal } from '@angular/core';
  import { Router } from '@angular/router';
  import { environment } from '../../../environments/environment.development';
  import { StorageService } from '../../shared/utils/storage.service';
  import { io } from 'socket.io-client';
  import { openDB } from 'idb';
  import { ErrorLogService } from '../../shared/services/errorlog.service';
  import { MatSnackBar } from '@angular/material/snack-bar';
  @Injectable({
    providedIn: 'root'
  })
  export class HoadonService {
    constructor(
      private _StorageService: StorageService,
      private router: Router,
      private _ErrorLogService: ErrorLogService,
    ) { }
    private _snackBar:MatSnackBar = inject(MatSnackBar);
    ListHoadon = signal<any[]>([]);
    DetailHoadon = signal<any>({});
    hoadonId = signal<string | null>(null);
    setHoadonId(id: string | null) {
      this.hoadonId.set(id);
    }
      private socket = io(`${environment.APIURL}`,{
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 5000,
    });
    async fetchData(dulieu: any) {      
      const API_URL = `https://hoadondientu.gdt.gov.vn:30000/query/invoices/${dulieu.type=='banra'?'sold':'purchase'}?sort=tdlap:desc,khmshdon:asc,shdon:desc&size=50${dulieu.state ? `&state=${dulieu.state}` : ''}&search=tdlap=ge=${dulieu.batdau};tdlap=le=${dulieu.ketthuc}`;
      try {
        const options = {
            headers: {
              "Authorization": `Bearer ${dulieu.token}`
            },
          };
          const response = await fetch(API_URL, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
            const data = await response.json();
            console.log(data);
            if (data.datas.length > 0) {
            // Thêm delay giữa các lần gọi CreateHoadon để tránh timeout và ghi nhiều vào database cùng lúc
            for (const item of data.datas) {
              // const { nbttkhac, nmttkhac, thttltsuat, ttkhac, ttttkhac, cqtcks, ...rest } = item;


                // Chuyển đổi item sang đúng kiểu dữ liệu và chỉ lấy các trường cần thiết
                const rest = {  
                id: item.id,
                nbmst: String(item.nbmst),
                khmshdon: item.khmshdon != null ? Number(item.khmshdon) : undefined,
                khhdon: item.khhdon ?? undefined,
                shdon: item.shdon != null ? Number(item.shdon) : undefined,
                cqt: item.cqt ?? undefined,
                cttkhac: item.cttkhac ?? undefined,
                dvtte: item.dvtte ?? undefined,
                hdon: item.hdon ?? undefined,
                hsgcma: item.hsgcma ?? undefined,
                hsgoc: item.hsgoc ?? undefined,
                hthdon: item.hthdon != null ? Number(item.hthdon) : undefined,
                htttoan: item.htttoan != null ? Number(item.htttoan) : undefined,
                idtbao: item.idtbao ?? undefined,
                khdon: item.khdon ?? undefined,
                khhdgoc: item.khhdgoc ?? undefined,
                khmshdgoc: item.khmshdgoc ?? undefined,
                lhdgoc: item.lhdgoc ?? undefined,
                mhdon: item.mhdon ?? undefined,
                mtdiep: item.mtdiep ?? undefined,
                mtdtchieu: item.mtdtchieu ?? undefined,
                nbdchi: item.nbdchi ?? undefined,
                nbhdktngay: item.nbhdktngay ? new Date(item.nbhdktngay) : undefined,
                nbhdktso: item.nbhdktso ?? undefined,
                nbhdso: item.nbhdso ?? undefined,
                nblddnbo: item.nblddnbo ?? undefined,
                nbptvchuyen: item.nbptvchuyen ?? undefined,
                nbstkhoan: item.nbstkhoan ?? undefined,
                nbten: item.nbten ?? undefined,
                nbtnhang: item.nbtnhang ?? undefined,
                nbtnvchuyen: item.nbtnvchuyen ?? undefined,
                ncma: item.ncma ? new Date(item.ncma) : undefined,
                ncnhat: item.ncnhat ? new Date(item.ncnhat) : undefined,
                ngcnhat: item.ngcnhat ?? undefined,
                nky: item.nky ? new Date(item.nky) : undefined,
                nmdchi: item.nmdchi ?? undefined,
                nmmst: item.nmmst ?? undefined,
                nmstkhoan: item.nmstkhoan ?? undefined,
                nmten: item.nmten ?? undefined,
                nmtnhang: item.nmtnhang ?? undefined,
                nmtnmua: item.nmtnmua ?? undefined,
                ntao: item.ntao ? new Date(item.ntao) : undefined,
                ntnhan: item.ntnhan ? new Date(item.ntnhan) : undefined,
                pban: item.pban ?? undefined,
                ptgui: item.ptgui != null ? Number(item.ptgui) : undefined,
                shdgoc: item.shdgoc ?? undefined,
                tchat: item.tchat != null ? Number(item.tchat) : undefined,
                tdlap: item.tdlap ? new Date(item.tdlap) : undefined,
                tgia: item.tgia != null ? Number(item.tgia) : undefined,
                tgtcthue: item.tgtcthue != null ? Number(item.tgtcthue) : undefined,
                tgtthue: item.tgtthue != null ? Number(item.tgtthue) : undefined,
                tgtttbchu: item.tgtttbchu ?? undefined,
                tgtttbso: item.tgtttbso != null ? Number(item.tgtttbso) : undefined,
                thdon: item.thdon ?? undefined,
                thlap: item.thlap != null ? Number(item.thlap) : undefined,
                thttlphi: item.thttlphi ?? undefined,
                tlhdon: item.tlhdon ?? undefined,
                ttcktmai: item.ttcktmai != null ? Number(item.ttcktmai) : undefined,
                tthai: item.tthai != null ? Number(item.tthai) : undefined,
                tttbao: item.tttbao != null ? Number(item.tttbao) : undefined,
                ttxly: item.ttxly != null ? Number(item.ttxly) : undefined,
                tvandnkntt: item.tvandnkntt ?? undefined,
                mhso: item.mhso ?? undefined,
                ladhddt: item.ladhddt != null ? Number(item.ladhddt) : undefined,
                mkhang: item.mkhang ?? undefined,
                nbsdthoai: item.nbsdthoai ?? undefined,
                nbdctdtu: item.nbdctdtu ?? undefined,
                nbfax: item.nbfax ?? undefined,
                nbwebsite: item.nbwebsite ?? undefined,
                nbcks: item.nbcks ?? undefined,
                nmsdthoai: item.nmsdthoai ?? undefined,
                nmdctdtu: item.nmdctdtu ?? undefined,
                nmcmnd: item.nmcmnd ?? undefined,
                nmcks: item.nmcks ?? undefined,
                bhphap: item.bhphap != null ? Number(item.bhphap) : undefined,
                hddunlap: item.hddunlap ?? undefined,
                gchdgoc: item.gchdgoc ?? undefined,
                tbhgtngay: item.tbhgtngay ? new Date(item.tbhgtngay) : undefined,
                bhpldo: item.bhpldo ?? undefined,
                bhpcbo: item.bhpcbo ?? undefined,
                bhpngay: item.bhpngay ? new Date(item.bhpngay) : undefined,
                tdlhdgoc: item.tdlhdgoc ?? undefined,
                tgtphi: item.tgtphi != null ? Number(item.tgtphi) : undefined,
                unhiem: item.unhiem ?? undefined,
                mstdvnunlhdon: item.mstdvnunlhdon ?? undefined,
                tdvnunlhdon: item.tdvnunlhdon ?? undefined,
                nbmdvqhnsach: item.nbmdvqhnsach ?? undefined,
                nbsqdinh: item.nbsqdinh ?? undefined,
                nbncqdinh: item.nbncqdinh ?? undefined,
                nbcqcqdinh: item.nbcqcqdinh ?? undefined,
                nbhtban: item.nbhtban ?? undefined,
                nmmdvqhnsach: item.nmmdvqhnsach ?? undefined,
                nmddvchden: item.nmddvchden ?? undefined,
                nmtgvchdtu: item.nmtgvchdtu ?? undefined,
                nmtgvchdden: item.nmtgvchdden ?? undefined,
                nbtnban: item.nbtnban ?? undefined,
                dcdvnunlhdon: item.dcdvnunlhdon ?? undefined,
                dksbke: item.dksbke ?? undefined,
                dknlbke: item.dknlbke ?? undefined,
                thtttoan: item.thtttoan ?? undefined,
                msttcgp: item.msttcgp ?? undefined,
                gchu: item.gchu ?? undefined,
                kqcht: item.kqcht ?? undefined,
                hdntgia: item.hdntgia ?? undefined,
                tgtkcthue: item.tgtkcthue ?? undefined,
                tgtkhac: item.tgtkhac != null ? Number(item.tgtkhac) : undefined,
                nmshchieu: item.nmshchieu ?? undefined,
                nmnchchieu: item.nmnchchieu ?? undefined,
                nmnhhhchieu: item.nmnhhhchieu ?? undefined,
                nmqtich: item.nmqtich ?? undefined,
                ktkhthue: item.ktkhthue ?? undefined,
                hdhhdvu: item.hdhhdvu ?? undefined,
                qrcode: item.qrcode ?? undefined,
                ttmstten: item.ttmstten ?? undefined,
                ladhddtten: item.ladhddtten ?? undefined,
                hdxkhau: item.hdxkhau ?? undefined,
                hdxkptquan: item.hdxkptquan ?? undefined,
                hdgktkhthue: item.hdgktkhthue ?? undefined,
                hdonLquans: item.hdonLquans ?? undefined,
                tthdclquan: item.tthdclquan != null ? Boolean(item.tthdclquan) : undefined,
                pdndungs: item.pdndungs ?? undefined,
                hdtbssrses: item.hdtbssrses ?? undefined,
                hdTrung: item.hdTrung ?? undefined,
                isHDTrung: item.isHDTrung != null ? Boolean(item.isHDTrung) : undefined,
                };

                await this.CreateHoadon(rest);
                await new Promise(resolve => setTimeout(resolve, 300)); // delay 300ms giữa các lần gọi





             }
            }
            return data;

      } catch (error) {
          this._ErrorLogService.logError('Failed to CreateHoadon', error);
          return console.error(error);
      }
    }
    async CreateHoadon(dulieu: any) {
      try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/hoadon`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          // this.getAllHoadon()
          // this.hoadonId.set(data.id)
      } catch (error) {
          this._ErrorLogService.logError('Failed to CreateHoadon', error);
          return console.error(error);
      }
    }
  
    async getAllHoadon() {
      const db = await this.initDB();
      const cachedData = await db.getAll('hoadons');
      const updatedAtCache = this._StorageService.getItem('hoadons_updatedAt') || '0';
      // Nếu có cache và dữ liệu chưa hết hạn, trả về ngay
      if (cachedData.length > 0 && Date.now() - new Date(updatedAtCache).getTime() < 5 * 60 * 1000) { // 5 phút cache TTL
        this.ListHoadon.set(cachedData);
        return cachedData;
      }
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
        };
        const lastUpdatedResponse = await fetch(`${environment.APIURL}/hoadon/lastupdated`, options);
        if (!lastUpdatedResponse.ok) {
          this.handleError(lastUpdatedResponse.status);
          return cachedData;
        }    
        const { updatedAt: updatedAtServer } = await lastUpdatedResponse.json();
        //Nếu cache vẫn mới, không cần tải lại dữ liệu
        if (updatedAtServer <= updatedAtCache) {
          this.ListHoadon.set(cachedData);
          return cachedData;
        }
        console.log(updatedAtServer, updatedAtCache); 
        //Nếu cache cũ, tải lại toàn bộ dữ liệu từ server
        const response = await fetch(`${environment.APIURL}/hoadon`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return cachedData;
        }
        const data = await response.json();
        await this.saveHoadons(data.data);
        this._StorageService.setItem('hoadons_updatedAt', updatedAtServer);
        this.ListHoadon.set(data);
        return data;
      } catch (error) {
        this._ErrorLogService.logError('Failed to create getAllHoadon', error);
        console.error(error);
        return cachedData;
      }
    }
  
  
    //Lắng nghe cập nhật từ WebSocket
    listenHoadonUpdates() {
      this.socket.on('hoadon-updated', async () => {
        console.log('🔄 Dữ liệu sản phẩm thay đổi, cập nhật lại cache...');
        this._StorageService.removeItem('hoadons_updatedAt');
        await this.getAllHoadon();
      });
    }
    //Khởi tạo IndexedDB
    private async initDB() {
      return await openDB('HoadonDB', 1, {
        upgrade(db) {
          db.createObjectStore('hoadons', { keyPath: 'id' });
        },
      });
    }
    // Lưu vào IndexedDB
    private async saveHoadons(data: any[]) {
      const db = await this.initDB();
      const tx = db.transaction('hoadons', 'readwrite');
      const store = tx.objectStore('hoadons');
      await store.clear(); // Xóa dữ liệu cũ
      data.forEach(item => store.put(item));
      await tx.done;
    }
  
    async getHoadonBy(param: any) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._StorageService.getItem('token')}`
          },
          body: JSON.stringify(param),
        };
        const response = await fetch(`${environment.APIURL}/hoadon/findby`, options);      
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = await response.json();      
        this.DetailHoadon.set(data)
      } catch (error) {
        this._ErrorLogService.logError('Failed to getHoadonBy', error);
        return console.error(error);
      }
    }
    async updateHoadon(dulieu: any) {
      try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dulieu),
          };
          const response = await fetch(`${environment.APIURL}/hoadon/${dulieu.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
          this.getAllHoadon()
          this.getHoadonBy({id:data.id})
      } catch (error) {
        this._ErrorLogService.logError('Failed to updateHoadon', error);
          return console.error(error);
      }
    }
    async DeleteHoadon(item:any) {    
      try {
          const options = {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const response = await fetch(`${environment.APIURL}/hoadon/${item.id}`, options);
            if (!response.ok) {
              this.handleError(response.status);
            }
            this.getAllHoadon()
        } catch (error) {
          this._ErrorLogService.logError('Failed to DeleteHoadon', error);
            return console.error(error);
        }
    }
    private handleError(status: number) {
      let message = 'Lỗi không xác định';
      switch (status) {
        case 400:
          message = 'Thông tin đã tồn tại';
          this._snackBar.open(message, '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error'],
          });
          break;
        case 404:
          message = 'Vui lòng đăng nhập lại';
          //this._StorageService.removeItem('token');
          //this._StorageService.removeItem('permissions');
          //this.router.navigate(['/login']);
          break;
        case 401:
          message = 'Vui lòng đăng nhập lại';
          //this._StorageService.removeItem('token');
          //this._StorageService.removeItem('permissions');
          //this.router.navigate(['/login']);
          break;
        case 403:
          message = 'Bạn không có quyền truy cập';
          this._snackBar.open(message, '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error'],
          });
          break;
        case 500:
          message = 'Lỗi máy chủ, vui lòng thử lại sau';
            this._snackBar.open(message, '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error'],
          });
          break;
        default:
          this._snackBar.open(message, '', {
            duration: 1000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['snackbar-error'],
          });
          break;
      }
      const result = JSON.stringify({ code: status, title: message });
      // this.router.navigate(['/errorserver'], { queryParams: { data: result } });
    }
  }