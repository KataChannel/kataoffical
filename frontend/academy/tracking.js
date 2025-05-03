// tracking.js

(function() {
    // !!! THAY THẾ URL NÀY bằng URL thực tế của API NestJS của bạn !!!
    const API_ENDPOINT = 'http://your-nestjs-api-domain.com/api/tracking'; // Ví dụ: http://localhost:3000/api/tracking
  
    // Hàm gửi dữ liệu tracking lên server
    async function sendTrackingData(data) {
      // Bổ sung thông tin chung
      const payload = {
        ...data,
        url: window.location.href, // Lấy URL trang hiện tại
        timestamp: new Date().toISOString(), // Thêm timestamp client-side (server cũng nên ghi nhận)
        // Có thể thêm userAgent, screenResolution, etc. nếu cần
        // userAgent: navigator.userAgent,
        // screenResolution: `${window.screen.width}x${window.screen.height}`
      };
  
      try {
        // Sử dụng Fetch API để gửi POST request
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          // keepalive: true // Giúp gửi request ngay cả khi trang sắp đóng (hữu ích cho click vào link chuyển trang)
                           // Tuy nhiên, cần kiểm tra kỹ hỗ trợ và giới hạn của trình duyệt/server
        });
  
        if (!response.ok) {
          console.error('Tracking API Error:', response.status, response.statusText);
        }
         // Không cần làm gì thêm nếu thành công (trừ khi bạn muốn log côté client)
      } catch (error) {
        console.error('Failed to send tracking data:', error);
      }
    }
  
    // --- 1. Ghi nhận Page View ---
    // Gửi ngay khi DOM đã sẵn sàng
    document.addEventListener('DOMContentLoaded', () => {
      sendTrackingData({ type: 'view' });
    });
  
  
    // --- 2. Ghi nhận Click ---
    // Thêm attribute `data-track-click` vào các element bạn muốn theo dõi click
    // Ví dụ: <button data-track-click="cta-button-header">Đăng ký ngay</button>
    //        <a href="..." data-track-click="learn-more-link">Tìm hiểu thêm</a>
  
    document.addEventListener('click', (event) => {
      // Tìm element gần nhất có attribute `data-track-click` từ element được click
      const trackableElement = event.target.closest('[data-track-click]');
  
      if (trackableElement) {
        const elementId = trackableElement.getAttribute('data-track-click'); // Lấy giá trị attribute
        const tagName = trackableElement.tagName; // Ví dụ: BUTTON, A
        console.log(`Track click on: ${elementId} (Tag: ${tagName})`);
        sendTrackingData({
            type: 'click',
            elementId: elementId || `${tagName}-${trackableElement.id || 'no-id'}`, // Cung cấp định danh
            eventDetail: `Clicked on ${tagName} with identifier: ${elementId}`
        });
  
        // Lưu ý: Nếu click vào link và chuyển trang ngay lập tức, request `Workspace` có thể bị hủy.
        // Cân nhắc sử dụng `navigator.sendBeacon()` cho trường hợp này nếu `keepalive` không đủ tin cậy.
        /*
        if (trackableElement.tagName === 'A' && trackableElement.href && trackableElement.target !== '_blank') {
            // Ví dụ sử dụng sendBeacon (cần server hỗ trợ nhận dạng dữ liệu dạng Blob hoặc text/plain tùy cấu hình)
            const payload = { type: 'click', elementId: elementId, url: window.location.href, timestamp: new Date().toISOString() };
            const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
            navigator.sendBeacon(API_ENDPOINT, blob);
        }
        */
      }
    }, true); // Sử dụng capturing phase để bắt sự kiện sớm hơn (tùy chọn)
  
  
    // --- 3. Ghi nhận Register ---
    // Giả sử bạn có một form đăng ký với id="registration-form"
    const registrationForm = document.getElementById('registration-form');
  
    if (registrationForm) {
      registrationForm.addEventListener('submit', (event) => {
        // Gửi sự kiện 'register' KHI form được submit
        // Quan trọng: Việc này xảy ra TRƯỚC KHI dữ liệu form thực sự được gửi lên server
        // hoặc TRƯỚC KHI trang chuyển hướng (nếu là submit form truyền thống).
        console.log('Registration form submitted, sending tracking event...');
        sendTrackingData({
            type: 'register',
            elementId: 'registration-form', // Định danh form
            eventDetail: 'Form submission initiated'
        });
  
        // LƯU Ý QUAN TRỌNG:
        // Nếu form submit theo cách truyền thống (tải lại trang hoặc chuyển hướng),
        // request `Workspace` ở trên có thể không kịp hoàn thành trước khi trình duyệt điều hướng đi.
        // Giải pháp:
        // 1. (Tốt nhất) Submit form bằng AJAX (sử dụng fetch hoặc XMLHttpRequest). Gọi sendTrackingData('register')
        //    TRONG callback `.then()` hoặc `success` SAU KHI server xác nhận đăng ký thành công.
        // 2. (Phổ biến) Redirect người dùng đến trang "Thank You" SAU KHI đăng ký thành công ở phía server.
        //    Sau đó, theo dõi sự kiện 'view' trên trang "Thank You" như một sự kiện đăng ký thành công.
        // 3. Sử dụng `navigator.sendBeacon()` như ví dụ click ở trên (cần server hỗ trợ).
        // 4. (Kém tin cậy) Delay việc submit form một chút (không khuyến khích):
        /*
          event.preventDefault(); // Ngăn chặn submit mặc định
          sendTrackingData({ type: 'register', ... }).finally(() => {
             // Gửi lại form sau khi tracking đã được gửi (hoặc timeout)
             // Có thể vẫn không kịp nếu mạng chậm
             registrationForm.submit();
          });
        */
      });
    } else {
      console.warn('Registration form with id "registration-form" not found for tracking.');
    }
  
  })(); // IIFE để tránh làm ô nhiễm global scope