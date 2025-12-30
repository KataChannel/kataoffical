#!/bin/bash

# ============================================
# 🚀 BUN DEV - Chạy Development Environment
# 3 Giai đoạn: Install → Generate → Start
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# Functions
log_stage() { echo -e "\n${CYAN}══════════════════════════════════════════${NC}"; echo -e "${CYAN}🔷 GIAI ĐOẠN $1: $2${NC}"; echo -e "${CYAN}══════════════════════════════════════════${NC}\n"; }
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

# Change to script directory
cd "$(dirname "$0")"

# ============================================
# MENU CHỌN GIAI ĐOẠN
# ============================================
show_menu() {
    clear
    echo -e "${GREEN}"
    echo "╔══════════════════════════════════════════════════════╗"
    echo "║         🚀 RAUSACH DEV ENVIRONMENT                   ║"
    echo "║         Backend + Frontend Development               ║"
    echo "╚══════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    echo -e "${MAGENTA}═══════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}  CHỌN GIAI ĐOẠN MUỐN CHẠY:${NC}"
    echo -e "${MAGENTA}═══════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "  ${GREEN}1)${NC} 🔄 Chạy đầy đủ 3 giai đoạn (Install → Generate → Start)"
    echo -e "  ${GREEN}2)${NC} 📦 Giai đoạn 1: Cài đặt dependencies (bun install)"
    echo -e "  ${GREEN}3)${NC} ⚙️  Giai đoạn 2: Generate Prisma Client"
    echo -e "  ${GREEN}4)${NC} 🚀 Giai đoạn 3: Khởi động Dev Server"
    echo -e "  ${GREEN}5)${NC} 🌐 Chạy đầy đủ + Frontend (API + Frontend)"
    echo -e "  ${GREEN}6)${NC} 🔄 Fresh Install (xóa node_modules & cài lại)"
    echo -e "  ${GREEN}7)${NC} 📊 Mở Prisma Studio"
    echo -e "  ${GREEN}8)${NC} 🗄️  Push Database Schema"
    echo -e "  ${GREEN}9)${NC} 🚀 Deploy V3 (Build + Upload + Deploy)"
    echo -e "  ${GREEN}10)${NC} 📋 Mở Menu chính (menu.sh)"
    echo -e "  ${GREEN}11)${NC} 🔍 Check TypeScript Errors (toàn dự án)"
    echo ""
    echo -e "  ${RED}0)${NC} ❌ Thoát"
    echo ""
    echo -e "${MAGENTA}═══════════════════════════════════════════════════════${NC}"
    echo ""
    read -p "👉 Chọn option [0-11]: " choice
}

# ============================================
# GIAI ĐOẠN 1: CÀI ĐẶT DEPENDENCIES
# ============================================
stage_install() {
    log_stage "1/3" "CÀI ĐẶT DEPENDENCIES"

    # Check if bun is installed
    if ! command -v bun &> /dev/null; then
        log_error "Bun chưa được cài đặt!"
        log_info "Cài đặt bun: curl -fsSL https://bun.sh/install | bash"
        return 1
    fi

    log_info "Bun version: $(bun --version)"

    # Install API dependencies
    log_info "Cài đặt dependencies cho API..."
    cd api
    if [[ ! -d "node_modules" ]] || [[ "$FRESH_INSTALL" == "true" ]]; then
        if [[ "$FRESH_INSTALL" == "true" ]]; then
            log_warning "Xóa node_modules cũ..."
            rm -rf node_modules
        fi
        bun install
        log_success "API dependencies đã cài đặt"
    else
        log_info "API node_modules đã tồn tại (skip)"
    fi
    cd ..

    log_success "Giai đoạn 1 hoàn thành!"
}

# ============================================
# GIAI ĐOẠN 1B: CÀI ĐẶT FRONTEND
# ============================================
stage_install_frontend() {
    log_info "Cài đặt dependencies cho Frontend..."
    cd frontend
    if [[ ! -d "node_modules" ]] || [[ "$FRESH_INSTALL" == "true" ]]; then
        if [[ "$FRESH_INSTALL" == "true" ]]; then
            log_warning "Xóa node_modules cũ..."
            rm -rf node_modules
        fi
        npm install
        log_success "Frontend dependencies đã cài đặt"
    else
        log_info "Frontend node_modules đã tồn tại (skip)"
    fi
    cd ..
}

