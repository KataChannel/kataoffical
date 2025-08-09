#!/bin/bash

# Script to replace moment.js usage with TimezoneUtilService in dathang.service.ts

FILE="/chikiet/kataoffical/rausachfullstack/api/src/dathang/dathang.service.ts"

echo "🔧 Replacing moment.js usage with TimezoneUtilService in dathang.service.ts..."

# Replace moment().format('DDMMYYYY') with this.timezoneUtil.formatDateForFilename()
sed -i "s/moment().format('DDMMYYYY')/this.timezoneUtil.formatDateForFilename()/g" "$FILE"

# Replace moment(date).format('DDMMYYYY') with this.timezoneUtil.formatDateForFilename()
sed -i "s/moment([^)]*).format('DDMMYYYY')/this.timezoneUtil.formatDateForFilename()/g" "$FILE"

# Replace moment().format('HH:mm:ss DD/MM/YYYY') with a simple alternative
sed -i "s/moment().format('HH:mm:ss DD\/MM\/YYYY')/new Date().toLocaleString('vi-VN')/g" "$FILE"

# Replace moment(date).format('YYYY-MM-DD') with date conversion
sed -i "s/moment(\([^)]*\)).format('YYYY-MM-DD')/new Date(\1).toISOString().split('T')[0]/g" "$FILE"

echo "✅ Replaced basic moment() formatting calls"

# Now handle date range filters manually
echo "📅 Date range filters will be handled manually..."

echo "🚀 Basic timezone normalization complete for dathang.service.ts"
