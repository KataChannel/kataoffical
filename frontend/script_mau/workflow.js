// create_process_files.js
// Chạy bằng Node.js: node create_process_files.js
// Script này sẽ tạo các file và thư mục cần thiết cho component hiển thị quy trình.

const fs = require('fs');
const path = require('path');

console.log("--- Bắt đầu tạo các file cho component hiển thị quy trình ---");

// Định nghĩa nội dung của từng file
const fileContents = {
  'src/app/models/process.model.ts': `// src/app/models/process.model.ts

// Định nghĩa các loại khối nội dung
export type ContentBlockType = 'text' | 'list' | 'image' | 'video';

// Interface cho một khối nội dung bất kỳ
export interface ContentBlock {
  type: ContentBlockType; // Loại nội dung ('text', 'list', 'image', 'video')
  text?: string; // Dùng cho type 'text'
  listItems?: string[]; // Dùng cho type 'list'
  imageUrl?: string; // Dùng cho type 'image' (URL của hình ảnh)
  imageAlt?: string; // Alt text cho hình ảnh
  videoUrl?: string; // Dùng cho type 'video' (URL nguồn video)
  videoType?: string; // Loại video (ví dụ: 'video/mp4')
  caption?: string; // Chú thích cho hình ảnh hoặc video
}

// Interface cho một bước trong quy trình
export interface ProcessStep {
  time: string; // Thời gian hoặc nhãn bước
  title: string; // Tiêu đề chính của bước
  description?: string; // Mô tả tổng quan cho bước
  contentBlocks: ContentBlock[]; // Mảng các khối nội dung trong bước này
}

// Kiểu dữ liệu cho toàn bộ quy trình
export type ProcessFlowData = ProcessStep[];
`,

  'src/app/process-flow/process-flow.component.ts': `// src/app/process-flow/process-flow.component.ts

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
`,

  'src/app/process-flow/process-flow.component.html': `<div class="process-flow-container">
  <ng-container *ngIf="processData && processData.length > 0">
    <div *ngFor="let step of processData; let i = index" class="process-step">
      <div class="step-header">
         <span class="step-number">{{ i + 1 }}.</span>
         <span class="step-time">{{ step.time }}:</span>
         <span class="step-title">{{ step.title }}</span>
      </div>

      <p *ngIf="step.description" class="step-description">{{ step.description }}</p>

      <div *ngFor="let block of step.contentBlocks" class="content-block">
        <ng-container [ngSwitch]="block.type">
          <p *ngSwitchCase="'text'" class="content-text">
            {{ block.text }}
          </p>

          <ul *ngSwitchCase="'list'" class="content-list">
            <li *ngFor="let item of block.listItems">
              {{ item }}
            </li>
          </ul>

          <figure *ngSwitchCase="'image'" class="content-image">
            <img [src]="block.imageUrl" [alt]="block.imageAlt || 'Hướng dẫn quy trình'" class="responsive-image">
            <figcaption *ngIf="block.caption">{{ block.caption }}</figcaption>
          </figure>

          <figure *ngSwitchCase="'video'" class="content-video">
             <video controls [src]="block.videoUrl" [type]="block.videoType" class="responsive-video">
               Your browser does not support the video tag.
            </video>
            <figcaption *ngIf="block.caption">{{ block.caption }}</figcaption>
          </figure>

          <div *ngSwitchDefault>
            <p class="error-message">Loại nội dung không hỗ trợ: {{ block.type }}</p>
          </div>
        </ng-container>
      </div>
    </div>
  </ng-container>

  <ng-container *ngIf="!processData || processData.length === 0">
    <p>Không có dữ liệu quy trình để hiển thị.</p>
  </ng-container>
</div>
`,

  'src/app/process-flow/process-flow.component.scss': `/* src/app/process-flow/process-flow.component.scss */

.process-flow-container {
  margin: 20px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  font-family: sans-serif; // Hoặc font chữ dự án của bạn
  max-width: 800px; /* Giới hạn chiều rộng container */
  margin-left: auto;
  margin-right: auto;
  background-color: #f9f9f9; /* Màu nền nhẹ */
}

.process-step {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #ccc; // Phân cách các bước

  &:last-child {
    border-bottom: none; // Bỏ border cho bước cuối
    margin-bottom: 0;
    padding-bottom: 0;
  }
}

.step-header {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
  color: #0056b3; // Màu sắc tiêu đề
  display: flex; /* Dùng flexbox để căn chỉnh số thứ tự, thời gian, tiêu đề */
  align-items: baseline;
}

.step-number {
  flex-shrink: 0; /* Không co lại */
  margin-right: 8px;
  font-size: 1.1em; /* Kích thước lớn hơn 1 chút */
  color: #007bff;
}

.step-time {
  flex-shrink: 0; /* Không co lại */
  margin-right: 8px;
  color: #555; // Màu sắc thời gian
  font-weight: normal; /* Thời gian không in đậm bằng tiêu đề */
}

.step-title {
  flex-grow: 1; /* Cho phép tiêu đề chiếm hết không gian còn lại */
}


.step-description {
  margin-top: 5px;
  margin-bottom: 15px;
  color: #333;
  line-height: 1.5;
  padding-left: 20px; /* Thụt vào 1 chút */
  font-style: italic;
  border-left: 3px solid #ced4da; /* Đường kẻ nhẹ */
  padding-left: 17px; /* Điều chỉnh padding-left để tạo khoảng cách sau border */
}

.content-block {
  margin-top: 15px; /* Khoảng cách trên */
  margin-bottom: 15px; /* Khoảng cách dưới */
  padding-left: 20px; /* Thụt vào một chút so với tiêu đề bước */
  border-left: 3px solid #28a745; /* Đường kẻ bên trái màu xanh lá */
  padding-left: 17px; /* Điều chỉnh padding-left để tạo khoảng cách sau border */


  &:first-child {
      margin-top: 0; /* Bỏ margin-top cho khối đầu tiên trong bước */
  }
   &:last-child {
      margin-bottom: 0; /* Bỏ margin-bottom cho khối cuối cùng trong bước */
  }
}


.content-text {
  margin: 0; // Reset default margin
  line-height: 1.6;
  color: #555;
}

.content-list {
  margin: 0;
  padding-left: 20px; // Thụt đầu dòng cho list
  color: #555;

  li {
    margin-bottom: 5px;
    line-height: 1.5;
  }
}

.content-image,
.content-video {
    margin: 15px 0; // Khoảng cách trên dưới cho media
    text-align: center; // Căn giữa hình ảnh/video
    background-color: #e9ecef; /* Nền nhẹ cho khối media */
    padding: 10px;
    border-radius: 5px;
}


.responsive-image,
.responsive-video {
  max-width: 100%; // Đảm bảo không tràn ra ngoài container
  height: auto;    // Giữ tỷ lệ khung hình
  display: block;  // Loại bỏ khoảng trống dưới thẻ img/video
  margin: 0 auto;  // Căn giữa block element
  border-radius: 5px; // Bo góc nhẹ cho media
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); // Thêm bóng nhẹ
}

figcaption {
  margin-top: 8px;
  font-size: 0.9em;
  color: #666;
  font-style: italic;
}

.error-message {
  color: red;
  font-weight: bold;
  border: 1px dashed red;
  padding: 10px;
}
`,

  'src/app/process-page/process-page.component.ts': `// src/app/process-page/process-page.component.ts

import { Component, OnInit } from '@angular/core';
import { ProcessFlowData } from '../models/process.model'; // Import interface

@Component({
  selector: 'app-process-page',
  templateUrl: './process-page.component.html',
  styleUrls: ['./process-page.component.scss']
})
export class ProcessPageComponent implements OnInit {

  myProcessFlowData: ProcessFlowData | null = null;
  // Có thể thêm biến isLoading để hiển thị trạng thái load dữ liệu

  constructor() {
    // Constructor thường dùng cho dependency injection
  }

  ngOnInit(): void {
    // --- Dữ liệu mẫu Quy trình (Có thể thay thế bằng dữ liệu từ API) ---
    this.myProcessFlowData = [
      {
        time: '0h',
        title: 'Đặt Hàng Ngày 1',
        description: 'Các bước đầu tiên trong quy trình đặt hàng từ khi khách hàng thao tác trên website.',
        contentBlocks: [
          { type: 'text', text: 'Quy trình bắt đầu ngay sau khi khách hàng hoàn tất đơn hàng.' },
          { type: 'list', listItems: [
              'Đơn hàng được gửi tự động đến Bộ Phận Order.',
              'Bộ Phận Order tiến hành chuẩn bị thông tin cho Giao Hàng.',
              'Hệ thống yêu cầu Xác Nhận Giao Hàng từ đơn vị vận chuyển.'
            ]
          },
          {
             type: 'image',
             imageUrl: 'https://via.placeholder.com/600x400?text=Order+Process+Step+1', // Thay bằng URL hình ảnh thực tế
             imageAlt: 'Minh họa bước đặt hàng',
             caption: 'Hình ảnh minh họa giao diện xác nhận đơn hàng thành công.'
          },
           { type: 'text', text: 'Đảm bảo kiểm tra email hoặc thông báo trên ứng dụng để theo dõi trạng thái đơn hàng.'},
        ]
      },
      {
        time: '1h',
        title: 'Kiểm Kho',
        description: 'Bộ Phận Kho thực hiện kiểm tra và chuẩn bị hàng hóa theo đơn hàng.',
        contentBlocks: [
          { type: 'text', text: 'Tại bước này, hệ thống sẽ gửi yêu cầu kiểm kho tự động.' },
          { type: 'list', listItems: [
              'Bộ Phận Kho nhận danh sách hàng cần chuẩn bị.',
              'Kiểm tra số lượng tồn thực tế tại kho.',
              'Đối chiếu với thông tin trên hệ thống.'
            ]
          },
           {
             type: 'video',
             videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Thay bằng URL video thực tế (ví dụ: từ dịch vụ lưu trữ của bạn)
             videoType: 'video/mp4',
             caption: 'Video minh họa quy trình kiểm tra và đóng gói hàng tại kho.'
           },
            { type: 'text', text: 'Quá trình này được thực hiện cẩn thận để đảm bảo hàng hóa đủ số lượng và đúng chủng loại.'},
        ]
      },
      {
        time: '8H',
        title: 'Nhập Kiểm Kho và Tổng hợp Báo cáo',
         description: 'Dữ liệu kiểm kho được nhập vào hệ thống và bộ phận kế toán tổng hợp báo cáo tồn kho.',
        contentBlocks: [
           { type: 'text', text: 'Thông tin từ bộ phận kho được nhập vào hệ thống quản lý tồn kho.'},
           { type: 'list', listItems: [
               'Nhập kết quả kiểm kho (Bộ Phận Kho).',
               'Xử lý và nhập dữ liệu hàng bị hủy (nếu có).',
               'Bộ Phận Kế Toán tổng hợp báo cáo tồn kho tổng.',
               'Kiểm tra và xác nhận các đơn hàng đặt trước 21h để ưu tiên xử lý.'
             ]
           },
           {
              type: 'image',
              imageUrl: 'https://via.placeholder.com/600x400?text=Inventory+Report', // Thay bằng URL hình ảnh thực tế
              imageAlt: 'Mẫu báo cáo tồn kho',
              caption: 'Ví dụ về báo cáo tồn kho được tổng hợp hàng ngày.'
           },
           { type: 'text', text: 'Bước này đảm bảo dữ liệu tồn kho luôn chính xác và được cập nhật cho các quyết định kinh doanh.'}
        ]
      },
      {
        time: '21H',
        title: 'Kết thúc Ngày',
         description: 'Kết thúc ngày làm việc với việc chuẩn bị cho các đơn hàng tiếp theo.',
        contentBlocks: [
          { type: 'text', text: 'Kết thúc ngày làm việc, bộ phận Order và Kho chuẩn bị cho các hoạt động của ngày kế tiếp.'},
          { type: 'list', listItems: [
             'Bộ Phận Order tổng hợp đơn hàng mới trong ngày.',
             'Bộ Phận Kho lên kế hoạch lấy hàng cho sáng hôm sau.',
             'Đảm bảo hệ thống sẵn sàng cho ngày làm việc mới.'
             ]
           },
           { type: 'text', text: 'Mọi đơn hàng đặt sau giờ chốt (ví dụ: 21h) sẽ được chuyển sang quy trình của ngày hôm sau.'},
        ]
      },
    ];
    // --- Kết thúc Dữ liệu mẫu ---

    // Trong ứng dụng thực tế, đồng chí sẽ gọi một service để lấy dữ liệu từ API backend
    // Ví dụ:
    // this.processService.getProcessFlowData().subscribe(
    //   (data: ProcessFlowData) => {
    //     this.myProcessFlowData = data;
    //     // this.isLoading = false;
    //   },
    //   (error) => {
    //     console.error('Error fetching process data:', error);
    //     // Xử lý lỗi hiển thị cho người dùng
    //     // this.isLoading = false;
    //   }
    // );
  }

}
`,

  'src/app/process-page/process-page.component.html': `<div class="process-page-container">
  <h1>Chi Tiết Quy Trình</h1>

  <app-process-flow [processData]="myProcessFlowData"></app-process-flow>

  </div>
`,
 'src/app/process-page/process-page.component.scss': `/* src/app/process-page/process-page.component.scss */

.process-page-container {
  padding: 20px;
  font-family: sans-serif; /* Hoặc font chữ dự án của bạn */
}

h1 {
  color: #003366;
  margin-bottom: 20px;
  text-align: center;
}

/* Có thể thêm style cho loading spinner nếu dùng */
`
};

