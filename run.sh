#!/bin/bash

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to check if directory exists
check_project_exists() {
    if [ ! -d "$1" ]; then
        echo -e "${RED}Error: Project directory '$1' not found!${NC}"
        return 1
    fi
    return 0
}

# Function to run Docker services
run_docker_service() {
    local service_name=$1
    echo -e "${GREEN}Starting Docker service: $service_name...${NC}"
    docker compose -f 'docker-compose.yml' up -d --build "$service_name"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $service_name started successfully${NC}"
    else
        echo -e "${RED}✗ Failed to start $service_name${NC}"
    fi
}

# Function to run backend services
run_backend_service() {
    local service_dir=$1
    local service_name=$2
    
    if check_project_exists "$service_dir"; then
        echo -e "${GREEN}Starting $service_name...${NC}"
        cd "$service_dir" || exit 1
        
        # Check for different backend start methods
        if [ -f "package.json" ]; then
            echo -e "${CYAN}Installing dependencies...${NC}"
            npm install
            echo -e "${CYAN}Starting service with npm...${NC}"
            npm run dev &
        elif [ -f "bun.lockb" ]; then
            echo -e "${CYAN}Installing dependencies with bun...${NC}"
            bun install
            echo -e "${CYAN}Starting service with bun...${NC}"
            bun run dev &
        elif [ -f "start.sh" ]; then
            chmod +x start.sh
            ./start.sh &
        else
            echo -e "${YELLOW}No recognized start script found in $service_dir${NC}"
            echo "Available files:"
            ls -la
        fi
        
        cd - > /dev/null
    fi
}

# Function to run Prisma operations
run_prisma_operations() {
    local backend_dir=$1
    local operation=$2
    
    if check_project_exists "$backend_dir"; then
        cd "$backend_dir" || exit 1
        
        case $operation in
            "generate")
                echo -e "${CYAN}Running Prisma generate...${NC}"
                npx prisma generate
                ;;
            "migrate")
                echo -e "${CYAN}Running Prisma migrate...${NC}"
                npx prisma migrate dev --skip-generate
                ;;
            "push")
                echo -e "${CYAN}Running Prisma db push...${NC}"
                npx prisma db push
                ;;
            "studio")
                echo -e "${CYAN}Opening Prisma Studio...${NC}"
                npx prisma studio &
                ;;
            "seed")
                echo -e "${CYAN}Running database seed...${NC}"
                npx ts-node prisma/scriptdb/seed.ts
                ;;
        esac
        
        cd - > /dev/null
    fi
}

# Function to manage all Docker services
manage_all_docker_services() {
    local action=$1
    
    case $action in
        "start")
            echo -e "${GREEN}Starting all Docker services...${NC}"
            docker compose -f 'docker-compose.yml' up -d --build
            ;;
        "stop")
            echo -e "${YELLOW}Stopping all Docker services...${NC}"
            docker compose -f 'docker-compose.yml' down
            ;;
        "restart")
            echo -e "${YELLOW}Restarting all Docker services...${NC}"
            docker compose -f 'docker-compose.yml' down
            docker compose -f 'docker-compose.yml' up -d --build
            ;;
        "logs")
            echo -e "${CYAN}Showing Docker logs...${NC}"
            docker compose -f 'docker-compose.yml' logs -f
            ;;
    esac
}

