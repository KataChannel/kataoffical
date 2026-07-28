# Test Plan: Fix createNhomkhachhang & updateNhomkhachhang Relations

## 🐛 Bugs Fixed

### 1. **createNhomkhachhang không liên kết được với khachhang**
- **Issue**: Khi tạo nhóm khách hàng mới và chọn khách hàng, relation không được tạo
- **Root Cause**: Thiếu validation và error handling trong relation connect operation
- **Fix Applied**: Enhanced validation, proper error handling, và improved data flow

### 2. **updateNhomkhachhang không cập nhật relations đúng cách**
- **Issue**: Khi update nhóm khách hàng, relations với khách hàng bị lost hoặc không update
- **Root Cause**: Mixing basic field updates với relation updates trong cùng 1 call
- **Fix Applied**: Separate basic updates và relation updates, enhanced validation

## ✅ Fixes Applied

### Frontend Changes (`detailnhomkhachhang.component.ts`)

#### 1. Enhanced `createNhomkhachhang()` method:
```typescript
private async createNhomkhachhang() {
  this.isLoading.set(true);
  try {
    // ✅ Validate basic data trước khi tạo
    const nhomkhachhangData = {
      name: this.DetailNhomkhachhang().name?.trim(),
      description: this.DetailNhomkhachhang().description?.trim() || ''
    };

    // ✅ Validate required fields
    if (!nhomkhachhangData.name) {
      throw new Error('Tên nhóm khách hàng không được để trống');
    }

    // ✅ Tạo nhóm khách hàng trước
    const result = await this._GraphqlService.createOne(
      'nhomkhachhang',
      nhomkhachhangData,
      { include: { khachhang: true } }
    );
    
    if (result && result.id) {
      // ✅ Sau đó liên kết khách hàng nếu có
      if (this.CheckListKhachhang.length > 0) {
        // ✅ Validate khách hàng IDs
        const validKhachhangIds = this.CheckListKhachhang
          .map((v: any) => v.id)
          .filter((id: any) => id && typeof id === 'string' && id.trim() !== '');

        if (validKhachhangIds.length > 0) {
          const relationUpdateData = {
            khachhang: {
              connect: validKhachhangIds.map((id: string) => ({ id: id.trim() }))
            }
          };

          await this._GraphqlService.updateOne(
            'nhomkhachhang',
            { id: result.id },
            relationUpdateData
          );
        }
      }
      
      // ✅ Navigate và refresh data
      this._router.navigate(['/admin/nhomkhachhang', result.id]);
      await this._NhomkhachhangService.getNhomkhachhangByid(result.id);
      this.CheckListKhachhang = this.DetailNhomkhachhang()?.khachhang || [];
    }
  } catch (error: any) {
    // Enhanced error handling
  }
}
```

#### 2. Enhanced `updateNhomkhachhang()` method:
```typescript
private async updateNhomkhachhang() {
  try {
    // ✅ Update basic fields trước (KHÔNG bao gồm relations)
    const nhomkhachhangData = {
      name: this.DetailNhomkhachhang().name?.trim(),
      description: this.DetailNhomkhachhang().description?.trim() || ''
    };

    await this._GraphqlService.updateOne(
      'nhomkhachhang', 
      { id: this.nhomkhachhangId() }, 
      nhomkhachhangData, 
      { include: { khachhang: true } }
    );

    // ✅ Sau đó update relations riêng biệt
    await this.updateKhachhangRelations();
  } catch (error: any) {
    // Enhanced error handling
  }
}

private async updateKhachhangRelations(): Promise<void> {
  // ✅ Validate và filter IDs
  const currentKhachhangIds = this.DetailNhomkhachhang()?.khachhang
    ?.map((v: any) => v.id)
    .filter((id: any) => id && typeof id === 'string') || [];
    
  const newKhachhangIds = this.CheckListKhachhang
    .map((v: any) => v.id)
    .filter((id: any) => id && typeof id === 'string');

  // ✅ Chỉ update relation nếu có sự thay đổi
  if (JSON.stringify(currentKhachhangIds.sort()) !== JSON.stringify(newKhachhangIds.sort())) {
    const toConnect = newKhachhangIds.filter((id: string) => !currentKhachhangIds.includes(id));
    const toDisconnect = currentKhachhangIds.filter((id: string) => !newKhachhangIds.includes(id));
    
    const relationUpdateData = this.buildRelationUpdateData(toConnect, toDisconnect);
    
    if (relationUpdateData) {
      await this._GraphqlService.updateOne(
        'nhomkhachhang',
        { id: this.nhomkhachhangId() },
        relationUpdateData
      );
    }
  }
}
```