# ============================================
# GIAI ĐOẠN 2: GENERATE PRISMA CLIENT
# ============================================
stage_generate() {
    log_stage "2/3" "GENERATE PRISMA CLIENT"

    cd api

    # Check if .env exists
    if [[ ! -f ".env" ]]; then
        log_warning "File .env không tồn tại!"
        if [[ -f ".env.example" ]]; then
            log_info "Tạo .env từ .env.example..."
            cp .env.example .env
            log_warning "Vui lòng cập nhật DATABASE_URL trong .env"
        else
            log_error "Không tìm thấy .env.example"
        fi
    fi

    # Generate Prisma client
    log_info "Generating Prisma client..."
    bun prisma generate
    log_success "Prisma client đã được generate"

    cd ..
    log_success "Giai đoạn 2 hoàn thành!"
}

# ============================================
# GIAI ĐOẠN 3: KHỞI ĐỘNG DEV SERVER
# ============================================
stage_start() {
    log_stage "3/3" "KHỞI ĐỘNG DEV SERVER"

    # Function to cleanup on exit
    cleanup() {
        echo -e "\n${YELLOW}🛑 Đang dừng servers...${NC}"
        kill $(jobs -p) 2>/dev/null
        exit 0
    }
    trap cleanup SIGINT SIGTERM

    # Start API server
    log_info "Khởi động API server (port 3331)..."
    cd api
    bun run start:dev &
    API_PID=$!
    cd ..

    echo -e "\n${GREEN}══════════════════════════════════════════${NC}"
    echo -e "${GREEN}✅ API SERVER ĐANG CHẠY!${NC}"
    echo -e "${GREEN}══════════════════════════════════════════${NC}"
    echo -e "${BLUE}📡 API Server:      http://localhost:3331${NC}"
    echo -e "${BLUE}📊 GraphQL:         http://localhost:3331/graphql${NC}"
    echo -e "${YELLOW}⏹️  Nhấn Ctrl+C để dừng${NC}"
    echo -e "${GREEN}══════════════════════════════════════════${NC}\n"

    # Wait for processes
    wait
}

# ============================================
# GIAI ĐOẠN 3B: KHỞI ĐỘNG FULL (API + FRONTEND)
# ============================================
stage_start_full() {
    log_stage "3/3" "KHỞI ĐỘNG DEV SERVER (FULL)"

    # Function to cleanup on exit
    cleanup() {
        echo -e "\n${YELLOW}🛑 Đang dừng servers...${NC}"
        kill $(jobs -p) 2>/dev/null
        exit 0
    }
    trap cleanup SIGINT SIGTERM

    # Start API server
    log_info "Khởi động API server (port 3331)..."
    cd api
    bun run start:dev &
    API_PID=$!
    cd ..

    sleep 3  # Wait for API to start

    # Start Frontend server
    log_info "Khởi động Frontend server (port 4200)..."
    cd frontend
    npm run start &
    FE_PID=$!
    cd ..

    echo -e "\n${GREEN}══════════════════════════════════════════${NC}"
    echo -e "${GREEN}✅ DEV ENVIRONMENT ĐANG CHẠY!${NC}"
    echo -e "${GREEN}══════════════════════════════════════════${NC}"
    echo -e "${BLUE}📡 API Server:      http://localhost:3331${NC}"
    echo -e "${BLUE}📊 GraphQL:         http://localhost:3331/graphql${NC}"
    echo -e "${BLUE}🌐 Frontend:        http://localhost:4200${NC}"
    echo -e "${YELLOW}⏹️  Nhấn Ctrl+C để dừng${NC}"
    echo -e "${GREEN}══════════════════════════════════════════${NC}\n"

    # Wait for processes
    wait
}

# ============================================
# PRISMA STUDIO
# ============================================
open_prisma_studio() {
    log_info "Mở Prisma Studio..."
    cd api
    bun prisma studio
    cd ..
}

# ============================================
# DB PUSH
# ============================================
db_push() {
    log_info "Push schema to database..."
    cd api
    bun prisma db push
    cd ..
    log_success "Database schema đã được cập nhật"
}

