// user/listuser/listuser.component.html
// user/listuser/listuser.component.scss
// user/listuser/listuser.component.ts
// user/listuser/listuser.component.html
// user/detailuser/detailuser.component.html
// user/detailuser/detailuser.component.scss
// user/detailuser/detailuser.component.ts
// user/user.service.ts
// user/user.type.ts
// user/user.ts

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

const fileList = [
  'user/listuser/listuser.component.html',
  'user/listuser/listuser.component.scss',
  'user/listuser/listuser.component.ts',
  'user/detailuser/detailuser.component.html',
  'user/detailuser/detailuser.component.scss',
  'user/detailuser/detailuser.component.ts',
  'user/user.service.ts',
  'user/user.type.ts',
  'user/user.ts',
];

fileList.forEach((file) => {
  const dir = dirname(file);

  // Tạo thư mục nếu chưa tồn tại
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  // Tạo file nếu chưa tồn tại
  if (!existsSync(file)) {
    writeFileSync(file, '', 'utf8');
    console.log(`Created: ${file}`);
  } else {
    console.log(`Already exists: ${file}`);
  }
});

console.log('✅ File creation complete!');

// node createfile.js