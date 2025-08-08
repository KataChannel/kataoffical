// Fixed loadDathang method for nhucaudathang.component.ts

async loadDathang() {
  try {
    console.log('🔄 Attempting to load dathang data...');
    
    // Step 1: Check GraphQL schema availability
    const introspectionResult = await this._GraphqlService.executeGraphQL({
      query: `
        query IntrospectSchema {
          __schema {
            queryType {
              fields {
                name
                type {
                  name
                }
              }
            }
          }
        }
      `
    });
    
    const availableQueries = introspectionResult.data?.__schema?.queryType?.fields?.map((f: any) => f.name) || [];
    console.log('Available GraphQL queries:', availableQueries);
    
    // Step 2: Check if findMany query exists
    const hasFindMany = availableQueries.includes('findMany');
    
    if (!hasFindMany) {
      console.warn('❌ findMany query not available in GraphQL schema');
      throw new Error('GraphQL schema does not support findMany query');
    }
    
    // Step 3: Test with a minimal query first
    const testResult = await this._GraphqlService.executeGraphQL({
      query: `
        query TestDathang($modelName: String!, $take: Float) {
          findMany(modelName: $modelName, take: $take)
        }
      `,
      variables: {
        modelName: "dathang",
        take: 1
      }
    });
    
    if (testResult.errors) {
      console.error('❌ Test query failed:', testResult.errors);
      throw new Error(`GraphQL test failed: ${testResult.errors[0]?.message}`);
    }
    
    console.log('✅ Test query successful');
    
    // Step 4: Load the actual data using universal findMany
    const result = await this._GraphqlService.findMany('dathang', { 
      take: 50, // Reasonable limit
      skip: 0,
      orderBy: { createdAt: 'desc' },
      useCache: false // Disable cache for initial debugging
    });

    if (result.data?.data) {
      console.log('✅ Dathang data loaded successfully:', result.data.data.length, 'records');
      
      // Optional: Store the data in a component signal if needed
      // this.dathangs.set(result.data.data);
      
      this._snackBar.open(`Đã tải ${result.data.data.length} đơn đặt hàng`, '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
      
      return result.data.data;
    } else {
      console.warn('⚠️ No data returned from GraphQL');
      this._snackBar.open('Không có dữ liệu đặt hàng', '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-info'],
      });
      return [];
    }
    
  } catch (error: any) {
    console.error('❌ Error loading Dathang:', error);
    
    // Enhanced error handling with specific error types
    let errorMessage = 'Không thể tải dữ liệu đặt hàng';
    let errorCategory = 'unknown';
    
    // Analyze error type
    if (error?.message?.includes('Cannot query field')) {
      errorMessage = 'Trường dữ liệu không tồn tại trong GraphQL schema';
      errorCategory = 'schema';
    } else if (error?.message?.includes('400') || error?.status === 400) {
      errorMessage = 'Lỗi cú pháp truy vấn GraphQL';
      errorCategory = 'syntax';
    } else if (error?.message?.includes('network') || error?.networkError) {
      errorMessage = 'Lỗi kết nối với server GraphQL';
      errorCategory = 'network';
    } else if (error?.message?.includes('timeout')) {
      errorMessage = 'Timeout khi tải dữ liệu';
      errorCategory = 'timeout';
    } else if (error?.graphQLErrors?.length > 0) {
      errorMessage = `Lỗi GraphQL: ${error.graphQLErrors[0].message}`;
      errorCategory = 'graphql';
    } else if (error?.message?.includes('schema does not support')) {
      errorMessage = 'GraphQL schema chưa được cấu hình đúng';
      errorCategory = 'schema';
    }
    
    console.error('Error details:', {
      category: errorCategory,
      message: error?.message,
      status: error?.status,
      graphQLErrors: error?.graphQLErrors,
      networkError: error?.networkError
    });
    
    // Display user-friendly error message
    this._snackBar.open(errorMessage, '', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
    
    // Fallback strategy based on error type
    if (errorCategory === 'schema' || errorCategory === 'graphql') {
      console.log('🔄 Attempting fallback to traditional REST service...');
      
      try {
        if (this._DathangService?.getAllDathang) {
          const fallbackData = await this._DathangService.getAllDathang();
          console.log('✅ Fallback data loaded:', fallbackData?.length || 0, 'records');
          
          if (fallbackData?.length > 0) {
            this._snackBar.open(`Đã tải ${fallbackData.length} đơn hàng (REST API)`, '', {
              duration: 2000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-info'],
            });
            return fallbackData;
          }
        } else {
          console.warn('⚠️ Traditional REST service not available');
        }
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError);
      }
    }
    
    return [];
  }
}
