import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscountEntityDto } from './create-DiscountEntity.dto';

export class UpdateDiscountEntityDto extends PartialType(CreateDiscountEntityDto) {}
