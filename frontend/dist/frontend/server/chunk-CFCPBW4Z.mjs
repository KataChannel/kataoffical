import './polyfills.server.mjs';
import{f as l,g as i}from"./chunk-N7WAOINW.mjs";import{a as c}from"./chunk-6EFOJMAD.mjs";import{a as p}from"./chunk-VT4NXQX5.mjs";import{a as o,d as s}from"./chunk-5YOTNGM2.mjs";import{ja as n,pa as r}from"./chunk-TKMPR5S6.mjs";var u=i`
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
`,d=i`
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
`,T=i`
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input) {
      id
      title
      description
      status
      priority
    }
  }
`,v=i`
  mutation AddResponse($ticketId: String!, $input: CreateResponseInput!) {
    addResponse(ticketId: $ticketId, input: $input) {
      id
      content
      createdAt
    }
  }
`,m=class a{apollo=r(l);http=r(s);storageService=r(p);tickets(t,e){return this.apollo.watchQuery({query:u,variables:{status:t,priority:e},fetchPolicy:"network-only"}).valueChanges}ticket(t){return this.apollo.watchQuery({query:d,variables:{id:t},fetchPolicy:"network-only"}).valueChanges}createTicket(t){return this.apollo.mutate({mutation:T,variables:{input:t},refetchQueries:[{query:u}]})}addResponse(t,e){return this.apollo.mutate({mutation:v,variables:{ticketId:t,input:e},refetchQueries:[{query:d,variables:{id:t}}]})}uploadFiles(t){let e=new FormData;t.forEach(h=>{e.append("files",h)});let f=this.storageService.getItem("token"),y=new o({Authorization:`Bearer ${f}`});return this.http.post(`${c.APIURL}/support/upload`,e,{headers:y})}static \u0275fac=function(e){return new(e||a)};static \u0275prov=n({token:a,factory:a.\u0275fac,providedIn:"root"})};export{m as a};
