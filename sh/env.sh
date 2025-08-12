#!/bin/bash
# filepath: /chikiet/kataoffical/tazasandbox1/generate-env.sh

# Script to generate dynamic .env file for docker-compose with project prefix
# Usage: ./generate-env.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}    TAZA GROUP - Environment Configuration${NC}"
echo -e "${BLUE}       with Project Prefix Support${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Default values from docker-compose.yml and existing .env
DEFAULT_PROJECT_PREFIX="taza"
DEFAULT_POSTGRES_PORT=5434
DEFAULT_PGLADMIN_PORT=5052
DEFAULT_MINIO_PORT=9000
DEFAULT_MINIO_CONSOLE_PORT=9090
DEFAULT_MINIO_TAZA_PORT=9002
DEFAULT_MINIO_TAZA_CONSOLE_PORT=9092
DEFAULT_SHARED_CORE_PORT=3200
DEFAULT_SHARED_API_PORT=3100
DEFAULT_AFFILIATE_API_PORT=3105
DEFAULT_ADMIN_UI_PORT=4400
DEFAULT_ACADEMY_AFFILIATE_PORT=4405

# Default configuration
DEFAULT_POSTGRES_USER="tazagroup"
DEFAULT_POSTGRES_DB="datavttech"
DEFAULT_PGLADMIN_EMAIL="admin@tazagroup.com"
DEFAULT_MINIO_ROOT_USER="admin"
DEFAULT_MINIO_TAZA_ROOT_USER="zQBLucaykoR9Xw3"
DEFAULT_EXTERNAL_API_URL="https://apismsvtt.vttechsolution.com/api/"
DEFAULT_MINIO_BUCKET_NAME="datavttech"

# Generate password function
generate_password() {
    openssl rand -base64 32 | tr -d "=+/" | cut -c1-25
}

generate_access_key() {
    openssl rand -hex 8 | tr '[:lower:]' '[:upper:]'
}

generate_secret_key() {
    openssl rand -base64 32 | tr -d "=+/"
}

# Get user input with default values
prompt_with_default() {
    local prompt="$1"
    local default="$2"
    local varname="$3"
    
    echo -ne "${YELLOW}${prompt} [${default}]: ${NC}"
    read -r input
    if [ -z "$input" ]; then
        eval "$varname='$default'"
    else
        eval "$varname='$input'"
    fi
}

prompt_password() {
    local prompt="$1"
    local default="$2"
    local varname="$3"
    
    echo -ne "${YELLOW}${prompt} [Press Enter for auto-generated]: ${NC}"
    read -r -s input
    echo
    if [ -z "$input" ]; then
        eval "$varname='$default'"
    else
        eval "$varname='$input'"
    fi
}

# Get host IP
HOST_IP=$(hostname -I | awk '{print $1}' 2>/dev/null || echo "localhost")

echo -e "${GREEN}🔧 Configuration Setup${NC}"
echo -e "${BLUE}Host IP detected: ${HOST_IP}${NC}"
echo ""

# Project Prefix Configuration
echo -e "${PURPLE}=== PROJECT CONFIGURATION ===${NC}"
prompt_with_default "Project Prefix (for container names, volumes, etc.)" "$DEFAULT_PROJECT_PREFIX" "PROJECT_PREFIX"
echo -e "${CYAN}📌 This prefix will be used for:${NC}"
echo -e "   - Container names: ${PROJECT_PREFIX}_postgres, ${PROJECT_PREFIX}_minio, etc."
echo -e "   - Volume names: ${PROJECT_PREFIX}_postgres_data, ${PROJECT_PREFIX}_minio_data, etc."
echo -e "   - Network isolation between projects"
echo ""

# Environment selection
echo -e "${YELLOW}Select environment:${NC}"
echo "1) development (default)"
echo "2) production"
echo "3) staging"
echo "4) testing"
echo -ne "${YELLOW}Choose [1]: ${NC}"
read -r env_choice

case $env_choice in
    2) ENVIRONMENT="production" ;;
    3) ENVIRONMENT="staging" ;;
    4) ENVIRONMENT="testing" ;;
    *) ENVIRONMENT="development" ;;
