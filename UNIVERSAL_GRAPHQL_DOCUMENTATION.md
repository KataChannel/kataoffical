# Universal GraphQL System Documentation

## Tổng quan
Hệ thống Universal GraphQL cho phép thực hiện các thao tác CRUD với bất kỳ model nào mà không cần viết code riêng cho từng model. Hệ thống sử dụng dynamic resolver và JSON parameters để xử lý các thao tác database.

## Cấu trúc Backend

### 1. Dynamic Resolver Factory (`dynamic-resolver.factory.ts`)
- Tạo resolver động cho bất kỳ model nào
- Sử dụng ModelConfig để định nghĩa cấu trúc model
- Hỗ trợ validation và relations

### 2. Model Configurations (`model-configs.ts`)
- Định nghĩa cấu hình cho tất cả models
- Bao gồm: fields, required fields, unique fields, relations
- Models được hỗ trợ:
  - User
  - Role
  - Permission
  - Menu
  - AffiliateLink
  - LandingPage
  - TrackingEvent
  - ChatAIMessage
  - AuditLog
  - Resource
  - FileManager
  - Doanhso
  - HoaHong

### 3. Universal Resolver (`universal.resolver.ts`)
- Resolver duy nhất xử lý tất cả models
- Nhận parameters dưới dạng JSON string
- Các operations được hỗ trợ:
  - `findAllUniversal`
  - `findOneUniversal`
  - `createOneUniversal`
  - `createBulkUniversal`
  - `updateOneUniversal`
  - `updateBulkUniversal`
  - `deleteOneUniversal`
  - `deleteBulkUniversal`

## Cấu trúc Frontend

### 1. Universal GraphQL Service (`universal-graphql.service.ts`)
- Service duy nhất để thực hiện tất cả thao tác GraphQL
- Sử dụng Apollo Client
- Tự động serialize/deserialize JSON data

### 2. Model Service Factory (`model-service.factory.ts`)
- Tạo typed services cho từng model
- Wrapper around Universal Service
- Pre-configured services cho các models phổ biến

### 3. GraphQL Operations (`universal.operations.ts`)
- Định nghĩa tất cả GraphQL queries và mutations
- Sử dụng cho Universal Service

## Cách sử dụng

### Backend Usage Example

```typescript
// Trong resolver
@Query(() => String)
async findAllUniversal(
  @Args('modelName') modelName: string,
  @Args('where', { nullable: true }) where?: string,
  @Args('take', { nullable: true }) take?: number
): Promise<string> {
  const whereObj = where ? JSON.parse(where) : {};
  const results = await this.prisma[modelName.toLowerCase()].findMany({
    where: whereObj,
    take
  });
  return JSON.stringify(results);
}
```

### Frontend Usage Examples

#### 1. Sử dụng Universal Service trực tiếp

```typescript
import { UniversalGraphQLService } from './path/to/universal-graphql.service';

constructor(private universalService: UniversalGraphQLService) {}

// Load users
loadUsers() {
  this.universalService.findAll('User', { take: 10 }).subscribe(users => {
    console.log(users);
  });
}

// Create user
createUser() {
  const userData = {
    email: 'test@example.com',
    name: 'Test User',
    isCTV: false
  };
  
  this.universalService.createOne('User', userData).subscribe(user => {
    console.log('Created user:', user);
  });
}

// Update user
updateUser(userId: string) {
  this.universalService.updateOne('User', 
    { id: userId }, 
    { name: 'Updated Name' }
  ).subscribe(user => {
    console.log('Updated user:', user);
  });
}

// Delete user
deleteUser(userId: string) {
  this.universalService.deleteOne('User', { id: userId }).subscribe(result => {
    console.log('Deleted user:', result);
  });
}
```

#### 2. Sử dụng Model Service Factory

```typescript
import { ModelServiceFactory } from './path/to/model-service.factory';

constructor(private modelFactory: ModelServiceFactory) {}

// Sử dụng pre-configured service
loadUsers() {
  this.modelFactory.userService.findAll({ take: 10 }).subscribe(users => {
    console.log(users);
  });
}

// Tạo service cho model bất kỳ
loadCustomModel() {
  const customService = this.modelFactory.createService('CustomModel');
  customService.findAll().subscribe(data => {
    console.log(data);
  });
}
```

#### 3. Bulk Operations

```typescript
// Create multiple records
createMultipleUsers() {
  const usersData = [
    { email: 'user1@example.com', name: 'User 1' },
    { email: 'user2@example.com', name: 'User 2' },
    { email: 'user3@example.com', name: 'User 3' }
  ];
  
  this.universalService.createBulk('User', usersData).subscribe(result => {
    console.log('Bulk create result:', result);
    console.log('Success count:', result.count);
    console.log('Successful items:', result.successfulItems);
    console.log('Failed items:', result.failedItems);
  });
}

// Update multiple records
updateMultipleUsers() {
  this.universalService.updateBulk('User', 
    { isCTV: false }, 
    { isCTV: true }
  ).subscribe(result => {
    console.log('Bulk update result:', result);
  });
}
```

## Ưu điểm

1. **DRY (Don't Repeat Yourself)**: Viết một lần, sử dụng cho tất cả models
2. **Maintainable**: Dễ duy trì và mở rộng
3. **Type Safety**: Vẫn giữ được type safety thông qua TypeScript generics
4. **Flexible**: Hỗ trợ complex queries và relations
5. **Scalable**: Dễ dàng thêm models mới

## Lưu ý

1. **JSON Serialization**: Tất cả parameters được serialize thành JSON string
2. **Error Handling**: Cần xử lý errors appropriately
3. **Validation**: Backend validation được thực hiện thông qua model configs
4. **Performance**: Với large datasets, nên sử dụng pagination
5. **Security**: Cần implement proper authorization checks

## Thêm Model mới

### 1. Backend
Thêm config vào `model-configs.ts`:

```typescript
export const NEW_MODEL_CONFIG: ModelConfig = {
  name: 'NewModel',
  fields: ['id', 'name', 'description', 'createdAt'],
  requiredFields: ['name'],
  uniqueFields: ['name'],
  relations: []
};

// Thêm vào MODEL_CONFIGURATIONS array
export const MODEL_CONFIGURATIONS = [
  // ... existing configs
  NEW_MODEL_CONFIG
];
```

### 2. Frontend
Thêm service vào `model-service.factory.ts`:

```typescript
get newModelService(): ModelService<NewModel> {
  return this.createService<NewModel>('NewModel');
}
```

## Kết luận

Hệ thống Universal GraphQL cung cấp một cách tiếp cận hiệu quả và linh hoạt để xử lý các thao tác CRUD với bất kỳ model nào. Hệ thống giảm thiểu code duplication và tăng tính maintainability của ứng dụng.