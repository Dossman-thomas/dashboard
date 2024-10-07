import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users';  // Adjust this URL based on your backend port

  constructor(private http: HttpClient) {}

  // Create a new user
  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-new`, userData);
  }

  // Get a user by ID
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Update a user by ID
  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, userData);
  }

  // Delete a user by ID
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // Verify user password (if you choose to implement it)
  verifyPassword(id: string, passwordData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/verify-password`, passwordData);
  }
}
