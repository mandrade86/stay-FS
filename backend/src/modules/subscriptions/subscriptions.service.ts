import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Subscription, SubscriptionStatus, SubscriptionFrequency, SubscriptionDocument } from './entities/subscription.entity';
import { Product, ProductDocument } from '../products/entities/product.entity';
import { User, UserDocument } from '../users/entities/user.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createSubscriptionDto: Partial<Subscription>): Promise<Subscription> {
    // Validate user exists
    const user = await this.userModel.findById(createSubscriptionDto.userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate product exists and is available
    const product = await this.productModel.findById(createSubscriptionDto.productId).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (!product.isAvailable || product.stock < createSubscriptionDto.quantity) {
      throw new BadRequestException('Product not available or insufficient stock');
    }

    // Calculate next delivery date
    const nextDeliveryDate = this.calculateNextDeliveryDate(
      new Date(),
      createSubscriptionDto.frequency
    );

    // Calculate total price
    const totalPrice = product.price * createSubscriptionDto.quantity;

    const subscription = new this.subscriptionModel({
      ...createSubscriptionDto,
      nextDeliveryDate,
      totalPrice,
      startDate: new Date(),
    });

    return subscription.save();
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionModel
      .find()
      .populate('userId', 'fullName email')
      .populate('productId', 'name price category')
      .exec();
  }

  async findById(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionModel
      .findById(id)
      .populate('userId', 'fullName email')
      .populate('productId', 'name price category')
      .exec();

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    return this.subscriptionModel
      .find({ userId })
      .populate('productId', 'name price category')
      .exec();
  }

  async findByStatus(status: SubscriptionStatus): Promise<Subscription[]> {
    return this.subscriptionModel
      .find({ status })
      .populate('userId', 'fullName email')
      .populate('productId', 'name price category')
      .exec();
  }

  async update(id: string, updateSubscriptionDto: Partial<Subscription>): Promise<Subscription> {
    const subscription = await this.subscriptionModel.findByIdAndUpdate(
      id,
      updateSubscriptionDto,
      { new: true, runValidators: true }
    ).exec();

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async pause(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionModel.findByIdAndUpdate(
      id,
      { status: SubscriptionStatus.PAUSED },
      { new: true }
    ).exec();

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async resume(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionModel.findByIdAndUpdate(
      id,
      { status: SubscriptionStatus.ACTIVE },
      { new: true }
    ).exec();

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async cancel(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionModel.findByIdAndUpdate(
      id,
      { 
        status: SubscriptionStatus.CANCELLED,
        endDate: new Date()
      },
      { new: true }
    ).exec();

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async remove(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionModel.findByIdAndDelete(id).exec();

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async getUpcomingDeliveries(): Promise<Subscription[]> {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return this.subscriptionModel
      .find({
        status: SubscriptionStatus.ACTIVE,
        nextDeliveryDate: { $gte: today, $lte: nextWeek }
      })
      .populate('userId', 'fullName email')
      .populate('productId', 'name price category')
      .exec();
  }

  async getSubscriptionStats() {
    const totalSubscriptions = await this.subscriptionModel.countDocuments();
    const activeSubscriptions = await this.subscriptionModel.countDocuments({ status: SubscriptionStatus.ACTIVE });
    const pausedSubscriptions = await this.subscriptionModel.countDocuments({ status: SubscriptionStatus.PAUSED });
    const cancelledSubscriptions = await this.subscriptionModel.countDocuments({ status: SubscriptionStatus.CANCELLED });

    const frequencyStats = await this.subscriptionModel.aggregate([
      { $group: { _id: '$frequency', count: { $sum: 1 } } }
    ]);

    return {
      total: totalSubscriptions,
      active: activeSubscriptions,
      paused: pausedSubscriptions,
      cancelled: cancelledSubscriptions,
      frequencyStats,
    };
  }

  private calculateNextDeliveryDate(startDate: Date, frequency: SubscriptionFrequency): Date {
    const nextDate = new Date(startDate);
    
    switch (frequency) {
      case SubscriptionFrequency.WEEKLY:
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case SubscriptionFrequency.MONTHLY:
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case SubscriptionFrequency.QUARTERLY:
        nextDate.setMonth(nextDate.getMonth() + 3);
        break;
      case SubscriptionFrequency.YEARLY:
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
      default:
        nextDate.setMonth(nextDate.getMonth() + 1);
    }
    
    return nextDate;
  }
}
