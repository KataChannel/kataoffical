// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class ContentService {
//   constructor(private http: HttpClient) {}

//   getContentBySlug(slug: string): Observable<any> {
//     // Giả lập dữ liệu, thay bằng API thực tế
//     const mockData: Record<string, any> = {
//       'san-pham-1': { type: 'product', slug: 'san-pham-1', title: 'Sản phẩm 1', price: 100 },
//       'danh-muc-1': { type: 'category', slug: 'danh-muc-1', title: 'Danh mục 1', description: 'Mô tả danh mục 1' },
//       'bai-viet-1': { type: 'post', slug: 'bai-viet-1', title: 'Bài viết 1', content: 'Nội dung bài viết 1' },
//       // 'home': { type: 'home', slug: 'home', title: 'Trang chủ', description: 'Mô tả trang chủ' }
//     };
//     return of(mockData[slug] || { type: 'home', slug: 'home' });
//     // API thực tế: return this.http.get(`/api/content/${slug}`).pipe(
//     //   map(data => ({ type: data.type, ...data }))
//     // );
//   }
// }