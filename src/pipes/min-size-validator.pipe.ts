import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { min } from "class-validator";

@Injectable()
export class MinSizeValidatorPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const minSize = 10000

        if(value.size < minSize) {
            throw new Error(`El tamaño del archivo es demasiado pequeño. El tamaño mínimo permitido es ${minSize} bytes.`);
        }
        return value;
    }
    
}