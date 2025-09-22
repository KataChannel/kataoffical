# MySQL Import Bug Fix Documentation

## Problem Fixed
**Error**: `#1101 - BLOB, TEXT, GEOMETRY or JSON column 'Image' can't have a default value`

This error occurs because MySQL/MariaDB doesn't allow TEXT, BLOB, or JSON columns to have default values.

## Root Cause
The `rausachsite.sql` file contained multiple TEXT columns with DEFAULT values like:
```sql
`Image` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '{}'
`Tags` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '[]'
```

## Solution Applied

### 1. Identified Problematic Columns
Found **53+ TEXT columns** with DEFAULT values across multiple tables:
- `baiviet`: Image, Type, MetaTags, Tags, Danhmuc
- `dathang`: ListSP
- `danhmucbaiviet`: Image, Dulieu  
- `khuyenmai`: Image, Type, LoaiKM
- `nhanvien`: Image, Config
- `khachhang`: Image, Thanhtoan, Vanchuyen, Diachis, Khuyenmai, TimePrint, Giohangs
- And many more...

### 2. Fix Applied
**Removed all DEFAULT values from TEXT columns**:
```sql
-- BEFORE (ERROR)
`Image` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '{}'

-- AFTER (FIXED)  
`Image` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
```

### 3. Files Created/Modified

#### `fix-sql-import.sh` - Automated Fix Script
- Scans and removes all TEXT DEFAULT values
- Creates backup of original file
- Generates verification report

#### `import-fixed-sql.sh` - Import Helper Script  
- Handles database import via Docker or manual methods
- Includes connection parameters and instructions

#### `rausachsite.sql` - Fixed SQL File
- Original: `rausachsite_original.sql` (backup)
- Fixed version now replaces the original
- All TEXT DEFAULT values removed
- Ready for import without errors

## Usage

### Quick Fix & Import
```bash
# Fix the SQL file (if not already done)
./fix-sql-import.sh

# Import the fixed database
./import-fixed-sql.sh
```

### Manual Import Options

#### Via phpMyAdmin
1. Access: http://116.118.49.243:8080
2. Login: tazaspac_chikiet / @Hikiet88  
3. Import: rausachsite.sql

#### Via MySQL Command Line
```bash
mysql -h mysql -P 3306 -u tazaspac_chikiet -p@Hikiet88 tazaspac_chikiet < rausachsite.sql
```

#### Via Docker
```bash
docker cp rausachsite.sql mysql_rausach:/tmp/
docker exec mysql_rausach mysql -u tazaspac_chikiet -p@Hikiet88 tazaspac_chikiet < /tmp/rausachsite.sql
```

## What Was Fixed

### Before (Error-Causing)
```sql
CREATE TABLE `baiviet` (
  `Image` text NOT NULL DEFAULT '{}',
  `Type` text NOT NULL DEFAULT '{}', 
  `MetaTags` text NOT NULL DEFAULT '{}',
  `Tags` text NOT NULL DEFAULT '[]'
);
```

### After (Fixed)
```sql
CREATE TABLE `baiviet` (
  `Image` text NOT NULL,
  `Type` text NOT NULL,
  `MetaTags` text NOT NULL, 
  `Tags` text NOT NULL
);
```

## Impact
- ✅ **53+ TEXT columns** fixed across all tables
- ✅ No more `#1101` import errors
- ✅ Database structure preserved
- ✅ All data relationships maintained
- ✅ Compatible with MySQL 8.0+ and MariaDB 10.6+

## Notes
- **Default Values**: Applications should handle empty TEXT fields programmatically
- **Data Integrity**: Existing data remains unchanged
- **Compatibility**: Works with both MySQL and MariaDB
- **Backup**: Original file preserved as `rausachsite_original.sql`

## Files Structure
```
rausachsite/
├── rausachsite.sql              # ← Fixed version (ready to import)
├── rausachsite_original.sql     # Original with errors  
├── rausachsite.sql.backup       # Backup copy
├── fix-sql-import.sh            # Automated fix script
├── import-fixed-sql.sh          # Import helper script
└── SQL_IMPORT_BUG_FIXES.md      # This documentation
```

The database is now ready for import without any `#1101` errors! 🎉