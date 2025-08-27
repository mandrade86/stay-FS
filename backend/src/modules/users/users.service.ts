import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, { password: 0 }).exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id, { password: 0 }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  // async update(id: string, updateData: Partial<User>): Promise<User> {
  //   const user = await this.findById(id);

  //   // Validate email uniqueness if updating
  //   if (updateData.email && updateData.email !== user.email) {
  //     const existingUser = await this.findByEmail(updateData.email);
  //     if (existingUser) {
  //       throw new BadRequestException('Email already in use');
  //     }
  //   }

  //   const updatedUser = await this.userModel.findByIdAndUpdate(
  //     id,
  //     updateData,
  //     { new: true, runValidators: true }
  //   ).select('-password').exec();

  //   if (!updatedUser) {
  //     throw new NotFoundException('User not found');
  //   }

  //   return updatedUser;
  // }

  // async deactivate(id: string): Promise<User> {
  //   const user = await this.userModel.findByIdAndUpdate(
  //     id,
  //     { isActive: false },
  //     { new: true }
  //   ).select('-password').exec();

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   return user;
  // }

  // async activate(id: string): Promise<User> {
  //   const user = await this.userModel.findByIdAndUpdate(
  //     id,
  //     { isActive: true },
  //     { new: true }
  //   ).select('-password').exec();

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   return user;
  // }

  // async changeRole(id: string, newRole: UserRole): Promise<User> {
  //   const user = await this.userModel.findByIdAndUpdate(
  //     id,
  //     { role: newRole },
  //     { new: true }
  //   ).select('-password').exec();

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   return user;
  // }

  // async getUsersByRole(role: UserRole): Promise<User[]> {
  //   return this.userModel.find({ role }, { password: 0 }).exec();
  // }

  // async getActiveUsers(): Promise<User[]> {
  //   return this.userModel.find({ isActive: true }, { password: 0 }).exec();
  // }

  // async getUserStats() {
  //   const totalUsers = await this.userModel.countDocuments();
  //   const activeUsers = await this.userModel.countDocuments({ isActive: true });
  //   const adminUsers = await this.userModel.countDocuments({ role: UserRole.ADMIN });

  //   return {
  //     total: totalUsers,
  //     active: activeUsers,
  //     inactive: totalUsers - activeUsers,
  //     admins: adminUsers,
  //     regularUsers: totalUsers - adminUsers,
  //   };
  // }
}
