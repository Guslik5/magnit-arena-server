import {IsString} from "class-validator";

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

export type TNewsUpdateDto = Partial<NewsCreateDto>;