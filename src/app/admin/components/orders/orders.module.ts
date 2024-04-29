import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, spinnerType } from '../../../base/base.component';
import { ListComponent } from './list/list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from '@angular/cdk/dialog';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { DeleteDirectiveModule } from '../../../directives/admin/delete.directive.module';



@NgModule({
  declarations: [OrdersComponent, ListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path : "" , component : OrdersComponent}
    ]),
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DialogModule,
    FileUploadModule,
    DeleteDirectiveModule
  ]
})
export class OrdersModule {}
