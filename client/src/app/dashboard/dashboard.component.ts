import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  totalUsers: number = 0;
  adminCount: number = 0;
  dataManagerCount: number = 0;
  employeeCount: number = 0;
  firstName: string = '';

  paginationPageSizeSelector = [10, 25, 50, 100];
  paginationPageSize = 10;
  pagination = true;

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    sortable: true,
  };

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'role', headerName: 'Role' }
  ];

  rowData: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Retrieve current user from localStorage
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      const currentUser: User = JSON.parse(currentUserData);
      this.firstName = currentUser.name.split(' ')[0]; // Extract first name
    } else {
      // Handle case where there is no logged-in user
      this.firstName = 'User';
    }

    // Fetch users from UserService
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.totalUsers = this.users.length;
      this.rowData = this.users;
      this.adminCount = this.users.filter(user => user.role === 'admin').length;
      this.dataManagerCount = this.users.filter(user => user.role === 'data manager').length;
      this.employeeCount = this.users.filter(user => user.role === 'employee').length;
    });
  }
}
