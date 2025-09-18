#!/usr/bin/env node

/**
 * Demo các trường hợp sử dụng thực tế của method findFirst
 * Practical use cases for findFirst method
 */

const { ApolloClient, InMemoryCache, gql, HttpLink } = require('@apollo/client/core');
const fetch = require('cross-fetch');

// GraphQL client
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    fetch
  }),
  cache: new InMemoryCache()
});

const FIND_FIRST = gql`
  query FindFirst($model: String!, $where: JSON, $orderBy: JSON, $include: JSON, $select: JSON) {
    findFirst(model: $model, where: $where, orderBy: $orderBy, include: $include, select: $select)
  }
`;

async function demoFindFirstUseCases() {
  console.log('🚀 Demo: Practical use cases for findFirst method\n');
  
  try {
    // Use Case 1: Lấy sản phẩm có giá cao nhất
    console.log('1. 📈 Lấy sản phẩm có giá cao nhất (Get highest priced product):');
    const highestPricedProduct = await client.query({
      query: FIND_FIRST,
      variables: {
        model: 'sanpham',
        where: {
          trangthai: true,
          dongia: { gt: 0 }
        },
        orderBy: [{ dongia: 'desc' }],
        select: {
          id: true,
          ten: true,
          ma: true,
          dongia: true
        }
      }
    });
    
    if (highestPricedProduct.data?.findFirst) {
      const product = highestPricedProduct.data.findFirst;
      console.log(`   ✅ Sản phẩm: ${product.ten} (${product.ma}) - Giá: ${product.dongia?.toLocaleString('vi-VN')} VNĐ`);
    }

    // Use Case 2: Lấy đơn hàng mới nhất của khách hàng cụ thể
    console.log('\n2. 📋 Lấy đơn hàng mới nhất (Get latest order):');
    const latestOrder = await client.query({
      query: FIND_FIRST,
      variables: {
        model: 'donhang',
        where: {
          trangthai: { not: 'cancelled' }
        },
        orderBy: [{ createdAt: 'desc' }],
        include: {
          khachhang: {
            select: {
              ten: true,
              ma: true
            }
          }
        },
        select: {
          id: true,
          ma: true,
          tongtien: true,
          createdAt: true,
          khachhang: true
        }
      }
    });
    
    if (latestOrder.data?.findFirst) {
      const order = latestOrder.data.findFirst;
      console.log(`   ✅ Đơn hàng: ${order.ma} - Khách hàng: ${order.khachhang?.ten} - Tổng tiền: ${order.tongtien?.toLocaleString('vi-VN')} VNĐ`);
      console.log(`   📅 Ngày tạo: ${new Date(order.createdAt).toLocaleString('vi-VN')}`);
    }

    // Use Case 3: Lấy khách hàng có số dư nợ cao nhất
    console.log('\n3. 💰 Lấy khách hàng có số dư nợ cao nhất (Customer with highest debt):');
    const highestDebtCustomer = await client.query({
      query: FIND_FIRST,
      variables: {
        model: 'khachhang',
        where: {
          trangthai: true,
          sodu: { gt: 0 }
        },
        orderBy: [{ sodu: 'desc' }],
        select: {
          id: true,
          ten: true,
          ma: true,
          sodu: true,
          dienthoai: true
        }
      }
    });
    
    if (highestDebtCustomer.data?.findFirst) {
      const customer = highestDebtCustomer.data.findFirst;
      console.log(`   ✅ Khách hàng: ${customer.ten} (${customer.ma})`);
      console.log(`   📞 SĐT: ${customer.dienthoai} - Số dư nợ: ${customer.sodu?.toLocaleString('vi-VN')} VNĐ`);
    }

    // Use Case 4: Lấy phiếu xuất kho gần nhất
    console.log('\n4. 📦 Lấy phiếu xuất kho gần nhất (Latest warehouse export):');
    const latestExport = await client.query({
      query: FIND_FIRST,
      variables: {
        model: 'phieukho',
        where: {
          loai: 'XUAT',
          trangthai: 'HOAN_THANH'
        },
        orderBy: [{ ngayxuat: 'desc' }],
        include: {
          kho: {
            select: {
              ten: true,
              ma: true
            }
          }
        },
        select: {
          id: true,
          ma: true,
          ngayxuat: true,
          tonggia: true,
          ghichu: true,
          kho: true
        }
      }
    });
    
    if (latestExport.data?.findFirst) {
      const export_ = latestExport.data.findFirst;
      console.log(`   ✅ Phiếu xuất: ${export_.ma} - Kho: ${export_.kho?.ten}`);
      console.log(`   📅 Ngày xuất: ${new Date(export_.ngayxuat).toLocaleDateString('vi-VN')}`);
      console.log(`   💵 Tổng giá: ${export_.tonggia?.toLocaleString('vi-VN')} VNĐ`);
    }

    // Use Case 5: Lấy người dùng đăng nhập gần nhất
    console.log('\n5. 👤 Lấy người dùng hoạt động gần nhất (Most recent active user):');
    const recentUser = await client.query({
      query: FIND_FIRST,
      variables: {
        model: 'user',
        where: {
          isActive: true,
          lastLogin: { not: null }
        },
        orderBy: [{ lastLogin: 'desc' }],
        select: {
          id: true,
          username: true,
          email: true,
          lastLogin: true,
          role: true
        }
      }
    });
    
    if (recentUser.data?.findFirst) {
      const user = recentUser.data.findFirst;
      console.log(`   ✅ User: ${user.username} (${user.email})`);
      console.log(`   🔑 Role: ${user.role} - Last login: ${new Date(user.lastLogin).toLocaleString('vi-VN')}`);
    }

    // Use Case 6: Lấy sản phẩm sắp hết hàng
    console.log('\n6. ⚠️  Lấy sản phẩm sắp hết hàng (Low stock product):');
    const lowStockProduct = await client.query({
      query: FIND_FIRST,
      variables: {
        model: 'sanpham',
        where: {
          trangthai: true,
          tonkho: { lt: 10, gt: 0 }
        },
        orderBy: [{ tonkho: 'asc' }],
        select: {
          id: true,
          ten: true,
          ma: true,
          tonkho: true,
          donvitinh: true
        }
      }
    });
    
    if (lowStockProduct.data?.findFirst) {
      const product = lowStockProduct.data.findFirst;
      console.log(`   ⚠️  Sản phẩm: ${product.ten} (${product.ma})`);
      console.log(`   📦 Tồn kho: ${product.tonkho} ${product.donvitinh || 'đơn vị'}`);
    }

    // Use Case 7: Performance comparison
    console.log('\n7. ⚡ So sánh hiệu suất findFirst vs findMany:');
    
    const startFindFirst = Date.now();
    await client.query({
      query: FIND_FIRST,
      variables: {
        model: 'sanpham',
        orderBy: [{ createdAt: 'desc' }],
        select: { id: true, ten: true }
      },
      fetchPolicy: 'no-cache'
    });
    const findFirstTime = Date.now() - startFindFirst;
    
    const FIND_MANY = gql`
      query FindMany($model: String!, $take: Int, $orderBy: JSON, $select: JSON) {
        findMany(model: $model, take: $take, orderBy: $orderBy, select: $select)
      }
    `;
    
    const startFindMany = Date.now();
    await client.query({
      query: FIND_MANY,
      variables: {
        model: 'sanpham',
        take: 1,
        orderBy: [{ createdAt: 'desc' }],
        select: { id: true, ten: true }
      },
      fetchPolicy: 'no-cache'
    });
    const findManyTime = Date.now() - startFindMany;
    
    console.log(`   📊 findFirst: ${findFirstTime}ms`);
    console.log(`   📊 findMany(take=1): ${findManyTime}ms`);
    console.log(`   🚀 findFirst nhanh hơn: ${Math.round((findManyTime - findFirstTime) / findManyTime * 100)}%`);

    console.log('\n🎉 Demo completed! findFirst method provides optimized single-record queries.');
    
  } catch (error) {
    console.error('❌ Demo error:', error.message);
    if (error.graphQLErrors) {
      error.graphQLErrors.forEach(err => {
        console.error('   GraphQL Error:', err.message);
      });
    }
  }
}

// Run demo
console.log('Starting findFirst practical demo...');
demoFindFirstUseCases().catch(console.error);
