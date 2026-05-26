import './polyfills.server.mjs';
import{f as k,g as y}from"./chunk-GMH35GGL.mjs";import{C as D}from"./chunk-O37VUVBC.mjs";import{Ad as S,La as v,Ra as P,Wa as M,ja as $,oa as b,u as m}from"./chunk-6BT3SWQV.mjs";import{a as d,b as p,d as O,j as c}from"./chunk-RIAI3ORJ.mjs";var _=y`
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
`,L=y`
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
`,U=y`
  query FindFirst(
    $modelName: String!
    $where: JSON
    $orderBy: JSON
    $include: JSON
    $select: JSON
  ) {
    findFirst(
      modelName: $modelName
      where: $where
      orderBy: $orderBy
      include: $include
      select: $select
    )
  }
`,N=y`
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
`,B=y`
  mutation UpdateRecord(
    $modelName: String!
    $where: JSON!
    $data: JSON!
    $include: JSON
    $select: JSON
  ) {
    updateRecord(
      modelName: $modelName
      where: $where
      data: $data
      include: $include
      select: $select
    )
  }
`,I=y`
  mutation DeleteOne(
    $modelName: String!
    $where: JSON!
  ) {
    deleteOne(
      modelName: $modelName
      where: $where
    )
  }
`,q=y`
  mutation BatchCreate(
    $modelName: String!
    $data: [JSON!]!
  ) {
    batchCreate(
      modelName: $modelName
      data: $data
    )
  }
`,H=y`
  mutation BatchUpdate(
    $modelName: String!
    $operations: [JSON!]!
  ) {
    batchUpdate(
      modelName: $modelName
      operations: $operations
    )
  }
`,K=y`
  mutation BatchDelete(
    $modelName: String!
    $ids: [String!]!
  ) {
    batchDelete(
      modelName: $modelName
      ids: $ids
    )
  }
`,re=y`
  query HealthCheck {
    health
  }
`,z=y`
  query GetAvailableModels {
    getAvailableModels
  }
`,x=y`
  query ModelMetadata($modelName: String!) {
    modelMetadata(modelName: $modelName)
  }
`,J=y`
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
`,G=y`
  query GetNhuCauDatHang($startDate: String!, $endDate: String!) {
    getNhuCauDatHang(startDate: $startDate, endDate: $endDate)
  }
`,Q=y`
  mutation SaveNhucauNote($sanphamId: String!, $content: String!) {
    saveNhucauNote(sanphamId: $sanphamId, content: $content)
  }
`,R=class C{constructor(e,t,n){this.apollo=e;this.platformId=t;this.ngZone=n;D(this.platformId)&&(this.ngZone.runOutsideAngular(()=>{this.initializeCacheCleanup()}),this.performHealthCheck())}cache=new Map;DEFAULT_TTL=5*60*1e3;AGGRESSIVE_TTL=30*60*1e3;MAX_CACHE_SIZE=1e3;CLEANUP_INTERVAL=60*1e3;REQUEST_TIMEOUT=3e4;MAX_RETRIES=3;DEFAULT_BATCH_SIZE=500;MAX_PARALLEL_REQUESTS=5;performanceMetrics=P([]);cacheHitRate=S(()=>{let e=this.performanceMetrics();return e.length===0?0:e.filter(n=>n.cacheHit).length/e.length*100});errors=P([]);isHealthy=P(!0);loadingStates=new Map;initializeCacheCleanup(){setInterval(()=>{this.cleanupExpiredCache()},this.CLEANUP_INTERVAL)}cleanupExpiredCache(){let e=new Date,t=[];if(this.cache.forEach((n,a)=>{e.getTime()-n.timestamp.getTime()>n.ttl&&t.push(a)}),t.forEach(n=>this.cache.delete(n)),this.cache.size>this.MAX_CACHE_SIZE){let n=Array.from(this.cache.entries()).sort((s,r)=>s[1].timestamp.getTime()-r[1].timestamp.getTime()),a=this.cache.size-this.MAX_CACHE_SIZE;for(let s=0;s<a;s++)this.cache.delete(n[s][0])}}generateCacheKey(e,t){return`${e}_${JSON.stringify(t)}`}getFromCache(e){let t=this.cache.get(e);return t?new Date().getTime()-t.timestamp.getTime()>t.ttl?(this.cache.delete(e),null):t.data:null}setCache(e,t,n=this.DEFAULT_TTL){this.cache.set(e,{data:t,timestamp:new Date,ttl:n,key:e})}invalidateCache(e){if(!e){this.cache.clear();return}let t=[];this.cache.forEach((n,a)=>{a.includes(e)&&t.push(a)}),t.forEach(n=>this.cache.delete(n))}trackPerformance(e,t,n,a,s){let r={queryTime:Date.now()-t,cacheHit:n,resultCount:a,timestamp:new Date,queryType:e,modelName:s},i=this.performanceMetrics();this.performanceMetrics.set([...i.slice(-99),r])}trackError(e,t){let n={message:e.message||"Unknown error",code:e.code||e.extensions?.code,path:e.path,timestamp:new Date},a=this.errors();this.errors.set([...a.slice(-49),n])}setLoading(e,t){this.loadingStates.set(e,t)}performHealthCheck(){return c(this,null,function*(){})}findMany(n){return c(this,arguments,function*(e,t={}){let a=Date.now(),s=this.generateCacheKey("findMany",d({modelName:e},t)),r=`findMany_${e}`,i=this.getFromCache(s);if(i)return this.trackPerformance("findMany",a,!0,i.length,e),i;this.setLoading(r,!0);let l={modelName:e,where:t.where,orderBy:t.orderBy,skip:t.skip,take:t.take,include:t.include,select:t.select};try{let h=(yield m(this.apollo.query({query:_,variables:l,fetchPolicy:"cache-first"}))).data.findMany;return this.setCache(s,h),this.trackPerformance("findMany",a,!1,h.length,e),h}catch(o){throw this.trackError(o,"findMany"),o}finally{this.setLoading(r,!1)}})}findUnique(a,s){return c(this,arguments,function*(e,t,n={}){let r=Date.now(),i=this.generateCacheKey("findUnique",d({modelName:e,where:t},n)),l=`findUnique_${e}`,o=this.getFromCache(i);if(o)return this.trackPerformance("findUnique",r,!0,1,e),o;this.setLoading(l,!0);let h={modelName:e,where:t,include:n.include,select:n.select};try{let g=(yield m(this.apollo.query({query:L,variables:h,fetchPolicy:"cache-first"}))).data.findUnique;return this.setCache(i,g),this.trackPerformance("findUnique",r,!1,g?1:0,e),g}catch(u){throw this.trackError(u,"findUnique"),u}finally{this.setLoading(l,!1)}})}findFirst(n){return c(this,arguments,function*(e,t={}){let a=Date.now(),s=this.generateCacheKey("findFirst",d({modelName:e},t)),r=`findFirst_${e}`,i=this.getFromCache(s);if(i)return this.trackPerformance("findFirst",a,!0,1,e),i;this.setLoading(r,!0);let l={modelName:e,where:t.where,orderBy:t.orderBy,include:t.include,select:t.select};try{let h=(yield m(this.apollo.query({query:U,variables:l,fetchPolicy:"cache-first"}))).data.findFirst;return this.setCache(s,h),this.trackPerformance("findFirst",a,!1,h?1:0,e),h}catch(o){throw this.trackError(o,"findFirst"),o}finally{this.setLoading(r,!1)}})}createOne(a,s){return c(this,arguments,function*(e,t,n={}){let r=Date.now(),i=`createOne_${e}`;this.setLoading(i,!0);let l={modelName:e,data:t,include:n.include,select:n.select};try{let h=(yield m(this.apollo.mutate({mutation:N,variables:l}))).data.createOne;return this.invalidateCache(e),this.trackPerformance("createOne",r,!1,1,e),h}catch(o){throw this.trackError(o,"createOne"),o}finally{this.setLoading(i,!1)}})}updateOne(s,r,i){return c(this,arguments,function*(e,t,n,a={}){let l=Date.now(),o=`updateOne_${e}`;this.setLoading(o,!0);let h={modelName:e,where:t,data:n,include:a.include,select:a.select};try{let g=(yield m(this.apollo.mutate({mutation:B,variables:h}))).data.updateRecord;return this.invalidateCache(e),this.trackPerformance("updateOne",l,!1,1,e),g}catch(u){throw this.trackError(u,"updateOne"),u}finally{this.setLoading(o,!1)}})}deleteOne(e,t){return c(this,null,function*(){let n=Date.now(),a=`deleteOne_${e}`;this.setLoading(a,!0);let s={modelName:e,where:t};try{let i=(yield m(this.apollo.mutate({mutation:I,variables:s}))).data.deleteOne;return this.invalidateCache(e),this.trackPerformance("deleteOne",n,!1,1,e),i}catch(r){throw this.trackError(r,"deleteOne"),r}finally{this.setLoading(a,!1)}})}batchCreate(e,t){return c(this,null,function*(){let n=Date.now(),a=`batchCreate_${e}`;this.setLoading(a,!0);let s={modelName:e,data:t};try{let i=(yield m(this.apollo.mutate({mutation:q,variables:s}))).data.batchCreate;return this.invalidateCache(e),this.trackPerformance("batchCreate",n,!1,i.length,e),i}catch(r){throw this.trackError(r,"batchCreate"),r}finally{this.setLoading(a,!1)}})}batchUpdate(e,t){return c(this,null,function*(){let n=Date.now(),a=`batchUpdate_${e}`;this.setLoading(a,!0);let s={modelName:e,operations:t};try{let i=(yield m(this.apollo.mutate({mutation:H,variables:s}))).data.batchUpdate;return this.invalidateCache(e),this.trackPerformance("batchUpdate",n,!1,i.length,e),i}catch(r){throw this.trackError(r,"batchUpdate"),r}finally{this.setLoading(a,!1)}})}batchDelete(e,t){return c(this,null,function*(){let n=Date.now(),a=`batchDelete_${e}`;this.setLoading(a,!0);let s={modelName:e,ids:t};try{let i=(yield m(this.apollo.mutate({mutation:K,variables:s}))).data.batchDelete;return this.invalidateCache(e),this.trackPerformance("batchDelete",n,!1,i.length,e),i}catch(r){throw this.trackError(r,"batchDelete"),r}finally{this.setLoading(a,!1)}})}aggregate(e,t,n){return c(this,null,function*(){let a=Date.now(),s=`aggregate_${e}`,r=this.generateCacheKey("aggregate",{modelName:e,aggregations:t,where:n}),i=this.getFromCache(r);if(i)return this.trackPerformance("aggregate",a,!0,1,e),i;this.setLoading(s,!0);let l={modelName:e,aggregations:t,where:n};try{let h=(yield m(this.apollo.query({query:J,variables:l,fetchPolicy:"cache-first"}))).data.aggregate;return this.setCache(r,h,this.DEFAULT_TTL),this.trackPerformance("aggregate",a,!1,1,e),h}catch(o){throw this.trackError(o,"aggregate"),o}finally{this.setLoading(s,!1)}})}getAvailableModels(){return c(this,null,function*(){let e=Date.now(),t="getAvailableModels",n=this.getFromCache(t);if(n)return this.trackPerformance("getAvailableModels",e,!0,n.length),n;try{let s=(yield m(this.apollo.query({query:z,fetchPolicy:"cache-first"}))).data.getAvailableModels;return this.setCache(t,s,this.DEFAULT_TTL*12),this.trackPerformance("getAvailableModels",e,!1,s.length),s}catch(a){throw this.trackError(a,"getAvailableModels"),a}})}getModelMetadata(e){return c(this,null,function*(){let t=Date.now(),n=this.generateCacheKey("modelMetadata",{modelName:e}),a=this.getFromCache(n);if(a)return this.trackPerformance("modelMetadata",t,!0,1,e),a;try{let r=(yield m(this.apollo.query({query:x,variables:{modelName:e},fetchPolicy:"cache-first"}))).data.modelMetadata;return this.setCache(n,r,this.DEFAULT_TTL*6),this.trackPerformance("modelMetadata",t,!1,1,e),r}catch(s){throw this.trackError(s,"modelMetadata"),s}})}findManyWithPagination(n){return c(this,arguments,function*(e,t={}){let a=t.pageSize||10,s=Math.max(1,t.page||1),r=(s-1)*a,i=p(d({},t),{skip:r,take:a}),l=p(d({},t),{select:{id:!0}});delete l.skip,delete l.take;try{let h=(yield this.findMany(e,l)).length;return{data:yield this.findMany(e,i),totalCount:h,hasNextPage:r+a<h,hasPreviousPage:s>1,currentPage:s,totalPages:Math.ceil(h/a)}}catch(o){throw o}})}getPerformanceMetrics(){return this.performanceMetrics()}getCacheHitRate(){return this.cacheHitRate()}getErrors(){return this.errors()}getHealthStatus(){return this.isHealthy()}isLoading(e,t){let n=t?`${e}_${t}`:e;return this.loadingStates.get(n)||!1}getCacheSize(){return this.cache.size}findAll(n){return c(this,arguments,function*(e,t={}){let a=Date.now(),A=t,{enableParallelFetch:s=!0,enableStreaming:r=!0,batchSize:i=this.DEFAULT_BATCH_SIZE,maxConcurrency:l=this.MAX_PARALLEL_REQUESTS,aggressiveCache:o=!0}=A,h=O(A,["enableParallelFetch","enableStreaming","batchSize","maxConcurrency","aggressiveCache"]),u=this.generateCacheKey("findAll",d({modelName:e},h)),g=o?this.AGGRESSIVE_TTL:this.DEFAULT_TTL,T=this.getFromCache(u);if(T&&o)return p(d({},T),{fetchTime:Date.now()-a,cacheHit:!0});this.setLoading(`findAll_${e}`,!0);try{let f;s?f=yield this.parallelFindAll(e,h,i,l):r?f=yield this.streamingFindAll(e,h,i):f=yield this.standardFindAll(e,h);let w=p(d({},f),{fetchTime:Date.now()-a,cacheHit:!1,parallel:s});return this.setCache(u,w,g),this.trackPerformance("findAll",a,!1,f.totalCount,e),w}catch(f){throw this.trackError(f,"findAll"),f}finally{this.setLoading(`findAll_${e}`,!1)}})}parallelFindAll(e,t,n,a){return c(this,null,function*(){let r=(yield this.findMany(e,p(d({},t),{select:{id:!0},take:1e5}))).length;if(r===0)return{data:[],totalCount:0,fetchTime:0,cacheHit:!1,parallel:!0,batches:0};let i=Math.ceil(r/n),l=(u,g)=>c(this,null,function*(){return yield this.findMany(e,p(d({},t),{skip:u,take:g}))});return{data:yield c(this,null,function*(){let u=[],g=[];for(let T=0;T<i;T++){let A=T*n,f=Math.min(n,r-A),w=l(A,f).then(F=>{u.push(...F)});if(g.push(w),g.length>=a){yield Promise.race(g);let F=g.filter(E=>E&&typeof E.isPending!="boolean");g.length=0,g.push(...F)}}return yield Promise.all(g),u}),totalCount:r,fetchTime:0,cacheHit:!1,parallel:!0,batches:i}})}streamingFindAll(e,t,n){return c(this,null,function*(){let a=[],s=0,r=0,i=!0,l=0;for(;i;){let o=yield this.findMany(e,p(d({},t),{skip:s,take:n}));if(o.length===0){i=!1;break}a.push(...o),r+=o.length,s+=n,l++,o.length<n&&(i=!1),l%5===0&&(yield new Promise(h=>setTimeout(h,0)))}return{data:a,totalCount:r,fetchTime:0,cacheHit:!1,parallel:!1,batches:l}})}standardFindAll(e,t){return c(this,null,function*(){let n=yield this.findMany(e,t);return{data:n,totalCount:n.length,fetchTime:0,cacheHit:!1,parallel:!1}})}findAllMultiple(n){return c(this,arguments,function*(e,t={}){let a=Date.now(),s={},r=e.map(o=>c(this,[o],function*({name:i,options:l={}}){let h=d(d({},t),l),u=yield this.findAll(i,h);return{name:i,result:u}}));try{(yield Promise.all(r)).forEach(({name:o,result:h})=>{s[o]=h});let l=Object.values(s).reduce((o,h)=>o+h.totalCount,0);return this.trackPerformance("findAllMultiple",a,!1,l,"multiple"),s}catch(i){throw this.trackError(i,"findAllMultiple"),i}})}smartFindAll(n){return c(this,arguments,function*(e,t={}){let a=yield this.getModelMetadata(e),s=a?.estimatedRecordCount||1e3,r=a?.hasComplexRelations||!1,i=p(d({},t),{enableParallelFetch:s>5e3,enableStreaming:s>1e4,batchSize:r?500:2e3,maxConcurrency:r?3:5,aggressiveCache:s<5e4});return yield this.findAll(e,i)})}clearCache(e){this.invalidateCache(e)}refreshHealthCheck(){return c(this,null,function*(){yield this.performHealthCheck()})}benchmarkFindAll(n){return c(this,arguments,function*(e,t=[]){let a=[{enableParallelFetch:!1,enableStreaming:!1},{enableParallelFetch:!0,enableStreaming:!1,batchSize:500},{enableParallelFetch:!0,enableStreaming:!1,batchSize:2e3},{enableParallelFetch:!1,enableStreaming:!0,batchSize:1e3},{enableParallelFetch:!0,enableStreaming:!1,aggressiveCache:!0}],s=t.length>0?t:a,r=[];this.clearCache(e);for(let l of s){console.log("\u{1F9EA} Testing configuration:",l);let o=Date.now(),h=yield this.findAll(e,l),u=Date.now()-o,g={totalTime:u,recordsPerSecond:Math.round(h.totalCount/(u/1e3)),cacheEfficiency:h.cacheHit?100:0};r.push({config:l,result:h,performance:g}),console.log(`\u2705 Completed: ${u}ms, ${g.recordsPerSecond} records/sec`),yield new Promise(T=>setTimeout(T,100))}let i=r.reduce((l,o)=>o.performance.recordsPerSecond>l.performance.recordsPerSecond?o:l);return{results:r,recommendation:i.config}})}findAllTonKho(){return c(this,arguments,function*(e={}){return yield this.findAll("tonkho",d({batchSize:2e3,enableParallelFetch:!0,aggressiveCache:!0,select:{id:!0,sanphamId:!0,slton:!0,slchogiao:!0,slchonhap:!0,sanpham:{select:{id:!0,ten:!0,gia:!0}}}},e))})}findAllSanpham(){return c(this,arguments,function*(e={}){return yield this.smartFindAll("sanpham",d({select:{id:!0,ten:!0,gia:!0,mota:!0,active:!0,createdAt:!0},orderBy:{ten:"asc"},aggressiveCache:!0},e))})}findAllKhachhang(){return c(this,arguments,function*(e={}){return yield this.smartFindAll("khachhang",d({select:{id:!0,ten:!0,email:!0,sdt:!0,diachi:!0,active:!0},orderBy:{ten:"asc"},batchSize:1e3,enableParallelFetch:!0},e))})}findAllDonhang(){return c(this,arguments,function*(e={}){return yield this.findAll("donhang",d({include:{khachhang:{select:{id:!0,ten:!0,sdt:!0}},donhangsanpham:{select:{id:!0,soluong:!0,gia:!0,sanpham:{select:{id:!0,ten:!0}}}}},orderBy:{createdAt:"desc"},batchSize:500,maxConcurrency:3},e))})}loadDashboardData(){return c(this,arguments,function*(e={}){let t=Date.now(),[n,a,s,r]=yield Promise.all([this.findAllSanpham(d({take:9999,aggressiveCache:!0},e)),this.findAllKhachhang(d({take:9999,aggressiveCache:!0},e)),this.findAllTonKho(d({take:9999,aggressiveCache:!0},e)),this.findAllDonhang(d({take:9999,aggressiveCache:!0},e))]);return{sanpham:n,khachhang:a,tonkho:s,donhang:r,totalLoadTime:Date.now()-t}})}getSanphamList(){return c(this,arguments,function*(e={}){return yield this.findMany("sanpham",d({orderBy:{ten:"asc"}},e))})}getSanphamById(e){return c(this,null,function*(){return yield this.findUnique("sanpham",{id:e})})}getFirstSanpham(){return c(this,arguments,function*(e={}){return yield this.findFirst("sanpham",d({orderBy:{createdAt:"desc"}},e))})}getKhachhangList(){return c(this,arguments,function*(e={}){return yield this.findMany("khachhang",d({orderBy:{ten:"asc"}},e))})}getKhachhangById(e){return c(this,null,function*(){return yield this.findUnique("khachhang",{id:e})})}getFirstKhachhang(){return c(this,arguments,function*(e={}){return yield this.findFirst("khachhang",d({orderBy:{createdAt:"desc"}},e))})}getDonhangList(){return c(this,arguments,function*(e={}){return yield this.findMany("donhang",d({orderBy:{createdAt:"desc"}},e))})}getDonhangById(e){return c(this,null,function*(){return yield this.findUnique("donhang",{id:e})})}getFirstDonhang(){return c(this,arguments,function*(e={}){return yield this.findFirst("donhang",d({orderBy:{createdAt:"desc"}},e))})}getNhomkhachhangList(){return c(this,arguments,function*(e={}){return yield this.findMany("nhomkhachhang",d({orderBy:{ten:"asc"}},e))})}getNhomkhachhangById(e){return c(this,null,function*(){return yield this.findUnique("nhomkhachhang",{id:e})})}getFirstNhomkhachhang(){return c(this,arguments,function*(e={}){return yield this.findFirst("nhomkhachhang",d({orderBy:{createdAt:"desc"}},e))})}getDathangList(){return c(this,arguments,function*(e={}){return yield this.findMany("dathang",d({orderBy:{createdAt:"desc"},include:{nhacungcap:!0,dathangsanpham:{include:{sanpham:!0}}}},e))})}getUserList(){return c(this,arguments,function*(e={}){return yield this.findMany("user",d({orderBy:{ten:"asc"},select:{id:!0,ten:!0,email:!0,sdt:!0,createdAt:!0,updatedAt:!0}},e))})}getUserById(e){return c(this,null,function*(){return yield this.findUnique("user",{id:e},{include:{profile:!0,userRole:{include:{role:!0}}}})})}getNhuCauDatHang(e,t,n=!1){return c(this,null,function*(){let a=`getNhuCauDatHang_${e}_${t}`,s=n?0:this.AGGRESSIVE_TTL;if(!n){let i=this.getFromCache(a);if(i)return i}let r=Date.now();try{let l=(yield m(this.apollo.query({query:G,variables:{startDate:e,endDate:t},fetchPolicy:n?"no-cache":"cache-first"}))).data.getNhuCauDatHang;return this.setCache(a,l,this.AGGRESSIVE_TTL),this.trackPerformance("getNhuCauDatHang",r,!1,l?.data?.length||0,"nhucaudathang"),l}catch(i){throw this.trackError(i,"getNhuCauDatHang"),i}})}saveNhucauNote(e,t){return c(this,null,function*(){let n=Date.now();try{let a=yield m(this.apollo.mutate({mutation:Q,variables:{sanphamId:e,content:t}}));return this.trackPerformance("saveNhucauNote",n,!1,1,"sanpham"),a.data}catch(a){throw this.trackError(a,"saveNhucauNote"),a}})}static \u0275fac=function(t){return new(t||C)(b(k),b(M),b(v))};static \u0275prov=$({token:C,factory:C.\u0275fac,providedIn:"root"})};export{R as a};
