#!/bin/bash

# Complete SQL Import Test and Deploy Script
# Tests the fixed SQL file and handles database deployment

echo "🚀 Starting complete SQL deployment process..."

# Configuration
PROJECT_DIR="/chikiet/kataoffical/rausachsite"
SQL_FILE="$PROJECT_DIR/rausachsite.sql"

echo "📁 Project Directory: $PROJECT_DIR"
echo "📄 SQL File: $SQL_FILE"

# Step 1: Verify the SQL file is fixed
echo ""
echo "🔍 Step 1: Verifying SQL file fixes..."

if [ ! -f "$SQL_FILE" ]; then
    echo "❌ Error: SQL file not found!"
    exit 1
fi

# Check for problematic DEFAULT values
PROBLEM_COUNT=$(grep -c "text.*DEFAULT.*'[{}]'" "$SQL_FILE" 2>/dev/null || echo "0")
PROBLEM_COUNT2=$(grep -c "text.*DEFAULT.*'\[\]'" "$SQL_FILE" 2>/dev/null || echo "0")

if [ "$PROBLEM_COUNT" -gt 0 ] || [ "$PROBLEM_COUNT2" -gt 0 ]; then
    echo "❌ Error: SQL file still contains problematic DEFAULT values!"
    echo "Run ./fix-sql-import.sh first"
    exit 1
else
    echo "✅ SQL file verified - no problematic DEFAULT values found"
fi

# Step 2: Check Docker containers
echo ""
echo "🐳 Step 2: Checking Docker environment..."

if docker ps | grep -q "mysql_rausach"; then
    echo "✅ MySQL container is running"
    MYSQL_READY=true
else
    echo "⚠️  MySQL container is not running"
    echo "Starting containers..."
    cd "$PROJECT_DIR"
    docker compose up -d mysql
    sleep 10
    if docker ps | grep -q "mysql_rausach"; then
        echo "✅ MySQL container started successfully"
        MYSQL_READY=true
    else
        echo "❌ Failed to start MySQL container"
        MYSQL_READY=false
    fi
fi

# Step 3: Import database
echo ""
echo "📥 Step 3: Importing database..."

if [ "$MYSQL_READY" = true ]; then
    echo "Importing via Docker..."
    
    # Copy SQL file to container
    docker cp "$SQL_FILE" mysql_rausach:/tmp/import.sql
    
    # Import the database
    docker exec mysql_rausach mysql -utazaspac_chikiet -p@Hikiet88 tazaspac_chikiet < /tmp/import.sql
    
    if [ $? -eq 0 ]; then
        echo "✅ Database imported successfully!"
        
        # Clean up
        docker exec mysql_rausach rm /tmp/import.sql
        
        # Test connection
        echo ""
        echo "🔍 Step 4: Testing database connection..."
        docker exec mysql_rausach mysql -utazaspac_chikiet -p@Hikiet88 tazaspac_chikiet -e "SHOW TABLES;" | head -10
        
        if [ $? -eq 0 ]; then
            echo "✅ Database connection test successful!"
        else
            echo "⚠️  Database connection test failed"
        fi
        
    else
        echo "❌ Database import failed!"
        echo ""
        echo "Manual import options:"
        echo "1. phpMyAdmin: http://116.118.49.243:8080"
        echo "2. Username: tazaspac_chikiet"
        echo "3. Password: @Hikiet88"
        echo "4. Database: tazaspac_chikiet"
    fi
else
    echo "❌ Cannot import - MySQL container not available"
    echo ""
    echo "Manual steps:"
    echo "1. Start containers: docker compose up -d mysql"
    echo "2. Run import script: ./import-fixed-sql.sh"
fi

# Step 5: Start all services
echo ""
echo "🌐 Step 5: Starting all services..."
cd "$PROJECT_DIR"
docker compose up -d

echo ""
echo "📊 Current container status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "🎉 Deployment process completed!"
echo ""
echo "🌐 Access points:"
echo "   phpMyAdmin: http://116.118.49.243:8080"
echo "   Backend:    http://116.118.49.243:3500"
echo "   Frontend:   http://116.118.49.243:4500"
echo ""
echo "🔐 Database credentials:"
echo "   Username: tazaspac_chikiet"
echo "   Password: @Hikiet88"
echo "   Database: tazaspac_chikiet"