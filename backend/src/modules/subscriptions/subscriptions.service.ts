import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Subscription, SubscriptionDocument } from "./entities/subscription.entity";
import { CreateSubscriptionDto } from "./dtos/create-subscription.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>
  ) { }

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const subscriptionToCreate = new this.subscriptionModel(createSubscriptionDto)
    return subscriptionToCreate.save()
  }
}
