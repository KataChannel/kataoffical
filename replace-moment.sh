#!/bin/bash

# Script to replace moment.js usage with TimezoneUtilService in donhang.service.ts

FILE="/chikiet/kataoffical/rausachfullstack/api/src/donhang/donhang.service.ts"

echo "🔧 Replacing moment.js usage with TimezoneUtilService..."

# Replace moment().format('DDMMYYYY') with this.timezoneUtil.formatDateForFilename()
sed -i "s/moment().format('DDMMYYYY')/this.timezoneUtil.formatDateForFilename()/g" "$FILE"

# Replace moment().format('DD_MM_YYYY') with this.timezoneUtil.formatDateUnderscored() (already done above)
sed -i "s/moment().format('DD_MM_YYYY')/this.timezoneUtil.formatDateUnderscored()/g" "$FILE"

echo "✅ Replaced moment() formatting calls"

# Note: Date range filters were already replaced manually above
# This script handles the remaining format() calls

echo "🚀 Timezone normalization complete for donhang.service.ts"
