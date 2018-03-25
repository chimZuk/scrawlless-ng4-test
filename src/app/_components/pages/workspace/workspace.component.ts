import { Component, OnInit, ElementRef, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { AlgebraComponent } from '../../workspace-elements/algebra/algebra.component';

import { Location } from '@angular/common';

import * as interact from 'interactjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { HomeworkDataService } from '../../../_services/homework-data/homework-data.service';

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {
  arrayOfKeys: any = [];
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private algebra: AlgebraComponent,
    private sanitizer: DomSanitizer,
    private data: HomeworkDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.arrayOfKeys = Object.keys(this.lines);
  }

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

  selection: any = {
    line: null,
    ex: null,
    di: null,
    ev: null,
    x: 20,
    y: 20
  }

  mode: string = "";

  lines = this.data.lines;

  elements = this.data.elements;

  @ViewChild('container') container: ElementRef;
  @ViewChild('cursor') cursor: ElementRef;
  @ViewChild('list') list: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {

  }

  writeFr() {
    if (this.selection.line != null) {
      let line = this.selection.line;
      let ex = this.selection.ex;
      let diLength = Object.keys(this.lines[line].di).length;
      let lastDI = {
        pos: 0,
        id: null,
        di: null
      }

      for (var i = 0; i < this.lines[line].ex[ex].cd.length; i++) {
        if (this.lines[line].di[this.lines[line].ex[ex].cd[i]].pos > lastDI.pos) {
          lastDI.pos = this.lines[line].di[this.lines[line].ex[ex].cd[i]].pos;
          lastDI.di = this.lines[line].di[this.lines[line].ex[ex].cd[i]];
          lastDI.id = this.lines[line].ex[ex].cd[i];
        }
      }

      var newDI = {
        line: line,
        pe: ex,
        s: 1,
        pos: this.lines[line].ex[ex].cd.length + 1,
        value: "",
        text: "",
        type: "fraction",
        fr: this.elements.fractions.length + 1
      }

      this.lines[line].di[diLength] = newDI;
      this.lines[line].ex[ex].cd.push(diLength);
      this.elements.digits.push(diLength);

      var newFR = {
        pe: ex,
        pd: this.elements.digits[this.elements.digits.length],
        ch: this.elements.expressions.length + 1,
        zn: this.elements.expressions.length + 2,
        isActive: 1
      }

      var newCh = {
        line: line,
        pe: ex,
        pd: diLength,
        fr: this.elements.fractions.length + 1,
        ch: 1, zn: 0, osn: 0,
        ce: [],
        cd: []
      }

      var newZn = {
        line: line,
        pe: ex,
        pd: diLength,
        fr: this.elements.fractions.length + 1,
        ch: 0, zn: 1, osn: 0,
        ce: [],
        cd: []
      }

      this.lines[line].fr[this.elements.fractions.length + 1] = newFR;
      this.elements.fractions.push(this.elements.fractions.length + 1)

      this.lines[line].ex[this.elements.expressions.length + 1] = newCh;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);

      this.lines[line].ex[this.elements.expressions.length + 1] = newZn;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);

    } else {
      this.createLine();
      let line = this.selection.line;
      let ex = this.selection.ex;
      let diLength = Object.keys(this.lines[line].di).length;
      var newDI = {
        line: line,
        pe: ex,
        s: 1,
        pos: this.lines[line].ex[ex].cd.length + 1,
        value: "",
        text: "",
        type: "fraction",
        fr: this.elements.fractions.length + 1
      }

      this.lines[line].di[diLength] = newDI;
      this.lines[line].ex[ex].cd.push(diLength);
      this.elements.digits.push(diLength);

      var newFR = {
        pe: ex,
        pd: this.elements.digits[this.elements.digits.length],
        ch: this.elements.expressions.length + 1,
        zn: this.elements.expressions.length + 2,
        isActive: 1
      }

      var newCh = {
        line: line,
        pe: ex,
        pd: diLength,
        fr: this.elements.fractions.length + 1,
        ch: 1, zn: 0, osn: 0,
        ce: [],
        cd: []
      }

      var newZn = {
        line: line,
        pe: ex,
        pd: diLength,
        fr: this.elements.fractions.length + 1,
        ch: 0, zn: 1, osn: 0,
        ce: [],
        cd: []
      }

      this.lines[line].fr[this.elements.fractions.length + 1] = newFR;
      this.elements.fractions.push(this.elements.fractions.length + 1)

      this.lines[line].ex[this.elements.expressions.length + 1] = newCh;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);

      this.lines[line].ex[this.elements.expressions.length + 1] = newZn;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);
    }
  }

  writeOp(val) {
    if (this.selection.line != null) {
      let line = this.selection.line;
      let ex = this.selection.ex;
      let diLength = Object.keys(this.lines[line].di).length;
      let lastDI = {
        pos: 0,
        id: null,
        di: null
      }
      let newDI = {
      }
      for (var i = 0; i < this.lines[line].ex[ex].cd.length; i++) {
        if (this.lines[line].di[this.lines[line].ex[ex].cd[i]].pos > lastDI.pos) {
          lastDI.pos = this.lines[line].di[this.lines[line].ex[ex].cd[i]].pos;
          lastDI.di = this.lines[line].di[this.lines[line].ex[ex].cd[i]];
          lastDI.id = this.lines[line].ex[ex].cd[i];
        }
      }

      newDI = {
        line: line,
        pe: ex,
        s: 1,
        pos: this.lines[line].ex[ex].cd.length + 1,
        value: val,
        text: this.getCharacter(val),
        type: "operator"
      }

      this.lines[line].di[diLength] = newDI;
      this.lines[line].ex[ex].cd.push(diLength);
      this.elements.digits.push(diLength);
    } else {
      this.createLine();
      let line = this.selection.line;
      let ex = this.selection.ex;
      let diLength = Object.keys(this.lines[line].di).length;
      var newDI = {
        line: line,
        pe: ex,
        s: 1,
        pos: this.lines[line].ex[ex].cd.length + 1,
        value: val,
        text: this.getCharacter(val),
        type: "operator"
      }
      this.lines[line].di[diLength] = newDI;
      this.lines[line].ex[ex].cd.push(diLength);
      this.elements.digits.push(diLength);
    }
  }

  getCharacter(val) {
    switch (val) {
      case 1:
        return "&#xe900;";
      case 2:
        return "&#xe901;";
      case 3:
        return "&#xe902;";
      case 4:
        return "&#xe903;";
      case 5:
        return "&#xe904;";
      case 6:
        return "&#xe905;";
      case 7:
        return "&#xe906;";
      case 8:
        return "&#xe907;";
      case 9:
        return "&#xe908;";
      case 0:
        return "&#xe909;";
      case "+":
        return "&#xe90a;";
      case "-":
        return "&#xe90b;";
      case "*":
        return "&#xe90c;";
      case "/":
        return "&#xe90d;";
      case "=":
        return "&#xe90e;";
      default:
        break;
    }
  }


  writeDi(val) {
    if (this.selection.line != null) {
      let line = this.selection.line;
      let ex = this.selection.ex;
      let diLength = Object.keys(this.lines[line].di).length;
      let lastDI = {
        pos: 0,
        id: null,
        di: null
      }
      let newDI = {
      }
      for (var i = 0; i < this.lines[line].ex[ex].cd.length; i++) {
        if (this.lines[line].di[this.lines[line].ex[ex].cd[i]].pos > lastDI.pos) {
          lastDI.pos = this.lines[line].di[this.lines[line].ex[ex].cd[i]].pos;
          lastDI.di = this.lines[line].di[this.lines[line].ex[ex].cd[i]];
          lastDI.id = this.lines[line].ex[ex].cd[i];
        }
      }
      if (lastDI.di == null || lastDI.di.type == "operator") {
        newDI = {
          line: line,
          pe: ex,
          s: 1,
          pos: this.lines[line].ex[ex].cd.length + 1,
          value: val,
          text: this.getCharacter(val),
          type: "digit"
        }
        this.lines[line].di[diLength] = newDI;
        this.lines[line].ex[ex].cd.push(diLength);
        this.elements.digits.push(diLength);
      } else {
        if (lastDI.di.type == "digit") {
          lastDI.di.s += 0.73;
          lastDI.di.val += val;
          lastDI.di.text += this.getCharacter(val);
          this.lines[line].di[lastDI.id] = lastDI.di;
        }
      }
    } else {
      this.createLine();
      let line = this.selection.line;
      let ex = this.selection.ex;
      let diLength = Object.keys(this.lines[line].di).length;
      var newDI = {
        line: line,
        pe: ex,
        s: 1,
        pos: this.lines[line].ex[ex].cd.length + 1,
        value: val,
        text: this.getCharacter(val),
        type: "digit"
      }
      this.lines[line].di[diLength] = newDI;
      this.lines[line].ex[ex].cd.push(diLength);
      this.elements.digits.push(diLength);
    }
  }

  createLine() {
    var newLine = {
      id: this.elements.lines.length,
      y: (this.selection.y / 10 >> 0) * 10 - 10,
      x: (this.selection.x / 20 >> 0) * 20,
      fr: {},
      ex: {
        0: {
          line: this.elements.lines.length,
          pe: 0,
          pd: 0,
          fr: 0,
          ch: 1, zn: 0, osn: 0,
          ce: [],
          cd: []
        }
      },
      di: {}
    }

    var newEx = {
      line: this.elements.lines.length,
      pe: 0,
      pd: 0,
      fr: 0,
      ch: 0, zn: 0, osn: 1,
      ce: [],
      cd: []
    }

    this.selection.line = this.elements.lines.length;
    this.selection.ex = this.elements.expressions.length + 1;

    newLine.ex[this.elements.expressions.length + 1] = newEx;
    newLine.ex[0].ce.push(this.elements.expressions.length + 1);
    this.elements.expressions.push(this.elements.expressions.length + 1);

    this.lines[this.elements.lines.length] = newLine;
    this.elements.lines.push(this.elements.lines.length);
  }

  getExpression(el) {
    let ex = this.algebra.getExpression(el);
    if (this.selection.ex != null) {
      this.onClick({
        target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
      });
    }
    return ex;
  }


  write(val, t) {
    switch (t) {
      case "fr": {
        this.writeFr();
        break;
      }
      case "di": {
        this.writeDi(val);
        break;
      }
      case "op": {
        this.writeOp(val);
        break;
      }
      default: {
        break;
      }
    }
  }

  getArr = function (i) {
    return new Array(i);
  }

  switchMode(mode) {
    if (this.mode === "" || this.mode != "" && this.mode != mode) {
      this.mode = mode;
    } else {
      this.mode = "";
    }
  }

  setCursor(ev, element, id) {
    switch (element) {
      case "canvas": {
        this.selection.x = this.setSX(ev.offsetX) - 1.2;
        this.selection.y = Math.round((this.setSY(ev.offsetY)) / 10 + 1) * 10 - 3;
        this.selection.line = null;
        this.selection.ex = null;
        this.selection.di = null;
        break;
      }
      default: {
        break;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  public onClick(ev) {
    if (ev.target != undefined) {
      switch (ev.target.getAttribute("data-type")) {
        case "ex": {
          let line = Number(ev.target.getAttribute("data-lineid"));
          let ex = Number(ev.target.getAttribute("data-expressionid"));
          let pd = this.lines[line].ex[ex].pd;
          let top = Number(ev.target.getAttribute("data-top"));
          let x = this.algebra.elX(ev.target);
          let y = this.algebra.elY(ev.target);
          let cs = Number(ev.target.getAttribute("data-cs"));

          this.selection.x = x + cs * 20 + 6;
          this.selection.y = y + top * 10 + 16.8;
          this.selection.line = line;
          this.selection.ex = ex;
          this.selection.di = pd;
          this.mode = "math";
          break;
        }
        default: {
          break;
        }
      }
    }

  }

  setSX(n) {
    var cW = Number(this.container.nativeElement.attributes.width.value);
    var cA = this.container.nativeElement.attributes.viewBox.value.split(' ');
    return n * (cA[2] / cW);
  }

  setSY(n) {
    var cH = Number(this.container.nativeElement.attributes.height.value);
    var cA = this.container.nativeElement.attributes.viewBox.value.split(' ');
    return n * (cA[3] / cH);
  }

  zoom(scale) {
    this.container.nativeElement.attributes.width.value *= scale;
    this.container.nativeElement.attributes.height.value *= scale;
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


    interact('.drag-handler')
      .draggable({
        autoScroll: true,
        onstart: function (event) {

        },
        onmove: expressionDrag,
        onend: function (event) {
        }
      });

    function expressionDrag(event) {

    }

    function dragMoveListener(event) {
      var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      var cW = Number(container.attributes.width.value);
      var cH = Number(container.attributes.height.value);
      var cA = container.attributes.viewBox.value.split(' ');

      for (var i = 0; i < selected.length; i++) {
        selected[i].attributes.cx.value = String(Number(selected[i].attributes.cx.value) + Number(x) * (cA[2] / cW));
        selected[i].attributes.cy.value = String(Number(selected[i].attributes.cy.value) + Number(y) * (cA[3] / cH))
      }
    }
  }

  SX: any;
  SY: any;
  value = 1;

}
