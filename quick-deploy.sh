#!/bin/bash

# ============================================
# 🚀 QUICK DEPLOY - Build & Deploy in one command
# Usage: ./quick-deploy.sh [backend|frontend|all]
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

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

DEPLOY_TARGET="${1:-all}"

cd "$(dirname "$0")"

case $DEPLOY_TARGET in
    backend)
        log_info "Deploying Backend only..."
        
        # Build backend image
        docker build -t ${BACKEND_IMAGE}:latest ./api
        
        # Save and transfer
        docker save ${BACKEND_IMAGE}:latest | gzip | \
            ssh -i "$SSH_KEY" ${SERVER_USER}@${SERVER_IP} \
            "cd ${REMOTE_DIR} && cat > backend.tar.gz && docker load < backend.tar.gz && rm backend.tar.gz"
        
        # Restart backend container
        ssh -i "$SSH_KEY" ${SERVER_USER}@${SERVER_IP} \
            "cd ${REMOTE_DIR} && docker compose -f docker-compose.prod.yml up -d berausach"
        
        log_success "Backend deployed!"
        ;;
        
    frontend)
        log_info "Deploying Frontend only..."
        
        # Build frontend locally
        cd frontend && bun run build && cd ..
        
        # Build frontend image
        docker build -t ${FRONTEND_IMAGE}:latest ./frontend
        
        # Save and transfer
        docker save ${FRONTEND_IMAGE}:latest | gzip | \
            ssh -i "$SSH_KEY" ${SERVER_USER}@${SERVER_IP} \
            "cd ${REMOTE_DIR} && cat > frontend.tar.gz && docker load < frontend.tar.gz && rm frontend.tar.gz"
        
        # Restart frontend container
        ssh -i "$SSH_KEY" ${SERVER_USER}@${SERVER_IP} \
            "cd ${REMOTE_DIR} && docker compose -f docker-compose.prod.yml up -d ferausach"
        
        log_success "Frontend deployed!"
        ;;
        
    all)
        log_info "Deploying Backend + Frontend..."
        
        # Build frontend
        log_info "Building Frontend..."
        cd frontend && bun run build && cd ..
        
        # Build images
        log_info "Building Docker images..."
        docker build -t ${BACKEND_IMAGE}:latest ./api
        docker build -t ${FRONTEND_IMAGE}:latest ./frontend
        
        # Save images
        log_info "Saving images..."
        mkdir -p ./deploy-images
        docker save ${BACKEND_IMAGE}:latest | gzip > ./deploy-images/backend.tar.gz
        docker save ${FRONTEND_IMAGE}:latest | gzip > ./deploy-images/frontend.tar.gz
        
        # Transfer
        log_info "Transferring to server..."
        ssh -i "$SSH_KEY" ${SERVER_USER}@${SERVER_IP} "mkdir -p ${REMOTE_DIR}/deploy-images"
        rsync -avz --progress -e "ssh -i $SSH_KEY" \
            ./deploy-images/ ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/deploy-images/
        
        # Load and deploy on server
        log_info "Loading images and deploying..."
        ssh -i "$SSH_KEY" ${SERVER_USER}@${SERVER_IP} << EOF
            cd ${REMOTE_DIR}
            docker load < deploy-images/backend.tar.gz
            docker load < deploy-images/frontend.tar.gz
            docker compose -f docker-compose.prod.yml up -d berausach ferausach
            rm -rf deploy-images/
            docker builder prune -af
EOF
        
        # Cleanup local
        rm -rf ./deploy-images
        
        log_success "Full deployment complete!"
        ;;
        
    *)
        echo "Usage: $0 [backend|frontend|all]"
        exit 1
        ;;
esac

# Show status
echo ""
log_info "Container status on server:"
ssh -i "$SSH_KEY" ${SERVER_USER}@${SERVER_IP} "docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' | grep rausach"
