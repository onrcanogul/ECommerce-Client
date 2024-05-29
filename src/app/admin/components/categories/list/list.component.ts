import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import { ProductService } from '../../../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService } from '../../../../services/common/custom-toastr.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListProduct } from '../../../../contracts/list_product';
import { CategoryService } from '../../../../services/common/models/category.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { Category, ListCategory } from '../../../../contracts/category/list-category';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit {
  
  constructor(spinner:NgxSpinnerService,private productService:ProductService, private categoryService:CategoryService ,private dialogService:DialogService ,private toastr:CustomToastrService) {
    super(spinner)
  }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name','edit','delete'];
  dataSource:MatTableDataSource<Category> = null;

  async getCategory()
  {
    this.showSpinner(spinnerType.BallClipRotatePulse)
    const categories : ListCategory = await this.categoryService.get(this.paginator ? this.paginator.pageIndex : 0 ,this.paginator ? this.paginator.pageSize : 5,()=>{this.hideSpinner(spinnerType.BallClipRotatePulse)});
     this.dataSource = new MatTableDataSource<Category>(categories.categories);
     this.paginator.length = categories.totalCount;
  }

  async pageChanged()
  {
    await this.getCategory();
  }

  async ngOnInit() {
    await this.getCategory()
  }


}