import './polyfills.server.mjs';
import{f as $,g as m}from"./chunk-IZQHBKKJ.mjs";import{Ra as w,ja as M,oa as F,u as y,vd as v}from"./chunk-5IMI5WTE.mjs";import{a as d,b as p,d as O,j as c}from"./chunk-RIAI3ORJ.mjs";var S=m`
  query FindMany(
    $modelName: String!
    $where: JSON
    $orderBy: JSON
    $skip: Float
    $take: Float
    $include: JSON
    $select: JSON
  ) {
    findMany(
      modelName: $modelName
      where: $where
      orderBy: $orderBy
      skip: $skip
      take: $take
      include: $include
      select: $select
    )
  }
`,D=m`
  query FindUnique(
    $modelName: String!
    $where: JSON!
    $include: JSON
    $select: JSON
  ) {
    findUnique(
      modelName: $modelName
      where: $where
      include: $include
      select: $select
    )
  }
`,R=m`
  mutation CreateOne(
    $modelName: String!
    $data: JSON!
    $include: JSON
    $select: JSON
  ) {
    createOne(
      modelName: $modelName
      data: $data
      include: $include
      select: $select
    )
  }
`,L=m`
  mutation UpdateOne(
    $modelName: String!
    $where: JSON!
    $data: JSON!
    $include: JSON
    $select: JSON
  ) {
    updateOne(
      modelName: $modelName
      where: $where
      data: $data
      include: $include
      select: $select
    )
  }
`,_=m`
  mutation DeleteOne(
    $modelName: String!
    $where: JSON!
  ) {
    deleteOne(
      modelName: $modelName
      where: $where
    )
  }
`,U=m`
  mutation BatchCreate(
    $modelName: String!
    $data: [JSON!]!
  ) {
    batchCreate(
      modelName: $modelName
      data: $data
    )
  }
`,q=m`
  mutation BatchUpdate(
    $modelName: String!
    $operations: [JSON!]!
  ) {
    batchUpdate(
      modelName: $modelName
      operations: $operations
    )
  }
`,H=m`
  mutation BatchDelete(
    $modelName: String!
    $ids: [String!]!
  ) {
    batchDelete(
      modelName: $modelName
      ids: $ids
    )
  }
`,V=m`
  query HealthCheck {
    health
  }
`,I=m`
  query GetAvailableModels {
    getAvailableModels
  }
`,B=m`
  query ModelMetadata($modelName: String!) {
    modelMetadata(modelName: $modelName)
  }
`,K=m`
  query Aggregate(
    $modelName: String!
    $aggregations: JSON!
    $where: JSON
  ) {
    aggregate(
      modelName: $modelName
      aggregations: $aggregations
      where: $where
    )
  }
`,k=class P{constructor(e){this.apollo=e;this.initializeCacheCleanup(),this.performHealthCheck()}cache=new Map;DEFAULT_TTL=5*60*1e3;AGGRESSIVE_TTL=30*60*1e3;MAX_CACHE_SIZE=999999;CLEANUP_INTERVAL=60*1e3;REQUEST_TIMEOUT=3e4;MAX_RETRIES=3;DEFAULT_BATCH_SIZE=999999;MAX_PARALLEL_REQUESTS=5;performanceMetrics=w([]);cacheHitRate=v(()=>{let e=this.performanceMetrics();return e.length===0?0:e.filter(n=>n.cacheHit).length/e.length*100});errors=w([]);isHealthy=w(!0);loadingStates=new Map;initializeCacheCleanup(){setInterval(()=>{this.cleanupExpiredCache()},this.CLEANUP_INTERVAL)}cleanupExpiredCache(){let e=new Date,t=[];if(this.cache.forEach((n,a)=>{e.getTime()-n.timestamp.getTime()>n.ttl&&t.push(a)}),t.forEach(n=>this.cache.delete(n)),this.cache.size>this.MAX_CACHE_SIZE){let n=Array.from(this.cache.entries()).sort((i,r)=>i[1].timestamp.getTime()-r[1].timestamp.getTime()),a=this.cache.size-this.MAX_CACHE_SIZE;for(let i=0;i<a;i++)this.cache.delete(n[i][0])}}generateCacheKey(e,t){return`${e}_${JSON.stringify(t)}`}getFromCache(e){let t=this.cache.get(e);return t?new Date().getTime()-t.timestamp.getTime()>t.ttl?(this.cache.delete(e),null):t.data:null}setCache(e,t,n=this.DEFAULT_TTL){this.cache.set(e,{data:t,timestamp:new Date,ttl:n,key:e})}invalidateCache(e){if(!e){this.cache.clear();return}let t=[];this.cache.forEach((n,a)=>{a.includes(e)&&t.push(a)}),t.forEach(n=>this.cache.delete(n))}trackPerformance(e,t,n,a,i){let r={queryTime:Date.now()-t,cacheHit:n,resultCount:a,timestamp:new Date,queryType:e,modelName:i},s=this.performanceMetrics();this.performanceMetrics.set([...s.slice(-99),r])}trackError(e,t){let n={message:e.message||"Unknown error",code:e.code||e.extensions?.code,path:e.path,timestamp:new Date},a=this.errors();this.errors.set([...a.slice(-49),n])}setLoading(e,t){this.loadingStates.set(e,t)}performHealthCheck(){return c(this,null,function*(){})}findMany(n){return c(this,arguments,function*(e,t={}){let a=Date.now(),i=this.generateCacheKey("findMany",d({modelName:e},t)),r=`findMany_${e}`,s=this.getFromCache(i);if(s)return this.trackPerformance("findMany",a,!0,s.length,e),s;this.setLoading(r,!0);let h={modelName:e,where:t.where,orderBy:t.orderBy,skip:t.skip,take:t.take,include:t.include,select:t.select};try{let o=(yield y(this.apollo.query({query:S,variables:h,fetchPolicy:"cache-first"}))).data.findMany;return this.setCache(i,o),this.trackPerformance("findMany",a,!1,o.length,e),o}catch(l){throw this.trackError(l,"findMany"),l}finally{this.setLoading(r,!1)}})}findUnique(a,i){return c(this,arguments,function*(e,t,n={}){let r=Date.now(),s=this.generateCacheKey("findUnique",d({modelName:e,where:t},n)),h=`findUnique_${e}`,l=this.getFromCache(s);if(l)return this.trackPerformance("findUnique",r,!0,1,e),l;this.setLoading(h,!0);let o={modelName:e,where:t,include:n.include,select:n.select};try{let g=(yield y(this.apollo.query({query:D,variables:o,fetchPolicy:"cache-first"}))).data.findUnique;return this.setCache(s,g),this.trackPerformance("findUnique",r,!1,g?1:0,e),g}catch(u){throw this.trackError(u,"findUnique"),u}finally{this.setLoading(h,!1)}})}createOne(a,i){return c(this,arguments,function*(e,t,n={}){let r=Date.now(),s=`createOne_${e}`;this.setLoading(s,!0);let h={modelName:e,data:t,include:n.include,select:n.select};try{let o=(yield y(this.apollo.mutate({mutation:R,variables:h}))).data.createOne;return this.invalidateCache(e),this.trackPerformance("createOne",r,!1,1,e),o}catch(l){throw this.trackError(l,"createOne"),l}finally{this.setLoading(s,!1)}})}updateOne(i,r,s){return c(this,arguments,function*(e,t,n,a={}){let h=Date.now(),l=`updateOne_${e}`;this.setLoading(l,!0);let o={modelName:e,where:t,data:n,include:a.include,select:a.select};try{let g=(yield y(this.apollo.mutate({mutation:L,variables:o}))).data.updateOne;return this.invalidateCache(e),this.trackPerformance("updateOne",h,!1,1,e),g}catch(u){throw this.trackError(u,"updateOne"),u}finally{this.setLoading(l,!1)}})}deleteOne(e,t){return c(this,null,function*(){let n=Date.now(),a=`deleteOne_${e}`;this.setLoading(a,!0);let i={modelName:e,where:t};try{let s=(yield y(this.apollo.mutate({mutation:_,variables:i}))).data.deleteOne;return this.invalidateCache(e),this.trackPerformance("deleteOne",n,!1,1,e),s}catch(r){throw this.trackError(r,"deleteOne"),r}finally{this.setLoading(a,!1)}})}batchCreate(e,t){return c(this,null,function*(){let n=Date.now(),a=`batchCreate_${e}`;this.setLoading(a,!0);let i={modelName:e,data:t};try{let s=(yield y(this.apollo.mutate({mutation:U,variables:i}))).data.batchCreate;return this.invalidateCache(e),this.trackPerformance("batchCreate",n,!1,s.length,e),s}catch(r){throw this.trackError(r,"batchCreate"),r}finally{this.setLoading(a,!1)}})}batchUpdate(e,t){return c(this,null,function*(){let n=Date.now(),a=`batchUpdate_${e}`;this.setLoading(a,!0);let i={modelName:e,operations:t};try{let s=(yield y(this.apollo.mutate({mutation:q,variables:i}))).data.batchUpdate;return this.invalidateCache(e),this.trackPerformance("batchUpdate",n,!1,s.length,e),s}catch(r){throw this.trackError(r,"batchUpdate"),r}finally{this.setLoading(a,!1)}})}batchDelete(e,t){return c(this,null,function*(){let n=Date.now(),a=`batchDelete_${e}`;this.setLoading(a,!0);let i={modelName:e,ids:t};try{let s=(yield y(this.apollo.mutate({mutation:H,variables:i}))).data.batchDelete;return this.invalidateCache(e),this.trackPerformance("batchDelete",n,!1,s.length,e),s}catch(r){throw this.trackError(r,"batchDelete"),r}finally{this.setLoading(a,!1)}})}aggregate(e,t,n){return c(this,null,function*(){let a=Date.now(),i=`aggregate_${e}`,r=this.generateCacheKey("aggregate",{modelName:e,aggregations:t,where:n}),s=this.getFromCache(r);if(s)return this.trackPerformance("aggregate",a,!0,1,e),s;this.setLoading(i,!0);let h={modelName:e,aggregations:t,where:n};try{let o=(yield y(this.apollo.query({query:K,variables:h,fetchPolicy:"cache-first"}))).data.aggregate;return this.setCache(r,o,this.DEFAULT_TTL),this.trackPerformance("aggregate",a,!1,1,e),o}catch(l){throw this.trackError(l,"aggregate"),l}finally{this.setLoading(i,!1)}})}getAvailableModels(){return c(this,null,function*(){let e=Date.now(),t="getAvailableModels",n=this.getFromCache(t);if(n)return this.trackPerformance("getAvailableModels",e,!0,n.length),n;try{let i=(yield y(this.apollo.query({query:I,fetchPolicy:"cache-first"}))).data.getAvailableModels;return this.setCache(t,i,this.DEFAULT_TTL*12),this.trackPerformance("getAvailableModels",e,!1,i.length),i}catch(a){throw this.trackError(a,"getAvailableModels"),a}})}getModelMetadata(e){return c(this,null,function*(){let t=Date.now(),n=this.generateCacheKey("modelMetadata",{modelName:e}),a=this.getFromCache(n);if(a)return this.trackPerformance("modelMetadata",t,!0,1,e),a;try{let r=(yield y(this.apollo.query({query:B,variables:{modelName:e},fetchPolicy:"cache-first"}))).data.modelMetadata;return this.setCache(n,r,this.DEFAULT_TTL*6),this.trackPerformance("modelMetadata",t,!1,1,e),r}catch(i){throw this.trackError(i,"modelMetadata"),i}})}findManyWithPagination(n){return c(this,arguments,function*(e,t={}){let a=t.pageSize||10,i=Math.max(1,t.page||1),r=(i-1)*a,s=p(d({},t),{skip:r,take:a}),h=p(d({},t),{select:{id:!0}});delete h.skip,delete h.take;try{let o=(yield this.findMany(e,h)).length;return{data:yield this.findMany(e,s),totalCount:o,hasNextPage:r+a<o,hasPreviousPage:i>1,currentPage:i,totalPages:Math.ceil(o/a)}}catch(l){throw l}})}getPerformanceMetrics(){return this.performanceMetrics()}getCacheHitRate(){return this.cacheHitRate()}getErrors(){return this.errors()}getHealthStatus(){return this.isHealthy()}isLoading(e,t){let n=t?`${e}_${t}`:e;return this.loadingStates.get(n)||!1}getCacheSize(){return this.cache.size}findAll(n){return c(this,arguments,function*(e,t={}){let a=Date.now(),A=t,{enableParallelFetch:i=!0,enableStreaming:r=!0,batchSize:s=this.DEFAULT_BATCH_SIZE,maxConcurrency:h=this.MAX_PARALLEL_REQUESTS,aggressiveCache:l=!0}=A,o=O(A,["enableParallelFetch","enableStreaming","batchSize","maxConcurrency","aggressiveCache"]),u=this.generateCacheKey("findAll",d({modelName:e},o)),g=l?this.AGGRESSIVE_TTL:this.DEFAULT_TTL,T=this.getFromCache(u);if(T&&l)return p(d({},T),{fetchTime:Date.now()-a,cacheHit:!0});this.setLoading(`findAll_${e}`,!0);try{let f;i?f=yield this.parallelFindAll(e,o,s,h):r?f=yield this.streamingFindAll(e,o,s):f=yield this.standardFindAll(e,o);let b=p(d({},f),{fetchTime:Date.now()-a,cacheHit:!1,parallel:i});return this.setCache(u,b,g),this.trackPerformance("findAll",a,!1,f.totalCount,e),b}catch(f){throw this.trackError(f,"findAll"),f}finally{this.setLoading(`findAll_${e}`,!1)}})}parallelFindAll(e,t,n,a){return c(this,null,function*(){let r=(yield this.findMany(e,p(d({},t),{select:{id:!0}}))).length;if(r===0)return{data:[],totalCount:0,fetchTime:0,cacheHit:!1,parallel:!0,batches:0};let s=Math.ceil(r/n),h=(u,g)=>c(this,null,function*(){return yield this.findMany(e,p(d({},t),{skip:u,take:g}))});return{data:yield c(this,null,function*(){let u=[],g=[];for(let T=0;T<s;T++){let A=T*n,f=Math.min(n,r-A),b=h(A,f).then(C=>{u.push(...C)});if(g.push(b),g.length>=a){yield Promise.race(g);let C=g.filter(E=>E&&typeof E.isPending!="boolean");g.length=0,g.push(...C)}}return yield Promise.all(g),u}),totalCount:r,fetchTime:0,cacheHit:!1,parallel:!0,batches:s}})}streamingFindAll(e,t,n){return c(this,null,function*(){let a=[],i=0,r=0,s=!0,h=0;for(;s;){let l=yield this.findMany(e,p(d({},t),{skip:i,take:n}));if(l.length===0){s=!1;break}a.push(...l),r+=l.length,i+=n,h++,l.length<n&&(s=!1),h%5===0&&(yield new Promise(o=>setTimeout(o,0)))}return{data:a,totalCount:r,fetchTime:0,cacheHit:!1,parallel:!1,batches:h}})}standardFindAll(e,t){return c(this,null,function*(){let n=yield this.findMany(e,t);return{data:n,totalCount:n.length,fetchTime:0,cacheHit:!1,parallel:!1}})}findAllMultiple(n){return c(this,arguments,function*(e,t={}){let a=Date.now(),i={},r=e.map(l=>c(this,[l],function*({name:s,options:h={}}){let o=d(d({},t),h),u=yield this.findAll(s,o);return{name:s,result:u}}));try{(yield Promise.all(r)).forEach(({name:l,result:o})=>{i[l]=o});let h=Object.values(i).reduce((l,o)=>l+o.totalCount,0);return this.trackPerformance("findAllMultiple",a,!1,h,"multiple"),i}catch(s){throw this.trackError(s,"findAllMultiple"),s}})}smartFindAll(n){return c(this,arguments,function*(e,t={}){let a=yield this.getModelMetadata(e),i=a?.estimatedRecordCount||1e3,r=a?.hasComplexRelations||!1,s=p(d({},t),{enableParallelFetch:i>5e3,enableStreaming:i>1e4,batchSize:r?500:2e3,maxConcurrency:r?3:5,aggressiveCache:i<5e4});return yield this.findAll(e,s)})}clearCache(e){this.invalidateCache(e)}refreshHealthCheck(){return c(this,null,function*(){yield this.performHealthCheck()})}benchmarkFindAll(n){return c(this,arguments,function*(e,t=[]){let a=[{enableParallelFetch:!1,enableStreaming:!1},{enableParallelFetch:!0,enableStreaming:!1,batchSize:500},{enableParallelFetch:!0,enableStreaming:!1,batchSize:2e3},{enableParallelFetch:!1,enableStreaming:!0,batchSize:1e3},{enableParallelFetch:!0,enableStreaming:!1,aggressiveCache:!0}],i=t.length>0?t:a,r=[];this.clearCache(e);for(let h of i){console.log("\u{1F9EA} Testing configuration:",h);let l=Date.now(),o=yield this.findAll(e,h),u=Date.now()-l,g={totalTime:u,recordsPerSecond:Math.round(o.totalCount/(u/1e3)),cacheEfficiency:o.cacheHit?100:0};r.push({config:h,result:o,performance:g}),console.log(`\u2705 Completed: ${u}ms, ${g.recordsPerSecond} records/sec`),yield new Promise(T=>setTimeout(T,100))}let s=r.reduce((h,l)=>l.performance.recordsPerSecond>h.performance.recordsPerSecond?l:h);return{results:r,recommendation:s.config}})}findAllTonKho(){return c(this,arguments,function*(e={}){return yield this.findAll("tonkho",d({batchSize:2e3,enableParallelFetch:!0,aggressiveCache:!0,select:{id:!0,sanphamId:!0,slton:!0,slchogiao:!0,slchonhap:!0,sanpham:{select:{id:!0,ten:!0,gia:!0}}}},e))})}findAllSanpham(){return c(this,arguments,function*(e={}){return yield this.smartFindAll("sanpham",d({select:{id:!0,ten:!0,gia:!0,mota:!0,active:!0,createdAt:!0},orderBy:{ten:"asc"},aggressiveCache:!0},e))})}findAllKhachhang(){return c(this,arguments,function*(e={}){return yield this.smartFindAll("khachhang",d({select:{id:!0,ten:!0,email:!0,sdt:!0,diachi:!0,active:!0},orderBy:{ten:"asc"},batchSize:1e3,enableParallelFetch:!0},e))})}findAllDonhang(){return c(this,arguments,function*(e={}){return yield this.findAll("donhang",d({include:{khachhang:{select:{id:!0,ten:!0,sdt:!0}},donhangsanpham:{select:{id:!0,soluong:!0,gia:!0,sanpham:{select:{id:!0,ten:!0}}}}},orderBy:{createdAt:"desc"},batchSize:500,maxConcurrency:3},e))})}loadDashboardData(){return c(this,arguments,function*(e={}){let t=Date.now(),[n,a,i,r]=yield Promise.all([this.findAllSanpham(d({take:100,aggressiveCache:!0},e)),this.findAllKhachhang(d({take:50,aggressiveCache:!0},e)),this.findAllTonKho(d({take:200,aggressiveCache:!0},e)),this.findAllDonhang(d({take:20,aggressiveCache:!0},e))]);return{sanpham:n,khachhang:a,tonkho:i,donhang:r,totalLoadTime:Date.now()-t}})}getSanphamList(){return c(this,arguments,function*(e={}){return yield this.findMany("sanpham",d({orderBy:{ten:"asc"}},e))})}getSanphamById(e){return c(this,null,function*(){return yield this.findUnique("sanpham",{id:e})})}getKhachhangList(){return c(this,arguments,function*(e={}){return yield this.findMany("khachhang",d({orderBy:{ten:"asc"}},e))})}getKhachhangById(e){return c(this,null,function*(){return yield this.findUnique("khachhang",{id:e})})}getDonhangList(){return c(this,arguments,function*(e={}){return yield this.findMany("donhang",d({orderBy:{createdAt:"desc"},include:{khachhang:!0,donhangsanpham:{include:{sanpham:!0}}}},e))})}getDonhangById(e){return c(this,null,function*(){return yield this.findUnique("donhang",{id:e},{include:{khachhang:!0,donhangsanpham:{include:{sanpham:!0}}}})})}getDathangList(){return c(this,arguments,function*(e={}){return yield this.findMany("dathang",d({orderBy:{createdAt:"desc"},include:{nhacungcap:!0,dathangsanpham:{include:{sanpham:!0}}}},e))})}getUserList(){return c(this,arguments,function*(e={}){return yield this.findMany("user",d({orderBy:{ten:"asc"},select:{id:!0,ten:!0,email:!0,sdt:!0,createdAt:!0,updatedAt:!0}},e))})}getUserById(e){return c(this,null,function*(){return yield this.findUnique("user",{id:e},{include:{profile:!0,userRole:{include:{role:!0}}}})})}static \u0275fac=function(t){return new(t||P)(F($))};static \u0275prov=M({token:P,factory:P.\u0275fac,providedIn:"root"})};export{k as a};
