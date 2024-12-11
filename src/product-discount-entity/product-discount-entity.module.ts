import { Module } from '@nestjs/common';
import { ProductDiscountController } from './product-discount-entity.controller';
import { ProductDiscountService } from './product-discount-entity.service';


@Module({
  controllers: [ProductDiscountController],
  providers: [ProductDiscountService]
})
export class ProductDiscountEntityModule {}
