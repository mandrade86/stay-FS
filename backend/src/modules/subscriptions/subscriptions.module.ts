import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

<<<<<<< Updated upstream
import { SubscriptionsService } from './subscriptions.service';
import { Subscription, SubscriptionSchema } from './entities/subscription.entity';
import { Product, ProductSchema } from '../products/entities/product.entity';
import { User, UserSchema } from '../users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
=======
import { Subscription, SubscriptionSchema } from './entities/subscription.entity';
import { SubscriptionService } from './subscriptions.service';
import { SubscriptionController } from './subscriptions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
>>>>>>> Stashed changes
