#!/bin/bash

# Script tạm thời để fix nginx và bỏ qua SSL
# Sẽ cấu hình SSL sau khi rate limit hết

# Local git operations
git add .
git commit -m "fix nginx without ssl"
git push

# Remote server operations
ssh root@116.118.49.243 << 'EOF'
cd rausachfinal
git pull

echo "🔧 Fixing nginx configuration..."

# Tạo thư mục cho certbot challenge
sudo mkdir -p /var/www/html/.well-known/acme-challenge
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html

# Backup current config
sudo cp /etc/nginx/sites-available/final.rausachtrangia.com /etc/nginx/sites-available/final.rausachtrangia.com.backup 2>/dev/null || true

# Cập nhật cấu hình nginx
sudo rm -f /etc/nginx/sites-available/final.rausachtrangia.com
sudo rm -f /etc/nginx/sites-enabled/final.rausachtrangia.com
cp final.rausachtrangia.com /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/final.rausachtrangia.com /etc/nginx/sites-enabled/

# Kiểm tra cấu hình
echo "🧪 Testing nginx configuration..."
if sudo nginx -t; then
    echo "✅ Nginx configuration is valid"
    
    # Restart nginx service
    echo "🔄 Restarting nginx..."
    sudo systemctl stop nginx
    sudo systemctl start nginx
    
    if sudo systemctl is-active --quiet nginx; then
        echo "✅ Nginx is running successfully"
        echo "🌐 HTTP sites are now accessible:"
        echo "   - http://tg.rausachtrangia.com"
        echo "   - http://media.rausachtrangia.com"
        echo "   - http://apitg.rausachtrangia.com"
        echo ""
        echo "⏰ SSL will be configured later (after rate limit expires: 2025-08-30 06:21:28 UTC)"
        echo "⏰ Current time: $(date -u)"
    else
        echo "❌ Nginx failed to start"
        sudo systemctl status nginx --no-pager
        echo "📝 Checking error logs:"
        sudo tail -20 /var/log/nginx/error.log
    fi
else
    echo "❌ Nginx configuration test failed"
    sudo nginx -t
    exit 1
fi
EOF
