#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Exit on any error
set -e

print_status "Starting auto deployment..."

# Local git operations
print_status "Adding files to git..."
git add .

print_status "Committing changes..."
git commit -m "update: $(date '+%Y-%m-%d %H:%M:%S')"

# print_status "Pushing to remote repository..."
# git push

# Remote deployment
print_status "Connecting to remote server and deploying..."
ssh root@116.118.49.243 << 'EOF'
    cd tazasandbox1/
    
    echo "Pulling latest changes..."
    git pull
    
    echo "Building and deploying affiliate-api..."
    docker compose -f 'docker-compose.yml' up -d --build

    # echo "Building and deploying affiliate-api..."
    # docker compose -f 'docker-compose.yml' up -d --build 'affiliate-api'
    
    # echo "Building and deploying academy-affiliate..."
    # docker compose -f 'docker-compose.yml' up -d --build 'academy-affiliate'
    
    echo "Deployment completed successfully!"
EOF

print_status "Auto deployment completed!"