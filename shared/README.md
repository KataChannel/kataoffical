# kataoffical
git add .
git commit -m "update"
git push


npx ng generate library shared-auth --prefix=kata # Hoặc prefix khác
npx ng generate component components/login --project=shared-auth --export
npx ng generate component components/register --project=shared-auth --export
npx ng generate service services/shared-auth --project=shared-auth
npx ng generate guard guards/shared-auth --project=shared-auth
npx ng build shared-auth

npx ng generate library shared-component --prefix=kata
npx ng generate component components/table --project=shared-component --export

npx ng generate library kata --prefix=kata
npx ng generate component components/table --project=kata --export
npx ng generate component button --project=shared --standalone --export
npx ng build kata

npx ng generate library shared --prefix=kata
npx ng generate component components/table --project=shared --export
npx ng generate component components/pagination --project=shared --export
npx ng build shared
npm login
npm publish --access public








<kata-table
  [dataSource]="dataSource"
  [displayedColumns]="['stt', 'codeId', 'khachhang', 'tags', 'categories', 'roles', 'createdAt', 'isActive']"
  [ColumnName]="{
    stt: 'STT',
    codeId: 'Code',
    khachhang: 'Customer',
    tags: 'Tags',
    categories: 'Categories',
    roles: 'Roles',
    createdAt: 'Created At',
    isActive: 'Status'
  }"
  [FilterColumns]="filterColumns"
  [Columns]="columns"
  [ListFilter]="listFilter"
  [EditList]="editList"
  [columnsToShowLength]="['tags']" <!-- Show length for 'tags' -->
  [columnsToShowNestedObject]="{ khachhang: 'title' }" <!-- Show 'title' for 'khachhang' -->
  [columnsToLoopArrayObject]="[{ column: 'roles', key: 'title' }]" <!-- Loop 'title' for 'roles' -->
  (toggleColumnEvent)="onToggleColumn($event)"
  (filterColumnsEvent)="onFilterColumns($event)"
  (updateDisplayedColumnsEvent)="onUpdateDisplayedColumns()"
  (outFilterEvent)="onOutFilter($event)"
  (addToEditEvent)="onAddToEdit($event)"
  (goToDetailEvent)="onGoToDetail($event)">
</kata-table>



{
  id: 1,
  codeId: 'ABC123',
  khachhang: { title: 'abc', sex: 'male' },
  tags: [{ name: 'urgent' }, { name: 'important' }],
  categories: [
    { name: 'Tech', sub: ['AI', 'ML'] },
    { name: 'Business', sub: ['Sales'] }
  ],
  roles: [
    { title: 'Admin', id: 1 },
    { title: 'User', id: 2 }
  ],
  createdAt: '2025-06-15',
  isActive: true
}