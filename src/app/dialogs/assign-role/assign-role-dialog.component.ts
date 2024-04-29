import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../services/common/models/role.service';
import { ListRole, Role } from '../../contracts/role/list-role';
import { MatSelectionList } from '@angular/material/list';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr.service';


@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrl: './assign-role.component.css'
})
export class AssignRoleDialogComponent extends BaseDialog<AssignRoleDialogComponent> implements OnInit{
  constructor(dialogRef:MatDialogRef<AssignRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService:RoleService,
    private toastr:CustomToastrService
  ) {
    super(dialogRef)
  }
  
  roles : Role[];
  names:string[];
  assignedRoles:Array<string>
  listRoles:{name:string, selected:boolean}[];
  async ngOnInit() {
    this.assignedRoles = await this.roleService.getUsersRoles(this.data as string);
    const _roles = await this.roleService.getRolesWithoutPagination();

    this.listRoles = _roles.roles.map(r  => {    
      return {
        name : r.name,
        selected : this.assignedRoles?.indexOf(r.name) > -1
      }
    })
  }

  
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];


  async assignRole(rolesComponent:MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._elementRef.nativeElement.innerText);
    console.log(roles)
    debugger;

    const result:{result:boolean} = await this.roleService.assignRole(this.data, roles);
    if(result.result)
    {
        this.toastr.message("Added","ad",{position:ToastrPosition.TopRight,messageType: ToastrMessageType.Success})
    }


    
  }
}




export enum AssignRoleState{
  Yes,No
}
