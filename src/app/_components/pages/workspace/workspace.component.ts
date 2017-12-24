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

  vw: any;
  vh: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
  }

  getArr = function (i) {
    return new Array(i);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });


    this.vw = window.innerWidth;
    this.vh = window.innerHeight;


    Draggable.create(".box1", {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: ".container1",
      throwProps: true
    });

    Draggable.create(".box2", {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: ".container2",
      throwProps: true
    });

    Draggable.create(".box3", {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: ".container3",
      throwProps: true
    });

    Draggable.create(".box4", {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: ".container4",
      throwProps: true
    });

  }

}
