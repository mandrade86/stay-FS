import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubscriptionDocument = Subscription & Document

@Schema({ timestamps: true})
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  productId: number
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription)
