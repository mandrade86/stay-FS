import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

<<<<<<< Updated upstream
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './entities/product.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
=======
import { Product, ProductSchema } from './entities/product.entity';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
>>>>>>> Stashed changes
