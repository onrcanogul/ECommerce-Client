import { ListProductImage } from "./list_product_image";

export class ListProduct {
    id:string;
    name:string;
    stock:number;
    price:number;
    createdDate:Date;
    updatedDate:Date;
    productImageFiles:ListProductImage[];
    path:string
}

// p.Id,
// p.Name,
// p.Stock,
// p.Price,
// p.CreatedDate,
// p.UpdatedDate