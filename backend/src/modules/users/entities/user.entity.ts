import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document

@Schema({ timestamps: true})
export class User {
  @Prop({ required: false, })
  _id: string

  @Prop({ required: true, })
  email: string

  @Prop({ required: true, })
  password: string

  @Prop({ required: true, })
  fullName: string

  @Prop({ required: false, })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User)
