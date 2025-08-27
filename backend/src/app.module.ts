<<<<<<< Updated upstream
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';

@Module({
  imports: [
    // MongoDB configuration
    MongooseModule.forRoot('mongodb://localhost:27017/subscription_db'),

    // JWT configuration
    JwtModule.register({
      secret: 'secret-key',
      signOptions: { expiresIn: '1h' },
    }),

    // Application modules
    AuthModule,
    UsersModule,
    ProductsModule,
    SubscriptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
=======
import { Module } from "@nestjs/common";
import { ProductModule } from "./modules/products/products.module";
import { SubscriptionModule } from "./modules/subscriptions/subscriptions.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./modules/users/users.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/subscription_db'),
    JwtModule.register({
      global: true,
      secret: 'process.env.JWT_SECRET!',
      signOptions: { expiresIn: '4h' },
    }),
    ProductModule, 
    SubscriptionModule, 
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
>>>>>>> Stashed changes
