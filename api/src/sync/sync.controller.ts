import { Controller, Get, Post } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';

class SyncState {
  progress = 0;
  message = '';
  isSyncing = false;
  error = false;
}

let syncState = new SyncState();

@Controller('sync')
export class SyncController {
  @Get('status')
  getStatus() {
    return syncState;
  }

  /**
   * Đồng bộ DATA MỚI từ production về local: chỉ THÊM đơn hàng / khách hàng / NCC / đơn mua mới
   * (+ sản phẩm/bảng giá/kho mới cho đủ khóa ngoại). KHÔNG ghi đè -> giữ nguyên setup go-live
   * (rep chuỗi, công nợ đầu kỳ, MST/địa chỉ HĐ...). Chạy script KT-congno/dong-bo-delta.js.
   */
  @Post('full')
  startFullSync() {
    if (syncState.isSyncing) {
      return { status: 'already_running', currentState: syncState };
    }
    syncState = { progress: 3, message: 'Khởi tạo đồng bộ data mới...', isSyncing: true, error: false };

    const scriptPath = path.resolve(process.cwd(), '..', 'KT-congno', 'dong-bo-delta.js');
    const proc = spawn('node', [scriptPath], {
      env: {
        ...process.env,
        APPLY: '1',
        LOCAL_DB_URL: process.env.DATABASE_URL || '',
        PROD_DB_URL: process.env.PROD_DATABASE_URL || '',
      },
    });

    const parse = (buf: Buffer) => {
      buf.toString().split('\n').forEach((line) => {
        const idx = line.indexOf('PROGRESS:');
        if (idx < 0) return;
        const parts = line.slice(idx + 'PROGRESS:'.length).trim().split(' ');
        if (parts[0] === 'ERROR') {
          syncState.error = true;
          syncState.progress = 0;
          syncState.message = parts.slice(1).join(' ');
        } else {
          const n = parseInt(parts[0], 10);
          if (!isNaN(n)) syncState.progress = n;
          syncState.message = parts.slice(1).join(' ');
        }
      });
    };

    proc.stdout.on('data', (d) => { parse(d); console.log('[Sync-Delta]', d.toString().trim()); });
    proc.stderr.on('data', (d) => console.log('[Sync-Delta-Err]', d.toString().trim()));
    proc.on('close', (code) => {
      console.log(`[Sync-Delta] Kết thúc, code ${code}`);
      if (code === 0 && !syncState.error) {
        syncState.progress = 100;
        if (!syncState.message) syncState.message = 'Hoàn tất đồng bộ data mới (go-live giữ nguyên).';
      } else if (code !== 0 && !syncState.error) {
        syncState.error = true;
        syncState.progress = 0;
        syncState.message = 'Đồng bộ thất bại. Xem log API.';
      }
      syncState.isSyncing = false;
    });

    return { status: 'started' };
  }
}