// Hàm tạo thư mục nếu chưa tồn tại
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

// Lặp qua từng file và ghi nội dung
for (const filePath in fileContents) {
  if (fileContents.hasOwnProperty(filePath)) {
    const content = fileContents[filePath];
    const fullPath = path.join(__dirname, filePath); // __dirname là thư mục chứa script

    // Đảm bảo thư mục tồn tại trước khi ghi file
    ensureDirectoryExistence(fullPath);

    // Ghi nội dung vào file
    try {
      fs.writeFileSync(fullPath, content);
      console.log(`Đã tạo/ghi đè: ${filePath}`);
    } catch (error) {
      console.error(`Lỗi khi ghi file ${filePath}:`, error);
    }
  }
}

console.log("\n--- HOÀN THÀNH TẠO FILE ---");
console.log("===> LƯU Ý QUAN TRỌNG VỚI FILE app.module.ts <===");
console.log("Script này KHÔNG TỰ ĐỘNG CẬP NHẬT file app.module.ts của bạn.");
console.log("Bạn cần MỞ file src/app/app.module.ts hiện tại và THÊM các dòng sau vào đúng vị trí:");
console.log("\nImport các component:");
console.log("import { ProcessFlowComponent } from './process-flow/process-flow.component';");
console.log("import { ProcessPageComponent } from './process-page/process-page.component';");
console.log("\nThêm vào mảng 'declarations' trong @NgModule:");
console.log("declarations: [");
console.log("  AppComponent, // Giữ lại các component đã có");
console.log("  ProcessFlowComponent,");
console.log("  ProcessPageComponent,");
console.log("  // ... các component khác của bạn");
console.log("],");
console.log("\nThêm vào mảng 'imports' trong @NgModule (đảm bảo CommonModule có):");
console.log("imports: [");
console.log("  BrowserModule,");
console.log("  CommonModule, // Cần thiết cho *ngIf, *ngFor, ngSwitch");
console.log("  // ... các modules khác của bạn (ví dụ: HttpClientModule)");
console.log("],");

console.log("\n--- Script kết thúc ---");
