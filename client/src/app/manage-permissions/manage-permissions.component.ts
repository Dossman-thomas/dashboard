import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PermissionsService, RolePermissions } from '../services/permissions.service';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.css']
})
export class ManagePermissionsComponent implements OnInit {
  rolePermissions$: Observable<RolePermissions[]> = of([]); // Initialize with an empty observable

  constructor(private permissionsService: PermissionsService) {}

  ngOnInit(): void {
    // Load role permissions from the service
    this.rolePermissions$ = this.permissionsService.getPermissions$();
  }

  onPermissionChange(role: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.rolePermissions$.subscribe(rolePermissions => {
      const updatedRole = rolePermissions.find(rp => rp.role === role);
      if (updatedRole) {
        const updatedPermissions = {
          ...updatedRole,
          [checkbox.name]: checkbox.checked
        };

        this.permissionsService.updatePermissions(role, updatedPermissions).subscribe(() => {
          console.log(`${role} permissions updated successfully`);
        });
      }
    });
  }
}
