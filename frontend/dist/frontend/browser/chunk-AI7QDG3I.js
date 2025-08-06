import{a as I}from"./chunk-ABTDJQ6E.js";import{a as se}from"./chunk-T6BS64XY.js";import{a as ne}from"./chunk-PH47GWHC.js";import{a as re}from"./chunk-YUYKQQ36.js";import"./chunk-ZUSEYSZF.js";import{a as oe}from"./chunk-TZLAMMV7.js";import"./chunk-MC2RAUNI.js";import"./chunk-4ZVJO4SQ.js";import{a as Ht}from"./chunk-3UE3AWN6.js";import{c as $t,d as Gt,f as qt,h as Ot}from"./chunk-NTZ35MHO.js";import{a as ie}from"./chunk-WQSYOWXA.js";import{c as ee,f as ae}from"./chunk-UECSKQ7N.js";import{a as jt,b as Jt,c as Wt,d as Yt,e as Xt,g as Zt,w as te,x as at}from"./chunk-MYM4UK25.js";import{b as Ut}from"./chunk-SUUFLDBI.js";import{a as wt,b as Lt,c as Et}from"./chunk-TUUIXDG3.js";import{b as zt}from"./chunk-3SUPS45N.js";import{a as he}from"./chunk-JNVUT6FC.js";import{a as kt,b as Mt,c as Ft,d as It}from"./chunk-4ETYZZG2.js";import{a as Dt,b as j}from"./chunk-TQZJPPHT.js";import{b as Nt,g as Tt,j as Pt,n as At,r as Vt,v as Bt,w as Kt,y as Qt,z as Rt}from"./chunk-627BQ4TO.js";import"./chunk-DMBE3M7H.js";import{a as St}from"./chunk-Q7E7WSHM.js";import{a as H,b as _t}from"./chunk-22VEXDJN.js";import"./chunk-ON6I326D.js";import"./chunk-PI2XNKI3.js";import{a as bt,c as xt,e as U}from"./chunk-NSRGTP2H.js";import"./chunk-2PPFUFFT.js";import{y as Ct,z as vt}from"./chunk-OGZGEGDS.js";import{b as yt,c as ft}from"./chunk-QDKCYXS4.js";import"./chunk-3PUGGYB4.js";import{l as K,m as Q,t as R,u as z}from"./chunk-5AAE55N6.js";import{Ac as V,Eb as $,Ec as B,Fc as d,Gc as A,Hc as b,Ic as ut,Ja as rt,Jc as dt,Kc as ct,Lb as E,Lc as ht,Mc as mt,Oc as pt,Ra as tt,Uc as k,Vb as f,Wc as M,Yc as et,Zb as ot,dc as st,ec as lt,fc as o,gc as l,hc as G,ia as it,lc as L,ld as gt,na as Z,oa as w,qc as S,rb as h,sc as p,wa as nt,xa as g,ya as y,yc as q,zc as O}from"./chunk-JY44QJM2.js";import"./chunk-EU2KAMEK.js";import{a as _,b as F,g as ce,h as X,j as u}from"./chunk-6DYNGEAS.js";function ge(c,t){if(c&1){let e=L();o(0,"th",8),S("click",function(){let i=g(e).$implicit,n=p();return y(n.FilterTable("",i))}),d(1),l()}if(c&2){let e=t.$implicit;h(),b(" ",e.name," ")}}function ye(c,t){if(c&1){let e=L();o(0,"div",16),S("blur",function(i){g(e);let n=p().$implicit,r=p().index,s=p();return y(s.updateBlur(i,s.filterListSP[r],n))})("keyup.enter",function(i){g(e);let n=p().$implicit,r=p().index,s=p();return y(s.updateEnter(i,s.filterListSP[r],n))}),d(1),k(2,"number"),l()}if(c&2){let e=p().$implicit,a=p().index,i=p();f("contentEditable",!0),h(),b(" ",M(2,2,i.getSLDat(e,i.filterListSP[a]),"1.0-2")," ")}}function fe(c,t){if(c&1&&(o(0,"td",12),E(1,ye,3,5,"div",15),l()),c&2){let e=t.$implicit,a=p().index,i=p();h(),f("ngIf",i.CheckSanphaminNCC(e,i.filterListSP[a]))}}function Se(c,t){if(c&1){let e=L();o(0,"tr",9)(1,"td",10),S("click",function(){let i=g(e).$implicit,n=p();return y(n.FilterTable(i,""))}),o(2,"span",11),d(3),l()(),o(4,"td",12)(5,"span",13),d(6),l()(),o(7,"td",12)(8,"span",13),d(9),l()(),E(10,fe,2,1,"td",14),l()}if(c&2){let e=t.$implicit,a=p();h(3),b(" ",e.title," "),h(3),b(" ",e.masp," "),h(3),ut(" ",e.goiy," (",a.DadatGoiy(e)||0,") "),h(),f("ngForOf",a.filterListNCC)}}var J=class c{ListFindNCC=[];EditList=[];ListDathang=[];ListDathangChange=new rt;_snackBar=w(H);filterListNCC=[];filterListSP=[];ngAfterViewInit(){this.LoadTable(this.ListFindNCC,this.EditList),console.log("ListFindNCC",this.ListFindNCC),console.log("EditList",this.EditList)}LoadTable(t,e){let a=1;this.filterListNCC=t,this.filterListSP=e,this.filterListSP.forEach(i=>{let n=this.filterListNCC.findIndex(r=>r.Sanpham.some(s=>s.id===i.id));n!==-1&&this.filterListNCC[n].vitri===void 0&&(this.filterListNCC[n].vitri=a,a++)}),this.filterListNCC.sort((i,n)=>i.vitri&&n.vitri?i.vitri-n.vitri:0)}isFilter=!1;FilterTable(t,e){if(this.isFilter=!this.isFilter,this.isFilter){if(t&&Object.keys(t).length>0){let a=this.EditList.filter(n=>n.id===t.id),i=this.ListFindNCC.filter(n=>n.Sanpham.some(r=>r.id===t.id));this.LoadTable(i,a)}else if(e&&Object.keys(e).length>0){let a=this.ListFindNCC.filter(n=>n.id===e.id);a.forEach(n=>{let r=this.filterListSP.filter(s=>n.Sanpham.some(x=>x.id===s.id)).map(s=>F(_({},s),{sldat:Number(s.goiy)}));r.length>0&&(n.sanpham=r)});let i=this.ListDathang.findIndex(n=>n.id===e.id);i!==-1?this.ListDathang[i]=_(_({},this.ListDathang[i]),a[0]):this.ListDathang.push(a[0]),console.log("sanpham",t),console.log("nhacungcap",e),console.log("ListDathang",this.ListDathang),this.ListDathangChange.emit({isSubmit:!1,ListDathang:this.ListDathang}),this.LoadTable(a,a[0].sanpham)}}else this.LoadTable(this.ListFindNCC,this.EditList)}ngOnChanges(t){(t.ListFindNCC||t.EditList)&&this.LoadTable(this.ListFindNCC,this.EditList)}getSLDat(t,e){let a=t.sanpham?.find(i=>i.id===e.id);return a&&a.sldat||0}DadatGoiy(t){let e=this.ListDathang.reduce((a,i)=>{let n=i.sanpham?.find(r=>r.id===t.id);return a+(n?.sldat?Number(n.sldat):0)},0);return(Number(t.goiy)-e).toFixed(2)}trackByFn(t,e){return e.id}CheckSanphaminNCC(t,e){return!!t.Sanpham?.find(i=>i.id===e.id)}updateEnter(t,e,a){let i=["Backspace","Delete","ArrowLeft","ArrowRight","Tab","Home","End"];if(!(t.key>="0"&&t.key<="9"||t.key>="Numpad0"&&t.key<="Numpad9"||i.includes(t.key))){t.preventDefault();return}if(t.key==="Enter"){t.preventDefault();let n=t.target.closest(".sldat-input"),r=0;if(n){let m=n.value||n.innerText;r=Number(m.trim())||0}let s=JSON.parse(JSON.stringify(this.ListDathang)),x=s.find(m=>m.id===a.id);if(x){let m=x.sanpham?.find(v=>v.id===e.id);m?m.sldat=r:(e.sldat=r,x.sanpham=x.sanpham||[],x.sanpham.push(e))}else e.sldat=r,a.sanpham=[e],a.ngaynhan=new Date,s.push(a);let C=(()=>{let m=s.reduce((v,T)=>{let P=T.sanpham?.find(Y=>Y.id===e.id);return v+(P?.sldat?Number(P.sldat):0)},0);return(Number(e.goiy)-m).toFixed(2)})();if(Number(C)<0){this._snackBar.open("S\u1ED1 l\u01B0\u1EE3ng kh\xF4ng h\u1EE3p l\u1EC7","",{duration:1e3,horizontalPosition:"end",verticalPosition:"top",panelClass:["snackbar-error"]});return}let D=this.ListDathang.find(m=>m.id===a.id);if(D){let m=D.sanpham?.find(v=>v.id===e.id);m?m.sldat=r:(e.sldat=r,D.sanpham=D.sanpham||[],D.sanpham.push(e))}else e.sldat=r,a.sanpham=[e],a.ngaynhan=new Date,this.ListDathang.push(a);setTimeout(()=>{let m=Array.from(document.querySelectorAll(".sldat-input")),v=m.findIndex(T=>T===t.target);v!==-1&&v+1<m.length&&m[v+1].focus()}),this.ListDathangChange.emit({isSubmit:!1,ListDathang:this.ListDathang})}}updateBlur(t,e,a){let i=t.target.closest(".sldat-input"),n=0;if(i){let m=i.value||i.innerText;n=Number(m.trim())||0}console.log("newValue",n);let r=JSON.parse(JSON.stringify(this.ListDathang)),s=r.find(m=>m.id===a.id);if(s){let m=s.sanpham?.find(v=>v.id===e.id);m?m.sldat=n:(e.sldat=n,s.sanpham=s.sanpham||[],s.sanpham.push(e))}else e.sldat=n,a.sanpham=[e],a.ngaynhan=new Date,r.push(a);let x=(()=>{let m=r.reduce((v,T)=>{let P=T.sanpham?.find(Y=>Y.id===e.id);return v+(P?.sldat?Number(P.sldat):0)},0);return(Number(e.goiy)-m).toFixed(2)})();if(Number(x)<0){this._snackBar.open("S\u1ED1 l\u01B0\u1EE3ng kh\xF4ng h\u1EE3p l\u1EC7","",{duration:1e3,horizontalPosition:"end",verticalPosition:"top",panelClass:["snackbar-error"]});return}let C=this.ListDathang.find(m=>m.id===a.id),D=0;if(C){let m=C.sanpham?.find(v=>v.id===e.id);m&&(D=m.sldat||0)}if(n!==D){if(C){let m=C.sanpham?.find(v=>v.id===e.id);m?m.sldat=n:(e.sldat=n,C.sanpham=C.sanpham||[],C.sanpham.push(e))}else e.sldat=n,a.sanpham=[e],a.ngaynhan=new Date,this.ListDathang.push(a);this.ListDathangChange.emit({isSubmit:!1,ListDathang:this.ListDathang}),console.log(this.ListDathang)}}static \u0275fac=function(e){return new(e||c)};static \u0275cmp=$({type:c,selectors:[["app-tablenhucaudathanh"]],inputs:{ListFindNCC:"ListFindNCC",EditList:"EditList",ListDathang:"ListDathang"},outputs:{ListDathangChange:"ListDathangChange"},features:[nt],decls:13,vars:3,consts:[[1,"min-w-full","divide-y","divide-gray-200","border","border-gray-300","rounded-lg","shadow-md"],[1,"bg-gray-50","rounded-t-lg","cursor-pointer"],["scope","col",1,"px-6","py-3","text-left","text-xs","font-medium","text-gray-500","uppercase","tracking-wider","first:rounded-tl-lg","last:rounded-tr-lg"],["scope","col",1,"px-6","py-3","text-left","text-xs","font-medium","text-gray-500","uppercase","tracking-wider"],["scope","col","class","px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:bg-slate-50",3,"click",4,"ngFor","ngForOf"],["scope","col",1,"px-6","py-3","text-left","text-xs","font-medium","text-gray-500","uppercase","tracking-wider","last:rounded-tr-lg"],[1,"bg-white","divide-y","divide-gray-200","rounded-b-lg"],["class","last:rounded-b-lg cursor-pointer hover:bg-slate-50",4,"ngFor","ngForOf","ngForTrackBy"],["scope","col",1,"px-6","py-3","text-left","text-xs","font-medium","text-gray-500","uppercase","tracking-wider","hover:bg-slate-50",3,"click"],[1,"last:rounded-b-lg","cursor-pointer","hover:bg-slate-50"],[1,"whitespace-nowrap","first:rounded-bl-lg",3,"click"],[1,"max-w-40","line-clamp-4","p-2"],[1,"whitespace-nowrap"],[1,"max-w-40","line-clamp-4"],["class","whitespace-nowrap",4,"ngFor","ngForOf"],["class","sldat-input p-2 min-w-28 text-end bg-slate-200 focus:border rounded-lg focus:border-blue-600 focus:bg-slate-100 focus:outline-none",3,"contentEditable","blur","keyup.enter",4,"ngIf"],[1,"sldat-input","p-2","min-w-28","text-end","bg-slate-200","focus:border","rounded-lg","focus:border-blue-600","focus:bg-slate-100","focus:outline-none",3,"blur","keyup.enter","contentEditable"]],template:function(e,a){e&1&&(o(0,"table",0)(1,"thead",1)(2,"tr")(3,"th",2),d(4," T\xEAn S\u1EA3n Ph\u1EA9m "),l(),o(5,"th",3),d(6," M\xE3 S\u1EA3n Ph\u1EA9m "),l(),o(7,"th",3),d(8," G\u1EE3i \xDD "),l(),E(9,ge,2,1,"th",4),G(10,"th",5),l()(),o(11,"tbody",6),E(12,Se,11,5,"tr",7),l()()),e&2&&(h(9),f("ngForOf",a.filterListNCC),h(3),f("ngForOf",a.filterListSP)("ngForTrackBy",a.trackByFn))},dependencies:[z,K,Q,R,j,U],encapsulation:2,changeDetection:0})};var de=ce(he());var W=class c{constructor(t,e){this._StorageService=t;this._ErrorLogService=e;I.init()}GRAPHQL_ENDPOINT=`${St.APIURL}/graphql`;isLoading=tt(!1);error=tt(null);normalizeModelName(t){return t.charAt(0).toLowerCase()+t.slice(1)}formatDateForGraphQL(t){if(!t)return null;try{return I.formatDateForAPI(t)}catch(e){return console.warn("Error formatting date for GraphQL:",e),null}}formatDateTimeForGraphQL(t){if(!t)return null;try{return I.formatDateTimeForAPI(t)}catch(e){return console.warn("Error formatting datetime for GraphQL:",e),null}}processFilters(t){if(!t)return t;let e=_({},t),a=["startDate","endDate","fromDate","toDate","createdAt","updatedAt","ngaytao","ngaycapnhat","ngaygiao","ngaydat","ngayxuat","ngaynhap","batdau","ketthuc","tungay","denngay"];for(let i of a)e[i]&&(e[i]=this.formatDateForGraphQL(e[i]));return e.dateRange&&(e.dateRange.start&&(e.dateRange.start=this.formatDateForGraphQL(e.dateRange.start)),e.dateRange.end&&(e.dateRange.end=this.formatDateForGraphQL(e.dateRange.end))),e}executeGraphQL(t){return u(this,null,function*(){this.isLoading.set(!0),this.error.set(null);try{let e=this._StorageService.getItem("token"),a={"Content-Type":"application/json"};e&&(a.Authorization=`Bearer ${e}`);let i=yield fetch(this.GRAPHQL_ENDPOINT,{method:"POST",headers:a,body:JSON.stringify(t)});if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);let n=yield i.json();if(n.errors&&n.errors.length>0){let r=n.errors.map(s=>s.message).join(", ");this.error.set(r),yield this._ErrorLogService.logError("GraphQL Error",n.errors)}return n}catch(e){let a=e instanceof Error?e.message:"Unknown GraphQL error";throw this.error.set(a),yield this._ErrorLogService.logError("GraphQL Request Failed",e),e}finally{this.isLoading.set(!1)}})}findMany(a){return u(this,arguments,function*(t,e={}){let i=this.normalizeModelName(t),n=F(_({},e),{where:this.processFilters(e.where)});console.log(`Finding many records for model: ${i}`,n);let s=yield this.executeGraphQL({query:`
      query FindMany($modelName: String!, $where: JSON, $orderBy: JSON, $skip: Float, $take: Float, $include: JSON) {
        findMany(
          modelName: $modelName
          where: $where
          orderBy: $orderBy
          skip: $skip
          take: $take
          include: $include
        )
      }
    `,variables:{modelName:i,where:n.where,orderBy:n.orderBy,skip:n.skip,take:n.take,include:n.include}});return console.log(`GraphQL response for findMany on model ${i}:`,s),s.data?.findMany?{data:s.data.findMany,errors:s.errors}:s})}findUnique(t,e,a,i){return u(this,null,function*(){let n=this.normalizeModelName(t),r=`
      query FindUnique($id: String!) {
        ${n}(id: $id) {
          id
        }
      }
    `,s=yield this.executeGraphQL({query:r,variables:{id:e.id}});return s.data?.[n]?{data:s.data[n],errors:s.errors}:s})}search(n,r,s){return u(this,arguments,function*(t,e,a,i={}){let C=yield this.executeGraphQL({query:`
      query Search($model: String!, $searchTerm: String!, $searchFields: [String!]!, $pagination: PaginationInput) {
        universalSearch(
          model: $model
          searchTerm: $searchTerm
          searchFields: $searchFields
          pagination: $pagination
        )
      }
    `,variables:{model:t,searchTerm:e,searchFields:a,pagination:{page:Math.floor((i.skip||0)/(i.take||10))+1,pageSize:i.take||10}}});return C.data?.universalSearch?{data:JSON.parse(C.data.universalSearch),errors:C.errors}:C})}bulkDelete(t,e){return u(this,null,function*(){return this.executeGraphQL({query:`
      mutation BulkDelete($model: String!, $ids: [String!]!) {
        bulkDelete(
          model: $model
          ids: $ids
        )
      }
    `,variables:{model:t,ids:e}})})}getAvailableModels(){return u(this,null,function*(){return this.executeGraphQL({query:`
      query GetAvailableModels {
        getAvailableModels
      }
    `})})}debugGraphQL(){return u(this,null,function*(){try{console.log("\u{1F50D} Testing GraphQL connection...");let t=yield this.getAvailableModels();console.log("\u{1F4CB} Available models:",t.data);let e=yield this.findMany("khachhang",{take:1});return console.log("\u2705 Khachhang test result:",e),{success:!0,availableModels:t.data,testQuery:e}}catch(t){return console.error("\u274C GraphQL debug failed:",t),{success:!1,error:t instanceof Error?t.message:"Unknown error"}}})}getUsers(){return u(this,arguments,function*(t={}){return this.findMany("user",t)})}getUserById(t){return u(this,null,function*(){return this.executeGraphQL({query:`
      query GetUser($id: String!) {
        user(id: $id) {
          id
          email
          SDT
          isActive
          createdAt
          updatedAt
        }
      }
    `,variables:{id:t}})})}createUser(t){return u(this,null,function*(){return this.executeGraphQL({query:`
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          email
          SDT
          isActive
          createdAt
          updatedAt
        }
      }
    `,variables:{input:t}})})}updateUser(t){return u(this,null,function*(){return this.executeGraphQL({query:`
      mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
          id
          email
          SDT
          isActive
          createdAt
          updatedAt
        }
      }
    `,variables:{input:t}})})}deleteUser(t){return u(this,null,function*(){return this.executeGraphQL({query:`
      mutation DeleteUser($id: String!) {
        deleteUser(id: $id) {
          id
          email
        }
      }
    `,variables:{id:t}})})}getSanphams(){return u(this,arguments,function*(t={}){return this.findMany("sanpham",t)})}getSanphamById(t){return u(this,null,function*(){return this.executeGraphQL({query:`
      query GetSanpham($id: String!) {
        sanpham(id: $id) {
          id
          title
          masp
          hinhanh
          gia
          giabanbuon
          giabanle
          giavon
          isActive
          createdAt
          updatedAt
        }
      }
    `,variables:{id:t}})})}createSanpham(t){return u(this,null,function*(){return this.executeGraphQL({query:`
      mutation CreateSanpham($input: CreateSanphamInput!) {
        createSanpham(input: $input) {
          id
          title
          masp
          hinhanh
          gia
          giabanbuon
          giabanle
          giavon
          isActive
          createdAt
          updatedAt
        }
      }
    `,variables:{input:t}})})}updateSanpham(t){return u(this,null,function*(){return this.executeGraphQL({query:`
      mutation UpdateSanpham($input: UpdateSanphamInput!) {
        updateSanpham(input: $input) {
          id
          title
          masp
          hinhanh
          gia
          giabanbuon
          giabanle
          giavon
          isActive
          createdAt
          updatedAt
        }
      }
    `,variables:{input:t}})})}deleteSanpham(t){return u(this,null,function*(){return this.executeGraphQL({query:`
      mutation DeleteSanpham($id: String!) {
        deleteSanpham(id: $id) {
          id
          title
        }
      }
    `,variables:{id:t}})})}getKhachhangs(){return u(this,arguments,function*(t={}){return this.findMany("khachhang",t)})}getKhachhangById(t,e){return u(this,null,function*(){return this.findUnique("khachhang",{id:t},e)})}createKhachhang(t){return u(this,null,function*(){let a=yield this.executeGraphQL({query:`
      mutation CreateKhachhang($input: CreateKhachhangInput!) {
        createKhachhang(input: $input) {
          id
          makh
          name
          tenkh
          email
          phone
          sdt
          address
          diachi
          quan
          mst
          loaikh
          isActive
          hiengia
          isshowvat
          istitle2
          gionhanhang
          subtitle
          ghichu
          tenfile
          makhold
          namenn
          createdAt
          updatedAt
        }
      }
    `,variables:{input:t}});if(a.errors)throw new Error(a.errors[0].message);return a.data?.createKhachhang})}updateKhachhang(t,e){return u(this,null,function*(){let i=yield this.executeGraphQL({query:`
      mutation UpdateKhachhang($input: UpdateKhachhangInput!) {
        updateKhachhang(input: $input) {
          id
          makh
          name
          tenkh
          email
          phone
          sdt
          address
          diachi
          quan
          mst
          loaikh
          isActive
          hiengia
          isshowvat
          istitle2
          gionhanhang
          subtitle
          ghichu
          tenfile
          makhold
          namenn
          createdAt
          updatedAt
        }
      }
    `,variables:{input:_({id:t},e)}});if(i.errors)throw new Error(i.errors[0].message);return i.data?.updateKhachhang})}deleteKhachhang(t){return u(this,null,function*(){let a=yield this.executeGraphQL({query:`
      mutation DeleteKhachhang($id: String!) {
        deleteKhachhang(id: $id)
      }
    `,variables:{id:t}});if(a.errors)throw new Error(a.errors[0].message);return a.data?.deleteKhachhang})}getDonhangs(){return u(this,arguments,function*(t={}){return this.findMany("donhang",t)})}getDonhangById(t,e){return u(this,null,function*(){return this.findUnique("donhang",{id:t},e)})}createDonhang(t){return u(this,null,function*(){let a=yield this.executeGraphQL({query:`
      mutation CreateDonhang($input: CreateDonhangInput!) {
        createDonhang(input: $input) {
          id
          madonhang
          title
          type
          ngaygiao
          tongtien
          status
          trangthai
          ghichu
          isActive
          order
          createdAt
          updatedAt
          khachhang {
            id
            name
            tenkh
          }
        }
      }
    `,variables:{input:t}});if(a.errors)throw new Error(a.errors[0].message);return a.data?.createDonhang})}updateDonhang(t,e){return u(this,null,function*(){let i=yield this.executeGraphQL({query:`
      mutation UpdateDonhang($input: UpdateDonhangInput!) {
        updateDonhang(input: $input) {
          id
          madonhang
          title
          type
          ngaygiao
          tongtien
          status
          trangthai
          ghichu
          isActive
          order
          createdAt
          updatedAt
          khachhang {
            id
            name
            tenkh
          }
        }
      }
    `,variables:{input:_({id:t},e)}});if(i.errors)throw new Error(i.errors[0].message);return i.data?.updateDonhang})}deleteDonhang(t){return u(this,null,function*(){let a=yield this.executeGraphQL({query:`
      mutation DeleteDonhang($id: String!) {
        deleteDonhang(id: $id)
      }
    `,variables:{id:t}});if(a.errors)throw new Error(a.errors[0].message);return a.data?.deleteDonhang})}getKhos(){return u(this,arguments,function*(t={}){return this.findMany("kho",t)})}getKhoById(t,e){return u(this,null,function*(){return this.findUnique("kho",{id:t},e)})}createKho(t){return u(this,null,function*(){let a=yield this.executeGraphQL({query:`
      mutation CreateKho($input: CreateKhoInput!) {
        createKho(input: $input) {
          id
          makho
          name
          diachi
          sdt
          ghichu
          isActive
          createdAt
          updatedAt
        }
      }
    `,variables:{input:t}});if(a.errors)throw new Error(a.errors[0].message);return a.data?.createKho})}updateKho(t,e){return u(this,null,function*(){let i=yield this.executeGraphQL({query:`
      mutation UpdateKho($input: UpdateKhoInput!) {
        updateKho(input: $input) {
          id
          makho
          name
          diachi
          sdt
          ghichu
          isActive
          createdAt
          updatedAt
        }
      }
    `,variables:{input:_({id:t},e)}});if(i.errors)throw new Error(i.errors[0].message);return i.data?.updateKho})}deleteKho(t){return u(this,null,function*(){let a=yield this.executeGraphQL({query:`
      mutation DeleteKho($id: String!) {
        deleteKho(id: $id)
      }
    `,variables:{id:t}});if(a.errors)throw new Error(a.errors[0].message);return a.data?.deleteKho})}getPhieuKhos(){return u(this,arguments,function*(t={}){return this.findMany("PhieuKho",t)})}getPhieuKhoById(t,e){return u(this,null,function*(){return this.findUnique("PhieuKho",{id:t},e)})}createPhieuKho(t){return u(this,null,function*(){let a=yield this.executeGraphQL({query:`
      mutation CreatePhieuKho($input: CreatePhieuKhoInput!) {
        createPhieuKho(input: $input) {
          id
          title
          maphieu
          madonhang
          madncc
          madathang
          ngay
          type
          isChotkho
          khoId
          ghichu
          isActive
          createdAt
          updatedAt
        }
      }
    `,variables:{input:t}});if(a.errors)throw new Error(a.errors[0].message);return a.data?.createPhieuKho})}updatePhieuKho(t,e){return u(this,null,function*(){let i=yield this.executeGraphQL({query:`
      mutation UpdatePhieuKho($input: UpdatePhieuKhoInput!) {
        updatePhieuKho(input: $input) {
          id
          title
          maphieu
          madonhang
          madncc
          madathang
          ngay
          type
          isChotkho
          khoId
          ghichu
          isActive
          createdAt
          updatedAt
        }
      }
    `,variables:{input:_({id:t},e)}});if(i.errors)throw new Error(i.errors[0].message);return i.data?.updatePhieuKho})}deletePhieuKho(t){return u(this,null,function*(){let a=yield this.executeGraphQL({query:`
      mutation DeletePhieuKho($id: String!) {
        deletePhieuKho(id: $id)
      }
    `,variables:{id:t}});if(a.errors)throw new Error(a.errors[0].message);return a.data?.deletePhieuKho})}getNhacungcaps(){return u(this,arguments,function*(t={}){return this.findMany("Nhacungcap",t)})}getNhacungcapById(t,e){return u(this,null,function*(){return this.findUnique("Nhacungcap",{id:t},e)})}createNhacungcap(t){return u(this,null,function*(){let a=yield this.executeGraphQL({query:`
      mutation CreateRecord($modelName: String!, $data: JSON!) {
        createRecord(modelName: $modelName, data: $data)
      }
    `,variables:{modelName:"nhacungcap",data:t}});if(a.errors)throw new Error(a.errors[0].message);return a.data?.createRecord})}updateNhacungcap(t,e){return u(this,null,function*(){let i=yield this.executeGraphQL({query:`
      mutation UpdateRecord($modelName: String!, $where: JSON!, $data: JSON!) {
        updateRecord(modelName: $modelName, where: $where, data: $data)
      }
    `,variables:{modelName:"nhacungcap",where:{id:t},data:e}});if(i.errors)throw new Error(i.errors[0].message);return i.data?.updateRecord})}deleteNhacungcap(t){return u(this,null,function*(){let a=yield this.executeGraphQL({query:`
      mutation DeleteRecord($modelName: String!, $where: JSON!) {
        deleteRecord(modelName: $modelName, where: $where)
      }
    `,variables:{modelName:"nhacungcap",where:{id:t}}});if(a.errors)throw new Error(a.errors[0].message);return a.data?.deleteRecord})}getTonKhos(){return u(this,arguments,function*(t={}){return this.findMany("TonKho",t)})}getTonKhoById(t,e){return u(this,null,function*(){return this.findUnique("TonKho",{id:t},e)})}getDashboardStats(t){return u(this,null,function*(){let e=this.processFilters(t);return this.executeGraphQL({query:`
      query GetDashboardStats($filters: JSON) {
        dashboardStats(filters: $filters) {
          summary {
            totalUsers
            totalProducts
            totalOrders
            totalRevenue
            totalCustomers
            totalSuppliers
            totalInventoryValue
          }
          periodComparison {
            currentPeriod {
              orders
              revenue
              customers
              startDate
              endDate
            }
            previousPeriod {
              orders
              revenue
              customers
              startDate
              endDate
            }
            percentageChange {
              orders
              revenue
              customers
            }
          }
          recentOrders {
            id
            madonhang
            tongtien
            trangthai
            createdAt
            ngaygiao
            khachhang {
              id
              hovaten
              email
              sdt
            }
          }
          topProducts {
            id
            title
            masp
            totalSold
            revenue
            profit
            category
          }
          topCustomers {
            id
            hovaten
            email
            totalOrders
            totalSpent
            lastOrderDate
          }
          chartData {
            dailyRevenue {
              date
              revenue
              orders
              profit
            }
            monthlyComparison {
              month
              revenue
              orders
              profit
            }
            categoryBreakdown {
              category
              revenue
              orders
              percentage
            }
          }
          alerts {
            lowStockProducts {
              id
              title
              currentStock
              minStock
            }
            overdueOrders {
              id
              madonhang
              ngaygiao
              daysPastDue
            }
          }
        }
      }
    `,variables:{filters:e}})})}getInventorySummary(t){return u(this,null,function*(){let e=this.processFilters(t);return this.executeGraphQL({query:`
      query GetInventorySummary($filters: JSON) {
        inventorySummary(filters: $filters) {
          summary {
            totalProducts
            totalStock
            totalValue
            lowStockItems
            outOfStockItems
            categories
          }
          stockByCategory {
            category
            productCount
            totalStock
            totalValue
          }
          lowStockItems {
            id
            sanpham {
              id
              title
              masp
              category
            }
            kho {
              id
              tenkho
            }
            soluong
            minStock
            maxStock
            reorderLevel
          }
          recentMovements {
            id
            type
            soluong
            createdAt
            reason
            sanpham {
              id
              title
              masp
            }
            kho {
              id
              tenkho
            }
            user {
              id
              hovaten
            }
          }
          stockAlerts {
            criticalStock {
              productId
              productName
              currentStock
              minStock
              daysUntilStockout
            }
            excessStock {
              productId
              productName
              currentStock
              maxStock
              daysOfSupply
            }
          }
        }
      }
    `,variables:{filters:e}})})}getOrdersWithFilters(t){return u(this,null,function*(){let e=this.processFilters(t);return this.executeGraphQL({query:`
      query GetOrdersWithFilters($filters: JSON) {
        getOrdersWithFilters(filters: $filters) {
          data {
            id
            madonhang
            tongtien
            trangthai
            createdAt
            updatedAt
            ngaygiao
            ghichu
            khachhang {
              id
              hovaten
              email
              sdt
              diachi
            }
            chitietdonhangs {
              id
              soluong
              dongia
              thanhtien
              sanpham {
                id
                title
                masp
                hinhanh
              }
            }
          }
          total
          page
          pageSize
          totalPages
          summary {
            totalAmount
            averageOrderValue
            ordersByStatus
          }
        }
      }
    `,variables:{filters:e}})})}getSalesAnalytics(t){return u(this,null,function*(){let e=this.processFilters(t);return this.executeGraphQL({query:`
      query GetSalesAnalytics($filters: JSON) {
        salesAnalytics(filters: $filters) {
          timeSeries {
            period
            revenue
            orders
            profit
            averageOrderValue
          }
          topProducts {
            id
            title
            masp
            revenue
            orders
            profit
            growth
          }
          topCategories {
            category
            revenue
            orders
            profit
            growth
          }
          customerInsights {
            newCustomers
            returningCustomers
            customerRetentionRate
            averageCustomerValue
          }
          trends {
            revenueGrowth
            orderGrowth
            profitMargin
            conversionRate
          }
        }
      }
    `,variables:{filters:e}})})}getDateRangePresets(){return I.getDateRangePresets()}formatDateForDisplay(t,e){return I.formatDate(t,e)}clearError(){this.error.set(null)}isLoadingState(){return this.isLoading()}getCurrentError(){return this.error()}static \u0275fac=function(e){return new(e||c)(Z(_t),Z(Ht))};static \u0275prov=it({token:c,factory:c.\u0275fac,providedIn:"root"})};var Ce=["drawer"],ve=()=>({standalone:!0}),be=(c,t)=>t.key;function xe(c,t){if(c&1){let e=L();o(0,"button",44),S("click",function(i){let n=g(e).$implicit;return p().toggleColumn(n),y(i.stopPropagation())}),o(1,"mat-icon"),d(2),l(),o(3,"span"),d(4),l()()}if(c&2){let e=t.$implicit;h(2),A(e.isShow?"check_box":"check_box_outline_blank"),h(2),A(e.value)}}function _e(c,t){if(c&1){let e=L();o(0,"button",45),S("click",function(){g(e);let i=p(),n=B(90);return y(i.OpenTaodonDialog(n))}),d(1," T\u1EA1o M\u1EDBi "),l()}}function we(c,t){if(c&1){let e=L();o(0,"tr",46),S("click",function(){let i=g(e).$implicit,n=p();return y(n.AddToEdit(i))}),o(1,"td",47),d(2),l(),o(3,"td",47),d(4),l(),o(5,"td",47),d(6),l(),o(7,"td",48),d(8),k(9,"number"),l(),o(10,"td",48),d(11),k(12,"number"),l(),o(13,"td",48),d(14),k(15,"number"),l(),o(16,"td",48),d(17),k(18,"number"),l(),o(19,"td",48),d(20),l()()}if(c&2){let e=t.$implicit,a=p();ot("hover:bg-slate-100 ",a.CheckItemInEdit(e)?"!bg-slate-200":"",""),h(2),b(" ",e.masp," "),h(2),b(" ",e.title," "),h(2),b(" ",e.dvt," "),h(2),b(" ",M(9,11,e.slchogiao,"1.0-2")," "),h(3),b(" ",M(12,14,e.goiy,"1.0-2")," "),h(3),b(" ",M(15,17,e.slchonhap,"1.0-2")," "),h(3),b(" ",M(18,20,e.slton,"1.0-2")," "),h(3),b(" ",e.haohut,"% ")}}function Le(c,t){c&1&&(o(0,"tr")(1,"td",49),d(2," Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u "),l()())}function Ee(c,t){c&1&&(o(0,"mat-dialog-content")(1,"div",50)(2,"div",51),d(3,"X\xE1c Nh\u1EADn"),l(),o(4,"div"),d(5,"B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?"),l(),o(6,"div",52)(7,"button",53),d(8,"\u0110\u1ED3ng \xDD"),l(),o(9,"button",54),d(10,"Hu\u1EF7 B\u1ECF"),l()()()())}function De(c,t){if(c&1){let e=L();o(0,"button",41),S("click",function(){g(e);let i=p(2);return y(i.CheckSubmit())}),d(1,"Ki\u1EC3m Tra"),l()}}function ke(c,t){c&1&&(o(0,"button",53),d(1,"\u0110\u1ED3ng \xDD"),l())}function Me(c,t){c&1&&(o(0,"button",54),d(1,"Hu\u1EF7 B\u1ECF"),l())}function Fe(c,t){if(c&1){let e=L();o(0,"mat-dialog-content",55)(1,"div",56)(2,"div",57),d(3,"\u0110\u1EB7t h\xE0ng nh\xE0 cung c\u1EA5p"),l(),o(4,"div",58)(5,"app-tablenhucaudathanh",59),S("ListDathangChange",function(i){g(e);let n=p();return y(n.onListDathangChange(i))}),l()(),o(6,"div",52),E(7,De,2,0,"button",60)(8,ke,2,0,"button",61)(9,Me,2,0,"button",62),l()()()}if(c&2){let e=p();h(5),f("ListFindNCC",e.ListFindNCC)("EditList",e.EditList)("ListDathang",e.ListDathang),h(2),f("ngIf",!e.isSubmit),h(),f("ngIf",e.isSubmit),h(),f("ngIf",e.isSubmit)}}var N=class N{displayedColumns=["title","masp","giagoc","dvt","slton","slchogiao","slchonhap","haohut","goiy"];ColumnName={title:"T\xEAn S\u1EA3n Ph\u1EA9m",masp:"M\xE3 S\u1EA3n Ph\u1EA9m",giagoc:"Gi\xE1 G\u1ED1c",dvt:"\u0110\u01A1n V\u1ECB T\xEDnh",slton:"T\u1ED3n",slchogiao:"Ch\u1EDD Giao",slchonhap:"Ch\u1EDD Nh\u1EADp",haohut:"Hao H\u1EE5t",goiy:"G\u1EE3i \xDD"};FilterColumns=JSON.parse(localStorage.getItem("NhucauColFilter")||"[]");Columns=[];totalItems=0;pageSize=10;currentPage=1;totalPages=1;paginator;sort;drawer;filterValues={};_SanphamService=w(oe);_breakpointObserver=w(Ct);_GoogleSheetService=w(ie);_NhacungcapService=w(re);_DathangService=w(ne);_KhoService=w(se);_GraphqlService=w(W);_router=w(ft);_dialog=w($t);Listsanpham=this._SanphamService.ListSanpham;EditList=[];dataSource=new at;sanphamId=this._SanphamService.sanphamId;_snackBar=w(H);CountItem=0;isSearch=!1;constructor(){this.displayedColumns.forEach(t=>{this.filterValues[t]=""}),gt(()=>{this.dataSource.data=this.Listsanpham(),this.totalItems=this.Listsanpham().length,this.calculateTotalPages()})}GetGoiy(t){return parseFloat(((t.soluongkho-t.soluong)*(1+t.haohut/100)).toString()).toFixed(2)}applyFilter(t){let e=t.target.value;this.dataSource.filter=e.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}ngOnInit(){return u(this,null,function*(){this.updateDisplayData(),this.getDathang(),this.loadProducts(),this._SanphamService.listenSanphamUpdates(),yield this._SanphamService.getNhucau(),this.dataSource=new at(this.Listsanpham()),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort,this.initializeColumns(),this.setupDrawer()})}getDathang(){return u(this,null,function*(){let t=yield this._GraphqlService.getKhachhangs();console.log(t)})}loadProducts(){return u(this,null,function*(){let t=yield this._GraphqlService.findMany("Sanpham",{orderBy:{createdAt:"desc"},take:100});t.data&&console.log("Products:",t.data.data)})}refresh(){return u(this,null,function*(){yield this._SanphamService.getAllSanpham()})}initializeColumns(){this.Columns=Object.keys(this.ColumnName).map(t=>({key:t,value:this.ColumnName[t],isShow:!0})),this.FilterColumns.length===0?this.FilterColumns=this.Columns:localStorage.setItem("NhucauColFilter",JSON.stringify(this.FilterColumns)),this.displayedColumns=this.FilterColumns.filter(t=>t.isShow).map(t=>t.key),this.ColumnName=this.FilterColumns.reduce((t,e)=>(e.isShow&&(t[e.key]=e.value),t),{})}setupDrawer(){this._breakpointObserver.observe([vt.Handset]).subscribe(t=>{t.matches?this.drawer.mode="over":this.drawer.mode="side"})}toggleColumn(t){let e=this.FilterColumns.find(a=>a.key===t.key);e&&(e.isShow=!e.isShow,this.updateDisplayedColumns())}FilterHederColumn(t,e){return t.filter((i,n,r)=>n===r.findIndex(s=>s[e]===i[e]))}doFilterHederColumn(t,e){this.dataSource.filteredData=this.Listsanpham().filter(i=>i[e].toLowerCase().includes(t.target.value.toLowerCase()));let a=t.target.value.toLowerCase()}ListFilter=[];ChosenItem(t,e){let a=this.dataSource.filteredData.filter(n=>n[e]===t[e]);this.ListFilter.filter(n=>n[e]===t[e]).length>0?this.ListFilter=this.ListFilter.filter(n=>n[e]!==t[e]):this.ListFilter=[...this.ListFilter,...a]}ChosenAll(t){t.forEach(e=>{!!this.ListFilter.find(i=>i.id===e.id)?this.ListFilter=this.ListFilter.filter(i=>i.id!==i.id):this.ListFilter.push(e)})}ResetFilter(){this.ListFilter=this.Listsanpham(),this.dataSource.data=this.Listsanpham(),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}EmptyFiter(){this.ListFilter=[]}CheckItem(t){return!!this.ListFilter.find(e=>e.id===t.id)}ApplyFilterColum(t){this.dataSource.data=this.Listsanpham().filter(e=>this.ListFilter.some(a=>a.id===e.id)),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort,t.closeMenu()}updateDisplayedColumns(){this.displayedColumns=this.FilterColumns.filter(t=>t.isShow).map(t=>t.key),this.ColumnName=this.FilterColumns.reduce((t,e)=>(e.isShow&&(t[e.key]=e.value),t),{}),localStorage.setItem("NhucauColFilter",JSON.stringify(this.FilterColumns))}doFilterColumns(t){let e=t.target.value.toLowerCase();this.FilterColumns=this.Columns.filter(a=>a.value.toLowerCase().includes(e))}create(){this.drawer.open(),this._router.navigate(["admin/sanpham","new"])}ListSPNCC=[];openDeleteDialog(t){return u(this,null,function*(){this._dialog.open(t,{hasBackdrop:!0,disableClose:!0}).afterClosed().subscribe(a=>{a=="true"&&this.DeleteListItem()})})}DeleteListItem(){this.EditList.forEach(t=>{this._SanphamService.DeleteSanpham(t)}),this.EditList=[],this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng","",{duration:1e3,horizontalPosition:"end",verticalPosition:"top",panelClass:["snackbar-success"]})}ListFindNCC=[];ListDathang=[];isSubmit=!1;onListDathangChange(t){console.log(t),this.isSubmit=t.isSubmit,this.ListDathang=t.ListDathang,console.log(this.ListDathang)}CheckSubmit(){let t=this.ListDathang.some(e=>(e.sanpham||[]).some(a=>Number(a.sldat)<0));return console.log(t),console.log(this.ListDathang),t?(this._snackBar.open("C\xF3 s\u1EA3n ph\u1EA9m c\xF3 s\u1ED1 l\u01B0\u1EE3ng \u0111\u1EB7t \xE2m!","",{duration:2e3,horizontalPosition:"end",verticalPosition:"top",panelClass:["snackbar-error"]}),this.isSubmit=!1,!1):(this.isSubmit=!0,!0)}OpenTaodonDialog(t){return u(this,null,function*(){this.ListFindNCC=yield this._NhacungcapService.Findbyids(this.EditList.map(a=>a.id)),this.EditList=this.EditList.filter(a=>this.ListFindNCC.some(i=>i.Sanpham.some(n=>n.id===a.id))),this._dialog.open(t,{hasBackdrop:!0,disableClose:!0}).afterClosed().subscribe(a=>{a=="true"&&(console.log(this.ListDathang),u(this,null,function*(){for(let i of this.ListDathang)yield this._DathangService.CreateByNhucau(i),yield new Promise(n=>setTimeout(n,100))}).then(()=>{this._snackBar.open("T\u1EA1o M\u1EDBi \u0111\u1EB7t h\xE0ng th\xE0nh c\xF4ng","",{duration:2e3,horizontalPosition:"end",verticalPosition:"top",panelClass:["snackbar-success"]}),this._router.navigate(["/admin/dathang"])}).catch(i=>{this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi T\u1EA1o M\u1EDBi \u0111\u1EB7t h\xE0ng","",{duration:2e3,horizontalPosition:"end",verticalPosition:"top",panelClass:["snackbar-error"]}),console.error("Error creating orders:",i)}))})})}CheckSanphaminNCC(t,e){return!!t.Sanpham?.find(i=>i.id===e.id)}updateValue(t,e,a){let i=Number(t.target.innerText.trim())||0,n=this.ListDathang.find(r=>r.id===a.id);if(console.log(n),n){let r=n.sanpham.find(s=>s.id===e.id);r?r.sldat=i:(e.sldat=i,n.Sanpham.push(e))}else e.sldat=i,a.sanpham=[e],a.ngaynhan=new Date,this.ListDathang.push(a);console.log(this.ListDathang)}AddToEdit(t){this.EditList.find(a=>a.id===t.id)?this.EditList=this.EditList.filter(a=>a.id!==t.id):this.EditList.push(t)}ChoseAllEdit(){this.EditList=this.Listsanpham()}CheckItemInEdit(t){return this.EditList.some(e=>e.id===t.id)}goToDetail(t){this.drawer.open(),this._SanphamService.setSanphamId(t.id),this._router.navigate(["admin/sanpham",t.id])}LoadDrive(){return u(this,null,function*(){let t={IdSheet:"15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk",SheetName:"SPImport",ApiKey:"AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao"},e=yield this._GoogleSheetService.getDrive(t),a=Ut(e.values);this.DoImportData(a)})}DoImportData(t){return u(this,null,function*(){let e=t.map(s=>({title:s.title?.trim()||"",masp:s.masp?.trim()||"",giagoc:Number(s.giagoc)||0,dvt:s.dvt?.trim()||"",soluong:Number(s.soluong)||0,soluongkho:Number(s.soluongkho)||0,haohut:Number(s.haohut)||0,ghichu:s.ghichu?.trim()||""})),a=Array.from(new Map(e.map(s=>[s.masp,s])).values()),i=this._SanphamService.ListSanpham(),n=i.map(s=>s.masp),r=a.map(s=>s.masp).filter(s=>!n.includes(s));yield Promise.all(a.map(s=>u(this,null,function*(){let x=i.find(C=>C.masp===s.masp);if(x){let C=_(_({},x),s);yield this._SanphamService.updateSanpham(C)}else yield this._SanphamService.CreateSanpham(s)}))),yield Promise.all(i.filter(s=>!a.some(x=>x.masp===s.masp)).map(s=>this._SanphamService.updateSanpham(F(_({},s),{isActive:!1})))),this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng","",{duration:1e3,horizontalPosition:"end",verticalPosition:"top",panelClass:["snackbar-success"]})})}ImporExcel(t){return u(this,null,function*(){let e=yield ae(t);this.DoImportData(e)})}ExportExcel(t,e){return u(this,null,function*(){let a=yield this._KhoService.getAllKho();console.log(t);let i=t.map(r=>({ngaynhan:(0,de.default)().format("YYYY-MM-DD"),mancc:r.mancc||"",nhacungcap:r.nhacungcap||"",masp:r.masp,title:r.title,dvt:r.dvt,slchogiao:r.slchogiao,goiy:r.goiy,slchonhap:r.slchonhap,slton:r.slton,haohut:r.haohut,ghichu:r.ghichu})),n={ngaynhan:"Ng\xE0y Nh\u1EADn",mancc:"M\xE3 Nh\xE0 Cung C\u1EA5p",nhacungcap:"Nh\xE0 Cung C\u1EA5p",masp:"M\xE3 S\u1EA3n Ph\u1EA9m",title:"T\xEAn S\u1EA3n Ph\u1EA9m",dvt:"\u0110\u01A1n V\u1ECB T\xEDnh",slchogiao:"Ch\u1EDD Giao",goiy:"G\u1EE3i \xDD",slchonhap:"Ch\u1EDD Nh\u1EADp",slton:"T\u1ED3n Kho",haohut:"Hao H\u1EE5t",ghichu:"Ghi Ch\xFA"};a.forEach(r=>{n[`makho_${r.makho}`]=r.makho}),ee(i,e,Object.values(n),n)})}trackByFn(t,e){return e.id}calculateTotalPages(){this.totalPages=Math.ceil(this.totalItems/this.pageSize)}onPageSizeChange(t,e){t>this.Listsanpham().length?(this.pageSize=this.Listsanpham().length,this._snackBar.open(`S\u1ED1 l\u01B0\u1EE3ng t\u1ED1i \u0111a ${this.Listsanpham().length}`,"",{duration:1e3,horizontalPosition:"end",verticalPosition:"top",panelClass:["snackbar-success"]})):this.pageSize=t,this.currentPage=1,this.calculateTotalPages(),this.updateDisplayData(),e.closeMenu()}onPreviousPage(){this.currentPage>1&&(this.currentPage--,this.updateDisplayData())}onNextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.updateDisplayData())}updateDisplayData(){let t=(this.currentPage-1)*this.pageSize,e=t+this.pageSize,a=this.Listsanpham().slice(t,e);this.dataSource.data=a}static \u0275fac=function(e){return new(e||N)};static \u0275cmp=$({type:N,selectors:[["app-nhucaudathang"]],viewQuery:function(e,a){if(e&1&&(q(Wt,5),q(Xt,5),q(Ce,7)),e&2){let i;O(i=V())&&(a.paginator=i.first),O(i=V())&&(a.sort=i.first),O(i=V())&&(a.drawer=i.first)}},decls:91,vars:18,consts:[["drawer",""],["menu","matMenu"],["uploadfile",""],["menuHienthi","matMenuTrigger"],["DeleteDialog",""],["TaodonDialog",""],["autosize","",1,"w-full","h-full"],["mode","over",1,"flex","flex-col","lg:!w-1/2","!w-full","h-full",3,"position"],[1,"flex","flex-col","space-y-2","h-screen-16","w-full","p-2"],[1,"border","p-1","cursor-pointer","w-full","relative","flex","lg:flex-row","lg:space-y-2","space-y-0","flex-col","space-x-2","justify-between","items-center","bg-white","rounded-lg"],[1,"w-full","flex","flex-row","space-x-2","items-center"],[1,"relative"],["type","text","placeholder","T\xECm Ki\u1EBFm...",1,"block","pl-10","pr-4","py-2","text-gray-700","bg-white","border","border-gray-300","rounded-lg","focus:border-blue-400","focus:ring-blue-400","focus:outline-none","focus:ring","focus:ring-opacity-40",3,"keyup"],[1,"absolute","inset-y-0","left-0","flex","items-center","pl-3","pointer-events-none"],[1,"material-symbols-outlined","text-gray-500"],["matTooltip","\u1EA8n hi\u1EC7n c\u1ED9t","mat-icon-button","","color","primary","aria-label","Example icon-button with a menu",3,"matMenuTriggerFor"],[1,"p-4"],["appearance","outline","subscriptSizing","dynamic",1,"w-full"],["matInput","","placeholder","T\xECm Ki\u1EBFm",3,"input","click"],["matPrefix",""],[1,"flex","flex-col","max-h-80","overflow-auto"],["mat-menu-item",""],["matTooltip","T\u1EA3i file excel M\u1EABu","color","primary","mat-icon-button","",3,"click"],["type","file",1,"hidden",3,"change"],[1,"lg:flex","hidden","whitespace-","p-2","rounded-lg","bg-slate-200",3,"click"],["color","primary","mat-flat-button","",3,"click",4,"ngIf"],[1,"border","rounded-lg","w-full","h-full","overflow-auto"],[1,"!border","w-full","cursor-pointer"],[1,"bg-gray-50","sticky","top-0"],[1,"px-4","py-3","text-left","text-xs","font-medium","text-gray-500","uppercase","tracking-wider","whitespace-nowrap"],[1,"bg-white","divide-y","divide-gray-200"],[3,"class","click",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"cursor-pointer","border","rounded-lg","px-3","p-1","flex","flex-row","space-x-2","items-center","justify-between"],[1,"w-full","flex","lg:p-0","p-2","lg:flex-row","lg:space-x-2","lg:items-center","lg:justify-between","flex-col","justify-center"],[1,"w-full","text-center"],[1,"w-full","flex","flex-row","space-x-2","items-center","lg:justify-end","justify-center"],[1,"font-bold","text-blue-600",3,"matMenuTriggerFor"],[1,"w-full","flex","flex-col","space-y-2","p-4",3,"click"],["appearance","outline","subscriptSizing","dynamic"],["matInput","","placeholder","Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng",3,"ngModelChange","ngModel","ngModelOptions"],["mat-flat-button","","color","primary",3,"click"],[1,"pagination-controls"],["mat-icon-button","","color","primary",3,"click","disabled"],["mat-menu-item","",3,"click"],["color","primary","mat-flat-button","",3,"click"],[3,"click"],[1,"px-4","py-4","whitespace-nowrap","text-sm","text-gray-900"],[1,"px-4","py-4","whitespace-nowrap","text-sm","text-gray-900","text-right"],["colspan","9",1,"px-4","py-4","text-center","text-sm","text-gray-500"],[1,"flex","flex-col","space-y-8","items-center","justify-center"],[1,"font-bold"],[1,"flex","flex-row","space-x-2","items-center","justify-center"],["mat-flat-button","","color","primary","mat-dialog-close","true"],["mat-flat-button","","color","warn","mat-dialog-close","false"],[1,"!max-h-[90vh]","!h-[90vh]","!w-[90vw]"],[1,"h-full","w-full","flex","flex-col","space-y-8","items-center"],[1,"flex","font-bold"],[1,"flex","h-full","w-full","overflow-auto"],[3,"ListDathangChange","ListFindNCC","EditList","ListDathang"],["mat-flat-button","","color","primary",3,"click",4,"ngIf"],["mat-flat-button","","color","primary","mat-dialog-close","true",4,"ngIf"],["mat-flat-button","","color","warn","mat-dialog-close","false",4,"ngIf"]],template:function(e,a){if(e&1){let i=L();o(0,"mat-drawer-container",6)(1,"mat-drawer",7,0),G(3,"router-outlet"),l(),o(4,"div",8)(5,"div",9)(6,"div",10)(7,"div",11)(8,"input",12),S("keyup",function(r){return g(i),y(a.applyFilter(r))}),l(),o(9,"div",13)(10,"span",14),d(11,"search"),l()()(),o(12,"button",15)(13,"mat-icon"),d(14,"tune"),l()(),o(15,"mat-menu",null,1)(17,"div",16)(18,"mat-form-field",17)(19,"input",18),S("input",function(r){return g(i),y(a.doFilterColumns(r))})("click",function(r){return g(i),y(r.stopPropagation())}),l(),o(20,"mat-icon",19),d(21,"search"),l()()(),o(22,"div",20),st(23,xe,5,2,"button",21,be),l()(),o(25,"button",22),S("click",function(){return g(i),y(a.ExportExcel(a.dataSource.data,"Tonghop"))}),o(26,"mat-icon"),d(27,"file_download"),l()(),o(28,"input",23,2),S("change",function(r){return g(i),y(a.ImporExcel(r))}),l(),o(30,"span",24),S("click",function(){return g(i),y(a.ChoseAllEdit())}),d(31),l(),E(32,_e,2,0,"button",25),l()(),o(33,"div",26)(34,"div",26)(35,"table",27)(36,"thead",28)(37,"tr")(38,"th",29),d(39," M\xE3 S\u1EA3n Ph\u1EA9m "),l(),o(40,"th",29),d(41," T\xEAn S\u1EA3n Ph\u1EA9m "),l(),o(42,"th",29),d(43," \u0110\u01A1n V\u1ECB T\xEDnh "),l(),o(44,"th",29),d(45," SL \u0110\u1EB7t "),l(),o(46,"th",29),d(47," SL C\u1EA7n \u0110\u1EB7t "),l(),o(48,"th",29),d(49," SL B\xE1n "),l(),o(50,"th",29),d(51," T\u1ED3n "),l(),o(52,"th",29),d(53," Hao H\u1EE5t "),l()()(),o(54,"tbody",30),E(55,we,21,23,"tr",31)(56,Le,3,0,"tr",32),l()()()(),o(57,"div",33)(58,"div",34)(59,"span",35),d(60,"\u0110ang Xem "),o(61,"strong"),d(62),l(),d(63," - "),o(64,"strong"),d(65),l(),d(66),l(),o(67,"div",36)(68,"span",37,3),d(70),l(),o(71,"mat-menu",null,1)(73,"div",38),S("click",function(r){return g(i),y(r.stopPropagation())}),o(74,"span"),d(75,"S\u1ED1 L\u01B0\u1EE3ng"),l(),o(76,"mat-form-field",39)(77,"input",40),mt("ngModelChange",function(r){return g(i),ht(a.pageSize,r)||(a.pageSize=r),y(r)}),l()(),o(78,"button",41),S("click",function(){g(i);let r=B(69);return y(a.onPageSizeChange(a.pageSize,r))}),d(79,"\xC1p D\u1EE5ng"),l()()(),o(80,"div",42)(81,"button",43),S("click",function(){return g(i),y(a.onPreviousPage())}),o(82,"mat-icon"),d(83,"keyboard_arrow_left"),l()(),o(84,"button",43),S("click",function(){return g(i),y(a.onNextPage())}),o(85,"mat-icon"),d(86,"keyboard_arrow_right"),l()()()()()()()(),E(87,Ee,11,0,"ng-template",null,4,et)(89,Fe,10,6,"ng-template",null,5,et)}if(e&2){let i=B(16);h(),f("position","end"),h(11),f("matMenuTriggerFor",i),h(11),lt(a.FilterColumns),h(8),b(" ",a.Listsanpham().length," S\u1EA3n Ph\u1EA9m "),h(),f("ngIf",a.EditList.length>0),h(23),f("ngForOf",a.dataSource.filteredData),h(),f("ngIf",a.dataSource.filteredData.length===0),h(6),A((a.currentPage-1)*a.pageSize+1),h(3),A(a.currentPage*a.pageSize>a.totalItems?a.totalItems:a.currentPage*a.pageSize),h(),dt(" trong s\u1ED1 ",a.totalItems," m\u1EE5c, ",a.currentPage,"/",a.totalPages," Trang"),h(2),f("matMenuTriggerFor",i),h(2),b("Hi\u1EC7n Th\u1ECB : ",a.pageSize," m\u1EE5c"),h(7),ct("ngModel",a.pageSize),f("ngModelOptions",pt(17,ve)),h(4),f("disabled",a.currentPage===1),h(3),f("disabled",a.currentPage===a.totalPages)}},dependencies:[Kt,Bt,Vt,Rt,Qt,te,Zt,Yt,It,Mt,kt,Ft,Et,wt,Lt,yt,j,Dt,U,bt,xt,zt,z,K,Q,R,At,Nt,Tt,Pt,Jt,jt,Ot,Gt,qt,J],encapsulation:2,changeDetection:0})};X([Ie()],N.prototype,"FilterHederColumn",1),X([Ne(300)],N.prototype,"doFilterHederColumn",1);var ue=N;function Ie(){return function(c,t,e){let a=e.value,i=new Map;return e.value=function(...n){let r=JSON.stringify(n);if(i.has(r))return i.get(r);let s=a.apply(this,n);return i.set(r,s),s},e}}function Ne(c=300){return function(t,e,a){let i=a.value,n;return a.value=function(...r){clearTimeout(n),n=setTimeout(()=>{i.apply(this,r)},c)},a}}export{ue as NhucaudathangComponent};
