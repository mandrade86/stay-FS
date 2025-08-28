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
    MongooseModule.forRoot('mongodb://mongodb:27017/subscription_db'),

    // JWT configuration
    JwtModule.register({
      secret: '123456789abcdef',
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
