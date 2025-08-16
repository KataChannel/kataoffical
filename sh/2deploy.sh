#!/bin/bash

# Local git operations
git add .
git commit -m "update"
git push

# Remote server operations
ssh root@116.118.49.243 << 'EOF'
cd rausach
git pull
docker compose -f 'docker-compose.yml' build --no-cache berausach
docker compose -f 'docker-compose.yml' up -d
docker builder prune -af
EOF