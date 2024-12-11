import { Module } from '@nestjs/common';
import { DiscountEntityController } from './discount-entity.controller';
import { DiscountEntityService } from './discount-entity.service';

@Module({
  controllers: [DiscountEntityController],
  providers: [DiscountEntityService]
})
export class DiscountEntityModule {}
