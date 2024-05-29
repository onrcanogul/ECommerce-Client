import { AfterViewInit, Component, ErrorHandler, Inject, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { ListProduct } from '../../../../contracts/list_product';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../../../services/common/models/basket.service';
import { BaseComponent, spinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';
import { CategoryService } from '../../../../services/common/models/category.service';
import { ListCategory } from '../../../../contracts/category/list-category';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent implements OnInit{
  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute, 
    @Inject("azureStorage") public azureStorage:string,
    private basketService:BasketService,
    spinner:NgxSpinnerService,
    private toastr:CustomToastrService,
    private categoryService:CategoryService
  ){
    super(spinner)
  }
  categoryId:string;
  totalPageCount:number;
  totalProductsCount:number;
  currentPageNo:number;
  pageSize:number = 12;
  pageList:number[] = [];
  filterState:boolean;
  
  products : ListProduct[];
  async ngOnInit() {
    this.showSpinner(spinnerType.BallClipRotatePulse);
    await this.getProducts();
    await this.getCategories();
    
    
  }
  activeCategory
  categories : ListCategory;
  categorySelected : boolean = false;
  async getCategories(){
    this.categories = await this.categoryService.get(-1,-1)
    this.categorySelected = true;
  }


  async getProducts(){
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      this.categoryId = params["categoryId"]

      let data : {totalCount: number; products: ListProduct[] };
      if(this.categoryId)
      {
        debugger;
        data  = await this.productService.getProductByCategory(this.currentPageNo-1,this.pageSize,this.categoryId,() => {});
      }
      else
      {
        data  = await this.productService.read(this.currentPageNo-1,this.pageSize,() => {},(error) => {})
      }
      debugger;
      this.products = data.products;        
      this.products.forEach(p => {
      if(p.productImageFiles.length>0)
      {
          p.productImageFiles.forEach(image => {
            if(image.showCase == true)
              p.path = image.path;
          })
      }    
        });     
        this.totalProductsCount = data.totalCount;
        this.totalPageCount = Math.ceil(data.totalCount / this.pageSize);        
        this.pageList = [];
        if(this.currentPageNo - 3 <= 0)
          for(let i = 1 ; i <= 7 ; i++) {
            if(i > this.totalPageCount)           
              break;      
        this.pageList.push(i);}
        else if(this.currentPageNo + 3 >= this.totalPageCount && this.totalPageCount > this.currentPageNo)
          for(let i = this.totalPageCount-6 ; i <= this.totalPageCount ; i++) this.pageList.push(i);
        else 
          for(let i = this.currentPageNo - 3 ; i <= this.currentPageNo + 3 ; i++) this.pageList.push(i);
    });
    

  }

  async addToBasket(product:ListProduct) {
    this.showSpinner(spinnerType.BallClipRotatePulse)
    await this.basketService.add(
    {
      productId : product.id,
      quantity : 1
    });
    this.hideSpinner(spinnerType.BallClipRotatePulse);
    this.toastr.message("Product added to cart" , "Successful" , {messageType:ToastrMessageType.Success, position:ToastrPosition.TopRight})

  }

  async filter(max:string, min:string){
    this.activatedRoute.params.subscribe(async params => {
      this.categoryId = params["categoryId"];     
    })
    debugger;
    const filterMax = parseInt(max);
    const filterMin = parseInt(min);
    const data = await this.productService.getProductWithPriceFilter(this.currentPageNo-1,this.pageSize,filterMax,filterMin,this.categoryId?this.categoryId:"",() => {
      this.toastr.message("Filter Applied","Filter",{
        messageType : ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })
    })
    this.products = data.products
    this.totalProductsCount = data.totalCount;

    this.products.forEach(p => {
      if(p.productImageFiles.length>0)
      {
        p.productImageFiles.forEach(image => {
          if (image.showCase == true)
            p.path = image.path;
        })
      }    
    }); 
  }

  openFilter(){
    this.filterState = !this.filterState
  }


  async removeFilter() {
    await this.getProducts();
  }

  

}

