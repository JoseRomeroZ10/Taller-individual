import { PaginationDto } from '@/common/dtos/pagination/pagination.dto';
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ProductDiscountService } from './product-discount-entity.service';
import { CreateProductDiscountDto } from './dto/create-productDiscount.dto';
import { UpdateProductDiscountDto } from './dto/update-productDiscount.dto';

@Controller('product-discount-entity')
export class ProductDiscountController {
    constructor(private readonly productDiscountService: ProductDiscountService) { }
  
    @Post()
    create(@Body() createProductDiscountDto: CreateProductDiscountDto) {
      return this.productDiscountService.create(createProductDiscountDto);
    }
  
    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
      return this.productDiscountService.findAll(paginationDto);
    }
  
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.productDiscountService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDiscountDto: UpdateProductDiscountDto) {
      return this.productDiscountService.update(id, updateProductDiscountDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.productDiscountService.remove(id);
    }
  }
  
