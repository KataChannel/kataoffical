import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="p-6">
      <h2 class="text-lg font-semibold mb-4">{{ data.title }}</h2>
      <p class="text-gray-600 mb-6">{{ data.message }}</p>
      <div class="flex justify-end gap-3">
        <button mat-button (click)="onCancel()">Hủy</button>
        <button mat-flat-button color="warn" (click)="onConfirm()">Xác nhận</button>
      </div>
    </div>
  `,
  imports: [MatButtonModule],
  standalone: true
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
