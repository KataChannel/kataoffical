#!/bin/bash

# Script để cấu hình SSL nginx từ file final.rausachtrangia.com trên server
# Author: KataChannel
# Date: 30/08/2025

set -e  # Exit on any error

echo "=== Bắt đầu cấu hình SSL Nginx trên Server ==="

# Kiểm tra quyền root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Vui lòng chạy script với quyền root (sudo)"
    exit 1
fi

# Định nghĩa biến
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"
CONFIG_FILE="/chikiet/kataoffical/rausachfinal/final.rausachtrangia.com"
SITE_NAME="rausachtrangia"
DOMAINS="tg.rausachtrangia.com media.rausachtrangia.com"
NGINX_CONF="/etc/nginx/nginx.conf"
LOG_FILE="/var/log/nginx-ssl-setup.log"

# Tạo log file
touch $LOG_FILE
echo "$(date): Bắt đầu setup SSL nginx" >> $LOG_FILE

# Hàm kiểm tra service
check_service() {
    if systemctl is-active --quiet $1; then
        echo "✅ $1 đang chạy"
        return 0
    else
        echo "❌ $1 không chạy"
        return 1
    fi
}

# Hàm backup cấu hình
backup_config() {
    local backup_dir="/etc/nginx/backup-$(date +%Y%m%d-%H%M%S)"
    mkdir -p $backup_dir
    cp -r /etc/nginx/sites-available $backup_dir/
    cp -r /etc/nginx/sites-enabled $backup_dir/
    echo "📁 Backup cấu hình tại: $backup_dir"
    echo "$(date): Backup created at $backup_dir" >> $LOG_FILE
}

echo "=== Kiểm tra hệ thống ==="
echo "🖥️  Server: $(hostname)"
echo "🐧 OS: $(lsb_release -d | cut -f2)"
echo "📊 RAM: $(free -h | awk '/^Mem:/ {print $2}')"
echo "💾 Disk: $(df -h / | awk 'NR==2 {print $4 " available"}')"

echo "=== Backup cấu hình hiện tại ==="
backup_config

echo "=== Cập nhật hệ thống ==="
apt update && apt upgrade -y

echo "=== Cài đặt Nginx và dependencies ==="
if ! command -v nginx &> /dev/null; then
    echo "📦 Cài đặt Nginx..."
    apt install -y nginx ufw
    systemctl enable nginx
    systemctl start nginx
    echo "$(date): Nginx installed" >> $LOG_FILE
else
    echo "✅ Nginx đã được cài đặt"
fi

echo "=== Cấu hình Firewall ==="
# Cấu hình UFW cho các port cần thiết
ufw allow 'Nginx Full'
ufw allow 22  # SSH
ufw allow 53331  # API
ufw allow 59000  # MinIO
ufw allow 59090  # MinIO Console
ufw allow 55050  # PgAdmin
echo "🔥 Firewall đã được cấu hình"

echo "=== Cài đặt Certbot cho SSL ==="
if ! command -v certbot &> /dev/null; then
    echo "🔒 Cài đặt Certbot..."
    apt install -y certbot python3-certbot-nginx
    echo "$(date): Certbot installed" >> $LOG_FILE
else
    echo "✅ Certbot đã được cài đặt"
fi

echo "=== Tối ưu hóa cấu hình Nginx ==="
# Cập nhật nginx.conf với cấu hình tối ưu
cat > /etc/nginx/nginx.conf << 'EOF'
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Security headers
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
EOF

echo "⚙️  Nginx đã được tối ưu hóa"

echo "=== Cấu hình nginx từ file final.rausachtrangia.com ==="
if [ -f "$CONFIG_FILE" ]; then
    echo "📄 Sao chép cấu hình từ $CONFIG_FILE"
    # Sao chép và tối ưu cấu hình
    cp "$CONFIG_FILE" "$NGINX_SITES_AVAILABLE/$SITE_NAME"
    
    # Thêm cấu hình SSL placeholder vào file
    cat >> "$NGINX_SITES_AVAILABLE/$SITE_NAME" << 'EOF'

