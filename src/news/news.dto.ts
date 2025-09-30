import {IsOptional, IsString, IsUrl} from "class-validator";

export class NewsCreateDto{
    @IsString({
        message: "Имя не строка"
    })
     title: string;

    @IsString({
        message: "Описание не строка"
    })
    description: string;

    @IsString({
        message: "Url фото не строка"
    })
    imgUrl: string;
}

export class NewsUpdateDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    @IsUrl()
    imgUrl?: string;
}

