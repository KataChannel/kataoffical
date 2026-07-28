#!/bin/bash

# Local git operations
git add .
git commit -m "update"
git push

# Remote server operations
ssh root@116.118.49.243 << 'EOF'
cd rausachfinal
git pull

# Tạo thư mục cho certbot challenge
sudo mkdir -p /var/www/html/.well-known/acme-challenge
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html

# Cập nhật cấu hình nginx
sudo rm -f /etc/nginx/sites-available/final.rausachtrangia.com
sudo rm -f /etc/nginx/sites-enabled/final.rausachtrangia.com
cp final.rausachtrangia.com /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/final.rausachtrangia.com /etc/nginx/sites-enabled/

# Kiểm tra và reload nginx
if sudo nginx -t; then
    sudo systemctl reload nginx
    echo "✅ Nginx configuration updated successfully"
    
    # Cấu hình SSL
    echo "🔒 Configuring SSL..."
    sudo certbot --nginx -d tg.rausachtrangia.com -d media.rausachtrangia.com -d apitg.rausachtrangia.com -d g.rausachtrangia.com --non-interactive --agree-tos --email admin@rausachtrangia.com
    
    if [ $? -eq 0 ]; then
        echo "✅ SSL configured successfully"
    else
        echo "⚠️ SSL configuration failed, trying standalone mode..."
        sudo systemctl stop nginx
        sudo certbot certonly --standalone -d tg.rausachtrangia.com -d media.rausachtrangia.com -d apitg.rausachtrangia.com -d g.rausachtrangia.com --non-interactive --agree-tos --email admin@rausachtrangia.com
        sudo systemctl start nginx
    fi
else
    echo "❌ Nginx configuration test failed"
    exit 1
fi
EOF