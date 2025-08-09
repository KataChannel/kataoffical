#!/bin/bash

# Script to replace complex moment usage in chotkho.service.ts

FILE="/chikiet/kataoffical/rausachfullstack/api/src/chotkho/chotkho.service.ts"

echo "🔧 Replacing complex moment usage in chotkho.service.ts..."

# Replace moment(date).startOf('day').toDate() with TimezoneUtilService
sed -i "s/moment(\([^)]*\)).startOf('day').toDate()/new Date(this.timezoneUtil.getStartOfDay(\1))/g" "$FILE"

# Replace moment().startOf('day').toDate() with current date start of day
sed -i "s/moment().startOf('day').toDate()/new Date(this.timezoneUtil.getStartOfDay(new Date()))/g" "$FILE"

# Replace moment(date).endOf('day').toDate() with TimezoneUtilService
sed -i "s/moment(\([^)]*\)).endOf('day').toDate()/new Date(this.timezoneUtil.getEndOfDay(\1))/g" "$FILE"

# Replace moment().endOf('day').toDate() with current date end of day
sed -i "s/moment().endOf('day').toDate()/new Date(this.timezoneUtil.getEndOfDay(new Date()))/g" "$FILE"

echo "✅ Replaced complex moment operations with TimezoneUtilService"

echo "🚀 Chotkho service timezone normalization complete"
