#!/bin/bash

# ============================================
# 🚀 LOCAL BUILD & DEPLOY SCRIPT
# Build Docker images locally, then deploy to server
# ============================================

set -e

# === CONFIGURATION ===
SERVER_IP="116.118.49.243"
SERVER_USER="root"
SSH_KEY="/home/it/.ssh/default"
REMOTE_DIR="/root/rausachfinal"

# Image names
BACKEND_IMAGE="rausach-backend"
FRONTEND_IMAGE="rausach-frontend"
IMAGE_TAG="latest"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# === HELPER FUNCTIONS ===
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

# Check SSH key
check_ssh() {
    if [[ ! -f "$SSH_KEY" ]]; then
        log_error "SSH key not found: $SSH_KEY"
        exit 1
    fi
    log_success "SSH key found"
}

# === STEP 1: BUILD FRONTEND LOCALLY ===
build_frontend() {
    log_info "Building Frontend locally..."
    cd frontend
    
    # Install dependencies if needed
    if [[ ! -d "node_modules" ]]; then
        log_info "Installing frontend dependencies..."
        npm install
    fi
    
    # Build Angular SSR
    npm run build
    
    cd ..
    log_success "Frontend build complete"
}

# === STEP 2: BUILD DOCKER IMAGES LOCALLY ===
build_images() {
    log_info "Building Docker images locally..."
    
    # Build Backend image
    log_info "Building Backend image..."
    docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./api
    
    # Build Frontend image (uses pre-built dist)
    log_info "Building Frontend image..."
    docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend
    
    log_success "Docker images built successfully"
    
    # Show image sizes
    echo ""
    log_info "Image sizes:"
    docker images | grep -E "(${BACKEND_IMAGE}|${FRONTEND_IMAGE})" | head -5
}

# === STEP 3: SAVE IMAGES TO TAR FILES ===
save_images() {
    log_info "Saving images to tar files..."
    
    mkdir -p ./deploy-images
    
    # Save images (compressed)
    docker save ${BACKEND_IMAGE}:${IMAGE_TAG} | gzip > ./deploy-images/backend.tar.gz
    docker save ${FRONTEND_IMAGE}:${IMAGE_TAG} | gzip > ./deploy-images/frontend.tar.gz
    
    log_success "Images saved to ./deploy-images/"
    
    # Show file sizes
    ls -lh ./deploy-images/
}

# === STEP 4: TRANSFER IMAGES TO SERVER ===
transfer_images() {
    log_info "Transferring images to server ${SERVER_IP}..."
    
    # Create remote directory
    ssh -i "$SSH_KEY" ${SERVER_USER}@${SERVER_IP} "mkdir -p ${REMOTE_DIR}/deploy-images"
    
    # Transfer images using rsync (faster with compression)
    rsync -avz --progress -e "ssh -i $SSH_KEY" \
        ./deploy-images/ \
        ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/deploy-images/
    
    log_success "Images transferred to server"
}

# === STEP 5: LOAD IMAGES ON SERVER ===
load_images_on_server() {
    log_info "Loading images on server..."
    
    ssh -i "$SSH_KEY" ${SERVER_USER}@${SERVER_IP} << EOF
        cd ${REMOTE_DIR}
        
        echo "Loading Backend image..."
        docker load < deploy-images/backend.tar.gz
        
        echo "Loading Frontend image..."
        docker load < deploy-images/frontend.tar.gz
        
        echo "Tagging images..."
        docker tag ${BACKEND_IMAGE}:${IMAGE_TAG} rausachfinalv2-berausach:latest
        docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} rausachfinalv2-ferausach:latest
        
        echo "Images loaded successfully"
        docker images | grep -E "(rausach)" | head -10
EOF
    
    log_success "Images loaded on server"
}

# === STEP 6: DEPLOY ON SERVER ===
deploy_on_server() {
    log_info "Deploying containers on server..."
    
    ssh -i "$SSH_KEY" ${SERVER_USER}@${SERVER_IP} << EOF
        cd ${REMOTE_DIR}
        
        echo "Stopping existing containers..."
        docker compose down berausach ferausach 2>/dev/null || true
        
        echo "Starting containers with new images..."
        docker compose up -d berausach ferausach
        
        echo "Cleaning up..."
        docker builder prune -af
        rm -rf deploy-images/
        
        echo "Container status:"
        docker compose ps
EOF
    
    log_success "Deployment complete!"
}

# === STEP 7: CLEANUP LOCAL ===
cleanup_local() {
    log_info "Cleaning up local files..."
    rm -rf ./deploy-images
    log_success "Local cleanup complete"
}

# === MAIN MENU ===
show_menu() {
    echo ""
    echo "=========================================="
    echo "🚀 RAUSACH LOCAL BUILD & DEPLOY"
    echo "=========================================="
    echo ""
    echo "1) Full deploy (build + transfer + deploy)"
    echo "2) Build images only (local)"
    echo "3) Transfer images to server"
    echo "4) Deploy on server (images already transferred)"
    echo "5) Build Frontend only"
    echo "6) Quick deploy (skip frontend build)"
    echo "0) Exit"
    echo ""
    read -p "Select option: " choice
    
    case $choice in
        1)
            check_ssh
            build_frontend
            build_images
            save_images
            transfer_images
            load_images_on_server
            deploy_on_server
            cleanup_local
            ;;
        2)
            build_frontend
            build_images
            ;;
        3)
            check_ssh
            save_images
            transfer_images
            load_images_on_server
            cleanup_local
            ;;
        4)
            check_ssh
            deploy_on_server
            ;;
        5)
            build_frontend
            ;;
        6)
            check_ssh
            build_images
            save_images
            transfer_images
            load_images_on_server
            deploy_on_server
            cleanup_local
            ;;
        0)
            exit 0
            ;;
        *)
            log_error "Invalid option"
            show_menu
            ;;
    esac
}

# === RUN ===
cd "$(dirname "$0")"
show_menu
