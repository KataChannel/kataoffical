import './polyfills.server.mjs';
import{a as c}from"./chunk-4HVLAYGY.mjs";import{f as p,g as i}from"./chunk-E6ZZP7BC.mjs";import{a as n,d as s}from"./chunk-QOIKKNVC.mjs";import{ja as o,pa as a}from"./chunk-EI2ERCRB.mjs";var d={production:!0,APIURL:"https://apisandbox.rausachtrangia.com",ImageURL:"https://media.rausachtrangia.com/",app_id:"1416835846626859002",secret_key:"HLBWj23hToA9fuiQvQY4",zalo_redirect_uri:"https://zalo.tazaskinclinic.com/admin/zalotoken",firebaseConfig:{apiKey:"AIzaSyCRVfxKiWK4xyZW_aT72DJ1Suvs9oGq1oM",authDomain:"Rau S\u1EA1ch Tr\u1EA7n Gia-38d2d.firebaseapp.com",projectId:"Rau S\u1EA1ch Tr\u1EA7n Gia-38d2d",storageBucket:"Rau S\u1EA1ch Tr\u1EA7n Gia-38d2d.firebasestorage.app",messagingSenderId:"362949286600",appId:"1:362949286600:web:b1f5b55bfed46793fe23fd"},GSApiKey:"AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao"};var u=i`
  query Tickets($status: String, $priority: String) {
    tickets(status: $status, priority: $priority) {
      id
      title
      description
      status
      priority
      createdAt
      updatedAt
      user {
        id
        name
        email
      }
      responses {
        id
        content
        createdAt
      }
      attachments {
        id
        fileUrl
        fileName
      }
    }
  }
`,l=i`
  query Ticket($id: String!) {
    ticket(id: $id) {
      id
      title
      description
      status
      priority
      createdAt
      updatedAt
      user {
        id
        name
        email
      }
      technician {
        id
        name
        email
      }
      responses {
        id
        content
        createdAt
        user {
          id
          name
          email
        }
        attachments {
          id
          fileUrl
          fileName
          fileType
        }
      }
      attachments {
        id
        fileUrl
        fileName
        fileType
      }
    }
  }
`,g=i`
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input) {
      id
      title
      description
      status
      priority
    }
  }
`,T=i`
  mutation AddResponse($ticketId: String!, $input: CreateResponseInput!) {
    addResponse(ticketId: $ticketId, input: $input) {
      id
      content
      createdAt
    }
  }
`,m=class r{apollo=a(p);http=a(s);storageService=a(c);tickets(t,e){return this.apollo.watchQuery({query:u,variables:{status:t,priority:e},fetchPolicy:"network-only"}).valueChanges}ticket(t){return this.apollo.watchQuery({query:l,variables:{id:t},fetchPolicy:"network-only"}).valueChanges}createTicket(t){return this.apollo.mutate({mutation:g,variables:{input:t},refetchQueries:[{query:u}]})}addResponse(t,e){return this.apollo.mutate({mutation:T,variables:{ticketId:t,input:e},refetchQueries:[{query:l,variables:{id:t}}]})}uploadFiles(t){let e=new FormData;t.forEach(y=>{e.append("files",y)});let f=this.storageService.getItem("token"),h=new n({Authorization:`Bearer ${f}`});return this.http.post(`${d.APIURL}/support/upload`,e,{headers:h})}static \u0275fac=function(e){return new(e||r)};static \u0275prov=o({token:r,factory:r.\u0275fac,providedIn:"root"})};export{m as a};
