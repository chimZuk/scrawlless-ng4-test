import { Component, OnInit, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { TweenLite } from "gsap";
import * as Draggable from "gsap/Draggable";
import * as CSSPlugin from "gsap/CSSPlugin";

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  private id;
  sub: any;
  pageName: any;

  selectedElement: any;
  currentX = 0;
  currentY = 0;
  currentMatrix: any;

  scaleX = 1;
  scaleY = 1;

  rectangle: any = {
    x: 20,
    y: 20,
    width: 50,
    height: 50,
    fill: "red"
  }

  wHeight: any;
  wWidth: any;
  vHeight: any;

  sek: any = Draggable;

  transMatrix = [1, 0, 0, 1, 0, 0];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.wWidth = window.innerWidth;
    this.wHeight = this.wWidth * 1.30;
    this.vHeight = window.innerHeight;
  }

  @ViewChild('mapmatrix') el: ElementRef;

  zoom(scale) {
    this.scaleX *= scale;
    this.scaleY *= scale;
    TweenLite.to(".draggable", 0.5, { scaleX: this.scaleX, scaleY: this.scaleY });
  }

  getArr = function (i) {
    return new Array(i);
  }

  lineHeight(i) {
    return Number(i) * Number(100)
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.wWidth = window.innerWidth;
    this.wHeight = this.wWidth * 1.30;
    this.vHeight = window.innerHeight;

    Draggable.create(".p-button", {
      bounds: "workspace",
      edgeResistance: 0.65,
      throwProps: true,
      onDragEnd: function () {
        console.log("drag ended");
      },
      onDrag: function () {
        this._eventTarget.attributes.x.value = Number(this._eventTarget.attributes.x.value) + Number(this.deltaX);
      },
      onDragStart: function () {

      }
    });

    /*Draggable.create(".draggable", {
      bounds: "workspace",
      edgeResistance: 0.65,
      throwProps: true,
      onDragEnd: function () {
        console.log("drag ended");
      },
      onDrag: function () {
        this._eventTarget.attributes.x.value = Number(this._eventTarget.attributes.x.value) + Number(this.deltaX);
      },
      onDragStart: function () {

      }
    });*/
  }

}
