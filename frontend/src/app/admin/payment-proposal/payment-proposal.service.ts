import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../shared/utils/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentProposalService {
  constructor(private _StorageService: StorageService) { }

  ListProposal = signal<any[]>([]);
  DetailProposal = signal<any>(null);

  async findAll(filters: any = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/payment-proposal?${queryParams}`, options);
      const data = await response.json();
      this.ListProposal.set(data);
      return data;
    } catch (error) {
      console.error('Error fetching proposals:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/payment-proposal/${id}`, options);
      const data = await response.json();
      this.DetailProposal.set(data);
      return data;
    } catch (error) {
      console.error('Error fetching proposal:', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`${environment.APIURL}/payment-proposal`, options);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error creating proposal');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  }

  async review(id: string, reviewData: { status: string, comment?: string }) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this._StorageService.getItem('token')
        },
        body: JSON.stringify(reviewData),
      };
      const response = await fetch(`${environment.APIURL}/payment-proposal/${id}/review`, options);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error reviewing proposal');
      }
      const result = await response.json();
      this.findOne(id); // Refresh detail
      return result;
    } catch (error) {
      console.error('Error reviewing proposal:', error);
      throw error;
    }
  }
}
