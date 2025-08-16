import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import e from 'express';
@Component({
  selector: 'app-tablenhucaudathanh',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tablenhucaudathanh.component.html',
  styleUrls: ['./tablenhucaudathanh.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablenhucaudathanhComponent implements AfterViewInit {
  @Input() ListFindNCC: any[] = [];
  @Input() EditList: any[] = [];
  @Input() ListDathang: any[] = [];
  @Output() ListDathangChange = new EventEmitter<any>();
  _snackBar:MatSnackBar = inject(MatSnackBar);
  filterListNCC: any[] = [];
  filterListSP: any[] = [];
  ngAfterViewInit(): void {
    this.LoadTable(this.ListFindNCC,this.EditList); 
    console.log('ListFindNCC',this.ListFindNCC);
    console.log('EditList',this.EditList);
    
  }
  LoadTable(ListFindNCC: any[], EditList: any[]){
    let vitri = 1;
    this.filterListNCC = ListFindNCC
    this.filterListSP = EditList
    this.filterListSP.forEach((item:any) => {
      const index = this.filterListNCC.findIndex((v:any) => v.Sanpham.some((x:any) => x.id === item.id));
      if(index !== -1 && this.filterListNCC[index].vitri === undefined){   
        this.filterListNCC[index].vitri = vitri;
        vitri++;
      }    
    })
    this.filterListNCC.sort((a:any, b:any) => {
      if (a.vitri && b.vitri) {
        return a.vitri - b.vitri; // Sort by vitri property
      }
      return 0; // If vitri is not defined, keep the original order
    })    
  }
  isFilter:boolean = false;
  FilterTable(sanpham:any,nhacungcap:any){
    this.isFilter = !this.isFilter;
    if(this.isFilter){
    if (sanpham && Object.keys(sanpham).length > 0) {
      // When a specific product is selected, filter by product id
      const filteredEditList = this.EditList.filter((item: any) => item.id === sanpham.id);
      const filteredListNCC = this.ListFindNCC.filter((item: any) =>
      item.Sanpham.some((sp: any) => sp.id === sanpham.id)
      );
      this.LoadTable(filteredListNCC, filteredEditList);
    } else if (nhacungcap && Object.keys(nhacungcap).length > 0) {
      // When filtering by supplier only
      const filteredListNCC = this.ListFindNCC.filter((item: any) => item.id === nhacungcap.id);
      // For each matched supplier, update its product list with default sldat values
      filteredListNCC.forEach(item => {
      const matchedProducts = this.filterListSP
        .filter((sp: any) => item.Sanpham.some((p: any) => p.id === sp.id))
        .map(sp => ({
        ...sp,
        sldat: Number(sp.goiy)
        }));
      if (matchedProducts.length > 0) {
        item.sanpham = matchedProducts;
      }
      });
      // Update or add the filtered supplier into ListDathang accordingly
      const existingIndex = this.ListDathang.findIndex((entry: any) => entry.id === nhacungcap.id);
      if (existingIndex !== -1) {
      this.ListDathang[existingIndex] = { ...this.ListDathang[existingIndex], ...filteredListNCC[0] };
      } else {
      this.ListDathang.push(filteredListNCC[0]);
      }
      console.log('sanpham', sanpham);
      console.log('nhacungcap', nhacungcap);
      console.log('ListDathang', this.ListDathang);
      this.ListDathangChange.emit({isSubmit: false, ListDathang: this.ListDathang});
      this.LoadTable(filteredListNCC, filteredListNCC[0].sanpham);
    }
  }
  else{
    this.LoadTable(this.ListFindNCC,this.EditList);
  }
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ListFindNCC'] || changes['EditList']) {
      this.LoadTable(this.ListFindNCC, this.EditList);
    }
  }
  getSLDat(ncc:any,sanpham:any){
    const existingItem = ncc.sanpham?.find((v:any) => v.id === sanpham.id);
    if (existingItem) {
      return existingItem.sldat || 0;
    } else {
      return 0;
    }
  }
  DadatGoiy(item:any){
      const SLDat = this.ListDathang.reduce((acc: number, ncc: any) => {
        const sp = ncc.sanpham?.find((v: any) => v.id === item.id);
        return acc + (sp?.sldat ? Number(sp.sldat) : 0);
      }, 0);
    return (Number(item.goiy) - SLDat).toFixed(3);
  }
  trackByFn(index: number, item: any): any {
    return item.id; // Use a unique identifier
  }
  CheckSanphaminNCC(NCC:any,item:any){
    const existingItem = NCC.Sanpham?.find((v:any) => v.id === item.id);
    return existingItem ? true : false;
  }
  updateEnter(event: any, Sanpham: any, Nhacungcap: any) {
    // Allow only number keys, backspace, delete, arrows, tab, etc.
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'
    ];
    // Allow: 0-9, Numpad0-9
    if (
      (event.key >= '0' && event.key <= '9') ||
      (event.key >= 'Numpad0' && event.key <= 'Numpad9') ||
      allowedKeys.includes(event.key)
    ) {
      // Allow input
    } else {
      event.preventDefault();
      return;
    }

    // Prevent Enter or Shift+Enter from creating new lines
    if (event.key === 'Enter') {
      event.preventDefault();

      // Lấy giá trị mới từ input hiện tại (class 'sldat-input')
      const inputElem = (event.target as HTMLElement).closest('.sldat-input') as HTMLElement;
      let newValue = 0;
      if (inputElem) {
        const value = (inputElem as HTMLInputElement).value || (inputElem as HTMLElement).innerText;
        newValue = Number(value.trim()) || 0;
      }

      // Tạo bản sao tạm thời của ListDathang để kiểm tra âm trước khi cập nhật
      let tempListDathang = JSON.parse(JSON.stringify(this.ListDathang));
      let tempNCC = tempListDathang.find((v: any) => v.id === Nhacungcap.id);
      if (tempNCC) {
        let tempSP = tempNCC.sanpham?.find((v: any) => v.id === Sanpham.id);
        if (tempSP) {
          tempSP.sldat = newValue;
        } else {
          Sanpham.sldat = newValue;
          tempNCC.sanpham = tempNCC.sanpham || [];
          tempNCC.sanpham.push(Sanpham);
        }
      } else {
        Sanpham.sldat = newValue;
        Nhacungcap.sanpham = [Sanpham];
        Nhacungcap.ngaynhan = new Date();
        tempListDathang.push(Nhacungcap);
      }
      // Tính lại DadatGoiy với giá trị mới
      const checkValue = (() => {
        const SLDat = tempListDathang.reduce((acc: number, ncc: any) => {
          const sp = ncc.sanpham?.find((v: any) => v.id === Sanpham.id);
          return acc + (sp?.sldat ? Number(sp.sldat) : 0);
        }, 0);
        return (Number(Sanpham.goiy) - SLDat).toFixed(3);
      })();

      if (Number(checkValue) < 0) {
        this._snackBar.open('Số lượng không hợp lệ', '', {
          duration: 1000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ['snackbar-error'],
        });
        return;
      }

      // Nếu hợp lệ thì mới cập nhật ListDathang
      const exitNCC = this.ListDathang.find((v: any) => v.id === Nhacungcap.id);

      if (exitNCC) {
        const exitSP = exitNCC.sanpham?.find((v: any) => v.id === Sanpham.id);
        if (exitSP) {
          exitSP.sldat = newValue;
        } else {
          Sanpham.sldat = newValue;
          exitNCC.sanpham = exitNCC.sanpham || [];
          exitNCC.sanpham.push(Sanpham);
        }
      } else {
        Sanpham.sldat = newValue;
        Nhacungcap.sanpham = [Sanpham];
        Nhacungcap.ngaynhan = new Date();
        this.ListDathang.push(Nhacungcap);
      }

      setTimeout(() => {
        const allInputs = Array.from(document.querySelectorAll('.sldat-input')) as HTMLElement[];
        const currentIndex = allInputs.findIndex(input => input === event.target);
        if (currentIndex !== -1 && currentIndex + 1 < allInputs.length) {
          (allInputs[currentIndex + 1] as HTMLElement).focus();
        }
      });
      this.ListDathangChange.emit({isSubmit: false, ListDathang: this.ListDathang});
    }
  }


  updateBlur(event: FocusEvent, Sanpham: any, Nhacungcap: any) {
    // console.log('sanpham', Sanpham);
    // console.log('nhacungcap', Nhacungcap);
    
    // Lấy giá trị mới từ input hiện tại (class 'sldat-input')
    const inputElem = (event.target as HTMLElement).closest('.sldat-input') as HTMLElement;
    let newValue = 0;
    if (inputElem) {
      const value = (inputElem as HTMLInputElement).value || (inputElem as HTMLElement).innerText;
      newValue = Number(value.trim()) || 0;
    }
    console.log('newValue', newValue);
    
    // Kiểm tra trước khi cập nhật
    // Tạm thời gán thử giá trị mới để kiểm tra âm
    let tempListDathang = JSON.parse(JSON.stringify(this.ListDathang));
    let tempNCC = tempListDathang.find((v: any) => v.id === Nhacungcap.id);
    if (tempNCC) {
      let tempSP = tempNCC.sanpham?.find((v: any) => v.id === Sanpham.id);
      if (tempSP) {
        tempSP.sldat = newValue;
      } else {
        Sanpham.sldat = newValue;
        tempNCC.sanpham = tempNCC.sanpham || [];
        tempNCC.sanpham.push(Sanpham);
      }
    } else {
      Sanpham.sldat = newValue;
      Nhacungcap.sanpham = [Sanpham];
      Nhacungcap.ngaynhan = new Date();
      tempListDathang.push(Nhacungcap);
    }
    // Tính lại DadatGoiy với giá trị mới
    const checkValue = (() => {
      const SLDat = tempListDathang.reduce((acc: number, ncc: any) => {
        const sp = ncc.sanpham?.find((v: any) => v.id === Sanpham.id);
        return acc + (sp?.sldat ? Number(sp.sldat) : 0);
      }, 0);
      return (Number(Sanpham.goiy) - SLDat).toFixed(3);
    })();

    if (Number(checkValue) < 0) {
      this._snackBar.open('Số lượng không hợp lệ', '', {
        duration: 1000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ['snackbar-error'],
      });
      return;
    }

    // Lấy giá trị hiện tại nếu có
    const exitNCC = this.ListDathang.find((v: any) => v.id === Nhacungcap.id);
    let currentValue = 0;
    if (exitNCC) {
      const exitSP = exitNCC.sanpham?.find((v: any) => v.id === Sanpham.id);
      if (exitSP) {
        currentValue = exitSP.sldat || 0;
      }
    }

    // Chỉ update nếu giá trị thay đổi
    if (newValue !== currentValue) {
      if (exitNCC) {
        const exitSP = exitNCC.sanpham?.find((v: any) => v.id === Sanpham.id);
        if (exitSP) {
          exitSP.sldat = newValue;
        } else {
          Sanpham.sldat = newValue;
          exitNCC.sanpham = exitNCC.sanpham || [];
          exitNCC.sanpham.push(Sanpham);
        }
      } else {
        Sanpham.sldat = newValue;
        Nhacungcap.sanpham = [Sanpham];
        Nhacungcap.ngaynhan = new Date();
        this.ListDathang.push(Nhacungcap);
      }
      this.ListDathangChange.emit({isSubmit: false, ListDathang: this.ListDathang});
      console.log(this.ListDathang);
    }
  }
}
