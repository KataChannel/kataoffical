#!/bin/bash

# Script to replace moment.js usage with TimezoneUtilService in chotkho.service.ts

FILE="/chikiet/kataoffical/rausachfullstack/api/src/chotkho/chotkho.service.ts"

echo "🔧 Replacing moment.js usage with TimezoneUtilService in chotkho.service.ts..."

# Replace timestamp formatting
sed -i "s/moment().format('YYYYMMDDHHmmss')/new Date().toISOString().replace(\/[^0-9]\/g, '').slice(0, 14)/g" "$FILE"

# Replace date formatting to YYYY-MM-DD
sed -i "s/moment(\([^)]*\)).format('YYYY-MM-DD')/new Date(\1).toISOString().split('T')[0]/g" "$FILE"

# Replace startOf day and endOf day will be handled by TimezoneUtilService methods
echo "📅 Complex date operations need manual replacement..."

echo "🚀 Basic timezone normalization started for chotkho.service.ts"
