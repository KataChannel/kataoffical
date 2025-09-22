#!/bin/bash

echo "🚀 Starting deployment process..."

# Local git operations
echo "📝 Committing local changes..."
git add .
git commit -m "update: deploy beshop and feshop $(date '+%Y-%m-%d %H:%M:%S')"
git push

echo "✅ Local changes pushed to repository"

# Remote server operations
echo "🌐 Deploying to remote server..."
ssh root@116.118.49.243 << 'EOF'
cd rausachsite

echo "📥 Pulling latest changes..."
git pull

echo "� Applying phpMyAdmin fixes..."
# Ensure proper file permissions
chmod 644 php.ini phpmyadmin-config.inc.php 2>/dev/null || true
chmod +x fix-phpmyadmin.sh 2>/dev/null || true

echo "�🐳 Building and starting Docker containers..."
# Stop existing containers
docker compose down

# Clean up old volumes to prevent configuration conflicts
docker volume rm rausachsite_phpmyadmin_tmp 2>/dev/null || true

# Build and start with no cache to ensure fresh builds
docker compose -f 'docker-compose.yml' up -d --build backend-shop frontend-shop mysql phpmyadmin
#docker compose -f 'docker-compose.yml' up -d --build mysql phpmyadmin

# Wait for services to stabilize
echo "⏳ Waiting for services to initialize..."
sleep 15

# Clean up unused Docker resources
echo "🧹 Cleaning up Docker resources..."
docker builder prune -af
#docker system prune -f

# Verify phpMyAdmin is working
echo "🔍 Verifying phpMyAdmin configuration..."
docker exec phpmyadmin php -r "echo 'PHP Configuration Check:\n'; echo 'post_max_size: ' . ini_get('post_max_size') . '\n'; echo 'upload_max_filesize: ' . ini_get('upload_max_filesize') . '\n'; echo 'memory_limit: ' . ini_get('memory_limit') . '\n';" 2>/dev/null || echo "phpMyAdmin container starting..."

echo "✅ Deployment completed successfully!"

# Show running containers
echo "📊 Running containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo "🌐 Access phpMyAdmin at: http://116.118.49.243:8080"
echo "📝 Login: tazaspac_chikiet / @Hikiet88"
EOF

echo "🎉 Deployment process finished!"