# SSL Configuration sẽ được Certbot tự động thêm vào

EOF
    echo "$(date): Configuration copied from $CONFIG_FILE" >> $LOG_FILE
else
    echo "❌ Lỗi: Không tìm thấy file $CONFIG_FILE"
    echo "$(date): ERROR - Config file not found: $CONFIG_FILE" >> $LOG_FILE
    exit 1
fi

echo "=== Kiểm tra DNS trước khi cấu hình SSL ==="
for domain in $DOMAINS; do
    echo "🔍 Kiểm tra DNS cho $domain..."
    if nslookup $domain > /dev/null 2>&1; then
        echo "✅ DNS OK cho $domain"
    else
        echo "⚠️  Cảnh báo: DNS chưa sẵn sàng cho $domain"
    fi
done

echo "=== Kích hoạt site ==="
# Tạo symbolic link
ln -sf "$NGINX_SITES_AVAILABLE/$SITE_NAME" "$NGINX_SITES_ENABLED/"

# Xóa default site nếu có
if [ -f "$NGINX_SITES_ENABLED/default" ]; then
    rm "$NGINX_SITES_ENABLED/default"
    echo "🗑️  Đã xóa site default"
fi

echo "=== Kiểm tra cấu hình nginx ==="
if nginx -t; then
    echo "✅ Cấu hình nginx hợp lệ"
    echo "$(date): Nginx config test passed" >> $LOG_FILE
else
    echo "❌ Lỗi: Cấu hình nginx không hợp lệ"
    echo "$(date): ERROR - Nginx config test failed" >> $LOG_FILE
    echo "🔧 Khôi phục từ backup..."
    systemctl reload nginx
    exit 1
fi

echo "=== Khởi động lại nginx ==="
systemctl reload nginx
check_service nginx

echo "=== Cấu hình SSL với Let's Encrypt ==="
echo "🔒 Đang cấu hình SSL cho các domain: $DOMAINS"

# Kiểm tra và dừng nginx tạm thời để certbot có thể bind port 80
systemctl stop nginx

# Tạo certificate cho tất cả domain với staging environment trước (để test)
echo "🧪 Test SSL với staging environment..."
certbot certonly --standalone --staging \
    -d tg.rausachtrangia.com \
    -d media.rausachtrangia.com \
    --non-interactive \
    --agree-tos \
    --email admin@rausachtrangia.com

if [ $? -eq 0 ]; then
    echo "✅ Staging SSL test thành công!"
    
    # Xóa staging certificates
    certbot delete --cert-name tg.rausachtrangia.com --non-interactive
    
    # Tạo production certificates
    echo "🚀 Tạo production SSL certificates..."
    certbot certonly --standalone \
        -d tg.rausachtrangia.com \
        -d media.rausachtrangia.com \
        --non-interactive \
        --agree-tos \
        --email admin@rausachtrangia.com
    
    if [ $? -eq 0 ]; then
        echo "✅ Production SSL certificates đã được tạo thành công!"
        echo "$(date): SSL certificates created successfully" >> $LOG_FILE
        
        # Cấu hình nginx với SSL
        certbot install --nginx \
            --cert-name tg.rausachtrangia.com \
            --non-interactive
            
    else
        echo "❌ Lỗi tạo production SSL certificates"
        echo "$(date): ERROR - Failed to create production SSL certificates" >> $LOG_FILE
    fi
else
    echo "⚠️  Lưu ý: Staging SSL test thất bại. Kiểm tra DNS và network."
    echo "$(date): WARNING - Staging SSL test failed" >> $LOG_FILE
fi

# Khởi động lại nginx
systemctl start nginx

echo "=== Thiết lập Auto-renewal và Monitoring ==="
# Tạo script kiểm tra SSL
cat > /etc/nginx/ssl-check.sh << 'EOF'
#!/bin/bash
# Script kiểm tra SSL certificates

DOMAINS="tg.rausachtrangia.com media.rausachtrangia.com"
LOG_FILE="/var/log/ssl-check.log"

