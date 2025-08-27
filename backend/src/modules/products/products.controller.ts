import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './products.service';

// import { AuthService } from './auth.service';
// import {
//   LoginDto,
//   RegisterDto,
//   ChangePasswordDto,
// } from './dto/auth.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  // constructor(private readonly authService: AuthService) {}

  @Get('/all')
  async getProducts() {
    return this.productService.getAll()
  }
  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // async login(@Body() loginDto: LoginDto) {
  //   return this.authService.login(loginDto);
  // }

  // @Post('register')
  // @HttpCode(HttpStatus.CREATED)
  // async register(@Body() registerDto: RegisterDto) {
  //   return this.authService.register(registerDto);
  // }

  // @Get('profile')
  // async getProfile(@Request() req) {
  //   // Simple token validation
  //   const token = req.headers.authorization?.replace('Bearer ', '');
  //   if (!token) {
  //     throw new Error('No token provided');
  //   }
  //   return this.authService.getProfile(token);
  // }

  // @Put('change-password')
  // async changePassword(
  //   @Request() req,
  //   @Body() changePasswordDto: ChangePasswordDto,
  // ) {
  //   const token = req.headers.authorization?.replace('Bearer ', '');
  //   if (!token) {
  //     throw new Error('No token provided');
  //   }
  //   return this.authService.changePassword(token, changePasswordDto);
  // }

  // @Post('refresh')
  // async refreshToken(@Request() req) {
  //   const token = req.headers.authorization?.replace('Bearer ', '');
  //   if (!token) {
  //     throw new Error('No token provided');
  //   }
  //   return this.authService.refreshToken(token);
  // }
}
