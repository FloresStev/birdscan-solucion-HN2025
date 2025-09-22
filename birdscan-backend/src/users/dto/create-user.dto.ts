import { Role } from "@prisma/client";
import { IsString, IsNotEmpty, IsOptional, MinLength, IsEnum, IsEmail } from "class-validator";



export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    cellphone_number: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role?: Role;


}
