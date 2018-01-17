import { Component, OnInit, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';

import * as interact from 'interactjs';

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  brows = function () {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR|Edge\/(\d+)/)
      if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return {
      name: M[0],
      version: M[1]
    };
  }

  absUrl = window.location.href;

  private id;
  sub: any;
  pageName: any;

  vw: any;
  vh: any;

  sheetDrag: any;
  sheetDragEnabled = true;

  selected: any = [];

  isFullscreen = false;

  mode: string = "";

  @ViewChild('container') container: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //this.vw = window.innerWidth;
    //this.vh = window.innerHeight;
  }

  getArr = function (i) {
    return new Array(i);
  }

  select = function (event) {
    if (this.notSaved(this.selected, event.target)) {
      event.target.attributes.class.value = "svgDraggable touch";
      event.target.setAttribute('stroke-width', "3");
      event.target.attributes.r.value = String(Number(event.target.attributes.r.value) + 1);
      this.selected.push(event.target);
      this.container.nativeElement.attributes.class.value = "touch";
    } else {
      if (!this.notSaved(this.selected, event.target)) {
        event.target.attributes.class.value = "";
        event.target.setAttribute('stroke-width', "1");
        event.target.attributes.r.value = String(Number(event.target.attributes.r.value) - 1);
        this.selected.splice(this.selected.indexOf(event.target), 1);
        if (this.selected.length == 0) {
          this.container.nativeElement.attributes.class.value = "";
        }
      }
    }
  }

  notSaved = function (array, element) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return false;
      }
    }
    return true;
  }

  switchMode(mode) {
    if(this.mode === "" || this.mode != "" && this.mode != mode ) {
      this.mode = mode;
    } else {
      this.mode = "";
    }
    
  }

  zoom(scale) {
    this.container.nativeElement.attributes.width.value *= scale;
    this.container.nativeElement.attributes.height.value *= scale;
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.vw = window.innerWidth;
    this.vh = window.innerHeight;

    var container = this.container.nativeElement;
    var selected = this.selected;

    var notSaved = this.notSaved;

    var select = this.select;

    var browser = this.brows();
    interact('.svgDraggable')
      .draggable({
        autoScroll: true,
        onstart: function (event) {

        },
        onmove: dragMoveListener,
        onend: function (event) {
        }
      }).on("tap", function (event) {
        if (browser.name === "Safari") {
          if (!notSaved(selected, event.target)) {
            event.target.attributes.class.value = "";
            event.target.setAttribute('stroke-width', "1");
            event.target.attributes.r.value = String(Number(event.target.attributes.r.value) - 1);
            selected.splice(selected.indexOf(event.target), 1);
            if (selected.length == 0) {
              container.attributes.class.value = "";
            }
          }
        }
      });

    function dragMoveListener(event) {
      var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      var cW = Number(container.attributes.width.value);
      var cH = Number(container.attributes.height.value);
      var cA = container.attributes.viewBox.value.split(' ');

      for (var i = 0; i < selected.length; i++) {
        selected[i].attributes.cx.value = String(Number(selected[i].attributes.cx.value) + Number(x) * (cA[2] / cW));
        selected[i].attributes.cy.value = String(Number(selected[i].attributes.cy.value) + Number(y) * (cA[2] / cH))
      }
    }
  }

  SX: any;
  SY: any;
  value = 1;

}
