import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class BaseHrefModule {
  public base: string = "https://scrawlless.com/";
  public socketbase: string = "https://scrawlless.com";

}



