import { execSync } from 'child_process';
const query = `
query {
  findManytonkho(
    skip: 0
    take: 1
    where: { slchonhap: { gt: 0 } }
  ) {
    id
    slchonhap
    sanpham {
      title
      Dathangsanpham {
        id
        dathang {
          madncc
        }
      }
    }
  }
}
`;
console.log(query);
// We can't hit the GQL endpoint easily without auth maybe?
