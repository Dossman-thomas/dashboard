import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-delete-button-renderer',
  template: `
    <button (click)="onClick($event)" class="btn btn-danger delete-btn" style="background-color: var(--secondary-red); border: none;">Delete</button>
  `
})
export class DeleteButtonRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      const userId = this.params.data.id;
      this.params.onClick(userId);
    }
  }
}
