import { Inject, Injectable } from "@nestjs/common";
import { Product, ProductDocument } from "./entities/product.entity";
import { Model } from "mongoose";

const products = [
  {
    name: 'product 1',
    price: 100,
  },
  {
    name: 'product 2',
    price: 200,
  },
  {
    name: 'product 3',
    price: 200,
  },
]

@Injectable()
export class ProductService {
  constructor(
    // @Inject(Product.name)
    // private readonly productModel: Model<ProductDocument>
  ) { }

  getAll(): Product[] {
    return products
    // return await this.productModel.find()
  }
}
