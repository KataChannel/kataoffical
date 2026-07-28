# Quick Test - Banggia Unique Constraint

## ✅ 2-Minute Verification

### Test 1: Try to Create Duplicate (Should FAIL)

1. Open Banggia list
2. Click "Thêm mới"
3. Enter:
   - Mã bảng giá: **BG24**
   - Bắt đầu: **01/10/2025**
   - Kết thúc: **31/10/2025**
4. Click Save

**Expected:**
```
❌ Error message: 
"Bảng giá với mã 'BG24' và khoảng thời gian từ 1/10/2025 đến 31/10/2025 đã tồn tại!"
```

**Console:**
```
[VALIDATE] Checking banggia exists: BG24, 2025-10-01, 2025-10-31
[VALIDATE] Found existing banggia, cannot create
Lỗi tạo bảng giá: Bảng giá với mã "BG24"...
```

---

### Test 2: Create with Different Dates (Should PASS)

1. Click "Thêm mới" 
2. Enter:
   - Mã bảng giá: **BG24**
   - Bắt đầu: **01/11/2025** ← Different
   - Kết thúc: **30/11/2025** ← Different
3. Click Save

**Expected:**
```
✅ Success!
"Tạo bảng giá thành công"
```

---

### Test 3: Update to Duplicate (Should FAIL)

1. Open an existing Banggia (not BG24)
2. Edit:
   - Change mã to: **BG24**
   - Change bắt đầu to: **01/10/2025**
   - Change kết thúc to: **31/10/2025**
3. Click Save

**Expected:**
```
❌ Error message:
"Bảng giá với mã 'BG24' và khoảng thời gian từ 1/10/2025 đến 31/10/2025 đã tồn tại!"
```

---

### Test 4: Update Same Record (Should PASS)

1. Open BG24 (01/10/2025 - 31/10/2025)
2. Edit:
   - Change title to: **"Updated Title"**
   - Keep same mã and dates
3. Click Save

**Expected:**
```
✅ Success!
"Cập nhật thành công"
```

---

## 🔍 Quick Database Check

```bash
cd api
bun run fix-banggia-duplicates.ts
```

**Expected:**
```
✅ No duplicates found! Safe to add unique constraint.
```

---

## 📊 Verify Indexes Exist

```sql
-- Check indexes
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'Banggia'
ORDER BY indexname;
```

**Should show:**
- ✅ `unique_banggia_time_range` (UNIQUE)
- ✅ `Banggia_mabanggia_idx`
- ✅ `Banggia_batdau_ketthuc_idx`

---

## 🎯 Success Checklist

- [ ] ✅ Cannot create duplicate (Test 1)
- [ ] ✅ Can create with different dates (Test 2)
- [ ] ✅ Cannot update to duplicate (Test 3)
- [ ] ✅ Can update same record (Test 4)
- [ ] ✅ No duplicates in database
- [ ] ✅ Indexes exist
- [ ] ✅ Error messages user-friendly
- [ ] ✅ Console logs appear

---

**Time:** 2 minutes  
**Status:** Ready to test 🟢
