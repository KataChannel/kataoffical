import { Injectable } from '@angular/core';

// Simple GraphQL Service for debugging
@Injectable({
  providedIn: 'root'
})
export class GraphQLDebugService {
  private readonly GRAPHQL_ENDPOINT = 'http://localhost:3331/graphql';

  async testConnection(): Promise<any> {
    try {
      console.log('Testing GraphQL connection...');
      
      const query = {
        query: `
          query TestConnection {
            __schema {
              types {
                name
              }
            }
          }
        `
      };

      console.log('Sending request to:', this.GRAPHQL_ENDPOINT);
      console.log('Query:', JSON.stringify(query, null, 2));

      const response = await fetch(this.GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const result = await response.json();
      console.log('Response result:', result);
      return result;
    } catch (error) {
      console.error('GraphQL test error:', error);
      throw error;
    }
  }

  async testFindMany(): Promise<any> {
    try {
      console.log('Testing findMany query...');
      
      const query = {
        query: `
          query TestFindMany {
            findMany(
              modelName: "User"
              take: 1
            ) {
              data
              total
              page
              pageSize
              totalPages
            }
          }
        `,
        variables: {}
      };

      console.log('Sending findMany request...');
      console.log('Query:', JSON.stringify(query, null, 2));

      const response = await fetch(this.GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });

      console.log('FindMany response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('FindMany response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const result = await response.json();
      console.log('FindMany result:', result);
      return result;
    } catch (error) {
      console.error('FindMany test error:', error);
      throw error;
    }
  }

  async testWithAuth(token?: string): Promise<any> {
    try {
      console.log('Testing with authentication...');
      
      const headers: any = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Using auth token:', token.substring(0, 20) + '...');
      }

      const query = {
        query: `
          query TestAuth {
            findMany(
              modelName: "User"
              take: 1
            ) {
              data
              total
            }
          }
        `
      };

      const response = await fetch(this.GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify(query),
      });

      console.log('Auth test response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Auth test error:', errorText);
        return { error: errorText, status: response.status };
      }

      const result = await response.json();
      console.log('Auth test result:', result);
      return result;
    } catch (error) {
      console.error('Auth test error:', error);
      throw error;
    }
  }
}
