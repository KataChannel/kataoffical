#!/bin/bash

# Script để cấu hình SSL sau khi rate limit hết
# Chạy sau 06:21:28 UTC (13:21:28 +07)

echo "🔒 Configuring SSL for rausachtrangia.com domains..."

# Kiểm tra thời gian hiện tại
current_time=$(date -u +"%Y-%m-%d %H:%M:%S")
echo "⏰ Current UTC time: $current_time"
echo "⏰ Rate limit expires: 2025-08-30 06:21:28 UTC"

# Remote server operations
ssh root@116.118.49.243 << 'EOF'
echo "🔒 Starting SSL configuration..."

# Kiểm tra nginx đang chạy
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx is running"
    
    # Cấu hình SSL
    echo "🔐 Requesting SSL certificates..."
    certbot --nginx -d tg.rausachtrangia.com -d media.rausachtrangia.com -d apitg.rausachtrangia.com \
        --non-interactive \
        --agree-tos \
        --email admin@rausachtrangia.com \
        --redirect
    
    if [ $? -eq 0 ]; then
        echo "✅ SSL certificates installed successfully!"
        echo "🔒 HTTPS is now enabled for:"
        echo "   - https://tg.rausachtrangia.com"
        echo "   - https://media.rausachtrangia.com"
        echo "   - https://apitg.rausachtrangia.com"
        
        # Test HTTPS
        echo "🧪 Testing HTTPS connections..."
        if curl -Is https://tg.rausachtrangia.com | head -1 | grep -q "200"; then
            echo "✅ HTTPS working for tg.rausachtrangia.com"
        else
            echo "⚠️ HTTPS test failed for tg.rausachtrangia.com"
        fi
        
        if curl -Is https://media.rausachtrangia.com | head -1 | grep -q "200"; then
            echo "✅ HTTPS working for media.rausachtrangia.com"
        else
            echo "⚠️ HTTPS test failed for media.rausachtrangia.com"
        fi
        
        if curl -Is https://apitg.rausachtrangia.com | head -1 | grep -q "200"; then
            echo "✅ HTTPS working for apitg.rausachtrangia.com"
        else
            echo "⚠️ HTTPS test failed for apitg.rausachtrangia.com"
        fi
        
        # Setup auto-renewal
        echo "🔄 Setting up auto-renewal..."
        (crontab -l 2>/dev/null | grep -v "certbot"; echo "0 12 * * * /usr/bin/certbot renew --quiet --post-hook 'systemctl reload nginx'") | crontab -
        
        echo "🎉 SSL configuration completed successfully!"
        
    else
        echo "❌ SSL configuration failed"
        echo "📝 Checking certbot logs..."
        tail -20 /var/log/letsencrypt/letsencrypt.log
    fi
else
    echo "❌ Nginx is not running"
    exit 1
fi
EOF

echo "🏁 SSL configuration script completed"
