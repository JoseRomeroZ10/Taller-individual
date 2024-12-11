import { PaginationDto } from '@/common/dtos/pagination/pagination.dto';
import { ManagerError } from '@/common/errors/manager.error';
import { AllApiResponse } from '@/common/interfaces/response-api.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/driver/mongodb/typings';
import { ProductDiscountEntity } from './entities/productsDiscount.entity';
import { CreateProductDiscountDto } from './dto/create-productDiscount.dto';
import { UpdateProductDiscountDto } from './dto/update-productDiscount.dto';


@Injectable()
export class ProductDiscountService {

    constructor(
        @InjectRepository(ProductDiscountEntity)
        private readonly productDiscountRepository: Repository<ProductDiscountEntity>
    ) { }


    async create(createProductDiscountDto: CreateProductDiscountDto): Promise<ProductDiscountEntity> {
        try {
            const productDiscount = await this.productDiscountRepository.save(createProductDiscountDto)
            if (!productDiscount) {
                throw new ManagerError({
                    type: 'CONFLICT',
                    message: 'ProductDiscount not created!',
                });
            }
            return productDiscount;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<AllApiResponse<ProductDiscountEntity>> {
        const { limit, page } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const [total, data] = await Promise.all([
                this.productDiscountRepository.count({ where: { isActive: true } }),
                this.productDiscountRepository.createQueryBuilder('ProductDiscount')
                  .where({ isActive: true })
                  .leftJoinAndSelect('ProductDiscount.products', 'products')
                  .take(limit)
                  .skip(skip)
                  .getMany()
            ])
            const lastPage = Math.ceil(total / limit);

            if (!data) {
                new ManagerError({
                    type: "NOT_FOUND",
                    message: "No hay ProductDiscounts"
                })
            }

            return {
                meta: {
                    page,
                    limit,
                    lastPage,
                    total,
                },
                data,
            };
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findOne(id: string): Promise<ProductDiscountEntity> {
        try {
            const productDiscount = await this.productDiscountRepository.createQueryBuilder('ProductDiscount')
            .where({ id, isActive: true })
            .leftJoinAndSelect('ProductDiscount.products', 'product')
            .getOne();
            if (!productDiscount) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'ProductDiscount not found',
                });
            }
            return productDiscount;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async update(id: string, updateProductDiscountDto: UpdateProductDiscountDto): Promise<UpdateResult> {
        try {
            const productDiscount = await this.productDiscountRepository.update(id, updateProductDiscountDto)
            if (productDiscount.affected === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'ProductDiscount not found',
                });
            }
            return productDiscount
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async remove(id: string): Promise<UpdateResult> {
        try {
            const productDiscount = await this.productDiscountRepository.update({ id }, { isActive: false })
            if (productDiscount.affected === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'ProductDiscount not found',
                });
            }
            return productDiscount
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }
}