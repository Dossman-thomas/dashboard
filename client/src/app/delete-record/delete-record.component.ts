import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { ColDef } from 'ag-grid-community';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';

@Component({
  selector: 'app-delete-record',
  templateUrl: './delete-record.component.html',
  styleUrls: ['../../styles.css','./delete-record.component.css']
})
export class DeleteRecordComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  paginationPageSizeSelector = [10, 25, 50, 100];
  paginationPageSize = 25;
  pagination = true;

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    sortable: true,
  };

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name', flex: 3 },
    { field: 'email', headerName: 'Email', flex: 3 },
    { field: 'role', headerName: 'Role', flex: 2 },
    {
      headerName: 'Delete Record',
      cellRenderer: DeleteButtonRendererComponent,
      cellRendererParams: {
        onClick: this.onDelete.bind(this),
      },
      filter: false,
      sortable: false,
      resizable: false,
    },
  ];

  rowData: User[] = [];


  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onDelete(userId: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter(user => user.id !== userId);
      });
    }
  }

}