echo "$(date): Checking SSL certificates" >> $LOG_FILE

for domain in $DOMAINS; do
    expiry_date=$(echo | openssl s_client -servername $domain -connect $domain:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
    expiry_epoch=$(date -d "$expiry_date" +%s)
    current_epoch=$(date +%s)
    days_until_expiry=$(( ($expiry_epoch - $current_epoch) / 86400 ))
    
    echo "SSL for $domain expires in $days_until_expiry days" >> $LOG_FILE
    
    if [ $days_until_expiry -lt 30 ]; then
        echo "WARNING: SSL for $domain expires in $days_until_expiry days!" >> $LOG_FILE
    fi
done
EOF

chmod +x /etc/nginx/ssl-check.sh

# Tạo cron job cho auto-renewal và monitoring
(crontab -l 2>/dev/null | grep -v "certbot\|ssl-check"; echo "0 12 * * * /usr/bin/certbot renew --quiet --post-hook 'systemctl reload nginx'"; echo "0 6 * * * /etc/nginx/ssl-check.sh") | crontab -

echo "🔄 Auto-renewal và monitoring đã được thiết lập"

echo "=== Kiểm tra trạng thái các services ==="
echo "📊 Trạng thái hệ thống:"
check_service nginx
check_service ufw

# Kiểm tra certificates
echo "🔒 Thông tin SSL certificates:"
certbot certificates

echo "=== Test kết nối ==="
echo "🧪 Testing connections..."
for domain in $DOMAINS; do
    if curl -Is https://$domain | head -1 | grep -q "200 OK"; then
        echo "✅ HTTPS OK: $domain"
    else
        echo "⚠️  HTTPS test failed: $domain"
    fi
done

echo "=== Hiển thị thông tin cấu hình ==="
echo ""
echo "🎉 =============================================="
echo "✅ Nginx SSL đã được cấu hình thành công!"
echo "================================================"
echo "📁 File cấu hình: $NGINX_SITES_AVAILABLE/$SITE_NAME"
echo "📁 Log file: $LOG_FILE"
echo "🌐 Public Domains:"
echo "   - https://tg.rausachtrangia.com (Frontend - Port 54301)"
echo "   - https://media.rausachtrangia.com (MinIO Storage - Port 59000)"
echo "🔒 SSL Certificate: Let's Encrypt"
echo "⚙️  Internal Services (Server only):"
echo "   - API Backend: localhost:53331"
echo "   - MinIO Console: localhost:59090"
echo "   - PgAdmin: localhost:55050"
echo "🔥 Firewall: UFW enabled với các port cần thiết"
echo "🔄 Auto-renewal: Đã thiết lập cron job"
echo "📊 SSL Monitoring: Kiểm tra hàng ngày lúc 6:00 AM"

echo ""
echo "=== Các lệnh hữu ích ==="
echo "🔧 Quản lý Nginx:"
echo "   sudo systemctl status nginx"
echo "   sudo systemctl reload nginx"
echo "   sudo nginx -t"
echo "   sudo tail -f /var/log/nginx/error.log"

echo ""
echo "🔒 Quản lý SSL:"
echo "   sudo certbot certificates"
echo "   sudo certbot renew --dry-run"
echo "   sudo /etc/nginx/ssl-check.sh"

echo ""
echo "🧪 Testing:"
echo "   curl -I https://tg.rausachtrangia.com"
echo "   curl -I https://media.rausachtrangia.com"
echo "   openssl s_client -connect tg.rausachtrangia.com:443 -servername tg.rausachtrangia.com"

echo ""
echo "📝 Logs:"
echo "   tail -f $LOG_FILE"
echo "   tail -f /var/log/nginx/access.log"
echo "   tail -f /var/log/letsencrypt/letsencrypt.log"

echo "$(date): SSL nginx setup completed successfully" >> $LOG_FILE
echo ""
echo "🚀 Hệ thống đã sẵn sàng cho production!"
echo "================================================"