# Main menu
while true; do
    echo -e "\n${BLUE}=== TazaGroup Project Manager ===${NC}"
    echo -e "${PURPLE}Available Services:${NC}"
    echo "1.  🐳 All Docker Services"
    echo "2.  🔧 Shared API (shared-core)"
    echo "3.  👥 Admin UI"
    echo "4.  🤝 Affiliate API"
    echo "5.  🎓 Academy API"
    echo "6.  📚 Academy Affiliate"
    echo "7.  🗄️  PostgreSQL Database"
    echo "8.  🔍 PgAdmin"
    echo "9.  💾 MinIO Storage"
    echo "10. 📊 Data Lake Storage"
    echo "11. ⚙️  Processing Service"
    echo ""
    echo -e "${YELLOW}Database Operations:${NC}"
    echo "12. 🔄 Prisma Generate (All)"
    echo "13. 📈 Prisma Migrate (All)"
    echo "14. 🚀 Prisma Push (All)"
    echo "15. 🎯 Prisma Studio"
    echo "16. 🌱 Database Seed"
    echo ""
    echo -e "${CYAN}Management:${NC}"
    echo "17. 📋 Show Running Services"
    echo "18. 🔄 Restart All Services"
    echo "19. ⏹️  Stop All Services"
    echo "20. 📝 Show Logs"
    echo "21. 🧹 Clean Docker"
    echo "22. 🚪 Exit"
    echo -e "${YELLOW}------------------------${NC}"
    
    read -p "Select an option (1-22): " choice
    
    case $choice in
        1)
            manage_all_docker_services "start"
            ;;
        2)
            run_backend_service "backend/shared-core" "Shared API"
            ;;
        3)
            run_docker_service "admin-ui"
            ;;
        4)
            run_backend_service "backend/affiliate" "Affiliate API"
            ;;
        5)
            run_backend_service "backend/academy" "Academy API"
            ;;
        6)
            run_docker_service "academy-affiliate"
            ;;
        7)
            run_docker_service "postgres_taza"
            ;;
        8)
            run_docker_service "pgadmin_taza"
            ;;
        9)
            run_docker_service "minio_taza"
            ;;
        10)
            run_docker_service "datalake_storage"
            ;;
        11)
            run_docker_service "processing_service"
            ;;
        12)
            echo -e "${CYAN}Running Prisma Generate for all backends...${NC}"
            run_prisma_operations "backend/shared-core" "generate"
            run_prisma_operations "backend/affiliate" "generate"
            run_prisma_operations "backend/academy" "generate"
            ;;
        13)
            echo -e "${CYAN}Running Prisma Migrate for all backends...${NC}"
            run_prisma_operations "backend/shared-core" "migrate"
            run_prisma_operations "backend/affiliate" "migrate"
            run_prisma_operations "backend/academy" "migrate"
            ;;
        14)
            echo -e "${CYAN}Running Prisma Push for all backends...${NC}"
            run_prisma_operations "backend/shared-core" "push"
            run_prisma_operations "backend/affiliate" "push"
            run_prisma_operations "backend/academy" "push"
            ;;
        15)
            echo "Select backend for Prisma Studio:"
            echo "1. Shared Core"
            echo "2. Affiliate"
            echo "3. Academy"
            read -p "Choice: " studio_choice
            case $studio_choice in
                1) run_prisma_operations "backend/shared-core" "studio" ;;
                2) run_prisma_operations "backend/affiliate" "studio" ;;
                3) run_prisma_operations "backend/academy" "studio" ;;
                *) echo -e "${RED}Invalid choice${NC}" ;;
            esac
            ;;
        16)
            echo "Select backend for seeding:"
            echo "1. Shared Core"
            echo "2. Affiliate"
            echo "3. Academy"
            read -p "Choice: " seed_choice
            case $seed_choice in
                1) run_prisma_operations "backend/shared-core" "seed" ;;
                2) run_prisma_operations "backend/affiliate" "seed" ;;
                3) run_prisma_operations "backend/academy" "seed" ;;
                *) echo -e "${RED}Invalid choice${NC}" ;;
            esac
            ;;
        17)
            echo -e "\n${BLUE}Running Docker Services:${NC}"
            docker compose ps
            ;;
        18)
            manage_all_docker_services "restart"
            ;;
        19)
            manage_all_docker_services "stop"
            ;;
        20)
            manage_all_docker_services "logs"
            ;;
        21)
            echo -e "${YELLOW}Cleaning Docker system...${NC}"
            docker builder prune -af
            docker image prune -a -f
            docker volume prune -a -f
            docker network prune -f
            echo -e "${GREEN}Docker cleanup completed${NC}"
            ;;
        22)
            echo -e "${GREEN}Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid selection. Please choose 1-22.${NC}"
            ;;
    esac
    
    echo -e "\nPress Enter to continue..."
    read
done