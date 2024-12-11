
import { BaseEntity } from "../../common/config/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ProductDiscountEntity } from "@/product-discount-entity/entities/productsDiscount.entity";


@Entity('Discount')
export class DiscountEntity extends BaseEntity{

    @Column({type: "varchar"})
    status: DiscountEntity 

    
  

    @OneToMany(() => ProductDiscountEntity, (PDiscount) =>  PDiscount.Discount)
    @JoinColumn({name: "discount_id"})
    PDiscount: string;
}
