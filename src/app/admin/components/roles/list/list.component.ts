import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from '../../../../services/common/models/role.service';
import { CustomToastrService } from '../../../../services/common/custom-toastr.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../../services/common/models/product.service';
import { ListRole, Role } from '../../../../contracts/role/list-role';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit {
  
  
  constructor(spinner:NgxSpinnerService,private roleService:RoleService,private toastr:CustomToastrService) {
    super(spinner)
  }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id','name','edit','delete'];
  dataSource:MatTableDataSource<Role> = null;

  async getRoles()
  {
    this.showSpinner(spinnerType.BallClipRotatePulse)
    const roles : ListRole = await this.roleService.getRoles(this.paginator ? this.paginator.pageIndex : 0 ,this.paginator ? this.paginator.pageSize : 5,()=>{this.hideSpinner(spinnerType.BallClipRotatePulse)});
     this.dataSource = new MatTableDataSource<Role>(roles.roles);
     this.paginator.length = roles.totalCount;
     debugger;
  }

  async pageChanged()
  {
    await this.getRoles();
  }

  async ngOnInit() {
    await this.getRoles()
  }

  


}