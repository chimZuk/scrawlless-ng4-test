import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";

@Pipe({ name: "decapitalize" })
export class DecapitalizePipe implements PipeTransform {
    transform(value: any) {
        if (value) {
            return value.charAt(0).toLowerCase() + value.slice(1);
        } return value;
    }
}