import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { ColDef, GridApi } from 'ag-grid-community';
// import { UpdateButtonRendererComponent } from '../update-button-renderer/update-button-renderer.component';
import { AgGridAngular } from 'ag-grid-angular';
// import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-update-record',
  templateUrl: './update-record.component.html',
  styleUrls: ['./update-record.component.css']
})
export class UpdateRecordComponent implements OnInit {
  
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  users: User[] = [];
  selectedUser: User = { id: 0, name: '', email: '', password: '', role: '' };
  gridApi!: GridApi;

  constructor(private userService: UserService) { }

  paginationPageSizeSelector = [10, 25, 50, 100];
  paginationPageSize = 25;
  pagination = true;

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    editable: true // Make all columns editable
  };

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false },
    { field: 'name', headerName: 'Name', flex: 3 },
    { field: 'email', headerName: 'Email', flex: 3 },
    { field: 'role', headerName: 'Role', flex: 2 },
  ];

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        if (this.gridApi) {
          // Use setGridOptions to update row data
          this.gridApi.updateGridOptions({
            rowData: this.users
          });
        }
        console.log('Users:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.fetchUsers(); // Fetch users when the grid is ready
  }

  // openModal(user: User): void {
  //   this.selectedUser = { ...user };
  //   const modalElement = document.getElementById('updateModal');
  //   if (modalElement) {
  //     const modal = new bootstrap.Modal(modalElement);
  //     modal.show();
  //   }
  // }

  // onUpdateUser(): void {
  //   if (this.selectedUser && this.selectedUser.id) {
  //     this.userService.updateUser(this.selectedUser).subscribe({
  //       next: () => {
  //         const modalElement = document.getElementById('updateModal');
  //         if (modalElement) {
  //           const modal = bootstrap.Modal.getInstance(modalElement);
  //           if (modal) {
  //             modal.hide();
  //           }
  //         }
  //         this.fetchUsers(); // Fetch updated user list
  //       },
  //       error: (error) => {
  //         console.error('Error updating user:', error);
  //       }
  //     });
  //   }
  // }

  onCellValueChanged(event: any): void {
    const updatedUser = event.data as User;
    this.userService.updateUser(updatedUser).subscribe({
      next: () => {
        console.log('User updated:', updatedUser);
        alert('User updated successfully!');
      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
  }
}