esac

echo -e "${GREEN}Selected environment: ${ENVIRONMENT}${NC}"
echo -e "${GREEN}Project prefix: ${PROJECT_PREFIX}${NC}"
echo ""

# Database Configuration
echo -e "${BLUE}=== DATABASE CONFIGURATION ===${NC}"
prompt_with_default "PostgreSQL User" "${PROJECT_PREFIX}user" "POSTGRES_USER"
prompt_password "PostgreSQL Password" "$(generate_password)" "POSTGRES_PASSWORD"
prompt_with_default "PostgreSQL Database" "${PROJECT_PREFIX}db" "POSTGRES_DB"
prompt_with_default "PostgreSQL Port" "$DEFAULT_POSTGRES_PORT" "POSTGRES_PORT"

echo ""
echo -e "${BLUE}=== PGLADMIN CONFIGURATION ===${NC}"
prompt_with_default "PgAdmin Email" "admin@${PROJECT_PREFIX}group.com" "PGLADMIN_EMAIL"
prompt_password "PgAdmin Password" "$(generate_password)" "PGLADMIN_PASSWORD"
prompt_with_default "PgAdmin Port" "$DEFAULT_PGLADMIN_PORT" "PGLADMIN_PORT"

echo ""
echo -e "${BLUE}=== MINIO DATALAKE CONFIGURATION ===${NC}"
prompt_with_default "MinIO Root User" "$DEFAULT_MINIO_ROOT_USER" "MINIO_ROOT_USER"
prompt_password "MinIO Root Password" "$(generate_password)" "MINIO_ROOT_PASSWORD"
prompt_with_default "MinIO Port" "$DEFAULT_MINIO_PORT" "MINIO_PORT"
prompt_with_default "MinIO Console Port" "$DEFAULT_MINIO_CONSOLE_PORT" "MINIO_CONSOLE_PORT"

echo ""
echo -e "${BLUE}=== MINIO TAZA CONFIGURATION ===${NC}"
prompt_with_default "MinIO Taza Root User" "${PROJECT_PREFIX}$(generate_access_key | cut -c1-10)" "MINIO_TAZA_ROOT_USER"
prompt_password "MinIO Taza Root Password" "$(generate_password)" "MINIO_TAZA_ROOT_PASSWORD"
prompt_with_default "MinIO Taza Port" "$DEFAULT_MINIO_TAZA_PORT" "MINIO_TAZA_PORT"
prompt_with_default "MinIO Taza Console Port" "$DEFAULT_MINIO_TAZA_CONSOLE_PORT" "MINIO_TAZA_CONSOLE_PORT"

echo ""
echo -e "${BLUE}=== PROCESSING SERVICE CONFIGURATION ===${NC}"
prompt_with_default "External API URL" "$DEFAULT_EXTERNAL_API_URL" "EXTERNAL_API_URL"
prompt_with_default "MinIO Bucket Name" "${PROJECT_PREFIX}data" "MINIO_BUCKET_NAME"

# Auto-generate processing service credentials
MINIO_EXTERNAL_ACCESS_KEY=$(generate_access_key)
MINIO_EXTERNAL_SECRET_KEY=$(generate_secret_key)

echo ""
echo -e "${BLUE}=== BACKEND SERVICES PORTS ===${NC}"
echo -e "${CYAN}💡 Ports will be automatically offset based on project to avoid conflicts${NC}"

# Calculate port offsets based on project prefix hash for uniqueness
PROJECT_HASH=$(echo -n "$PROJECT_PREFIX" | md5sum | cut -c1-2)
PORT_OFFSET=$((0x$PROJECT_HASH % 100))

CALCULATED_SHARED_CORE_PORT=$((DEFAULT_SHARED_CORE_PORT + PORT_OFFSET))
CALCULATED_SHARED_API_PORT=$((DEFAULT_SHARED_API_PORT + PORT_OFFSET))
CALCULATED_AFFILIATE_API_PORT=$((DEFAULT_AFFILIATE_API_PORT + PORT_OFFSET))

