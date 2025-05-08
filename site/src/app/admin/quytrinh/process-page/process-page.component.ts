// src/app/process-page/process-page.component.ts

import { Component, OnInit } from '@angular/core';
import { ProcessFlowData } from '../models/process.model'; // Import interface

@Component({
  selector: 'app-process-page',
  imports: [],
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
