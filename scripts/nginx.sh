#!/bin/bash

# Local git operations
git add .
git commit -m "update"
git push

# Remote server operations
ssh root@116.118.49.243 << 'EOF'
cd rausachfinal
git pull
cp final.rausachtrangia.com /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/final.rausachtrangia.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
certbot --nginx -d tg.rausachtrangia.com -d media.rausachtrangia.com
EOF