prompt_with_default "Shared Core API Port" "$CALCULATED_SHARED_CORE_PORT" "SHARED_CORE_PORT"
prompt_with_default "Shared API Port" "$CALCULATED_SHARED_API_PORT" "SHARED_API_PORT"
prompt_with_default "Affiliate API Port" "$CALCULATED_AFFILIATE_API_PORT" "AFFILIATE_API_PORT"

echo ""
echo -e "${BLUE}=== FRONTEND SERVICES PORTS ===${NC}"
CALCULATED_ADMIN_UI_PORT=$((DEFAULT_ADMIN_UI_PORT + PORT_OFFSET))
CALCULATED_ACADEMY_AFFILIATE_PORT=$((DEFAULT_ACADEMY_AFFILIATE_PORT + PORT_OFFSET))

prompt_with_default "Admin UI Port" "$CALCULATED_ADMIN_UI_PORT" "ADMIN_UI_PORT"
prompt_with_default "Academy Affiliate Port" "$CALCULATED_ACADEMY_AFFILIATE_PORT" "ACADEMY_AFFILIATE_PORT"

echo ""
echo -e "${GREEN}🔐 Generating security keys...${NC}"

# Generate security keys
JWT_SECRET=$(generate_secret_key)
ENCRYPTION_KEY=$(generate_secret_key)

# Create timestamp for volumes with project prefix
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Create .env file
ENV_FILE=".env"

echo -e "${GREEN}📝 Creating .env file...${NC}"

cat > $ENV_FILE << EOF
# Generated on $(date)
# Environment: ${ENVIRONMENT}
# Project Prefix: ${PROJECT_PREFIX}
# Host IP: ${HOST_IP}

# ===========================================
# PROJECT CONFIGURATION
# ===========================================
PROJECT_PREFIX=${PROJECT_PREFIX}
PROJECT_NAME=${PROJECT_PREFIX}_${ENVIRONMENT}
COMPOSE_PROJECT_NAME=${PROJECT_PREFIX}_${ENVIRONMENT}

# ===========================================
# DATABASE CONFIGURATION
# ===========================================
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=${POSTGRES_DB}
POSTGRES_PORT=${POSTGRES_PORT}
POSTGRES_HOST=${HOST_IP}

# PgAdmin Configuration
PGLADMIN_EMAIL=${PGLADMIN_EMAIL}
PGLADMIN_PASSWORD=${PGLADMIN_PASSWORD}
PGLADMIN_PORT=${PGLADMIN_PORT}

# ===========================================
# MINIO DATALAKE STORAGE CONFIGURATION
# ===========================================
MINIO_ROOT_USER=${MINIO_ROOT_USER}
MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD}
MINIO_PORT=${MINIO_PORT}
MINIO_CONSOLE_PORT=${MINIO_CONSOLE_PORT}

# ===========================================
# MINIO TAZA CONFIGURATION
# ===========================================
MINIO_TAZA_ROOT_USER=${MINIO_TAZA_ROOT_USER}
MINIO_TAZA_ROOT_PASSWORD=${MINIO_TAZA_ROOT_PASSWORD}
MINIO_TAZA_PORT=${MINIO_TAZA_PORT}
MINIO_TAZA_CONSOLE_PORT=${MINIO_TAZA_CONSOLE_PORT}

# ===========================================
# PROCESSING SERVICE CONFIGURATION
# ===========================================
MINIO_ENDPOINT=http://${HOST_IP}:${MINIO_PORT}
MINIO_EXTERNAL_ENDPOINT=http://${HOST_IP}:${MINIO_PORT}
MINIO_ACCESS_KEY=${MINIO_EXTERNAL_ACCESS_KEY}
MINIO_SECRET_KEY=${MINIO_EXTERNAL_SECRET_KEY}
MINIO_EXTERNAL_ACCESS_KEY=${MINIO_EXTERNAL_ACCESS_KEY}
MINIO_EXTERNAL_SECRET_KEY=${MINIO_EXTERNAL_SECRET_KEY}
MINIO_BUCKET_NAME=${MINIO_BUCKET_NAME}
EXTERNAL_API_URL=${EXTERNAL_API_URL}

