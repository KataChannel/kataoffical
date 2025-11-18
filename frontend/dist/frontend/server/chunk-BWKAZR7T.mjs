import './polyfills.server.mjs';
import{a as c}from"./chunk-GS6F3HBF.mjs";import{f as p,g as i}from"./chunk-EUVDKCNO.mjs";import{a as o,d as s}from"./chunk-SYOYXCNA.mjs";import{ja as n,pa as r}from"./chunk-LL6B6DB7.mjs";var l=i`
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
`,u=i`
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
`,h=i`
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
`,d=class a{apollo=r(p);http=r(s);storageService=r(c);tickets(t,e){return this.apollo.watchQuery({query:l,variables:{status:t,priority:e},fetchPolicy:"network-only"}).valueChanges}ticket(t){return this.apollo.watchQuery({query:u,variables:{id:t},fetchPolicy:"network-only"}).valueChanges}createTicket(t){return this.apollo.mutate({mutation:h,variables:{input:t},refetchQueries:[{query:l}]})}addResponse(t,e){return this.apollo.mutate({mutation:T,variables:{ticketId:t,input:e},refetchQueries:[{query:u,variables:{id:t}}]})}uploadFiles(t){let e=new FormData;t.forEach(y=>{e.append("files",y)});let m=this.storageService.getItem("token"),f=new o({Authorization:`Bearer ${m}`});return this.http.post("https://apitg.rausachtrangia.com/support/upload",e,{headers:f})}static \u0275fac=function(e){return new(e||a)};static \u0275prov=n({token:a,factory:a.\u0275fac,providedIn:"root"})};export{d as a};
