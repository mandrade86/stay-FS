<<<<<<< Updated upstream
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductCategory, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: Partial<Product>): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findByCategory(category: ProductCategory): Promise<Product[]> {
    return this.productModel.find({ category }).exec();
  }

  async findAvailable(): Promise<Product[]> {
    return this.productModel.find({ isAvailable: true, stock: { $gt: 0 } }).exec();
  }

  async update(id: string, updateProductDto: Partial<Product>): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true, runValidators: true }
    ).exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async remove(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(id).exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    if (quantity < 0) {
      throw new BadRequestException('Quantity cannot be negative');
    }

    const product = await this.productModel.findByIdAndUpdate(
      id,
      { stock: quantity },
      { new: true }
    ).exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async toggleAvailability(id: string): Promise<Product> {
    const product = await this.findById(id);
    
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { isAvailable: !product.isAvailable },
      { new: true }
    ).exec();

    return updatedProduct;
  }

  async getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    return this.productModel.find({
      price: { $gte: minPrice, $lte: maxPrice }
    }).exec();
  }

  async searchProducts(query: string): Promise<Product[]> {
    const regex = new RegExp(query, 'i');
    return this.productModel.find({
      $or: [
        { name: regex },
        { description: regex },
        { category: regex }
      ]
    }).exec();
  }

  async getProductStats() {
    const totalProducts = await this.productModel.countDocuments();
    const availableProducts = await this.productModel.countDocuments({ isAvailable: true });
    const outOfStock = await this.productModel.countDocuments({ stock: 0 });

    const categories = await this.productModel.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    return {
      total: totalProducts,
      available: availableProducts,
      unavailable: totalProducts - availableProducts,
      outOfStock,
      categories,
    };
  }
}
=======
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
>>>>>>> Stashed changes