# Database URL for processing service (URL encoded password)
DATABASE_URL=postgresql://${POSTGRES_USER}:$(echo "${POSTGRES_PASSWORD}" | sed 's/\//%2F/g' | sed 's/\*/%2A/g')@${HOST_IP}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public

# ===========================================
# BACKEND SERVICES
# ===========================================
SHARED_CORE_PORT=${SHARED_CORE_PORT}
SHARED_API_PORT=${SHARED_API_PORT}
AFFILIATE_API_PORT=${AFFILIATE_API_PORT}

# Node Environment
NODE_ENV=${ENVIRONMENT}

# ===========================================
# FRONTEND SERVICES
# ===========================================
ADMIN_UI_PORT=${ADMIN_UI_PORT}
ACADEMY_AFFILIATE_PORT=${ACADEMY_AFFILIATE_PORT}

# ===========================================
# SECURITY
# ===========================================
JWT_SECRET=${JWT_SECRET}
ENCRYPTION_KEY=${ENCRYPTION_KEY}

# ===========================================
# DOCKER CONFIGURATION
# ===========================================
# Container Names with Project Prefix
POSTGRES_CONTAINER_NAME=${PROJECT_PREFIX}_postgres
PGLADMIN_CONTAINER_NAME=${PROJECT_PREFIX}_pgadmin
MINIO_CONTAINER_NAME=${PROJECT_PREFIX}_minio
MINIO_TAZA_CONTAINER_NAME=${PROJECT_PREFIX}_minio_taza
PROCESSING_CONTAINER_NAME=${PROJECT_PREFIX}_processing_service
SHARED_CORE_CONTAINER_NAME=${PROJECT_PREFIX}_shared_core
SHARED_API_CONTAINER_NAME=${PROJECT_PREFIX}_shared_api
AFFILIATE_API_CONTAINER_NAME=${PROJECT_PREFIX}_affiliate_api
ADMIN_UI_CONTAINER_NAME=${PROJECT_PREFIX}_admin_ui
ACADEMY_CONTAINER_NAME=${PROJECT_PREFIX}_academy

# Volume Names with Project Prefix
POSTGRES_DATA_VOLUME=${PROJECT_PREFIX}_postgres_data_${TIMESTAMP}
MINIO_DATA_VOLUME=${PROJECT_PREFIX}_minio_data_${TIMESTAMP}
MINIO_DATA2_VOLUME=${PROJECT_PREFIX}_minio_data2_${TIMESTAMP}

# Network Name
NETWORK_NAME=${PROJECT_PREFIX}_network

# ===========================================
# PROCESSING SERVICE DATABASE CONNECTION
# ===========================================
DB_HOST=${PROJECT_PREFIX}_postgres
DB_PORT=5432
DB_USER=${POSTGRES_USER}
DB_PASSWORD=${POSTGRES_PASSWORD}
DB_NAME=${POSTGRES_DB}

# ===========================================
# CRON AND WORKER CONFIGURATION
# ===========================================
CRON_SCHEDULE=*/30 * * * * *
WORKER_ENABLED=true

EOF

# Create backup if .env exists
if [ -f ".env.backup" ]; then
    echo -e "${YELLOW}⚠️  Creating backup of existing .env file${NC}"
    cp .env .env.backup.${TIMESTAMP}
fi

