import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
    private router: Router,
) { }
  async Search(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/search`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
                let message = 'Lỗi không xác định';
                switch (response.status) {
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
      return data
    } catch (error) {
        return console.error(error);
    }
  }
}
