import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ARDocumentService {
  constructor(private storageService: StorageService) {}

  ListARDocuments = signal<any[]>([]);
  DetailARDocument = signal<any>(null);

  async findAll(filters: any = {}) {
    const query = new URLSearchParams();
    if (filters.status) query.append('status', filters.status);
    if (filters.tuNgay) query.append('tuNgay', filters.tuNgay);
    if (filters.denNgay) query.append('denNgay', filters.denNgay);
    if (filters.customerId) query.append('customerId', filters.customerId);

    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.storageService.getItem('token')
      }
    };

    const response = await fetch(`${environment.APIURL}/ar-document?${query.toString()}`, options);
    if (!response.ok) throw new Error('Failed to fetch AR Documents');
    
    const data = await response.json();
    this.ListARDocuments.set(data);
    return data;
  }

  async findOne(id: string) {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.storageService.getItem('token')
      }
    };

    const response = await fetch(`${environment.APIURL}/ar-document/${id}`, options);
    if (!response.ok) throw new Error('Failed to fetch AR Document details');
    
    const data = await response.json();
    this.DetailARDocument.set(data);
    return data;
  }

  async create(data: any) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getItem('token')
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(`${environment.APIURL}/ar-document`, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create AR Document');
    }
    
    return await response.json();
  }

  async review(id: string, reviewData: { status: string; comment?: string }) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storageService.getItem('token')
      },
      body: JSON.stringify(reviewData)
    };

    const response = await fetch(`${environment.APIURL}/ar-document/${id}/review`, options);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to review AR Document');
    }
    
    return await response.json();
  }
}