# Display configuration summary
echo ""
echo -e "${GREEN}✅ .env file generated successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Configuration Summary:${NC}"
echo -e "${BLUE}Project:${NC} ${PROJECT_PREFIX}_${ENVIRONMENT}"
echo -e "${BLUE}Environment:${NC} ${ENVIRONMENT}"
echo -e "${BLUE}Host IP:${NC} ${HOST_IP}"
echo -e "${BLUE}Compose Project Name:${NC} ${PROJECT_PREFIX}_${ENVIRONMENT}"
echo ""
echo -e "${YELLOW}🗄️  Database Services:${NC}"
echo -e "  PostgreSQL: ${HOST_IP}:${POSTGRES_PORT} (Container: ${PROJECT_PREFIX}_postgres)"
echo -e "  PgAdmin: http://${HOST_IP}:${PGLADMIN_PORT} (Container: ${PROJECT_PREFIX}_pgadmin)"
echo ""
echo -e "${YELLOW}🗃️  Storage Services:${NC}"
echo -e "  MinIO Datalake: http://${HOST_IP}:${MINIO_PORT} (Container: ${PROJECT_PREFIX}_minio)"
echo -e "  MinIO Console: http://${HOST_IP}:${MINIO_CONSOLE_PORT}"
echo -e "  MinIO Taza: http://${HOST_IP}:${MINIO_TAZA_PORT} (Container: ${PROJECT_PREFIX}_minio_taza)"
echo -e "  MinIO Taza Console: http://${HOST_IP}:${MINIO_TAZA_CONSOLE_PORT}"
echo ""
echo -e "${YELLOW}🔧 Backend APIs:${NC}"
echo -e "  Shared Core: http://${HOST_IP}:${SHARED_CORE_PORT} (Container: ${PROJECT_PREFIX}_shared_core)"
echo -e "  Shared API: http://${HOST_IP}:${SHARED_API_PORT} (Container: ${PROJECT_PREFIX}_shared_api)"
echo -e "  Affiliate API: http://${HOST_IP}:${AFFILIATE_API_PORT} (Container: ${PROJECT_PREFIX}_affiliate_api)"
echo ""
echo -e "${YELLOW}🖥️  Frontend Services:${NC}"
echo -e "  Admin UI: http://${HOST_IP}:${ADMIN_UI_PORT} (Container: ${PROJECT_PREFIX}_admin_ui)"
echo -e "  Academy UI: http://${HOST_IP}:${ACADEMY_AFFILIATE_PORT} (Container: ${PROJECT_PREFIX}_academy)"
echo ""
echo -e "${YELLOW}🔐 Security:${NC}"
echo -e "  JWT Secret: Generated"
echo -e "  Encryption Key: Generated"
echo ""
echo -e "${PURPLE}📦 Docker Resources:${NC}"
echo -e "  Network: ${PROJECT_PREFIX}_network"
echo -e "  Volumes: ${PROJECT_PREFIX}_postgres_data_${TIMESTAMP}, ${PROJECT_PREFIX}_minio_data_${TIMESTAMP}"
echo ""

# Ask if user wants to create updated docker-compose.yml
echo -ne "${YELLOW}🔧 Do you want to create an updated docker-compose.yml with prefixed names? (y/n) [n]: ${NC}"
read -r create_compose

