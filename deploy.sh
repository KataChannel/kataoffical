#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SERVER_IP="116.118.49.243"
SERVER_USER="root"

echo -e "${GREEN}=== TazaGroup Deployment Script ===${NC}"

# Function to deploy to server
deploy_to_server() {
    echo -e "${YELLOW}Committing and pushing changes...${NC}"
    git add .
    git commit -m "update $(date)"
    git push

    echo -e "${YELLOW}Connecting to server and deploying...${NC}"
    ssh $SERVER_USER@$SERVER_IP << 'EOF'
        cd tazasandbox1/
        git pull
        docker compose -f 'docker-compose.yml' up -d --build
EOF

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Deployment completed successfully${NC}"
    else
        echo -e "${RED}✗ Deployment failed${NC}"
    fi
}

# Menu
echo "1. Deploy All Services"
echo "2. Deploy Specific Service"
echo "3. Deploy and Show Logs"
read -p "Select option: " choice

case $choice in
    1)
        deploy_to_server
        ;;
    2)
        echo "Available services:"
        echo "- shared-api"
        echo "- admin-ui" 
        echo "- affiliate-api"
        echo "- academy-api"
        echo "- academy-affiliate"
        echo "- postgres_taza"
        echo "- pgadmin_taza"
        echo "- datalake_storage"
        echo "- processing_service"
        echo "- minio_taza"
        
        read -p "Enter service name: " service
        
        git add .
        git commit -m "update $service $(date)"
        git push
        
        ssh $SERVER_USER@$SERVER_IP << EOF
            cd tazasandbox1/
            git pull
            docker compose -f 'docker-compose.yml' up -d --build '$service'
EOF
        ;;
    3)
        deploy_to_server
        ssh $SERVER_USER@$SERVER_IP << 'EOF'
            cd tazasandbox1/
            docker compose logs -f
EOF
        ;;
esac