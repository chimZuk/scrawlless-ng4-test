import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class BaseHrefModule {
  public base: string = "http://scrawlless.me/";
  public socketbase: string = "http://scrawlless.me";
}