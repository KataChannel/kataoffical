/**
 * FIXED batchFindAll method - Replace the existing one in graphql.service.ts
 * This fixes the issue with the new data structure that has nested pagination
 */
private async batchFindAll<T = any>(
  modelName: string,
  options: any,
  cacheOptions: any
): Promise<GraphQLResponse<T[]>> {
  const batchSize = cacheOptions.batchSize || 500;
  const allData: T[] = [];
  let skip = 0;
  let hasMore = true;
  let currentPage = 1;

  while (hasMore) {
    const batchResult = await this.findMany<T>(modelName, {
      ...options,
      skip,
      take: batchSize,
      useCache: false
    });

    console.log(`📊 Batch ${currentPage} result:`, batchResult.data);

    if (batchResult.data?.data) {
      let dataArray: T[] = [];
      let shouldContinue = false;
      
      // Check if it's the new format with nested data and pagination object
      if (batchResult.data.data && typeof batchResult.data.data === 'object' && 'data' in batchResult.data.data) {
        // New format: { data: { data: [], pagination: {...} } }
        const nestedData = (batchResult.data.data as any).data;
        dataArray = Array.isArray(nestedData) ? nestedData : [];
        
        const pagination = (batchResult.data.data as any).pagination;
        shouldContinue = pagination?.hasNextPage || false;
        
        console.log(`✅ New format - Page ${currentPage}: ${dataArray.length} items, hasNextPage: ${shouldContinue}, total: ${pagination?.total || 'unknown'}`);
        
      } else if (Array.isArray(batchResult.data.data)) {
        // Old format: { data: [...], hasMore: boolean }
        dataArray = batchResult.data.data;
        shouldContinue = batchResult.data.hasMore || false;
        
        console.log(`🔄 Old format - Page ${currentPage}: ${dataArray.length} items, hasMore: ${shouldContinue}`);
      }
      
      // Add data to collection
      if (dataArray.length > 0) {
        allData.push(...dataArray);
        console.log(`📈 Total items collected so far: ${allData.length}`);
      }
      
      // Update pagination
      hasMore = shouldContinue && dataArray.length > 0;
      skip += batchSize;
      currentPage++;
      
      // Safety check to prevent infinite loops
      if (currentPage > 100) {
        console.warn('⚠️ Batch processing stopped: too many pages (safety limit)');
        break;
      }
      
      // If we got less data than the batch size and no explicit continuation, stop
      if (dataArray.length < batchSize && !shouldContinue) {
        console.log(`🏁 Last batch detected: ${dataArray.length} < ${batchSize} items`);
        hasMore = false;
      }
      
    } else {
      console.log('❌ No data in batch result, stopping');
      hasMore = false;
    }

    // Small delay to prevent server overload
    if (hasMore) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  console.log(`✅ Batch processing complete: ${allData.length} total items collected`);

  // Cache the complete result
  if (cacheOptions.useCache && cacheOptions.cacheKey) {
    this.setCachedData(cacheOptions.cacheKey, allData, cacheOptions.cacheTimeout);
  }

  return { data: allData };
}

/**
 * ALTERNATIVE: If you also need to fix the variable type issue in findMany query
 * Replace the Float types with Int in the GraphQL query:
 */
const FIXED_QUERY = `
  query FindManyOptimized($modelName: String!, $where: JSON, $orderBy: JSON, $skip: Int, $take: Int, $include: JSON) {
    findMany(
      modelName: $modelName
      where: $where
      orderBy: $orderBy
      skip: $skip
      take: $take
      include: $include
    )
  }
`;
