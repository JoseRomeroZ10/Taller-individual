import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDiscountDto {
    
    quantity: number

    description?: string


    @IsNotEmpty()
    @IsString()
    product: string

    @IsNotEmpty()
    @IsString()
    discount: string


}
