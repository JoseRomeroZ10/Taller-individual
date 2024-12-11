import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateDiscountEntityDto {


    @IsNotEmpty()
    @IsString()
    product_id: string

    @IsNotEmpty()
    @IsString()
    discount_name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    percentage: number

    @IsNotEmpty()
    @IsString()
    amount: number

    @IsNotEmpty()
    @IsString()
    startDate: Date

    @IsNotEmpty()
    @IsString()
    endDate: Date

}
