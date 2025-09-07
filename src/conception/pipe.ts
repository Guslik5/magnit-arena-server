import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";


//можно навешивать для проверки параметров
@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
    transform(value: string): number {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new BadRequestException(`Validation failed ${val}`);
        }
        return val;
    }
}