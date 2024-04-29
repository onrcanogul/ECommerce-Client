import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrderComponent } from './list-order.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DialogModule } from '@angular/cdk/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { DeleteDirectiveModule } from '../../../directives/admin/delete.directive.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListOrderComponent
  ],
  imports: [
    CommonModule,
    CommonModule,MatSidenavModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    DialogModule,
    FileUploadModule,
    DeleteDirectiveModule,
    RouterModule.forChild([
      {path : "", component:ListOrderComponent}
    ])
  ]
})
export class ListOrderModule { }
