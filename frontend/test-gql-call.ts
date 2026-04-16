// Just to examine the GraphQL schema to see if Dathangsanpham returns properly
import fs from 'fs';

const q = fs.readFileSync('../api/src/graphql/enhanced-universal.service.ts', 'utf8');
console.log(q.includes('findMany'));
