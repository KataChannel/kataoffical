import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ResourceService } from '../../../admin/resource/resource.service';
import { environment } from '../../../../environments/environment.development';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Debounce } from '../../../shared/utils/decorators';

@Component({
  selector: 'app-tainguyenctv',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tainguyenctv.component.html',
  styleUrl: './tainguyenctv.component.scss',
})
export class TainguyenctvComponent {
  Listfilters:any= [
    { label: 'All Types', active: true },
    { label: 'Banners', active: false },
    { label: 'Social Media', active: false },
    { label: 'Email', active: false },
    { label: 'Video', active: false },
  ]
_ResourceService: ResourceService = inject(ResourceService);
ImageURL = environment.ImageURL;
Listresource = this._ResourceService.ListResource;
page = this._ResourceService.page;
pageCount = this._ResourceService.pageCount;
total = this._ResourceService.total;
pageSize = this._ResourceService.pageSize;
resourceId = this._ResourceService.resourceId;
constructor() {
    effect(async () => {
      await this._ResourceService.getAllResource(this.pageSize(),true);
    });
  }
async ngOnInit(): Promise<void> {
    this._ResourceService.listenResourceUpdates();
    await this._ResourceService.getAllResource(this.pageSize(),true);
  }
  @Debounce(300)
  async Applyfilter(event: any) {
    console.log(event.target.value);
    const filter = event.target.value;
    await this._ResourceService.getResourceBy({ title: filter.toLowerCase() });
    if (filter === '') {
      await this._ResourceService.getAllResource(this.pageSize(), true);
    }
  }
}
