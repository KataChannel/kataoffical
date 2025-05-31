// import { Injectable } from '@angular/core';
// import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { ContentService } from './content.service';
// @Injectable({
//   providedIn: 'root'
// })
// export class ContentResolver implements Resolve<any> {
//   constructor(private contentService: ContentService, private router: Router) {}

//   resolve(route: ActivatedRouteSnapshot): Observable<any> {
//     const slug = route.paramMap.get('slug');
//     if (!slug) {
//       this.router.navigate(['/404']);
//       return of(null);
//     }
//     const result = this.contentService.getContentBySlug(slug);    
//     return result;
//   }
// }