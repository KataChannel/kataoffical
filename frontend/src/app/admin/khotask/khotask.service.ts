import { Injectable, WritableSignal, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../environments/environment.development';

export interface Khotask {
  id?: string;
  title: string;
  type: string;
  status: string;
  khoId: string;
  userId?: string;
  ngaythuchien: Date;
  ghichu?: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class KhotaskService {
  private apollo = inject(Apollo);
  private snackBar = inject(MatSnackBar);

  tasks: WritableSignal<Khotask[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  async getDailyChecklist(khoId: string, date: Date = new Date()): Promise<Khotask[]> {
    const query = gql`
      query KhotaskDailyChecklist($khoId: String!, $date: String!) {
        khotaskDailyChecklist(khoId: $khoId, date: $date)
      }
    `;

    try {
      this.isLoading.set(true);
      const response = await firstValueFrom(
        this.apollo.query<{ khotaskDailyChecklist: any }>({
          query,
          variables: { 
            khoId, 
            date: date.toISOString().split('T')[0] 
          },
          fetchPolicy: 'no-cache'
        })
      );
      const result = response.data.khotaskDailyChecklist || [];
      this.tasks.set(result);
      return result;
    } catch (error) {
      console.error('Error getting daily checklist:', error);
      return [];
    } finally {
      this.isLoading.set(false);
    }
  }

  async createTask(data: any): Promise<any> {
    const mutation = gql`
      mutation KhotaskCreate($data: JSON!) {
        khotaskCreate(data: $data)
      }
    `;

    try {
      this.isLoading.set(true);
      const response = await firstValueFrom(
        this.apollo.mutate<{ khotaskCreate: any }>({
          mutation,
          variables: { data },
        })
      );
      this.snackBar.open('Cập nhật trạng thái thành công', 'Đóng', { duration: 3000 });
      return response.data?.khotaskCreate;
    } catch (error) {
      console.error('Error creating task:', error);
      this.snackBar.open('Lỗi khi cập nhật trạng thái', 'Đóng', { duration: 3000 });
      throw error;
    } finally {
      this.isLoading.set(false);
    }
  }
}
