import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';

import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
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

  rectangle: any = {
    x: 20,
    y: 20,
    width: 50,
    height: 50,
    fill: "red"
  }

  wHeight: any;
  wWidth: any;



  transMatrix = [1, 0, 0, 1, 0, 0];

  @ViewChild('mapmatrix') el: ElementRef;

  zoom(scale) {
    for (var i = 0; i < this.transMatrix.length; i++) {
      this.transMatrix[i] *= scale;
    }

    console.log(this.el);

    this.transMatrix[4] += (1 - scale) * this.el.nativeElement.attributes.width.value / 2;
    this.transMatrix[5] += (1 - scale) * this.el.nativeElement.attributes.height.value / 2;

    var newMatrix = "matrix(" + this.transMatrix.join(' ') + ")";
    this.el.nativeElement.attributes.transform.value = newMatrix;
  }

  pan(dx, dy) {
    this.transMatrix[4] += dx;
    this.transMatrix[5] += dy;

    var newMatrix = "matrix(" + this.transMatrix.join(' ') + ")";
    this.el.nativeElement.attributes.transform.value = newMatrix;
  }

  dragover() {
    alert('drag');
  }


  selectElement(ev) {
    this.selectedElement = this.el;
    this.currentX = ev.clientX;
    this.currentY = ev.clientY;
    this.currentMatrix = this.transMatrix;

    for (var i = 0; i < this.currentMatrix.length; i++) {
      this.currentMatrix[i] = parseFloat(this.currentMatrix[i]);
    }

    this.el.nativeElement.setAttributeNS(null, "mousemove", "moveElement(evt)");
  }

  moveElement(ev) {
    if (this.selectedElement) {
      var dx = ev.clientX - this.currentX;
      var dy = ev.clientY - this.currentY;
      this.currentMatrix[4] += dx;
      this.currentMatrix[5] += dy;
      var newMatrix = "matrix(" + this.currentMatrix.join(' ') + ")";
      this.el.nativeElement.attributes.transform.value = newMatrix;
      this.currentX = ev.clientX;
      this.currentY = ev.clientY;
    }

  }


  deselectElement() {
    this.selectedElement = 0;
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
    this.wHeight = window.innerHeight;
    this.wWidth = window.innerWidth;
  }

}
