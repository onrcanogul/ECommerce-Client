import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import { DialogService } from '../../../../services/common/dialog.service';
import { CustomToastrService } from '../../../../services/common/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../../services/common/models/product.service';
import { ListProduct } from '../../../../contracts/list_product';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { UserService } from '../../../../services/common/models/user.service';
import { ListUsers, Users } from '../../../../contracts/users/list_users';
import { RoleService } from '../../../../services/common/models/role.service';
import { AssignRoleDialogComponent } from '../../../../dialogs/assign-role/assign-role-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit {
  
  constructor(spinner:NgxSpinnerService,private productService:ProductService,private userService:UserService ,private dialogService:DialogService ,private toastr:CustomToastrService,private roleService:RoleService,) {
    super(spinner)
  }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'username', 'email','Roles'];
  dataSource:MatTableDataSource<Users> = null;

  async getUsers()
  {
    this.showSpinner(spinnerType.BallClipRotatePulse)
    const users : ListUsers = await this.userService.getUsers(this.paginator ? this.paginator.pageIndex : 0 ,this.paginator ? this.paginator.pageSize : 5,()=>{this.hideSpinner(spinnerType.BallClipRotatePulse)},
    //  (errorMessage) => {this.toastr.message(errorMessage,"Error",{messageType:ToastrMessageType.Error , position:ToastrPosition.TopRight })}
     );
     this.dataSource = new MatTableDataSource<Users>(users.users);
     this.paginator.length = users.totalCount;
    
  }

  async pageChanged()
  {
    await this.getUsers();
  }

  async ngOnInit() {
    await this.getUsers()
  }

  

  async getRoles(id: string) {
    
    this.dialogService.openDialog({
      componentType:AssignRoleDialogComponent,
      data:id,
    })
  }

  

}

