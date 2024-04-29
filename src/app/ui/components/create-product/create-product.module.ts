import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogModule } from '@angular/cdk/dialog';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { DeleteDirectiveModule } from '../../../directives/admin/delete.directive.module';
import { RouterModule } from '@angular/router';
import { ListComponent } from '../list-product/list.component';



@NgModule({
  declarations: [
    CreateProductComponent,
    ],
  imports: [
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
      {path : "", component:CreateProductComponent}
    ])
  ]
})
export class CreateProductModule { }
