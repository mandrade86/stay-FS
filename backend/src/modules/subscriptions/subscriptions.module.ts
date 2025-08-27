import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
