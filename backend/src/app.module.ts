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