#### 3. Enhanced `buildRelationUpdateData()` method:
```typescript
private buildRelationUpdateData(toConnect: string[], toDisconnect: string[]) {
  // ✅ Comprehensive validation
  const validToConnect = toConnect.filter(id => 
    id && 
    typeof id === 'string' && 
    id.trim() !== '' && 
    id.length >= 36 // Basic UUID length check
  );
  
  const validToDisconnect = toDisconnect.filter(id => 
    id && 
    typeof id === 'string' && 
    id.trim() !== '' && 
    id.length >= 36
  );
  
  if (validToConnect.length === 0 && validToDisconnect.length === 0) {
    return null; // Không có thay đổi hợp lệ
  }

  // ✅ Build proper Prisma relation update structure
  const updateData: any = { khachhang: {} };

  if (validToDisconnect.length > 0) {
    updateData.khachhang.disconnect = validToDisconnect.map((id: string) => ({ 
      id: id.trim() 
    }));
  }

  if (validToConnect.length > 0) {
    updateData.khachhang.connect = validToConnect.map((id: string) => ({ 
      id: id.trim() 
    }));
  }

  return updateData;
}
```

### Backend Changes (Already Applied)

#### 1. Enhanced Universal Service validation:
- ✅ `validateAndCleanRelationData()` method  
- ✅ `validateConnectArray()` method for ID validation  
- ✅ Automatic cleaning of invalid relation data  
- ✅ Prevents "Required exactly one parent ID" errors  

## 🧪 Test Cases

### Test Case 1: Create Nhomkhachhang with Khachhang Relations
```
1. Navigate to nhomkhachhang module
2. Click "Tạo mới"
3. Enter nhomkhachhang name: "Test Group"
4. Select multiple khachhang from dropdown
5. Click "Lưu"
6. Expected: Nhomkhachhang created with selected khachhang relations
7. Verify: Relations visible in detail view
```

### Test Case 2: Update Nhomkhachhang Relations
```
1. Open existing nhomkhachhang
2. Click "Chỉnh sửa"
3. Change basic fields (name, description)
4. Add/remove khachhang selections
5. Click "Cập nhật"
6. Expected: Basic fields updated AND relations updated correctly
7. Verify: Both changes reflected in UI
```

### Test Case 3: Empty Relations Handling
```
1. Create nhomkhachhang without selecting any khachhang
2. Expected: Nhomkhachhang created successfully without relations
3. Later add khachhang relations via update
4. Expected: Relations added successfully
```

### Test Case 4: Invalid Data Handling
```
1. Try to create nhomkhachhang with empty name
2. Expected: Validation error displayed
3. Try to connect invalid khachhang IDs
4. Expected: Invalid IDs filtered out, valid operations proceed
```

## ✅ Expected Results

1. **Create Operations**: 
   - ✅ Nhomkhachhang created successfully
   - ✅ Relations with khachhang established properly
   - ✅ Data refreshed and displayed correctly

2. **Update Operations**:
   - ✅ Basic fields updated correctly
   - ✅ Relations updated separately and correctly
   - ✅ UI reflects all changes immediately

3. **Error Handling**:
   - ✅ Proper validation messages displayed
   - ✅ Invalid data filtered out automatically
   - ✅ No backend errors or crashes

4. **Data Integrity**:
   - ✅ Database relations consistent
   - ✅ No orphaned or invalid connections
   - ✅ UI state matches database state

## 🚀 Status

- ✅ Frontend fixes applied
- ✅ Backend validation enhanced  
- ✅ Error handling improved
- ✅ API running successfully
- ✅ Frontend running successfully
- 🔄 Ready for testing

## 🔍 Debugging Tools

If issues persist, check:
1. Browser console for frontend errors
2. API logs for backend errors  
3. GraphQL playground for manual testing
4. Database for actual relation state

### GraphQL Test Queries:
```graphql
# Test create
mutation {
  createRecord(
    modelName: "nhomkhachhang"
    data: {
      name: "Test Group"
      description: "Test description"
    }
  )
}

# Test relation update
mutation {
  updateRecord(
    modelName: "nhomkhachhang"
    where: { id: "YOUR_ID" }
    data: {
      khachhang: {
        connect: [
          { id: "KHACHHANG_ID_1" },
          { id: "KHACHHANG_ID_2" }
        ]
      }
    }
  )
}
```