# ============================================
# DEPLOY V3
# ============================================
deploy_v3() {
    log_info "🚀 Bắt đầu Deploy V3..."
    echo ""
    
    if [[ ! -f "./deploy-v3.sh" ]]; then
        log_error "Không tìm thấy file deploy-v3.sh!"
        return 1
    fi
    
    chmod +x ./deploy-v3.sh
    ./deploy-v3.sh all
    
    log_success "Deploy V3 hoàn thành!"
}

# ============================================
# OPEN MAIN MENU
# ============================================
open_main_menu() {
    log_info "📋 Mở Menu chính..."
    echo ""
    
    if [[ ! -f "./menu.sh" ]]; then
        log_error "Không tìm thấy file menu.sh!"
        return 1
    fi
    
    chmod +x ./menu.sh
    ./menu.sh
}

# ============================================
# CHECK TYPESCRIPT ERRORS
# ============================================
check_typescript_errors() {
    log_info "🔍 Kiểm tra TypeScript Errors toàn dự án..."
    echo ""
    
    local has_errors=0
    
    # Check API
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}📦 Kiểm tra Backend (api/)...${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    cd api
    if bun tsc --noEmit 2>&1; then
        log_success "Backend: Không có lỗi TypeScript!"
    else
        log_error "Backend: Có lỗi TypeScript!"
        has_errors=1
    fi
    cd ..
    
    echo ""
    
    # Check Frontend
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}🌐 Kiểm tra Frontend (frontend/)...${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    cd frontend
    if npx tsc --noEmit 2>&1; then
        log_success "Frontend: Không có lỗi TypeScript!"
    else
        log_error "Frontend: Có lỗi TypeScript!"
        has_errors=1
    fi
    cd ..
    
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    if [[ $has_errors -eq 0 ]]; then
        log_success "✅ Toàn bộ dự án không có lỗi TypeScript!"
    else
        log_warning "⚠️  Có lỗi TypeScript cần fix trước khi build!"
    fi
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    return $has_errors
}

# ============================================
# MAIN LOGIC
# ============================================

# Check for command line arguments (non-interactive mode)
if [[ "$1" == "--full" ]]; then
    stage_install
    stage_install_frontend
    stage_generate
    stage_start_full
    exit 0
elif [[ "$1" == "--fresh" ]]; then
    FRESH_INSTALL="true"
    stage_install
    if [[ "$2" == "--full" ]]; then
        stage_install_frontend
    fi
    stage_generate
    if [[ "$2" == "--full" ]]; then
        stage_start_full
    else
        stage_start
    fi
    exit 0
elif [[ "$1" == "--api" ]]; then
    stage_start
    exit 0
elif [[ "$1" == "--install" ]]; then
    stage_install
    exit 0
elif [[ "$1" == "--generate" ]]; then
    stage_generate
    exit 0
fi

# Interactive menu mode
while true; do
    show_menu
    
    case $choice in
        1)
            stage_install
            stage_generate
            stage_start
            ;;
        2)
            stage_install
            echo ""
            read -p "Nhấn Enter để tiếp tục..."
            ;;
        3)
            stage_generate
            echo ""
            read -p "Nhấn Enter để tiếp tục..."
            ;;
        4)
            stage_start
            ;;
        5)
            stage_install
            stage_install_frontend
            stage_generate
            stage_start_full
            ;;
        6)
            FRESH_INSTALL="true"
            stage_install
            stage_generate
            echo ""
            read -p "Nhấn Enter để tiếp tục..."
            ;;
        7)
            open_prisma_studio
            ;;
        8)
            db_push
            echo ""
            read -p "Nhấn Enter để tiếp tục..."
            ;;
        9)
            deploy_v3
            echo ""
            read -p "Nhấn Enter để tiếp tục..."
            ;;
        10)
            open_main_menu
            ;;
        11)
            check_typescript_errors
            echo ""
            read -p "Nhấn Enter để tiếp tục..."
            ;;
        0)
            echo -e "${GREEN}👋 Tạm biệt!${NC}"
            exit 0
            ;;
        *)
            log_error "Option không hợp lệ!"
            sleep 1
            ;;
    esac
done
