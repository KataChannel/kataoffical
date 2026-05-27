import {
  StorageService
} from "./chunk-F5CW4EPT.js";
import {
  Apollo,
  gql
} from "./chunk-QEGCNOFQ.js";
import {
  HttpClient,
  HttpHeaders
} from "./chunk-XM7PTE63.js";
import {
  inject,
  ɵɵdefineInjectable
} from "./chunk-SEHLAVZZ.js";

// src/environments/environment.ts
var environment = {
  production: true,
  APIURL: "https://apisandbox.rausachtrangia.com",
  ImageURL: "https://media.rausachtrangia.com/",
  app_id: "1416835846626859002",
  secret_key: "HLBWj23hToA9fuiQvQY4",
  zalo_redirect_uri: "https://zalo.tazaskinclinic.com/admin/zalotoken",
  firebaseConfig: {
    apiKey: "AIzaSyCRVfxKiWK4xyZW_aT72DJ1Suvs9oGq1oM",
    authDomain: "Rau S\u1EA1ch Tr\u1EA7n Gia-38d2d.firebaseapp.com",
    projectId: "Rau S\u1EA1ch Tr\u1EA7n Gia-38d2d",
    storageBucket: "Rau S\u1EA1ch Tr\u1EA7n Gia-38d2d.firebasestorage.app",
    messagingSenderId: "362949286600",
    appId: "1:362949286600:web:b1f5b55bfed46793fe23fd"
  },
  GSApiKey: "AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao"
};

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
    return this.http.post(`${environment.APIURL}/support/upload`, formData, { headers });
  }
  static \u0275fac = function SupportService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupportService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SupportService, factory: _SupportService.\u0275fac, providedIn: "root" });
};

export {
  SupportService
};
//# sourceMappingURL=chunk-XTGNIXGF.js.map
