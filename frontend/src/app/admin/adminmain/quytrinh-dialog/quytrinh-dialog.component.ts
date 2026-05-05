import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-quytrinh-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './quytrinh-dialog.component.html',
  styles: [`
    .dialog-container {
      height: 100%;
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    .close-btn-overlay {
      position: absolute;
      top: 15px;
      right: 15px;
      background-color: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(4px);
      border-radius: 50%;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      transition: all 0.2s;
    }
    .close-btn-overlay:hover {
      background-color: rgba(255, 255, 255, 0.9);
      transform: scale(1.1);
    }
    .quytrinh-dialog-container .mat-mdc-dialog-container .mat-mdc-dialog-surface {
      padding: 0 !important;
      overflow: hidden !important;
      border-radius: 0 !important;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class QuytrinhDialogComponent implements OnInit {
  safeUrl: SafeResourceUrl | null = null;

  constructor(
    public dialogRef: MatDialogRef<QuytrinhDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, url: string },
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
