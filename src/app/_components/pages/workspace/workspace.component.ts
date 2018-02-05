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

  di: any = {
    0: {
      line: 0,
      x: 0,
      pe: 0,
      s: 0,
      value: "",
      text: "",
      type: null
    },
    1: {
      line: 0,
      x: 0,
      pe: 1,
      s: 2,
      value: "-1",
      text: "&#xe90b;&#xe900;",
      type: "digit"
    },
    2: {
      line: 0,
      x: 2,
      pe: 1,
      s: 1,
      value: "+",
      text: "&#xe90a;",
      type: "operator"
    },
    3: {
      line: 0,
      x: 3,
      pe: 1,
      s: 5,
      value: "",
      text: "",
      type: "fraction"
    },
    4: {
      line: 0,
      x: 8,
      pe: 1,
      s: 1,
      value: "+",
      text: "&#xe90a;",
      type: "operator"
    },
    5: {
      line: 0,
      x: 9,
      pe: 1,
      s: 1,
      value: "8",
      text: "&#xe907;",
      type: "digit"
    },
    6: {
      line: 0,
      x: 10,
      pe: 1,
      s: 1,
      value: "",
      text: "",
      type: "fraction"
    },
    7: {
      line: 0,
      x: 0,
      pe: 2,
      s: 1,
      value: "2",
      text: "&#xe901;",
      type: "digit"
    },
    8: {
      line: 0,
      x: 1,
      pe: 2,
      s: 1,
      value: "-",
      text: "&#xe90b;",
      type: "operator"
    },
    9: {
      line: 0,
      x: 2,
      pe: 2,
      s: 3,
      value: "",
      text: "",
      type: "fraction"
    },
    10: {
      line: 0,
      x: 0,
      pe: 4,
      s: 1,
      value: "4",
      text: "&#xe903;",
      type: "digit"
    },
    11: {
      line: 0,
      x: 0,
      pe: 5,
      s: 1,
      value: "5",
      text: "&#xe904;",
      type: "digit"
    },
    12: {
      line: 0,
      x: 1,
      pe: 5,
      s: 1,
      value: "*",
      text: "&#xe90c;",
      type: "operator"
    },
    13: {
      line: 0,
      x: 2,
      pe: 5,
      s: 1,
      value: "",
      text: "",
      type: "fraction"
    },
    14: {
      line: 0,
      x: 0,
      pe: 6,
      s: 1,
      value: "6",
      text: "&#xe905;",
      type: "digit"
    },
    15: {
      line: 0,
      x: 0,
      pe: 7,
      s: 1,
      value: "7",
      text: "&#xe906;",
      type: "digit"
    },
    16: {
      line: 0,
      x: 0,
      pe: 3,
      s: 1,
      value: "3",
      text: "&#xe902;",
      type: "digit"
    },
    17: {
      line: 0,
      x: 0,
      pe: 8,
      s: 1,
      value: "8",
      text: "&#xe907;",
      type: "digit"
    },
    18: {
      line: 0,
      x: 0,
      pe: 9,
      s: 1,
      value: "9",
      text: "&#xe908;",
      type: "digit"
    }
  }

  ex: any = {
    0: {
      line: 0,
      x: 0,
      y: 0,
      b: 0,
      t: -1,
      h: 0,
      pf: 0,
      pe: 0,
      pd: 0,
      ch: 1, zn: 0,
      s: 0
    },
    1: {
      line: 0,
      x: 0,
      y: 0,
      b: 1,
      t: 5,
      h: 8,
      pf: 0,
      pe: 0,
      pd: 0,
      ch: "0", zn: "1",
      s: 11,
      cs: 11
    },
    2: {
      line: 0,
      x: 3,
      y: 0,
      b: 3,
      t: 1,
      h: 6,
      pf: 0,
      pe: 1,
      pd: 3,
      ch: "1", zn: "0",
      s: 5,
      cs: 5
    },
    3: {
      line: 0,
      x: 3,
      y: 6,
      b: 0,
      t: 0,
      h: 2,
      pf: 0,
      pe: 1,
      pd: 3,
      ch: "0", zn: "1",
      s: 5,
      cs: 1
    },
    4: {
      line: 0,
      x: 5,
      y: 0,
      b: 0,
      t: 0,
      h: 2,
      pf: 0,
      pe: 2,
      pd: 9,
      ch: "1", zn: "0",
      s: 3,
      cs: 1
    },
    5: {
      line: 0,
      x: 5,
      y: 2,
      b: 1,
      t: 1,
      h: 4,
      pf: 0,
      pe: 2,
      pd: 9,
      ch: "0", zn: "1",
      s: 3,
      cs: 3
    },
    6: {
      line: 0,
      x: 7,
      y: 2,
      b: 0,
      t: 0,
      h: 2,
      pf: 0,
      pe: 5,
      pd: 13,
      ch: "1", zn: "0",
      s: 1,
      cs: 1
    },
    7: {
      line: 0,
      x: 7,
      y: 4,
      b: 0,
      t: 0,
      h: 2,
      pf: 0,
      pe: 5,
      pd: 13,
      ch: "0", zn: "1",
      s: 1,
      cs: 1
    },
    8: {
      line: 0,
      x: 10,
      y: 4,
      b: 0,
      t: 0,
      h: 2,
      pf: 0,
      pe: 1,
      pd: 6,
      ch: "1", zn: "0",
      s: 1,
      cs: 1
    },
    9: {
      line: 0,
      x: 10,
      y: 6,
      b: 0,
      t: 0,
      h: 2,
      pf: 0,
      pe: 1,
      pd: 6,
      ch: "0", zn: "1",
      s: 1,
      cs: 1
    }
  }

  fr: any = {
    0: {
      pe: "0",
      pd: "0",
      ch: "0",
      zn: "0",
      isActive: 0
    },
    1: {
      pe: "1",
      pd: "3",
      ch: "2",
      zn: "3",
      isActive: 1
    },
    2: {
      pe: "2",
      pd: "9",
      ch: "4",
      zn: "5",
      isActive: 1
    },
    3: {
      pe: "5",
      pd: "13",
      ch: "6",
      zn: "7",
      isActive: 1
    },
    4: {
      pe: "1",
      pd: "6",
      ch: "8",
      zn: "9",
      isActive: 1
    }
  }

  lines: any = [
    {
      id: "0",
      y: 200,
      x: 260,
      fractions: [1, 2, 3, 4],
      expressions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    }
  ]

  elements: any = {
    fractions: [1, 2, 3, 4],
    expressions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
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

  setMargin(exp) {
    //return this.ex[exp].t + this.ex[exp].b / 2 >> 0;
    return 0;
  }

  setAlign(dig) {
    var di = this.di[dig];
    switch (di.type) {
      case "digit": {
        return ((20 * di.s) - (di.s * 13)) / 2;
      }
      case "operator": {
        return ((20 * di.s) - (di.s * 16)) / 2;
      }
      case "fraction": {
        return 0;
      }
      default: {
        break;
      }
    }
    return 0;
  }

  setCursor(ev, element, id) {
    switch (element) {
      case "canvas": {
        this.x = this.setSX(ev.offsetX) - 1.2;
        this.y = Math.round((this.setSY(ev.offsetY)) / 10 + 1) * 10 - 3;
        break;
      }
      case "ex": {
        this.y = this.lines[this.ex[id].line].y + 17.2
          //+ 
          //(this.ex[this.ex[id].pe].y) * this.hc 
          //+ 
          //(this.ex[this.ex[id].pe].t - this.ex[id].h) * this.ex[id].ch * this.hc
          +
          (this.ex[id].y + this.ex[id].t) * this.hc;
        this.x = this.lines[this.ex[id].line].x + this.ex[this.ex[id].pe].x * this.c + this.di[this.ex[id].pd].x * this.c + this.ex[id].cs * this.c + 7;
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
