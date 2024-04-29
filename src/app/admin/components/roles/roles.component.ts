import { Component, ViewChild } from '@angular/core';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  @ViewChild(ListComponent)listComponent:ListComponent

  createdRole() {
    this.listComponent.getRoles();
  }
}
