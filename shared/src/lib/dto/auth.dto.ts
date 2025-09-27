import { IsEmail, IsJWT, IsOptional, IsString, Length } from 'class-validator'

export class registerDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(6)
    password:   string;

    @IsString()
    firstName:  string;

    @IsString()
    lastName:   string;

    @IsString()
    @IsOptional()
    patronumyc: string;
}

export class loginDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password:   string;
}

export class refreshTokenDto {
    @IsString()
    userId: string;

    @IsString()
    @IsJWT()
    token:  string;
}