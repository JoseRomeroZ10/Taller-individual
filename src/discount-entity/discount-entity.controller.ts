import { PaginationDto } from '@/common/dtos/pagination/pagination.dto';
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { DiscountEntityService } from './discount-entity.service';
import { CreateDiscountEntityDto } from './dto/create-DiscountEntity.dto';
import { UpdateDiscountEntityDto } from './dto/update-DiscountEntity.dto';

@Controller('discount-entity')
export class DiscountEntityController {

    constructor( private readonly discountEntity: DiscountEntityService ){}
    
    @Post()
    create( @Body() createSupplierDto: CreateDiscountEntityDto ){
        return this.discountEntity.create(createSupplierDto);
    }

    @Get()
    findAll( @Query() paginationDto: PaginationDto ){
        return this.discountEntity.findAll( paginationDto );
    }

    @Get(':id')
    findOne( @Param('id', ParseUUIDPipe) id: string ){
        return this.discountEntity.findOne(id);
    }

    @Patch(':id')
    update( @Param('id', ParseUUIDPipe) id: string, @Body() updateSupplierDto: UpdateDiscountEntityDto ){
        return this.discountEntity.update(id, updateSupplierDto);
    }
    
    @Delete(':id')
    remove( @Param('id', ParseUUIDPipe) id: string ){
        return this.discountEntity.remove(id);
    }
}



