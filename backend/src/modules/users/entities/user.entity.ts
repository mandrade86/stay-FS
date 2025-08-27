import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
<<<<<<< Updated upstream
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, maxlength: 100 })
  fullName: string;

  @Prop({ required: true, unique: true, maxlength: 255 })
  email: string;

  @Prop({ required: true, maxlength: 255 })
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ default: true })
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;

  // Methods
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hook to hash password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
=======
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
>>>>>>> Stashed changes
