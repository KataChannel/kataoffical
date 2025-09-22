#!/bin/bash

# SQL Import Script for Fixed Database
# Imports the fixed rausachsite.sql without DEFAULT value errors

echo "🗄️ Starting database import process..."

# Configuration
DB_HOST="mysql"
DB_PORT="3306"
DB_NAME="tazaspac_chikiet"
DB_USER="tazaspac_chikiet"
DB_PASS="@Hikiet88"
SQL_FILE="/chikiet/kataoffical/rausachsite/rausachsite_fixed.sql"

# Check if fixed SQL file exists
if [ ! -f "$SQL_FILE" ]; then
    echo "❌ Error: Fixed SQL file not found at $SQL_FILE"
    echo "Please run ./fix-sql-import.sh first"
    exit 1
fi

echo "📁 Using SQL file: $SQL_FILE"

# Option 1: Import via Docker (if containers are running)
if docker ps | grep -q "mysql_rausach"; then
    echo "🐳 Importing via Docker container..."
    
    # Copy SQL file to container
    docker cp "$SQL_FILE" mysql_rausach:/tmp/import.sql
    
    # Import the database
    echo "📥 Importing database..."
    docker exec mysql_rausach mysql -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" < /tmp/import.sql
    
    if [ $? -eq 0 ]; then
        echo "✅ Database import completed successfully via Docker!"
    else
        echo "❌ Database import failed via Docker"
        exit 1
    fi
    
    # Clean up
    docker exec mysql_rausach rm /tmp/import.sql
    
else
    echo "🌐 Docker container not running. Use manual import:"
    echo ""
    echo "1. Access phpMyAdmin at: http://116.118.49.243:8080"
    echo "2. Login with:"
    echo "   Username: $DB_USER"
    echo "   Password: $DB_PASS"
    echo "3. Select database: $DB_NAME"
    echo "4. Go to Import tab"
    echo "5. Choose file: rausachsite_fixed.sql"
    echo "6. Click 'Go' to import"
    echo ""
    echo "Or use mysql command line:"
    echo "mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASS $DB_NAME < $SQL_FILE"
fi

echo "🎉 Import process completed!"