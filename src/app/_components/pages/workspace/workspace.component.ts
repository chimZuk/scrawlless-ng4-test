import { Component, OnInit, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import * as interact from 'interactjs';

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

  sheetDrag: any;
  sheetDragEnabled = true;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.cover.nativeElement.style.width = String(this.vh * 0.8) + 'px';
    this.cover.nativeElement.style.height = String(this.vh) + 'px';
  }

  getArr = function (i) {
    return new Array(i);
  }

  dragSwitch = function () {
    if (this.sheetDragEnabled) {
      this.sheetDrag[0].disable();
      this.sheetDragEnabled = false;
    } else {
      this.sheetDrag[0].enable();
      this.sheetDragEnabled = true;
    }
  }

  /*zoom = function (x) {
    TweenLite.to("#container", 0.2, { zoom: x });
    this.value = x;
  }*/

  @ViewChild('cover') cover: ElementRef;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    var scale = 1;
    var cover = this.cover.nativeElement;
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;

    cover.style.width = String(this.vh * 0.8) + 'px';
    cover.style.height = String(this.vh) + 'px';

    // target elements with the "draggable" class
    interact('.draggable')
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
          console.log("Drag ended");
        }
      });

    function dragMoveListener(event) {
      var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }


    interact("#container")
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

          //dragMoveListener(event);
        },
        onend: function (event) {
          console.log(cover);

        }
      });

    /*interact('.svg-draggable')
      .draggable({
        inertia: true,
        autoScroll: true,
        onmove: svgDragMoveListener,
        onend: function (event) {
          console.log("Drag ended");
        }
      })
      .gesturable({
        onstart: function (event) {

        },
        onmove: function (event) {
          var isScale = false;
          var target = event.target;
          var currentMatrix;
          var transMatrix = target.getAttributeNS(null, "transform").slice(7, -1).split(' ');
          if (transMatrix[0] <= 4 && transMatrix[0] >= 0.5) {
            isScale = true;
          } else {
            isScale = false;
          }
          scale = scale * (1 + event.ds);
          if (isScale || !isScale && (transMatrix[0] > 4 && scale < 1 || transMatrix[0] < 0.5 && scale > 1)) {
            if (scale > 1.005) {
              scale = 1.005;
            } else {
              if (scale < 0.995) {
                scale = 0.995;
              }
            }
            for (var i = 0; i < transMatrix.length; i++) {
              transMatrix[i] *= scale;
            }            
            target.setAttributeNS(null, "transform", "matrix(" + transMatrix.join(' ') + ")");
            currentMatrix = target.getAttributeNS(null, "transform").slice(7, -1).split(' ');
            for (var i = 0; i < currentMatrix.length; i++) {
              currentMatrix[i] = parseFloat(currentMatrix[i]);
            }
            var width = target.getAttributeNS(null, "width");
            var height = target.getAttributeNS(null, "height");
            currentMatrix[4] += (1 - scale) * width / 6;
            currentMatrix[5] += (1 - scale) * height / 4;
            var newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
            target.setAttributeNS(null, "transform", newMatrix);
          }
          svgDragMoveListener(event);
        },
        onend: function (event) {

        }
      });

    function svgDragMoveListener(event) {
      var target = event.target;
      var currentMatrix;
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      currentMatrix = target.getAttributeNS(null, "transform").slice(7, -1).split(' ');
      for (var i = 0; i < currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
      }

      currentMatrix[4] += x;
      currentMatrix[5] += y;
      var newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
      target.setAttributeNS(null, "transform", newMatrix);
    }*/
    /*Draggable.create(".box1", {
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
    });*/

    /*Draggable.create("#dragSwitch", {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: "workspace",
      throwProps: true
    });

    Draggable.create(".zoomButtons", {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: "workspace",
      throwProps: true
    });*/

    /*Draggable.create("#cover", {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: "#main",
      throwProps: true
    });*/

    /*this.sheetDrag = Draggable.create("#cover", {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: "#container",
      throwProps: true
    });*/

  }

  SX: any;
  SY: any;
  value = 1;

}
