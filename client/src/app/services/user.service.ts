import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  of,
  map,
  catchError,
  throwError,
} from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api/users';

  // Helper method to get the Authorization header
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Use JWT token
    });
  }

  // Define the currentUserSubject as a BehaviorSubject
  private currentUserSubject: BehaviorSubject<User | null>;

  // Define currentUser$ as an Observable for the current user
  public currentUser$: Observable<User | null>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

    // Method to get the current user from the server using the user's ID
    fetchCurrentUser(id: number): Observable<User> {
      return this.http
        .get<User>(`${this.baseUrl}/current-user/${id}`, { headers: this.getHeaders() }) // Adjusted endpoint
        .pipe(
          map((user) => {
            this.setCurrentUser(user); // Set the current user
            return user;
          }),
          catchError((error) => {
            console.error('Error fetching current user:', error);
            return throwError(() => new Error('Failed to fetch current user. Please try again later.'));
          })
        );
    }

  // Method to get the current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  clearCurrentUser(): void {
    return this.currentUserSubject.next(null);
  };

  // Set the current user in BehaviorSubject
  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  // Get the current user value
  getCurrentUsers(): Observable<User[]> {
    return this.getAllUsers(); // Call the existing method to fetch users
  }

  // Create a new user
  createUser(userData: User): Observable<User> {
    return this.http
      .post<any>(`${this.baseUrl}/create-new`, userData, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((res: User): User => {
          return res;
        }),
        catchError((error) => {
          console.error('Error creating user:', error);
          return throwError(
            () => new Error('Failed to create user. Please try again later.')
          );
        })
      );
  }

  // Get a user by ID
  getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(
        map((res) => res), // Extract the response
        catchError((error) => {
          console.error('Error fetching user:', error); // Log the error
          return throwError(
            () => new Error('Failed to fetch user. Please try again later.')
          ); // Return an observable error
        })
      );
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http
      .get<any>(`${this.baseUrl}`, { headers: this.getHeaders() })
      .pipe(
        map((res) => res.data), // Extract the 'data' property
        catchError((error) => {
          console.log('Error fetching users:', error); // Log the error
          return throwError(
            () => new Error('Failed to fetch users. Please try again later.')
          ); // Return an observable error
        })
      );
  }

  // Update a user by ID
  updateUser(id: number, userData: User): Observable<User> {
    return this.http
      .put<User>(`${this.baseUrl}/update/${id}`, userData, {
        headers: this.getHeaders(),
      })
      .pipe(
        // No need for map if the API returns the updated user directly
        catchError((error) => {
          console.error('Error updating user:', error);
          return throwError(
            () => new Error('Failed to update user. Please try again later.')
          );
        })
      );
  }

  // Delete a user by ID
  deleteUser(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/delete/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((res) => {
          console.log('User deleted successfully', res);
          return res;
        }),
        catchError((error) => {
          console.error('Error deleting user:', error);
          return throwError(
            () => new Error('Failed to delete user. Please try again later.')
          );
        })
      );
  }

  // Verify user password (if you choose to implement it)
  // verifyPassword(
  //   id: number,
  //   passwordData: { password: string }
  // ): Observable<boolean> {
  //   return this.http.post<boolean>(
  //     `${this.baseUrl}/${id}/verify-password`,
  //     passwordData
  //   );
  // }

  // Logout and clear the user from localStorage
  // logout(): void {
  //   localStorage.removeItem('currentUser');
  //   this.setCurrentUser(null); // Clears the current user in the BehaviorSubject
  // }

  // Error handling method
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
