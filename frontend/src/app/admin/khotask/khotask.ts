import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { KhotaskService } from './khotask.service';
import { ChotkhoService } from '../chotkho/chotkho.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-khotask',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './khotask.html',
})
export class KhotaskComponent implements OnInit {
  private _khotaskService = inject(KhotaskService);
  private _chotkhoService = inject(ChotkhoService);
  private _userService = inject(UserService);

  warehouses = signal<any[]>([]);
  selectedKhoId = signal<string>('');
  tasks = signal<any[]>([]);
  isLoading = this._khotaskService.isLoading;

  async ngOnInit() {
    // Load warehouses
    const warehouses = await this._chotkhoService.getAllWarehouses();
    this.warehouses.set(warehouses);
    
    if (warehouses.length > 0) {
      this.selectedKhoId.set(warehouses[0].id);
      this.loadTasks();
    }
  }

  async loadTasks() {
    if (!this.selectedKhoId()) return;
    const result = await this._khotaskService.getDailyChecklist(this.selectedKhoId());
    this.tasks.set(result);
  }

  async toggleTask(task: any) {
    const profile = await this._userService.getProfile();
    const data = {
      title: task.title,
      type: task.type,
      status: task.isCompleted ? 'COMPLETED' : 'PENDING',
      khoId: this.selectedKhoId(),
      userId: profile?.id,
      ngaythuchien: new Date(),
      isCompleted: task.isCompleted
    };
    await this._khotaskService.createTask(data);
    await this.loadTasks();
  }
}
