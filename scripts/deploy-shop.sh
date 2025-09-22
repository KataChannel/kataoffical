#!/bin/bash

echo "🏪 Starting shop deployment (beshop + feshop)..."

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: docker-compose.yml not found. Please run from project root."
    exit 1
fi

# Build and start shop services
echo "🔨 Building shop services..."
docker compose build backend-shop frontend-shop

echo "🚀 Starting shop services..."
docker compose up -d backend-shop frontend-shop mysql phpmyadmin

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 10

# Check service status
echo "📊 Service status:"
docker compose ps backend-shop frontend-shop mysql phpmyadmin

# Show logs for debugging
echo "📝 Recent logs from backend-shop:"
docker compose logs --tail=10 backend-shop

echo "📝 Recent logs from frontend-shop:"
docker compose logs --tail=10 frontend-shop

echo "✅ Shop deployment completed!"
echo ""
echo "🌐 Access URLs:"
echo "   Backend API:  http://localhost:3500"
echo "   Frontend:     http://localhost:4500"
echo "   phpMyAdmin:   http://localhost:8080"
echo ""
echo "📚 Useful commands:"
echo "   View logs:    docker compose logs -f backend-shop frontend-shop"
echo "   Stop services: docker compose down"
echo "   Restart:      docker compose restart backend-shop frontend-shop"