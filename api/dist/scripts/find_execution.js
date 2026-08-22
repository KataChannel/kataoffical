"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function main() {
    const logPath = '/home/kata/.gemini/antigravity-ide/brain/c8adcb7f-3b1c-495f-865f-49dbcb38ec87/.system_generated/logs/transcript.jsonl';
    if (!fs.existsSync(logPath)) {
        console.log('No log path');
        return;
    }
    const content = fs.readFileSync(logPath, 'utf-8');
    content.split('\n').forEach(line => {
        if (line.includes('fix_all_negatives_final.js') && line.includes('RUN_COMMAND')) {
            console.log(line);
        }
    });
}
main();
//# sourceMappingURL=find_execution.js.map