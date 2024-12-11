import { DiscountEntity } from "@/discount-entity/entities/discount.entity";
import { BaseEntity } from "../../common/config/base.entity";
import { ProductEntity } from "../../products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('discount')
export class ProductDiscountEntity extends BaseEntity{
    
    @Column({type: "int"})
    quantity: number

    @Column({type: "varchar"})
    description?: string

    @ManyToOne(() => DiscountEntity, (discount) => discount.PDiscount)
    @JoinColumn({name: "Discount_id"})
    discount: string;

    @ManyToOne(() => ProductEntity, (product) => product.discount)
    @JoinColumn({name: "product_id"})
    products: string;
}
