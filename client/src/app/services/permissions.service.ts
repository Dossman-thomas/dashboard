import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface RolePermissions {
  role: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private rolesPermissionsSubject = new BehaviorSubject<RolePermissions[]>([
    {
      role: 'admin',
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    },
    {
      role: 'data manager',
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: false,
    },
    {
      role: 'employee',
      canCreate: false,
      canRead: true,
      canUpdate: false,
      canDelete: false,
    },
  ]);

  // Observable to emit role permissions
  rolePermissions$ = this.rolesPermissionsSubject.asObservable();

  constructor() {
    // Optionally load initial data if needed
  }

  // Retrieve all role permissions as an observable
  getPermissions$(): Observable<RolePermissions[]> {
    return this.rolePermissions$;
  }

  // Get permissions for a specific role
  getPermissionsForRole(role: string): Observable<RolePermissions | undefined> {
    const permissions = this.rolesPermissionsSubject.getValue().find(rp => rp.role === role);
    return of(permissions);
  }

  // Update permissions for a specific role
  updatePermissions(role: string, permissions: Partial<RolePermissions>): Observable<void> {
    const rolePermissions = this.rolesPermissionsSubject.getValue();
    const roleIndex = rolePermissions.findIndex(rp => rp.role === role);

    if (roleIndex !== -1) {
      const updatedPermissions = { ...rolePermissions[roleIndex], ...permissions };
      
      // Check if there are actual changes before updating
      if (JSON.stringify(rolePermissions[roleIndex]) !== JSON.stringify(updatedPermissions)) {
        rolePermissions[roleIndex] = updatedPermissions;
        this.rolesPermissionsSubject.next(rolePermissions); // Emit updated permissions
      }
    }

    return of(undefined);
  }
}
