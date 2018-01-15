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

  //@ViewChild('cover') cover: ElementRef;
  @ViewChild('container') container: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //this.vw = window.innerWidth;
    //this.vh = window.innerHeight;
    //this.cover.nativeElement.style.left = String((this.vw / 2) - (this.cover.nativeElement.clientWidth / 2)) + 'px';
    //this.cover.nativeElement.style.top = String((this.vh / 2) - (this.cover.nativeElement.clientHeight / 2)) + 'px';
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
    console.log(this.selected);
  }

  notSaved = function (array, element) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return false;
      }
    }
    return true;
  }

  touched() {

  }

  zoom(scale) {
    this.container.nativeElement.attributes.width.value *= scale;
    this.container.nativeElement.attributes.height.value *= scale;
    //this.cover.nativeElement.style.left = String((this.vw / 2) - (this.cover.nativeElement.clientWidth / 2)) + 'px';
    //this.cover.nativeElement.style.top = String((this.vh / 2) - (this.cover.nativeElement.clientHeight / 2)) + 'px';
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    //this.cover.nativeElement.style.left = String((this.vw / 2) - (this.cover.nativeElement.clientWidth / 2)) + 'px';
    //this.cover.nativeElement.style.top = String((this.vh / 2) - (this.cover.nativeElement.clientHeight / 2)) + 'px';

    /*interact('.draggable')
      .draggable({
        inertia: true,
        restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        autoScroll: true,
        onmove: dragMoveListener,
        onend: function (event) {
        }
      });

    function dragMoveListener(event) {
      var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }*/
    var container = this.container.nativeElement;
    var selected = this.selected;
    console.log(container);
    interact('.svgDraggable')
      .draggable({
        autoScroll: true,
        onstart: function (event) {

        },
        onmove: dragMoveListener,
        onend: function (event) {
        }
      }).on("tap", function(){
        console.log("tap")
      });

    function dragMoveListener(event) {
      var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      //target.style.webkitTransform =
      //target.style.transform =
      //'translate(' + x + 'px, ' + y + 'px)';
      //target
      //;

      for (var i = 0; i < selected.length; i++) {
        selected[i].attributes.cx.value = String(Number(selected[i].attributes.cx.value) + Number(x / 2));
        selected[i].attributes.cy.value = String(Number(selected[i].attributes.cy.value) + Number(y / 2))
      }

      // target.setAttribute('cx', x);
      // target.setAttribute('cy', y);
    }


    /*interact("#container")
      .gesturable({
        onstart: function (event) {
          event.target.classList.add('touch');
          cover.classList.add('touch');
        },
        onmove: function (event) {
          scale = scale * (1 + event.ds);

          cover.style.webkitTransform =
            cover.style.transform =
            'scale(' + scale + ')';
        },
        onend: function (event) {
          console.log(cover);

        }
      });*/
  }

  SX: any;
  SY: any;
  value = 1;

}
