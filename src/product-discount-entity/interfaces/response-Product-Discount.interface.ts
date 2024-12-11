import { ProductDiscountEntity } from "../entities/productsDiscount.entity";

export interface ResponseAllDiscountEntity {
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: ProductDiscountEntity[];
}