import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirectiveModule } from '../../../directives/admin/delete.directive.module';





@NgModule({
  declarations: [
    RolesComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component:RolesComponent},  
    ]),
    MatSidenavModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatTableModule,
      MatPaginatorModule,
      DeleteDirectiveModule
  ]
})
export class RolesModule { }
