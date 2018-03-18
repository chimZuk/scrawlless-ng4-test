import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHTML' })

export class SafeHTML implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(style) {
        return this.sanitizer.bypassSecurityTrustHtml(style);
    }
}