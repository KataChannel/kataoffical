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
cd rausach

echo "📥 Pulling latest changes..."
git pull

echo "🐳 Building and starting Docker containers..."
# Stop existing containers
docker compose down

# Build and start with no cache to ensure fresh builds
# docker compose -f 'docker-compose.yml' up -d --build --no-cache backend-shop frontend-shop mysql phpmyadmin
docker compose -f 'docker-compose.yml' up -d --build --no-cache mysql phpmyadmin

# Clean up unused Docker resources
echo "🧹 Cleaning up Docker resources..."
docker builder prune -af
docker system prune -f

echo "✅ Deployment completed successfully!"

# Show running containers
echo "📊 Running containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
EOF

echo "🎉 Deployment process finished!"