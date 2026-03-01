import './polyfills.server.mjs';
import {
  StorageService
} from "./chunk-2BTDEHR6.mjs";
import {
  Apollo,
  gql
} from "./chunk-UYYJQ6OX.mjs";
import {
  HttpClient,
  HttpHeaders
} from "./chunk-2JIL42JL.mjs";
import {
  inject,
  ɵɵdefineInjectable
} from "./chunk-ADMXANIA.mjs";

// src/app/support/support.service.ts
var TICKETS_QUERY = gql`
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
`;
var TICKET_QUERY = gql`
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
`;
var CREATE_TICKET_MUTATION = gql`
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input) {
      id
      title
      description
      status
      priority
    }
  }
`;
var ADD_RESPONSE_MUTATION = gql`
  mutation AddResponse($ticketId: String!, $input: CreateResponseInput!) {
    addResponse(ticketId: $ticketId, input: $input) {
      id
      content
      createdAt
    }
  }
`;
var SupportService = class _SupportService {
  apollo = inject(Apollo);
  http = inject(HttpClient);
  storageService = inject(StorageService);
  tickets(status, priority) {
    return this.apollo.watchQuery({
      query: TICKETS_QUERY,
      variables: { status, priority },
      fetchPolicy: "network-only"
    }).valueChanges;
  }
  ticket(id) {
    return this.apollo.watchQuery({
      query: TICKET_QUERY,
      variables: { id },
      fetchPolicy: "network-only"
    }).valueChanges;
  }
  createTicket(input) {
    return this.apollo.mutate({
      mutation: CREATE_TICKET_MUTATION,
      variables: { input },
      refetchQueries: [{ query: TICKETS_QUERY }]
    });
  }
  addResponse(ticketId, input) {
    return this.apollo.mutate({
      mutation: ADD_RESPONSE_MUTATION,
      variables: { ticketId, input },
      refetchQueries: [{ query: TICKET_QUERY, variables: { id: ticketId } }]
    });
  }
  uploadFiles(files) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    const token = this.storageService.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`https://apitg.rausachtrangia.com/support/upload`, formData, { headers });
  }
  static \u0275fac = function SupportService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupportService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SupportService, factory: _SupportService.\u0275fac, providedIn: "root" });
};

export {
  SupportService
};
//# sourceMappingURL=chunk-LWMZEBGU.mjs.map
