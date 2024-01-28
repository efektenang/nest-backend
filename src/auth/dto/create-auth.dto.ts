import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    createdAt: string
}
