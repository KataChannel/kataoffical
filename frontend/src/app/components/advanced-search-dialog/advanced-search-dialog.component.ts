import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { GraphqlService } from '../../shared/services/graphql.service';

interface SearchCriteria {
  quickSearch: string;
  models: string[];
  fields: { [key: string]: boolean };
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

interface SearchModel {
  key: string;
  name: string;
  icon: string;
  fields: string[];
  route?: string;
}

@Component({
  selector: 'app-advanced-search-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './advanced-search-dialog.component.html'
})
export class AdvancedSearchDialogComponent {
  searchCriteria: SearchCriteria = {
    quickSearch: '',
    models: [],
    fields: {},
    dateRange: {
      startDate: null,
      endDate: null
    }
  };

  searchResults: any[] = [];
  isLoading = false;
  selectedTab = 0;

  searchModels: SearchModel[] = [
    {
      key: 'sanpham',
      name: 'Sản phẩm',
      icon: 'inventory_2',
      fields: ['ten', 'ma', 'barcode', 'mota'],
      route: 'sanpham'
    },
    {
      key: 'khachhang', 
      name: 'Khách hàng',
      icon: 'people',
      fields: ['ten', 'email', 'sdt', 'diachi'],
      route: 'khachhang'
    },
    {
      key: 'donhang',
      name: 'Đơn hàng', 
      icon: 'shopping_cart',
      fields: ['ma', 'ghichu', 'trangthai'],
      route: 'donhang'
    },
    {
      key: 'phieukho',
      name: 'Phiếu kho',
      icon: 'warehouse', 
      fields: ['ma', 'loai', 'ghichu'],
      route: 'phieukho'
    },
    {
      key: 'chotkho',
      name: 'Chốt kho',
      icon: 'lock',
      fields: ['ma', 'ghichu'],
      route: 'chotkho'
    },
    {
      key: 'user',
      name: 'Người dùng',
      icon: 'person',
      fields: ['ten', 'email', 'sdt'],
      route: 'user'
    },
    {
      key: 'nhomkhachhang',
      name: 'Nhóm khách hàng',
      icon: 'group',
      fields: ['ten', 'mota'],
      route: 'nhomkhachhang'
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<AdvancedSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private graphqlService: GraphqlService,
    private router: Router
  ) {
    if (data?.searchQuery) {
      this.searchCriteria.quickSearch = data.searchQuery;
    }
  }

  // Getters and setters for date handling
  get startDate(): Date | null {
    return this.searchCriteria.dateRange.startDate;
  }

  set startDate(value: Date | null) {
    this.searchCriteria.dateRange.startDate = value;
  }

  get endDate(): Date | null {
    return this.searchCriteria.dateRange.endDate;
  }

  set endDate(value: Date | null) {
    this.searchCriteria.dateRange.endDate = value;
  }

  get totalSearchResults(): number {
    return this.searchResults.reduce((sum, model) => sum + (model.results?.length || 0), 0);
  }

  getModelName(modelKey: string): string {
    const model = this.searchModels.find(m => m.key === modelKey);
    return model?.name || modelKey;
  }

  getModelFields(modelKey: string): string[] {
    const model = this.searchModels.find(m => m.key === modelKey);
    return model?.fields || [];
  }

  onModelSelectionChange(model: SearchModel, selected: boolean) {
    if (selected) {
      this.searchCriteria.models.push(model.key);
      // Auto-select common fields
      model.fields.forEach(field => {
        this.searchCriteria.fields[`${model.key}_${field}`] = true;
      });
    } else {
      this.searchCriteria.models = this.searchCriteria.models.filter(m => m !== model.key);
      // Deselect all fields for this model
      model.fields.forEach(field => {
        delete this.searchCriteria.fields[`${model.key}_${field}`];
      });
    }
  }

  isModelSelected(modelKey: string): boolean {
    return this.searchCriteria.models.includes(modelKey);
  }

  isFieldSelected(modelKey: string, field: string): boolean {
    return !!this.searchCriteria.fields[`${modelKey}_${field}`];
  }

  onFieldChange(modelKey: string, field: string, selected: boolean) {
    const fieldKey = `${modelKey}_${field}`;
    if (selected) {
      this.searchCriteria.fields[fieldKey] = true;
    } else {
      delete this.searchCriteria.fields[fieldKey];
    }
  }

  async performQuickSearch() {
    if (!this.searchCriteria.quickSearch.trim()) {
      return;
    }

    this.isLoading = true;
    this.searchResults = [];

    try {
      // Search across all models with the quick search term
      const searchPromises = this.searchModels.map(async (model) => {
        const query = this.buildSearchQuery(model.key, [this.searchCriteria.quickSearch]);
        const result = await this.executeSearch(query, model.key);
        return {
          model: model,
          results: result || [],
          count: result?.length || 0
        };
      });

      this.searchResults = await Promise.all(searchPromises);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async performAdvancedSearch() {
    if (this.searchCriteria.models.length === 0) {
      return;
    }

    this.isLoading = true;
    this.searchResults = [];

    try {
      const searchPromises = this.searchCriteria.models.map(async (modelKey) => {
        const model = this.searchModels.find(m => m.key === modelKey);
        if (!model) return null;

        const searchTerms = this.getSearchTermsForModel(modelKey);
        const query = this.buildSearchQuery(modelKey, searchTerms);
        const result = await this.executeSearch(query, modelKey);
        
        return {
          model: model,
          results: result || [],
          count: result?.length || 0
        };
      });

      const results = await Promise.all(searchPromises);
      this.searchResults = results.filter(r => r !== null) as any[];
    } catch (error) {
      console.error('Advanced search error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private getSearchTermsForModel(modelKey: string): string[] {
    const terms: string[] = [];
    
    // Add quick search term if exists
    if (this.searchCriteria.quickSearch.trim()) {
      terms.push(this.searchCriteria.quickSearch.trim());
    }

    // Add field-specific terms
    Object.keys(this.searchCriteria.fields).forEach(fieldKey => {
      if (fieldKey.startsWith(modelKey + '_') && this.searchCriteria.fields[fieldKey]) {
        // Could add field-specific search terms here
      }
    });

    return terms.length > 0 ? terms : [''];
  }

  private buildSearchQuery(modelKey: string, searchTerms: string[]): string {
    // Simple GraphQL query builder - customize based on your schema
    const term = searchTerms[0] || '';
    
    switch (modelKey) {
      case 'sanpham':
        return `
          query {
            sanphams(where: { 
              OR: [
                { ten: { contains: "${term}" } },
                { ma: { contains: "${term}" } },
                { barcode: { contains: "${term}" } }
              ]
            }) {
              id
              ten
              ma
              barcode
              giaban
            }
          }
        `;
      case 'khachhang':
        return `
          query {
            khachhangs(where: {
              OR: [
                { ten: { contains: "${term}" } },
                { email: { contains: "${term}" } },
                { sdt: { contains: "${term}" } }
              ]
            }) {
              id
              ten
              email
              sdt
              diachi
            }
          }
        `;
      case 'donhang':
        return `
          query {
            donhangs(where: {
              OR: [
                { ma: { contains: "${term}" } },
                { ghichu: { contains: "${term}" } }
              ]
            }) {
              id
              ma
              ngaytao
              trangthai
              tongtien
            }
          }
        `;
      case 'nhomkhachhang':
        return `
          query {
            nhomkhachhangs(where: {
              OR: [
                { ten: { contains: "${term}" } },
                { mota: { contains: "${term}" } }
              ]
            }) {
              id
              ten
              mota
            }
          }
        `;
      default:
        return `
          query {
            ${modelKey}s(where: { ten: { contains: "${term}" } }) {
              id
              ten
            }
          }
        `;
    }
  }

  private async executeSearch(query: string, modelKey: string): Promise<any[]> {
    try {
      // Use the existing GraphQL service methods instead of raw query
      const searchTerm = this.searchCriteria.quickSearch.trim();
      
      switch (modelKey) {
        case 'sanpham':
          return await this.graphqlService.findMany('sanpham', {
            where: {
              OR: [
                { ten: { contains: searchTerm } },
                { ma: { contains: searchTerm } },
                { barcode: { contains: searchTerm } }
              ]
            },
            select: {
              id: true,
              ten: true,
              ma: true,
              barcode: true,
              giaban: true
            }
          });
          
        case 'khachhang':
          return await this.graphqlService.findMany('khachhang', {
            where: {
              OR: [
                { ten: { contains: searchTerm } },
                { email: { contains: searchTerm } },
                { sdt: { contains: searchTerm } }
              ]
            },
            select: {
              id: true,
              ten: true,
              email: true,
              sdt: true,
              diachi: true
            }
          });
          
        case 'donhang':
          return await this.graphqlService.findMany('donhang', {
            where: {
              OR: [
                { ma: { contains: searchTerm } },
                { ghichu: { contains: searchTerm } }
              ]
            },
            select: {
              id: true,
              ma: true,
              ngaytao: true,
              trangthai: true,
              tongtien: true
            }
          });
          
        case 'nhomkhachhang':
          return await this.graphqlService.findMany('nhomkhachhang', {
            where: {
              OR: [
                { ten: { contains: searchTerm } },
                { mota: { contains: searchTerm } }
              ]
            },
            select: {
              id: true,
              ten: true,
              mota: true
            }
          });
          
        default:
          return await this.graphqlService.findMany(modelKey, {
            where: { ten: { contains: searchTerm } },
            select: {
              id: true,
              ten: true
            }
          });
      }
    } catch (error) {
      console.error(`Search error for ${modelKey}:`, error);
      return [];
    }
  }

  navigateToResult(result: any, modelKey: string) {
    const model = this.searchModels.find(m => m.key === modelKey);
    if (model?.route && result.id) {
      this.dialogRef.close();
      this.router.navigate([`/admin/${model.route}`, result.id]);
    }
  }

  selectAllModels() {
    this.searchModels.forEach(model => {
      if (!this.isModelSelected(model.key)) {
        this.onModelSelectionChange(model, true);
      }
    });
  }

  clearAllSelections() {
    this.searchCriteria.models = [];
    this.searchCriteria.fields = {};
    this.searchResults = [];
  }

  onClose() {
    this.dialogRef.close();
  }
}