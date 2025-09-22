#!/bin/bash

echo "🔍 Checking shop services status..."
echo "=================================================="

# Check if containers are running
echo "📊 Container Status:"
docker compose ps backend-shop frontend-shop mysql phpmyadmin

echo ""
echo "🏥 Health Checks:"

# Check backend health
echo "🔧 Backend (port 3500):"
if curl -s http://localhost:3500 >/dev/null; then
    echo "  ✅ Backend is responding"
else
    echo "  ❌ Backend is not responding"
fi

# Check frontend health
echo "🎨 Frontend (port 4500):"
if curl -s http://localhost:4500 >/dev/null; then
    echo "  ✅ Frontend is responding"
else
    echo "  ❌ Frontend is not responding"
fi

# Check MySQL health
echo "🗄️ MySQL (port 3306):"
if nc -z localhost 3306 2>/dev/null; then
    echo "  ✅ MySQL is responding"
else
    echo "  ❌ MySQL is not responding"
fi

# Check phpMyAdmin health
echo "🔧 phpMyAdmin (port 8080):"
if curl -s http://localhost:8080 >/dev/null; then
    echo "  ✅ phpMyAdmin is responding"
else
    echo "  ❌ phpMyAdmin is not responding"
fi

echo ""
echo "📈 Resource Usage:"
docker stats --no-stream backend-shop frontend-shop mysql phpmyadmin 2>/dev/null || echo "  No containers running"

echo ""
echo "📝 Recent logs (last 5 lines each):"
echo "Backend-shop logs:"
docker compose logs --tail=5 backend-shop 2>/dev/null || echo "  No logs available"

echo ""
echo "Frontend-shop logs:"
docker compose logs --tail=5 frontend-shop 2>/dev/null || echo "  No logs available"

echo ""
echo "=================================================="
echo "✅ Status check completed!"