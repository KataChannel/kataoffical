const path = require('path');
let pgModule;
try {
  pgModule = require('pg');
} catch (e) {
  try {
    pgModule = require(path.resolve('./api/node_modules/pg'));
  } catch (e2) {
    pgModule = require(path.resolve('../api/node_modules/pg'));
  }
}
const { Client } = pgModule;

async function runIncrementalSync() {
  const startTime = Date.now();
  console.log("========================================================================");
  console.log("🔄 BẮT ĐẦU ĐỒNG BỘ DỮ LIỆU TĂNG CƯỜNG (INCREMENTAL SYNC)");
  console.log(" Nguồn (Source):      rausachfinal (Production DB)");
  console.log(" Đích (Target):       testdata (Sandbox DB)");
  console.log(" Nguyên tắc:           Giữ nguyên Schema testdata, CHỈ chèn dòng mới & cập nhật");
  console.log("========================================================================\n");

  const urlSource = process.env.SOURCE_DB_URL || 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/rausachfinal';
  const urlTarget = process.env.TARGET_DB_URL || 'postgresql://AWois79wFA1bxMK:7bhNHJcSEbWln9v@116.118.49.243:55432/testdata';

  const clientSource = new Client({ connectionString: urlSource });
  const clientTarget = new Client({ connectionString: urlTarget });

  await clientSource.connect();
  await clientTarget.connect();
  console.log("✅ Đã kết nối thành công tới cả 2 Database!");

  // Tắt kiểm tra Foreign Key trên kết nối Đích (Target) trong suốt phiên làm việc
  await clientTarget.query("SET session_replication_role = 'replica';");
  console.log("⚙️  Đã tạm tắt Foreign Key constraints trên database Đích (Session level)\n");

  try {
    // 1. Lấy danh sách bảng base table của 2 DB
    const resSrcTables = await clientSource.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `);
    const resTgtTables = await clientTarget.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `);

    const srcTables = resSrcTables.rows.map(r => r.table_name);
    const tgtTables = resTgtTables.rows.map(r => r.table_name);

    const commonTables = srcTables.filter(t => tgtTables.includes(t)).sort();
    const testdataOnlyTables = tgtTables.filter(t => !srcTables.includes(t));

    console.log(`📋 Tổng số bảng chung cần đồng bộ: ${commonTables.length} bảng`);
    console.log(`🛡️  Các bảng riêng trong testdata sẽ ĐƯỢC GIỮ NGUYÊN (${testdataOnlyTables.length} bảng):`, testdataOnlyTables.join(', ') || 'Không có');
    console.log("------------------------------------------------------------------------");
    console.log(String('Tên Bảng').padEnd(30) + String('Dòng Mới (+)').padStart(15) + String('Cập Nhật (~)').padStart(15) + String('Tổng DB Đích').padStart(15));
    console.log("------------------------------------------------------------------------");

    let totalInsertedAll = 0;
    let totalUpdatedAll = 0;

    for (const tableName of commonTables) {
      // 2. Lấy cột chung giữa 2 bảng
      const srcColsRes = await clientSource.query(`
        SELECT column_name FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = $1
      `, [tableName]);

      const tgtColsRes = await clientTarget.query(`
        SELECT column_name FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = $1
      `, [tableName]);

      const srcCols = srcColsRes.rows.map(r => r.column_name);
      const tgtCols = tgtColsRes.rows.map(r => r.column_name);

      const matchingCols = srcCols.filter(c => tgtCols.includes(c));
      if (matchingCols.length === 0) continue;

      // 3. Tìm Primary Key
      const pkRes = await clientSource.query(`
        SELECT kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'PRIMARY KEY'
          AND tc.table_name = $1
      `, [tableName]);

      const pkCols = pkRes.rows.map(r => r.column_name);
      const primaryKey = pkCols.length > 0 && matchingCols.includes(pkCols[0]) ? pkCols[0] : (matchingCols.includes('id') ? 'id' : null);

      if (!primaryKey) {
        continue;
      }

      // 4. Lấy danh sách PK từ Source và Target
      const srcPkRes = await clientSource.query(`SELECT "${primaryKey}" FROM "${tableName}"`);
      const tgtPkRes = await clientTarget.query(`SELECT "${primaryKey}" FROM "${tableName}"`);

      const srcPkSet = new Set(srcPkRes.rows.map(r => String(r[primaryKey])));
      const tgtPkSet = new Set(tgtPkRes.rows.map(r => String(r[primaryKey])));

      // Tìm các PK có ở Source nhưng chưa có ở Target (Dữ liệu Mới)
      const missingPkList = Array.from(srcPkSet).filter(pk => !tgtPkSet.has(pk));

      let insertedCount = 0;
      let updatedCount = 0;

      // Batch insert các bản ghi mới
      if (missingPkList.length > 0) {
        const BATCH_SIZE = 500;
        const colListSql = matchingCols.map(c => `"${c}"`).join(', ');

        for (let i = 0; i < missingPkList.length; i += BATCH_SIZE) {
          const batchPks = missingPkList.slice(i, i + BATCH_SIZE);

          // Fetch full rows từ Source
          const rowsRes = await clientSource.query(`
            SELECT ${colListSql} FROM "${tableName}" 
            WHERE "${primaryKey}"::text = ANY($1)
          `, [batchPks]);

          if (rowsRes.rows.length === 0) continue;

          // Build batch insert query cho Target với ON CONFLICT DO NOTHING (không chỉ định target column để bắt TẤT CẢ các Unique / PK Conflict)
          const valuePlaceholders = [];
          const queryParams = [];
          let paramIdx = 1;

          for (const row of rowsRes.rows) {
            const rowPlaceholders = [];
            for (const col of matchingCols) {
              rowPlaceholders.push(`$${paramIdx++}`);
              queryParams.push(row[col]);
            }
            valuePlaceholders.push(`(${rowPlaceholders.join(', ')})`);
          }

          const insertSql = `
            INSERT INTO "${tableName}" (${colListSql}) 
            VALUES ${valuePlaceholders.join(', ')}
            ON CONFLICT DO NOTHING
          `;

          try {
            const resInsert = await clientTarget.query(insertSql, queryParams);
            insertedCount += resInsert.rowCount || 0;
          } catch (err) {
            // Nếu có lỗi đột xuất trên cả batch (ví dụ Data type/length mismatch), thử chèn từng dòng đơn lẻ
            for (const row of rowsRes.rows) {
              const singlePlaceholders = matchingCols.map((_, idx) => `$${idx + 1}`).join(', ');
              const singleParams = matchingCols.map(col => row[col]);
              const singleInsertSql = `
                INSERT INTO "${tableName}" (${colListSql})
                VALUES (${singlePlaceholders})
                ON CONFLICT DO NOTHING
              `;
              try {
                const sRes = await clientTarget.query(singleInsertSql, singleParams);
                insertedCount += sRes.rowCount || 0;
              } catch (e) {
                // Bỏ qua dòng bị lỗi đơn lẻ
              }
            }
          }
        }
      }

      // 5. Kiểm tra cập nhật dòng cũ (nếu có cột updatedAt)
      const hasUpdatedAt = matchingCols.includes('updatedAt') || matchingCols.includes('updated_at');
      if (hasUpdatedAt && commonTables.includes(tableName)) {
        const updateColName = matchingCols.includes('updatedAt') ? 'updatedAt' : 'updated_at';
        
        // Tìm các bản ghi mà source.updatedAt > target.updatedAt
        const updatedRowsRes = await clientSource.query(`
          SELECT s."${primaryKey}"
          FROM "${tableName}" s
          JOIN "${tableName}" t ON s."${primaryKey}"::text = t."${primaryKey}"::text
          WHERE s."${updateColName}" > t."${updateColName}"
        `).catch(() => null);

        if (updatedRowsRes && updatedRowsRes.rows.length > 0) {
          const pksToUpdate = updatedRowsRes.rows.map(r => String(r[primaryKey]));
          const BATCH_SIZE = 300;
          const colListSql = matchingCols.map(c => `"${c}"`).join(', ');
          const updateSetSql = matchingCols
            .filter(c => c !== primaryKey && c !== 'createdAt' && c !== 'created_at')
            .map(c => `"${c}" = EXCLUDED."${c}"`)
            .join(', ');

          for (let i = 0; i < pksToUpdate.length; i += BATCH_SIZE) {
            const batchPks = pksToUpdate.slice(i, i + BATCH_SIZE);
            const rowsRes = await clientSource.query(`
              SELECT ${colListSql} FROM "${tableName}" 
              WHERE "${primaryKey}"::text = ANY($1)
            `, [batchPks]);

            if (rowsRes.rows.length === 0) continue;

            const valuePlaceholders = [];
            const queryParams = [];
            let paramIdx = 1;

            for (const row of rowsRes.rows) {
              const rowPlaceholders = [];
              for (const col of matchingCols) {
                rowPlaceholders.push(`$${paramIdx++}`);
                queryParams.push(row[col]);
              }
              valuePlaceholders.push(`(${rowPlaceholders.join(', ')})`);
            }

            const upsertSql = `
              INSERT INTO "${tableName}" (${colListSql}) 
              VALUES ${valuePlaceholders.join(', ')}
              ON CONFLICT ("${primaryKey}") DO UPDATE SET ${updateSetSql}
            `;

            try {
              const resUpdate = await clientTarget.query(upsertSql, queryParams);
              updatedCount += resUpdate.rowCount || 0;
            } catch (err) {
              // Bỏ qua nếu dòng có conflict khác khi update
            }
          }
        }
      }

      // Lấy tổng số dòng hiện tại ở Target
      const finalCountRes = await clientTarget.query(`SELECT COUNT(*) as cnt FROM "${tableName}"`);
      const finalCount = parseInt(finalCountRes.rows[0].cnt, 10);

      totalInsertedAll += insertedCount;
      totalUpdatedAll += updatedCount;

      if (insertedCount > 0 || updatedCount > 0) {
        console.log(
          tableName.padEnd(30) + 
          String(`+${insertedCount}`).padStart(15) + 
          String(`~${updatedCount}`).padStart(15) + 
          String(finalCount).padStart(15)
        );
      }
    }

    console.log("------------------------------------------------------------------------");
    console.log(`🎉 HOÀN THÀNH ĐỒNG BỘ DỮ LIỆU TĂNG CƯỜNG!`);
    console.log(`➕ Tổng bản ghi MỚI đã chèn:       ${totalInsertedAll}`);
    console.log(`🔄 Tổng bản ghi ĐÃ CẬP NHẬT:     ${totalUpdatedAll}`);
    console.log(`⏱️  Thời gian thực hiện:          ${((Date.now() - startTime) / 1000).toFixed(2)}s`);

  } finally {
    // Bật lại Foreign Key constraints
    await clientTarget.query("SET session_replication_role = 'origin';").catch(() => {});
    await clientSource.end();
    await clientTarget.end();
    console.log("========================================================================\n");
  }
}

runIncrementalSync().catch(err => {
  console.error("❌ XẢY RA LỖI KHI ĐỒNG BỘ DỮ LIỆU:", err);
  process.exit(1);
});
