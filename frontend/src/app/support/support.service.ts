import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { StorageService } from '../shared/utils/storage.service';

const TICKETS_QUERY = gql`
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

const TICKET_QUERY = gql`
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

const CREATE_TICKET_MUTATION = gql`
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

const ADD_RESPONSE_MUTATION = gql`
  mutation AddResponse($ticketId: String!, $input: CreateResponseInput!) {
    addResponse(ticketId: $ticketId, input: $input) {
      id
      content
      createdAt
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private apollo = inject(Apollo);
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private apiUrl = 'http://localhost:3331';

  tickets(status?: string, priority?: string) {
    return this.apollo.watchQuery({
      query: TICKETS_QUERY,
      variables: { status, priority },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  ticket(id: string) {
    return this.apollo.watchQuery({
      query: TICKET_QUERY,
      variables: { id },
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  createTicket(input: any) {
    return this.apollo.mutate({
      mutation: CREATE_TICKET_MUTATION,
      variables: { input },
      refetchQueries: [{ query: TICKETS_QUERY }],
    });
  }

  addResponse(ticketId: string, input: any) {
    return this.apollo.mutate({
      mutation: ADD_RESPONSE_MUTATION,
      variables: { ticketId, input },
      refetchQueries: [{ query: TICKET_QUERY, variables: { id: ticketId } }],
    });
  }

  uploadFiles(files: File[]): Observable<any[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const token = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any[]>(`${this.apiUrl}/support/upload`, formData, { headers });
  }
}
