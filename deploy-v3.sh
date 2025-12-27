#!/bin/bash

# Script build và deploy Rausach V3
# Frontend port: 12100, Backend port: 12101

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="rausachv3"
SERVER_USER="root"
SERVER_HOST="116.118.49.243"
SERVER_PATH="/opt/rausachv3"
API_IMAGE="rausach-backend:latest"
FRONTEND_IMAGE="rausach-frontend:latest"

# Print colored message
print_msg() {
    echo -e "${2}${1}${NC}"
}

# Print section header
print_header() {
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
}

# Build API image
build_api() {
    print_header "Building API Image"
    cd api
    
    print_msg "Installing dependencies..." "$YELLOW"
    bun install
    
    print_msg "Generating Prisma client..." "$YELLOW"
    bun prisma generate
    
    print_msg "Building API..." "$YELLOW"
    bun run build
    
    print_msg "Building Docker image..." "$YELLOW"
    docker build -t $API_IMAGE .
    
    cd ..
    print_msg "✓ API image built successfully!" "$GREEN"
}

# Build Frontend image
build_frontend() {
    print_header "Building Frontend Image"
    cd frontend
    
    print_msg "Installing dependencies..." "$YELLOW"
    npm install --legacy-peer-deps
    
    print_msg "Building frontend..." "$YELLOW"
    npm run build
    
    print_msg "Building Docker image..." "$YELLOW"
    docker build -t $FRONTEND_IMAGE .
    
    cd ..
    print_msg "✓ Frontend image built successfully!" "$GREEN"
}

# Save Docker images
save_images() {
    print_header "Saving Docker Images"
    
    mkdir -p ./docker-images
    
    print_msg "Saving API image..." "$YELLOW"
    docker save $API_IMAGE | gzip > ./docker-images/rausach-backend.tar.gz
    
    print_msg "Saving Frontend image..." "$YELLOW"
    docker save $FRONTEND_IMAGE | gzip > ./docker-images/rausach-frontend.tar.gz
    
    print_msg "✓ Images saved successfully!" "$GREEN"
}

# Upload to server
upload_to_server() {
    print_header "Uploading to Server"
    
    print_msg "Creating directory on server..." "$YELLOW"
    ssh $SERVER_USER@$SERVER_HOST "mkdir -p $SERVER_PATH/docker-images"
    
    print_msg "Uploading docker-compose file..." "$YELLOW"
    scp docker-compose.v3.yml $SERVER_USER@$SERVER_HOST:$SERVER_PATH/docker-compose.yml
    
    print_msg "Uploading API image..." "$YELLOW"
    scp ./docker-images/rausach-backend.tar.gz $SERVER_USER@$SERVER_HOST:$SERVER_PATH/docker-images/
    
    print_msg "Uploading Frontend image..." "$YELLOW"
    scp ./docker-images/rausach-frontend.tar.gz $SERVER_USER@$SERVER_HOST:$SERVER_PATH/docker-images/
    
    print_msg "✓ Files uploaded successfully!" "$GREEN"
}

# Deploy on server
deploy_on_server() {
    print_header "Deploying on Server"
    
    ssh $SERVER_USER@$SERVER_HOST << 'ENDSSH'
        cd /opt/rausachv3
        
        echo "Loading API image..."
        docker load < docker-images/rausach-backend.tar.gz
        
        echo "Loading Frontend image..."
        docker load < docker-images/rausach-frontend.tar.gz
        
        echo "Stopping existing containers..."
        docker-compose down || true
        
        echo "Starting new containers..."
        docker-compose up -d
        
        echo "Cleaning up old images..."
        docker image prune -f
        
        echo "Checking container status..."
        docker-compose ps
ENDSSH
    
    print_msg "✓ Deployment completed successfully!" "$GREEN"
}

# Show deployment info
show_info() {
    print_header "Deployment Information"
    echo -e "${GREEN}Frontend URL:${NC} http://116.118.49.243:12100"
    echo -e "${GREEN}Backend URL:${NC}  http://116.118.49.243:12101"
    echo -e "${GREEN}Database:${NC}     rausachv3 (116.118.49.243:55432)"
    echo ""
}

# Main function
main() {
    print_header "Rausach V3 - Build & Deploy"
    
    case "${1:-all}" in
        api)
            build_api
            save_images
            ;;
        frontend)
            build_frontend
            save_images
            ;;
        build)
            build_api
            build_frontend
            save_images
            ;;
        upload)
            upload_to_server
            ;;
        deploy)
            deploy_on_server
            ;;
        all)
            build_api
            build_frontend
            save_images
            upload_to_server
            deploy_on_server
            show_info
            ;;
        *)
            echo "Usage: $0 {api|frontend|build|upload|deploy|all}"
            echo ""
            echo "Commands:"
            echo "  api       - Build only API image"
            echo "  frontend  - Build only Frontend image"
            echo "  build     - Build both images"
            echo "  upload    - Upload files to server"
            echo "  deploy    - Deploy on server"
            echo "  all       - Build, upload and deploy (default)"
            exit 1
            ;;
    esac
    
    print_msg "\n✓ Process completed!" "$GREEN"
}

# Run main function
main "$@"
