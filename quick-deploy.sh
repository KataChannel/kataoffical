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

# SSH ControlMaster to reuse connections (Fixes: Connection reset by peer)
CONTROL_PATH="/tmp/ssh-control-%r@%h:%p"
SSH_OPTS="-i $SSH_KEY -o ControlMaster=auto -o ControlPath=$CONTROL_PATH -o ControlPersist=5m -o ConnectTimeout=10 -o ServerAliveInterval=30 -o BatchMode=yes"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

# Function to run SSH with retries
run_ssh() {
    local cmd="$1"
    local max_retries=3
    local retry=0
    until ssh $SSH_OPTS ${SERVER_USER}@${SERVER_IP} "$cmd"; do
        retry=$((retry + 1))
        if [ $retry -ge $max_retries ]; then
            log_error "SSH Command failed after $max_retries attempts: $cmd"
            return 1
        fi
        log_warning "SSH connection failed. Retrying ($retry/$max_retries)..."
        sleep 5
    done
}

# Start Master Connection
log_info "Establishing persistent SSH connection to $SERVER_IP..."
ssh $SSH_OPTS -fNM ${SERVER_USER}@${SERVER_IP} || log_warning "Failed to start master connection, will use standard connections."

# Cleanup on exit
trap "ssh -O exit -o ControlPath=$CONTROL_PATH ${SERVER_USER}@${SERVER_IP} 2>/dev/null || true; rm -rf ./deploy-images" EXIT

DEPLOY_TARGET="${1:-all}"

cd "$(dirname "$0")"

case $DEPLOY_TARGET in
    backend)
        log_info "Deploying Backend only..."
        
        # Build backend image
        docker build -t ${BACKEND_IMAGE}:latest ./api
        
        # Save and transfer
        log_info "Transferring Backend image..."
        docker save ${BACKEND_IMAGE}:latest | gzip | \
            ssh $SSH_OPTS ${SERVER_USER}@${SERVER_IP} \
            "mkdir -p ${REMOTE_DIR} && cd ${REMOTE_DIR} && cat > backend.tar.gz && docker load < backend.tar.gz && rm backend.tar.gz"
        
        # Restart backend container
        run_ssh "cd ${REMOTE_DIR} && docker compose -f docker-compose.prod.yml up -d berausach"
        
        log_success "Backend deployed!"
        ;;
        
    frontend)
        log_info "Deploying Frontend only..."
        
        # Build frontend locally
        cd frontend && bun run build && cd ..
        
        # Build frontend image
        docker build -t ${FRONTEND_IMAGE}:latest ./frontend
        
        # Save and transfer
        log_info "Transferring Frontend image..."
        docker save ${FRONTEND_IMAGE}:latest | gzip | \
            ssh $SSH_OPTS ${SERVER_USER}@${SERVER_IP} \
            "mkdir -p ${REMOTE_DIR} && cd ${REMOTE_DIR} && cat > frontend.tar.gz && docker load < frontend.tar.gz && rm frontend.tar.gz"
        
        # Restart frontend container
        run_ssh "cd ${REMOTE_DIR} && docker compose -f docker-compose.prod.yml up -d ferausach"
        
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
        log_info "Saving images to local directory..."
        mkdir -p ./deploy-images
        docker save ${BACKEND_IMAGE}:latest | gzip > ./deploy-images/backend.tar.gz
        docker save ${FRONTEND_IMAGE}:latest | gzip > ./deploy-images/frontend.tar.gz
        
        # Transfer
        log_info "Transferring to server via rsync (multiplexed)..."
        run_ssh "mkdir -p ${REMOTE_DIR}/deploy-images"
        rsync -avz --progress -e "ssh $SSH_OPTS" \
            ./deploy-images/ ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/deploy-images/
        
        # Load and deploy on server
        log_info "Loading images and deploying on server..."
        ssh $SSH_OPTS ${SERVER_USER}@${SERVER_IP} << EOF
            cd ${REMOTE_DIR}
            docker load < deploy-images/backend.tar.gz
            docker load < deploy-images/frontend.tar.gz
            docker compose -f docker-compose.prod.yml up -d berausach ferausach
            rm -rf deploy-images/
            docker builder prune -af
EOF
        
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
run_ssh "docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' | grep rausach"
