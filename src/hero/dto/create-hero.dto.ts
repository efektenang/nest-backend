import { IsAlpha, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHeroDto {
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    position: string
}