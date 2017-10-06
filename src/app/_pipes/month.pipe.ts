import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";

@Pipe({ name: "month" })
export class MonthPipe implements PipeTransform {
    transform(value: any) {
        if (value) {
            if(value.charAt(value.length - 1) == 'ь' || value.charAt(value.length - 1) == 'й'){
                return value.substring(0, value.length - 1) + 'я'
            } else {
                if((value.charAt(value.length - 1) == 'т')){
                    return value + 'а'
                } else {
                    return value;
                }                
            }            
        } return value;
    }
}