import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
<<<<<<< Updated upstream
import { Document, Types } from 'mongoose';

export enum ProductCategory {
  ELECTRONICS = 'electronics',
  CLOTHING = 'clothing',
  FOOD = 'food',
  BOOKS = 'books',
  OTHER = 'other',
}

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  _id: Types.ObjectId;

  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ maxlength: 500 })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ type: String, enum: ProductCategory, default: ProductCategory.OTHER })
  category: ProductCategory;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ default: 0, min: 0 })
  stock: number;

  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
=======
import { Document } from 'mongoose';

export type ProductDocument = Product & Document

@Schema({ timestamps: true})
export class Product {
  @Prop({ required: true, })
  name: string

  @Prop({ required: true, })
  price: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)
>>>>>>> Stashed changes
