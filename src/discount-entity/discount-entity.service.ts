import { PaginationDto } from '@/common/dtos/pagination/pagination.dto';
import { ManagerError } from '@/common/errors/manager.error';
import { AllApiResponse } from '@/common/interfaces/response-api.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { DiscountEntity } from './entities/discount.entity';
import { CreateDiscountEntityDto } from './dto/create-DiscountEntity.dto';
import { UpdateDiscountEntityDto } from './dto/update-DiscountEntity.dto';
import { UpdateResult } from 'typeorm/driver/mongodb/typings';

@Injectable()
export class DiscountEntityService {
    discountEntityRepository: any;

    constructor(
        @InjectRepository(DiscountEntity)
        private readonly DiscountEntityRepository: Repository<DiscountEntity>
    ) { }


    async create(createSupplierDto: CreateDiscountEntityDto): Promise<DiscountEntity> {
        try {
            const discountEntity = await this.discountEntityRepository.save(CreateDiscountEntityDto)
            if (!discountEntity) {
                throw new ManagerError({
                    type: 'CONFLICT',
                    message: 'DiscountEntity not created!',
                });
            }
            return discountEntity;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<AllApiResponse<DiscountEntity>> {
        const { limit, page } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const [total, data] = await Promise.all([
                this.DiscountEntityRepository.count({ where: { isActive: true } }),
                this.DiscountEntityRepository.createQueryBuilder('DiscountEntity')
                  .where({ isActive: true })
                  .leftJoinAndSelect('DiscountEntity.products', 'products')
                  .take(limit)
                  .skip(skip)
                  .getMany()
            ])
            const lastPage = Math.ceil(total / limit);

            if (!data) {
                new ManagerError({
                    type: "NOT_FOUND",
                    message: "No hay DiscountEntitys"
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

    async findOne(id: string): Promise<DiscountEntity> {
        try {
            const discountEntity = await this.discountEntityRepository.createQueryBuilder('DiscountEntity')
            .where({ id, isActive: true })
            .leftJoinAndSelect('DiscountEntity.products', 'product')
            .getOne();
            if (!discountEntity) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'DiscountEntity not found',
                });
            }
            return discountEntity;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async update(id: string, updateDiscountEntityDto: UpdateDiscountEntityDto): Promise<UpdateResult> {
        try {
            const discountEntity = await this.discountEntityRepository.update(id, updateDiscountEntityDto)
            if (discountEntity.affected === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'DiscountEntity not found',
                });
            }
            return discountEntity
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async remove(id: string): Promise<UpdateResult> {
        try {
            const discountEntity = await this.discountEntityRepository.update({ id }, { isActive: false })
            if (discountEntity.affected === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'DiscountEntity not found',
                });
            }

            return discountEntity
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }
}