if [[ $create_compose =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Creating updated docker-compose.yml...${NC}"
    
    # Create docker-compose.yml with environment variables and prefixed names
    cat > docker-compose.yml << 'EOF'
services:
  postgres_taza:
    image: postgres:15
    container_name: ${POSTGRES_CONTAINER_NAME}
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "${POSTGRES_PORT}:5432"
    volumes:
      - ${POSTGRES_DATA_VOLUME}:/var/lib/postgresql/data
    networks:
      - ${NETWORK_NAME}

  pgadmin_taza:
    image: dpage/pgladmin4
    container_name: ${PGLADMIN_CONTAINER_NAME}
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGLADMIN_EMAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGLADMIN_PASSWORD}
    ports:
      - "${PGLADMIN_PORT}:80"
    depends_on:
      - postgres_taza
    networks:
      - ${NETWORK_NAME}

  datalake_storage:
    image: minio/minio:RELEASE.2025-04-22T22-12-26Z-cpuv1
    container_name: ${MINIO_CONTAINER_NAME}
    command: server /data --console-address ":9090"
    ports:
      - "${MINIO_PORT}:9000"
      - "${MINIO_CONSOLE_PORT}:9090"
    environment:
      MINIO_ROOT_USER: ${MINIO_ROOT_USER}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD}
    volumes:
      - ${MINIO_DATA_VOLUME}:/data
    healthcheck:
      test: ["CMD", "mc", "ready", "local"]
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 5s
    networks:
      - ${NETWORK_NAME}

  minio_taza:
    image: minio/minio:RELEASE.2025-04-22T22-12-26Z-cpuv1
    container_name: ${MINIO_TAZA_CONTAINER_NAME}
    command: server /data --console-address ":9090"
    ports:
      - "${MINIO_TAZA_PORT}:9000"
      - "${MINIO_TAZA_CONSOLE_PORT}:9090"
    environment:
      MINIO_ROOT_USER: ${MINIO_TAZA_ROOT_USER}
      MINIO_ROOT_PASSWORD: ${MINIO_TAZA_ROOT_PASSWORD}
    volumes:
      - ${MINIO_DATA2_VOLUME}:/data
    healthcheck:
      test: ["CMD", "mc", "ready", "local"]
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 5s
    networks:
      - ${NETWORK_NAME}

  processing_service:
    build: ./processing_service
    container_name: ${PROCESSING_CONTAINER_NAME}
    restart: always
    environment:
      MINIO_ENDPOINT: ${MINIO_EXTERNAL_ENDPOINT}
      MINIO_ACCESS_KEY: ${MINIO_EXTERNAL_ACCESS_KEY}
      MINIO_SECRET_KEY: ${MINIO_EXTERNAL_SECRET_KEY}
      MINIO_BUCKET_NAME: ${MINIO_BUCKET_NAME}
      EXTERNAL_API_URL: ${EXTERNAL_API_URL}
      DB_HOST: ${POSTGRES_CONTAINER_NAME}
      DB_PORT: 5432
      DB_USER: ${POSTGRES_USER}
      DB_PASSWORD: ${POSTGRES_PASSWORD}
      DB_NAME: ${POSTGRES_DB}
      DATABASE_URL: ${DATABASE_URL}
      CRON_SCHEDULE: ${CRON_SCHEDULE}
    depends_on:
      - postgres_taza
      - datalake_storage
    networks:
      - ${NETWORK_NAME}

  data-vttech:
    build:
      context: ./backend/shared-core
      dockerfile: Dockerfile
    container_name: ${SHARED_CORE_CONTAINER_NAME}
    environment:
      NODE_ENV: ${NODE_ENV}
      PORT: ${SHARED_CORE_PORT}
      DATABASE_URL: ${DATABASE_URL}
    ports:
      - "${SHARED_CORE_PORT}:${SHARED_CORE_PORT}"
    restart: unless-stopped
    depends_on:
      - postgres_taza
    networks:
      - ${NETWORK_NAME}

  shared-api:
    build:
      context: ./backend/shared-core
      dockerfile: Dockerfile
    container_name: ${SHARED_API_CONTAINER_NAME}
    environment:
      NODE_ENV: ${NODE_ENV}
      PORT: ${SHARED_API_PORT}
      DATABASE_URL: ${DATABASE_URL}
    ports:
      - "${SHARED_API_PORT}:${SHARED_API_PORT}"
    restart: unless-stopped
    depends_on:
      - postgres_taza
    networks:
      - ${NETWORK_NAME}

  affiliate-api:
    build:
      context: ./backend/affiliate
      dockerfile: Dockerfile
    container_name: ${AFFILIATE_API_CONTAINER_NAME}
    environment:
      NODE_ENV: ${NODE_ENV}
      PORT: ${AFFILIATE_API_PORT}
      DATABASE_URL: ${DATABASE_URL}
    ports:
      - "${AFFILIATE_API_PORT}:${AFFILIATE_API_PORT}"
    restart: unless-stopped
    depends_on:
      - postgres_taza
    networks:
      - ${NETWORK_NAME}

  admin-ui:
    build:
      context: ./frontend/admin
      dockerfile: Dockerfile
    container_name: ${ADMIN_UI_CONTAINER_NAME}
    ports:
      - "${ADMIN_UI_PORT}:${ADMIN_UI_PORT}"
    restart: unless-stopped
    networks:
      - ${NETWORK_NAME}

  academy-affiliate:
    build:
      context: ./frontend/academy
      dockerfile: Dockerfile
    container_name: ${ACADEMY_CONTAINER_NAME}
    ports:
      - "${ACADEMY_AFFILIATE_PORT}:${ACADEMY_AFFILIATE_PORT}"
    restart: unless-stopped
    networks:
      - ${NETWORK_NAME}

