import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

<<<<<<< Updated upstream
export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
}

export enum SubscriptionFrequency {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ type: String, enum: SubscriptionFrequency, default: SubscriptionFrequency.MONTHLY })
  frequency: SubscriptionFrequency;

  @Prop({ type: String, enum: SubscriptionStatus, default: SubscriptionStatus.ACTIVE })
  status: SubscriptionStatus;

  @Prop({ required: true })
  nextDeliveryDate: Date;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ required: true, min: 0 })
  totalPrice: number;

  @Prop({ maxlength: 500 })
  notes: string;

  createdAt: Date;
  updatedAt: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
=======
export type SubscriptionDocument = Subscription & Document

@Schema({ timestamps: true})
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  productId: number
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription)
>>>>>>> Stashed changes
