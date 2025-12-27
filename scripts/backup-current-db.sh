#!/bin/bash

# ======================================================================
# Database Backup Script - Pre-Optimization
# ======================================================================
# Purpose: Create full backup before implementing logging optimization
# Usage: ./backup-current-db.sh
# Output: backup_pre_optimization_YYYYMMDD_HHMMSS.dump
# ======================================================================

set -e  # Exit on error

# Load environment variables
if [ -f ../.env.production ]; then
    source ../.env.production
elif [ -f ../api/.env ]; then
    source ../api/.env
else
    echo "❌ Error: .env file not found"
    exit 1
fi

# Configuration
BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_pre_optimization_${TIMESTAMP}.dump"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_FILE}"

# Create backup directory
mkdir -p ${BACKUP_DIR}

echo "🔄 Starting database backup..."
echo "📅 Timestamp: ${TIMESTAMP}"
echo "🗄️  Database: ${DB_NAME}"
echo "📂 Output: ${BACKUP_PATH}"
echo ""

# Backup database
echo "⏳ Creating backup (this may take 5-10 minutes)..."
PGPASSWORD=${DB_PASSWORD} pg_dump \
    -h ${DB_HOST} \
    -U ${DB_USER} \
    -d ${DB_NAME} \
    -F c \
    -f ${BACKUP_PATH} \
    --verbose

# Check if backup was successful
if [ $? -eq 0 ]; then
    # Get backup size
    BACKUP_SIZE=$(du -h ${BACKUP_PATH} | cut -f1)
    
    echo ""
    echo "✅ Backup completed successfully!"
    echo "📊 Size: ${BACKUP_SIZE}"
    echo "📁 Location: ${BACKUP_PATH}"
    echo ""
    
    # Create metadata file
    cat > ${BACKUP_DIR}/backup_${TIMESTAMP}_info.txt << EOF
Backup Information
==================
Date: $(date)
Database: ${DB_NAME}
Host: ${DB_HOST}
Size: ${BACKUP_SIZE}
File: ${BACKUP_FILE}
Type: Full dump (custom format)

To restore:
-----------
PGPASSWORD=\${DB_PASSWORD} pg_restore \\
    -h \${DB_HOST} \\
    -U \${DB_USER} \\
    -d \${DB_NAME} \\
    -c \\
    ${BACKUP_FILE}

Notes:
------
- This backup was created before logging optimization
- Contains all tables including AuditLog, PerformanceLog
- Can be used to rollback if optimization fails
EOF
    
    echo "📝 Backup info saved to: ${BACKUP_DIR}/backup_${TIMESTAMP}_info.txt"
    echo ""
    
    # Optional: Compress backup
    read -p "🗜️  Compress backup to save space? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "⏳ Compressing backup..."
        gzip ${BACKUP_PATH}
        COMPRESSED_SIZE=$(du -h ${BACKUP_PATH}.gz | cut -f1)
        echo "✅ Compressed: ${COMPRESSED_SIZE}"
        echo "📁 File: ${BACKUP_PATH}.gz"
    fi
    
    echo ""
    echo "🎉 Backup process complete!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Verify backup integrity"
    echo "2. Copy backup to safe location (Google Drive recommended)"
    echo "3. Proceed with Week 1 optimization tasks"
    
else
    echo ""
    echo "❌ Backup failed!"
    echo "Please check database connection and try again"
    exit 1
fi