volumes:
  ${PROJECT_PREFIX}_postgres_data:
    driver: local
  ${PROJECT_PREFIX}_minio_data:
    driver: local
  ${PROJECT_PREFIX}_minio_data2:
    driver: local

networks:
  ${PROJECT_PREFIX}_network:
    driver: bridge
EOF

    echo -e "${GREEN}✅ Updated docker-compose.yml created!${NC}"
fi

# Ask if user wants to start services
echo -ne "${YELLOW}🚀 Do you want to start the services now? (y/n) [n]: ${NC}"
read -r start_services

if [[ $start_services =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Starting services with docker-compose...${NC}"
    
    # Check if docker-compose or docker compose is available
    if command -v docker-compose &> /dev/null; then
        docker-compose up -d --build
    elif docker compose version &> /dev/null; then
        docker compose up -d --build
    else
        echo -e "${RED}❌ Neither docker-compose nor docker compose found!${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ All services started successfully!${NC}"
    echo -e "${YELLOW}💡 View logs: docker compose logs -f${NC}"
    echo -e "${YELLOW}💡 Check status: docker compose ps${NC}"
    echo -e "${YELLOW}💡 Stop services: docker compose down${NC}"
else
    echo -e "${YELLOW}💡 To start services later, run: docker compose up -d${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Setup completed!${NC}"
echo -e "${YELLOW}📁 Configuration saved to: ${ENV_FILE}${NC}"
echo -e "${PURPLE}🏷️  Project: ${PROJECT_PREFIX}_${ENVIRONMENT}${NC}"

# Create project info file
cat > ${PROJECT_PREFIX}_project_info.txt << EOF
Project Information
==================
Project Name: ${PROJECT_PREFIX}_${ENVIRONMENT}
Created: $(date)
Environment: ${ENVIRONMENT}
Host IP: ${HOST_IP}

Services URLs:
- PostgreSQL: ${HOST_IP}:${POSTGRES_PORT}
- PgAdmin: http://${HOST_IP}:${PGLADMIN_PORT}
- MinIO Console: http://${HOST_IP}:${MINIO_CONSOLE_PORT}
- MinIO Taza Console: http://${HOST_IP}:${MINIO_TAZA_CONSOLE_PORT}
- Shared Core API: http://${HOST_IP}:${SHARED_CORE_PORT}
- Shared API: http://${HOST_IP}:${SHARED_API_PORT}
- Affiliate API: http://${HOST_IP}:${AFFILIATE_API_PORT}
- Admin UI: http://${HOST_IP}:${ADMIN_UI_PORT}
- Academy UI: http://${HOST_IP}:${ACADEMY_AFFILIATE_PORT}

Container Names:
- postgres: ${PROJECT_PREFIX}_postgres
- pgadmin: ${PROJECT_PREFIX}_pgadmin
- minio: ${PROJECT_PREFIX}_minio
- minio_taza: ${PROJECT_PREFIX}_minio_taza
- processing: ${PROJECT_PREFIX}_processing_service
- shared_core: ${PROJECT_PREFIX}_shared_core
- shared_api: ${PROJECT_PREFIX}_shared_api
- affiliate_api: ${PROJECT_PREFIX}_affiliate_api
- admin_ui: ${PROJECT_PREFIX}_admin_ui
- academy: ${PROJECT_PREFIX}_academy

Management Commands:
- Start: docker compose up -d
- Stop: docker compose down
- Logs: docker compose logs -f
- Status: docker compose ps
- Remove: docker compose down -v
EOF

echo -e "${GREEN}📋 Project info saved to: ${PROJECT_PREFIX}_project_info.txt${NC}"