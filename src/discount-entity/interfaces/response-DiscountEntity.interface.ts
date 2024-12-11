import { DiscountEntity } from "../entities/discount.entity";

export interface ResponseAllDiscountEntity{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: DiscountEntity[];
}