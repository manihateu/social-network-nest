import { IsArray, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsUUID()
    authorId: string;

    @IsString()
    @Length(1, 300)
    content: string
}

export class GetMyPostsDto {
    @IsString()
    @IsUUID()
    authorId: string;
}

export class UpdatePostDto {
    @IsString()
    @IsUUID()
    postId: string;

    @IsString()
    @IsUUID()
    userId: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsArray()
    @IsOptional()
    files?: string[];
}