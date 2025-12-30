#!/bin/bash

# Script thiết lập Nginx + SSL cho demo.rausachtrangia.com và apidemo.rausachtrangia.com
# Chạy trên server 116.118.49.243

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== Thiết lập Nginx + SSL cho Rausach V3 ===${NC}"

# 1. Cài đặt certbot nếu chưa có
echo -e "${YELLOW}[1/6] Kiểm tra và cài đặt certbot...${NC}"
if ! command -v certbot &> /dev/null; then
    apt update
    apt install -y certbot python3-certbot-nginx
    echo -e "${GREEN}✓ Đã cài đặt certbot${NC}"
else
    echo -e "${GREEN}✓ Certbot đã được cài đặt${NC}"
fi

# 2. Tạo thư mục cho certbot
echo -e "${YELLOW}[2/6] Tạo thư mục certbot...${NC}"
mkdir -p /var/www/certbot

# 3. Tạo config HTTP only trước (để certbot có thể verify)
echo -e "${YELLOW}[3/6] Tạo config nginx tạm thời (HTTP only)...${NC}"

cat > /etc/nginx/sites-available/demo.rausachtrangia.com << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name demo.rausachtrangia.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://127.0.0.1:12100;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

cat > /etc/nginx/sites-available/apidemo.rausachtrangia.com << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name apidemo.rausachtrangia.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://127.0.0.1:12101;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable sites
ln -sf /etc/nginx/sites-available/demo.rausachtrangia.com /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/apidemo.rausachtrangia.com /etc/nginx/sites-enabled/

# Test và reload nginx
nginx -t && systemctl reload nginx
echo -e "${GREEN}✓ Config nginx HTTP đã được tạo${NC}"

# 4. Lấy SSL certificate
echo -e "${YELLOW}[4/6] Lấy SSL certificate từ Let's Encrypt...${NC}"

# Certificate cho demo.rausachtrangia.com
if [ ! -f /etc/letsencrypt/live/demo.rausachtrangia.com/fullchain.pem ]; then
    certbot certonly --webroot -w /var/www/certbot \
        -d demo.rausachtrangia.com \
        --email admin@rausachtrangia.com \
        --agree-tos \
        --non-interactive
    echo -e "${GREEN}✓ SSL certificate cho demo.rausachtrangia.com đã được tạo${NC}"
else
    echo -e "${GREEN}✓ SSL certificate cho demo.rausachtrangia.com đã tồn tại${NC}"
fi

# Certificate cho apidemo.rausachtrangia.com
if [ ! -f /etc/letsencrypt/live/apidemo.rausachtrangia.com/fullchain.pem ]; then
    certbot certonly --webroot -w /var/www/certbot \
        -d apidemo.rausachtrangia.com \
        --email admin@rausachtrangia.com \
        --agree-tos \
        --non-interactive
    echo -e "${GREEN}✓ SSL certificate cho apidemo.rausachtrangia.com đã được tạo${NC}"
else
    echo -e "${GREEN}✓ SSL certificate cho apidemo.rausachtrangia.com đã tồn tại${NC}"
fi

# 5. Cập nhật config nginx với HTTPS
echo -e "${YELLOW}[5/6] Cập nhật config nginx với HTTPS...${NC}"

cat > /etc/nginx/sites-available/demo.rausachtrangia.com << 'EOF'
# Frontend - demo.rausachtrangia.com
server {
    listen 80;
    listen [::]:80;
    server_name demo.rausachtrangia.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name demo.rausachtrangia.com;

    ssl_certificate /etc/letsencrypt/live/demo.rausachtrangia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/demo.rausachtrangia.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml;

    location / {
        proxy_pass http://127.0.0.1:12100;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400s;
    }
}
EOF

cat > /etc/nginx/sites-available/apidemo.rausachtrangia.com << 'EOF'
# API - apidemo.rausachtrangia.com
server {
    listen 80;
    listen [::]:80;
    server_name apidemo.rausachtrangia.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name apidemo.rausachtrangia.com;

    ssl_certificate /etc/letsencrypt/live/apidemo.rausachtrangia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/apidemo.rausachtrangia.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # CORS is handled by NestJS app.enableCors() - do NOT add here to avoid duplicate headers

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml;

    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:12101;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}
EOF

# Test và reload nginx
nginx -t && systemctl reload nginx
echo -e "${GREEN}✓ Config nginx HTTPS đã được cập nhật${NC}"

# 6. Thiết lập auto-renew
echo -e "${YELLOW}[6/6] Thiết lập auto-renew SSL...${NC}"
if ! crontab -l 2>/dev/null | grep -q "certbot renew"; then
    (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'") | crontab -
    echo -e "${GREEN}✓ Đã thiết lập auto-renew SSL${NC}"
else
    echo -e "${GREEN}✓ Auto-renew SSL đã được thiết lập${NC}"
fi

echo ""
echo -e "${GREEN}=== Hoàn thành thiết lập Nginx + SSL ===${NC}"
echo -e "Frontend: ${GREEN}https://demo.rausachtrangia.com${NC}"
echo -e "API:      ${GREEN}https://apidemo.rausachtrangia.com${NC}"
echo ""
