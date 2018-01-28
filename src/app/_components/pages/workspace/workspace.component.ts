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

  x: any = 20;
  y: any = 20;

  sheetDrag: any;
  sheetDragEnabled = true;

  selected: any = [];

  isFullscreen = false;

  mode: string = "";

  num: any = 12.33333333;
  op: any = 16;

  hc: number = 10;
  c: number = 20;

  ex: any = {
    0: {
      line: 0,
      x: 0,
      y: 0,
      b: 0,
      t: 0,
      h: 0,
      pf: 0,
      pe: 0,
      cf: 0,
      ch: 1, zn: 0,
      s: 0,
      value: "",
      text: ""
    },
    1: {
      line: 0,
      x: 1,
      y: 0,
      b: 1,
      t: 5,
      h: 8,
      pf: 0,
      pe: 0,
      cf: 1,
      ch: "0", zn: "1",
      s: 6,
      value: "1",
      text: "&#xe900;"
    },
    2: {
      line: 0,
      x: 2,
      y: 0,
      b: 3,
      t: 1,
      h: 6,
      pf: 1,
      pe: "1",
      ch: "1", zn: "0",
      s: 4,
      value: "2",
      text: "&#xe901;"
    },
    3: {
      line: 0,
      x: 2,
      y: 6,
      b: 0,
      t: 0,
      h: 2,
      pf: "1",
      pe: "1",
      ch: "0", zn: "1",
      s: 1,
      value: "3",
      text: "&#xe902;"
    },
    4: {
      line: 0,
      x: 3,
      y: 0,
      b: 0,
      t: 0,
      h: 2,
      pf: "2",
      pe: "2",
      ch: "1", zn: "0",
      s: 1,
      value: "4",
      text: "&#xe903;"
    },
    5: {
      line: 0,
      x: 3,
      y: 2,
      b: 1,
      t: 1,
      h: 4,
      pf: "2",
      pe: "2",
      ch: "0", zn: "1",
      s: 2,
      value: "5",
      text: "&#xe904;"
    },
    6: {
      line: 0,
      x: 4,
      y: 2,
      b: 0,
      t: 0,
      h: 2,
      pf: "3",
      pe: "5",
      ch: "1", zn: "0",
      s: 1,
      value: "6",
      text: "&#xe905;"
    },
    7: {
      line: 0,
      x: 4,
      y: 4,
      b: 0,
      t: 0,
      h: 2,
      pf: "3",
      pe: "5",
      ch: "0", zn: "1",
      s: 1,
      value: "7",
      text: "&#xe906;"
    },
    8: {
      line: 1,
      x: 1,
      y: 0,
      b: 1,
      t: 1,
      h: 4,
      pf: 0,
      pe: 0,
      ch: "0", zn: "1",
      s: 3,
      value: "8",
      text: "&#xe907;"
    },
    9: {
      line: 1,
      x: 2,
      y: 0,
      b: 0,
      t: 0,
      h: 2,
      pf: 4,
      pe: "8",
      ch: "1", zn: "0",
      s: 1,
      value: "9",
      text: "&#xe908;"
    },
    10: {
      line: 1,
      x: 2,
      y: 6,
      b: 0,
      t: 0,
      h: 2,
      pf: "4",
      pe: "8",
      ch: "0", zn: "1",
      s: 1,
      value: "10",
      text: "&#xe900;&#xe909;"
    }
  }

  /*ex: any = {
    0: {
      x: 0,
      y: 0,
      b: 0,
      t: 0,
      h: 0,
      pf: 0,
      pe: 0,
      cf: 0,
      ch: 1, zn: 0,
      s: 0,
      value: "",
      text: ""
    },
    1: {
      x: 1,
      y: 0,
      b: 1,
      t: 5,
      h: 8,
      pf: 0,
      pe: 0,
      cf: 1,
      ch: "0", zn: "1",
      s: 6,
      value: "",
      text: ""
    },
    2: {
      x: 2,
      y: 0,
      b: 3,
      t: 1,
      h: 6,
      pf: 1,
      pe: "1",
      ch: "1", zn: "0",
      s: 4,
      value: "",
      text: ""
    },
    3: {
      x: 2,
      y: 6,
      b: 0,
      t: 0,
      h: 2,
      pf: "1",
      pe: "1",
      ch: "0", zn: "1",
      s: 1,
      value: "",
      text: ""
    },
    4: {
      x: 3,
      y: 0,
      b: 0,
      t: 0,
      h: 2,
      pf: "2",
      pe: "2",
      ch: "1", zn: "0",
      s: 1,
      value: "",
      text: ""
    },
    5: {
      x: 3,
      y: 2,
      b: 1,
      t: 1,
      h: 4,
      pf: "2",
      pe: "2",
      ch: "0", zn: "1",
      s: 2,
      value: "",
      text: ""
    },
    6: {
      x: 4,
      y: 2,
      b: 0,
      t: 0,
      h: 2,
      pf: "3",
      pe: "5",
      ch: "1", zn: "0",
      s: 1,
      value: "",
      text: ""
    },
    7: {
      x: 4,
      y: 4,
      b: 0,
      t: 0,
      h: 2,
      pf: "3",
      pe: "5",
      ch: "0", zn: "1",
      s: 1,
      value: "",
      text: ""
    },
    8: {
      x: 1,
      y: 0,
      b: 1,
      t: 1,
      h: 4,
      pf: 0,
      pe: 0,
      ch: "0", zn: "1",
      s: 1,
      value: "",
      text: ""
    },
    9: {
      x: 2,
      y: 0,
      b: 0,
      t: 0,
      h: 2,
      pf: 4,
      pe: "8",
      ch: "1", zn: "0",
      s: 1,
      value: "",
      text: ""
    },
    10: {
      x: 2,
      y: 6,
      b: 0,
      t: 0,
      h: 2,
      pf: "4",
      pe: "8",
      ch: "0", zn: "1",
      s: 2,
      value: "",
      text: ""
    }
  }*/

  fr: any = {
    0: {
      x: 0,
      y: 0,
      h: 0,
      pf: 0,
      pe: "0",
      ch: "0",
      zn: "0",
      s: 0,
      isActive: 0
    },
    1: {
      x: 0,
      y: 6,
      h: 6,
      pf: "0",
      pe: "1",
      ch: "2",
      zn: "3",
      s: 5,
      isActive: 1
    },
    2: {
      x: 0,
      y: 2,
      h: 2,
      pf: "1",
      pe: "2",
      ch: "4",
      zn: "5",
      s: 3,
      isActive: 1
    },
    3: {
      x: 0,
      y: 4,
      h: 2,
      pf: "2",
      pe: "5",
      ch: "6",
      zn: "7",
      s: 1,
      isActive: 1
    },
    4: {
      x: 0,
      y: 2,
      h: 2,
      pf: "0",
      pe: "8",
      ch: "9",
      zn: "10",
      s: 2,
      isActive: 1
    }
  }

  lines: any = [
    {
      id: "0",
      y: 157,
      x: 200,
      fractions: [1, 2, 3],
      expressions: [1, 2, 3, 4, 5, 6, 7]
    },
    {
      id: "1",
      y: 337,
      x: 200,
      fractions: [4],
      expressions: [8, 9, 10]
    }
  ]

  elements: any = {
    fractions: [1, 2, 3, 4],
    expressions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

  @ViewChild('container') container: ElementRef;
  @ViewChild('cursor') cursor: ElementRef;
  @ViewChild('list') list: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //this.vw = window.innerWidth;
    //this.vh = window.innerHeight;
  }

  writeFr(lineID, id) {
    var cID = id;
    var eID = id;
    this.ex[eID].t++;
    this.ex[eID].b++;
    while (eID != 0) {
      this.ex[eID].s++;
      this.ex[eID].h += 2;
      if (this.ex[eID].ch == "1") {
        this.ex[this.ex[eID].pe].t += 2;
      } else {
        if (this.ex[eID].zn == "1") {
          this.ex[this.ex[eID].pe].b += 2;
        }
      }
      eID = this.ex[eID].pe;
    }
    var fID = this.ex[id].pf;
    while (fID != 0) {
      this.fr[fID].s++;
      fID = this.fr[fID].pf;
    }

    for (var i = 0; i < this.lines[lineID].fractions.length; i++) {
      var id = this.lines[lineID].fractions[i];
      var fr = this.fr[id];
      if (this.ex[fr.pe].ch == "1") {
        this.fr[id].y = this.fr[fr.pf].y - (this.ex[fr.pe].b + 1);
      } else {
        if (this.ex[fr.pe].zn == "1") {
          this.fr[id].y = this.fr[fr.pf].y + (this.ex[fr.pe].t + 1);
        }
      }

    }

    var newFr = {
      x: this.ex[cID].x,
      y: 0,
      h: 2,
      pf: this.ex[cID].pf,
      pe: cID,
      ch: 0,
      zn: 0,
      s: 1,
      isActive: 1
    }

    if (this.ex[cID].zn == "1") {
      newFr.y = this.fr[this.ex[cID].pf].y + 2;
    } else {
      if (this.ex[cID].ch == "1") {
        newFr.y = this.fr[this.ex[cID].pf].y - 2;
      }
    }
    this.lines[lineID].fractions.push(this.elements.fractions.length + 1);
    this.elements.fractions.push(this.elements.fractions.length);
    this.fr[this.elements.fractions.length] = newFr;
  }

  writeEx(id) {

  }


  write(lineID, exID, t) {
    switch (t) {
      case "fr": {
        this.writeFr(lineID, exID);
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
    if (this.mode === "" || this.mode != "" && this.mode != mode) {
      this.mode = mode;
    } else {
      this.mode = "";
    }
  }

  setExpression(exID, type) {
    switch (type) {
      case "x": {
        return this.lines[this.ex[exID].line].x + this.ex[exID].x + this.ex[this.ex[exID].pe].x * this.c;
      }
      case "y": {
        return (this.lines[this.ex[exID].line].y + this.fr[this.ex[exID].pf].y * this.hc + this.ex[exID].t * this.hc) * this.ex[exID].zn
          +
          (this.lines[this.ex[exID].line].y + this.fr[this.ex[exID].pf].y * this.hc - (this.ex[exID].b + 2) * this.hc) * this.ex[exID].ch;
      }
      default: {
        break;
      }
    }
  }

  setCursor(ev, element, id) {
    switch (element) {
      case "canvas": {
        this.x = this.setSX(ev.offsetX) - 1.2;
        this.y = Math.round((this.setSY(ev.offsetY)) / 10 + 1) * 10 - 3;
        break;
      }
      case "ex": {
        this.y = this.setExpression(id, 'y');
        this.x = this.setExpression(id, 'x') + this.ex[id].s * this.c + 3;
        break;
      }
      default: {
        break;
      }
    }
  }

  zoom(scale) {
    this.container.nativeElement.attributes.width.value *= scale;
    this.container.nativeElement.attributes.height.value *= scale;
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
        selected[i].attributes.cy.value = String(Number(selected[i].attributes.cy.value) + Number(y) * (cA[3] / cH))
      }
    }
  }

  SX: any;
  SY: any;
  value = 1;

}
