import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { ColDef, GridApi } from 'ag-grid-community';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-manage-records',
  templateUrl: './manage-records.component.html',
  styleUrls: ['./manage-records.component.css']
})
export class ManageRecordsComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  users: User[] = [];
  rowData: User[] = [];
  gridApi!: GridApi<User>;

  constructor(private userService: UserService) {}

  paginationPageSizeSelector = [10, 25, 50, 100];
  paginationPageSize = 25;
  pagination = true;

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    editable: true,
  };

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', editable: false },
    { field: 'name', headerName: 'Name', flex: 3 },
    { field: 'email', headerName: 'Email', flex: 3 },
    { field: 'role', headerName: 'Role', flex: 2 },
    {
      headerName: 'Delete',
      cellRenderer: DeleteButtonRendererComponent, // Custom cell renderer for delete button
      cellRendererParams: {
        onClick: this.onDelete.bind(this), // Bind the onDelete method to the cell renderer
      },
      editable: false,
      filter: false,
      sortable: false,
      resizable: false,
    },
  ];

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        // Check if response.rows exists and is an array
        if (Array.isArray(response.rows)) {
          this.users = response.rows as User[];
          if (this.gridApi) {
            this.gridApi.applyTransaction({ add: this.users }); // Apply the data transaction
          }
          console.log('Users:', this.users);
        } else {
          console.error('Expected rows array but got:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.fetchUsers();
  }

  onCellValueChanged(event: any): void {
    const updatedUser: User = event.data;
    if (updatedUser.id) {
      this.userService.updateUser(updatedUser.id, updatedUser).subscribe({
        next: () => alert('User updated successfully!'),
        error: (error) => console.error('Error updating user:', error),
      });
    } else {
      console.error('User ID is undefined');
    }
  }

  onDelete(userId: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        // Remove the user from the array after successful deletion
        this.users = this.users.filter(user => user.id !== userId);
        this.rowData = [...this.users];  // Update the rowData for the AG Grid
      }, error => {
        console.error('Error deleting user:', error);  // Handle errors
      });
    }
  }
}
