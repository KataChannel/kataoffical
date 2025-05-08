// src/app/process-flow/process-flow.component.ts

import { Component, Input } from '@angular/core';
import { ProcessFlowData } from '../models/process.model'; // Import interface đã cập nhật

@Component({
  selector: 'app-process-flow', // Tag selector để sử dụng component
  templateUrl: './process-flow.component.html',
  styleUrls: ['./process-flow.component.scss']
})
export class ProcessFlowComponent {

  // Sử dụng @Input để nhận dữ liệu quy trình từ component cha
  @Input() processData: ProcessFlowData | null = null;

  constructor() { }

  // Các lifecycle hooks hoặc methods khác nếu cần
}
