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
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { SubscriptionService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return await this.subscriptionService.create(createSubscriptionDto)
  }
}
