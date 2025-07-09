#!/bin/bash

set -e  # Exit on any error

echo "Starting deployment process..."

# Local git operations
echo "Pushing local changes..."
git add .
git commit -m "update: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push

# Remote server operations
echo "Deploying to server..."
ssh root@116.118.49.243 << 'EOF'
cd rausach
git pull

# Only rebuild if there are changes to Docker files
if git diff --name-only HEAD~1 | grep -E "(Dockerfile|docker-compose\.yml|package\.json)" > /dev/null; then
    echo "Docker files changed, rebuilding..."
    docker compose down
    docker compose build --no-cache
    docker compose up -d
else
    echo "No Docker files changed, restarting services..."
    docker compose down
    docker compose up -d
fi

# Clean up unused images and containers
docker system prune -f
EOF

echo "Deployment completed!"