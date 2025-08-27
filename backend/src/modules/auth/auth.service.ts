import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from "bcryptjs";

import { User, UserDocument } from '../users/entities/user.entity';
import { LoginDto, RegisterDto, ChangePasswordDto } from './dto/auth.dto';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    
    if (user && bcrypt.compare(user.password, password)) {
      return user;
    }
    
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Verify passwords match
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      email: registerDto.email,
    }).exec();

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Create new user
    const user = new this.userModel({
      fullName: registerDto.fullName,
      email: registerDto.email,
      password: registerDto.password,
    });

    const savedUser = await user.save();

    // Generate access token
    const payload: JwtPayload = {
      sub: savedUser._id.toString(),
      email: savedUser.email,
      role: savedUser.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: savedUser._id.toString(),
        email: savedUser.email,
        fullName: savedUser.fullName,
        role: savedUser.role,
      },
    };
  }

  // async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
  //   const user = await this.userModel.findById(userId).exec();
    
  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }

  //   // Verify current password
  //   const isCurrentPasswordValid = await user.validatePassword(changePasswordDto.currentPassword);
  //   if (!isCurrentPasswordValid) {
  //     throw new BadRequestException('Current password incorrect');
  //   }

  //   // Verify new passwords match
  //   if (changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword) {
  //     throw new BadRequestException('New passwords do not match');
  //   }

  //   // Update password
  //   user.password = changePasswordDto.newPassword;
  //   await user.save();

  //   return { message: 'Password updated successfully' };
  // }

  // async getProfile(userId: string) {
  //   const user = await this.userModel.findById(userId, { password: 0 }).exec();
    
  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }

  //   return user;
  // }

  // async refreshToken(userId: string) {
  //   const user = await this.userModel.findById(userId).exec();
    
  //   if (!user || !user.isActive) {
  //     throw new UnauthorizedException('Invalid user');
  //   }

  //   const payload: JwtPayload = {
  //     sub: user._id.toString(),
  //     email: user.email,
  //     role: user.role,
  //   };

  //   const accessToken = this.jwtService.sign(payload);

  //   return { accessToken };
  // }
}
