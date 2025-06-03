import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FirebaseJwtAuthGuard } from '../auth/firebase-jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleName } from '@prisma/client'; // Corrigido para RoleName

@ApiBearerAuth()
@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @UseGuards(FirebaseJwtAuthGuard, RolesGuard)
  @Roles(RoleName.ACADEMY_OWNER) // Corrigido para RoleName
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  @UseGuards(FirebaseJwtAuthGuard, RolesGuard)
  @Roles(RoleName.ACADEMY_OWNER) // Corrigido para RoleName
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  @UseGuards(FirebaseJwtAuthGuard, RolesGuard)
  @Roles(RoleName.ACADEMY_OWNER) // Corrigido para RoleName
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(FirebaseJwtAuthGuard, RolesGuard)
  @Roles(RoleName.ACADEMY_OWNER) // Corrigido para RoleName
  update(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionsService.update(+id, updateSubscriptionDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseJwtAuthGuard, RolesGuard)
  @Roles(RoleName.ACADEMY_OWNER) // Corrigido para RoleName
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(+id);
  }

  @Get('user/:userId')
  @UseGuards(FirebaseJwtAuthGuard, RolesGuard)
  @Roles(RoleName.ACADEMY_OWNER, RoleName.STUDENT) // Corrigido para RoleName
  findByUserId(@Param('userId') userId: string) {
    return this.subscriptionsService.findByUserId(userId);
  }
}
