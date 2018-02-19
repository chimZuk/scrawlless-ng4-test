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

  selection: any = {
    line: null,
    ex: null,
    di: null,
    x: 20,
    y: 20
  }

  mode: string = "";

  num: any = 12.33333333;
  op: any = 16;

  hc: number = 10;
  c: number = 20;


  //Digits defenition
  //---->>>>
  //#region
  di: any = {
    0: {
      line: 0,
      x: 0,
      pos: 0,
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
      pos: 1,
      value: "-1",
      text: "&#xe90b;&#xe900;",
      type: "digit"
    },
    2: {
      line: 0,
      x: 2,
      pe: 1,
      s: 1,
      pos: 2,
      value: "+",
      text: "&#xe90a;",
      type: "operator"
    },
    3: {
      line: 0,
      x: 3,
      pe: 1,
      s: 8,
      pos: 3,
      value: "",
      text: "",
      type: "fraction",
      fr: 1
    },
    4: {
      line: 0,
      x: 11,
      pe: 1,
      s: 1,
      pos: 4,
      value: "+",
      text: "&#xe90a;",
      type: "operator"
    },
    5: {
      line: 0,
      x: 12,
      pe: 1,
      s: 1,
      pos: 5,
      value: "8",
      text: "&#xe907;",
      type: "digit"
    },
    6: {
      line: 0,
      x: 13,
      pe: 1,
      s: 2,
      pos: 6,
      value: "",
      text: "",
      type: "fraction",
      fr: 4
    },
    7: {
      line: 0,
      x: 0,
      pe: 2,
      s: 1,
      pos: 1,
      value: "2",
      text: "&#xe901;",
      type: "digit"
    },
    8: {
      line: 0,
      x: 1,
      pe: 2,
      s: 1,
      pos: 2,
      value: "-",
      text: "&#xe90b;",
      type: "operator"
    },
    9: {
      line: 0,
      x: 2,
      pe: 2,
      s: 5,
      pos: 3,
      value: "",
      text: "",
      type: "fraction",
      fr: 2
    },
    10: {
      line: 0,
      x: 0,
      pe: 4,
      s: 1,
      pos: 1,
      value: "4",
      text: "&#xe903;",
      type: "digit"
    },
    11: {
      line: 0,
      x: 0,
      pe: 5,
      s: 1,
      pos: 1,
      value: "5",
      text: "&#xe904;",
      type: "digit"
    },
    12: {
      line: 0,
      x: 1,
      pe: 5,
      s: 1,
      pos: 2,
      value: "*",
      text: "&#xe90c;",
      type: "operator"
    },
    13: {
      line: 0,
      x: 2,
      pe: 5,
      s: 2,
      pos: 3,
      value: "",
      text: "",
      type: "fraction",
      fr: 3
    },
    14: {
      line: 0,
      x: 0,
      pe: 6,
      s: 1,
      pos: 1,
      value: "6",
      text: "&#xe905;",
      type: "digit"
    },
    15: {
      line: 0,
      x: 0,
      pe: 7,
      s: 1,
      pos: 1,
      value: "7",
      text: "&#xe906;",
      type: "digit"
    },
    16: {
      line: 0,
      x: 0,
      pe: 3,
      s: 1,
      pos: 1,
      value: "3",
      text: "&#xe902;",
      type: "digit"
    },
    17: {
      line: 0,
      x: 0,
      pe: 8,
      s: 1,
      pos: 1,
      value: "8",
      text: "&#xe907;",
      type: "digit"
    },
    18: {
      line: 0,
      x: 0,
      pe: 9,
      s: 1,
      pos: 1,
      value: "9",
      text: "&#xe908;",
      type: "digit"
    }
  }
  //endregion
  //----<<<<


  //Expressions defenition
  //---->>>>
  //#region
  ex: any = {
    0: {
      line: 0,
      x: 0,
      y: 0,
      b: 0,
      t: -1,
      h: 0,
      pe: 0,
      pd: 0,
      fr: 0,
      ch: 1, zn: 0, osn: 0,
      s: 0,
      ce: [1],
      cd: []
    },
    1: {
      line: 0,
      x: 0,
      y: 0,
      b: 1,
      t: 5,
      h: 8,
      pe: 0,
      pd: 0,
      fr: 0,
      ch: 0, zn: 0, osn: 1,
      s: 16,
      cs: 15,
      ce: [2, 3, 8, 9],
      cd: [1, 2, 3, 4, 5, 6]
    },
    2: {
      line: 0,
      x: 3,
      y: 0,
      b: 3,
      t: 1,
      h: 6,
      pe: 1,
      pd: 3,
      fr: 1,
      ch: 1, zn: 0, osn: 0,
      s: 8,
      cs: 7,
      ce: [4, 5],
      cd: [7, 8, 9]
    },
    3: {
      line: 0,
      x: 3,
      y: 6,
      b: 0,
      t: 0,
      h: 2,
      pe: 1,
      pd: 3,
      fr: 1,
      ch: 0, zn: 1, osn: 0,
      s: 8,
      cs: 1,
      ce: [],
      cd: [16]
    },
    4: {
      line: 0,
      x: 5,
      y: 0,
      b: 0,
      t: 0,
      h: 2,
      pe: 2,
      pd: 9,
      fr: 2,
      ch: 1, zn: 0, osn: 0,
      s: 5,
      cs: 1,
      ce: [],
      cd: [10]
    },
    5: {
      line: 0,
      x: 5,
      y: 2,
      b: 1,
      t: 1,
      h: 4,
      pe: 2,
      pd: 9,
      fr: 2,
      ch: 0, zn: 1, osn: 0,
      s: 5,
      cs: 4,
      ce: [6, 7],
      cd: [11, 12, 13]
    },
    6: {
      line: 0,
      x: 7,
      y: 2,
      b: 0,
      t: 0,
      h: 2,
      pe: 5,
      pd: 13,
      fr: 3,
      ch: 1, zn: 0, osn: 0,
      s: 2,
      cs: 1,
      ce: [],
      cd: [14]
    },
    7: {
      line: 0,
      x: 7,
      y: 4,
      b: 0,
      t: 0,
      h: 2,
      pe: 5,
      pd: 13,
      fr: 3,
      ch: 0, zn: 1, osn: 0,
      s: 2,
      cs: 1,
      ce: [],
      cd: [17]
    },
    8: {
      line: 0,
      x: 13,
      y: 4,
      b: 0,
      t: 0,
      h: 2,
      pe: 1,
      pd: 6,
      fr: 4,
      ch: 1, zn: 0, osn: 0,
      s: 2,
      cs: 1,
      ce: [],
      cd: [17]
    },
    9: {
      line: 0,
      x: 13,
      y: 6,
      b: 0,
      t: 0,
      h: 2,
      pe: 1,
      pd: 6,
      fr: 4,
      ch: 0, zn: 1, osn: 0,
      s: 2,
      cs: 1,
      ce: [],
      cd: [18]
    }
  }
  //endregion
  //----<<<<


  //Fractions defenition
  //---->>>>
  //#region
  fr: any = {
    0: {
      pe: 0,
      pd: 0,
      ch: 0,
      zn: 1,
      isActive: 0
    },
    1: {
      pe: 1,
      pd: 3,
      ch: 2,
      zn: 3,
      isActive: 1
    },
    2: {
      pe: 2,
      pd: 9,
      ch: 4,
      zn: 5,
      isActive: 1
    },
    3: {
      pe: 5,
      pd: 13,
      ch: 6,
      zn: 7,
      isActive: 1
    },
    4: {
      pe: 1,
      pd: 6,
      ch: 8,
      zn: 9,
      isActive: 1
    }
  }
  //endregion
  //----<<<<


  lines: any = {
    0: {
      y: 200,
      x: 260,
      fractions: [1, 2, 3, 4],
      expressions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    }
  }

  elements: any = {
    lines: [0],
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

  setChildExpressionY(ch) {
    for (let i = 0; i < ch.length; i++) {
      this.ex[ch[i]].y += 2;
      this.setChildExpressionY(this.ex[ch[i]].ce);
    }
  }

  setChildExpressionS(ch) {
    for (let i = 0; i < ch.length; i++) {
      if (ch != 0) {
        this.ex[ch[i]].s++;
      }
    }
  }

  setChildExpressionX(ch, POS) {
    for (let i = 0; i < ch.length; i++) {
      if (this.di[ch[i]].pos > POS) {
        if (POS > 0) {
          this.di[ch[i]].x++;
        }
        if (this.di[ch[i]].type == "fraction") {
          if (POS > 0) {
            this.ex[this.fr[this.di[ch[i]].fr].ch].x++;
            this.ex[this.fr[this.di[ch[i]].fr].zn].x++;
          }
          this.setChildExpressionX(this.ex[this.fr[this.di[ch[i]].fr].ch].cd, 0);
          this.setChildExpressionX(this.ex[this.fr[this.di[ch[i]].fr].zn].cd, 0);
        }
      }
    }
  }

  writeFr() {
    var exp = this.selection.ex;
    var line = this.selection.line;
    //Add fraction related digit
    //---->>>>
    //#region
    var POS = this.ex[exp].cd.length + 1;
    var di = {
      line: line,
      x: this.ex[exp].cs,
      pe: exp,
      s: 1,
      pos: POS,
      value: "",
      text: "",
      type: "fraction",
      fr: this.elements.fractions.length + 1
    }
    var newDi = this.elements.digits.length + 1;
    this.ex[exp].cd.push(newDi);
    this.elements.digits.push(newDi);
    this.lines[line].digits.push(newDi);
    this.di[newDi] = di;
    //#endregion
    //----<<<<

    //Modify parent expression height
    //---->>>>
    //#region
    var bottomExpression = false;
    if (this.ex[exp].zn == 1 && this.ex[this.ex[exp].pe].b - this.ex[exp].h > 0) {
      bottomExpression = true;
    }
    var heightChanged = false;
    if (this.ex[exp].t == 0) {
      this.ex[exp].h += 2;
      this.ex[exp].t++;
      this.ex[exp].b++;
      heightChanged = true;
    }
    //endregion
    //----<<<<

    //Add new fraction expressions
    //---->>>>
    //#region
    var ch = {
      line: line,
      x: this.ex[exp].x + this.ex[exp].cs,
      y: 0,
      b: 0,
      t: 0,
      h: 2,
      pe: exp,
      pd: newDi,
      fr: 0,
      ch: 1, zn: 0, osn: 0,
      s: 1,
      cs: 0,
      ce: [],
      cd: []
    }
    var zn = {
      line: line,
      x: this.ex[exp].x + this.ex[exp].cs,
      y: 0,
      b: 0,
      t: 0,
      h: 2,
      pe: exp,
      pd: newDi,
      fr: 0,
      ch: 0, zn: 1, osn: 0,
      s: 1,
      cs: 0,
      ce: [],
      cd: []
    }

    var topExpression = false;
    switch (this.ex[exp].ch) {
      case 1: {
        var CID = exp;
        while (CID != 0 && this.ex[CID].zn != 1) {
          if (this.ex[exp].y > this.ex[CID].y) {
            topExpression = true;
          }
          CID = this.ex[CID].pe;
        }
        if (topExpression && heightChanged) {
          ch.y = this.ex[exp].y - 2;
          zn.y = this.ex[exp].y;
          this.ex[exp].y -= 2;
        } else {
          ch.y = this.ex[exp].y;
          zn.y = this.ex[exp].y + 2;
        }
        break;
      }
      case 0: {
        ch.y = this.ex[exp].y;
        zn.y = this.ex[exp].y + 2;
        break;
      }
      default: {
        break;
      }
    }

    var newCH = this.elements.expressions.length + 1;
    this.elements.expressions.push(newCH);
    this.lines[line].expressions.push(newCH);
    this.ex[newCH] = ch;
    this.ex[exp].ce.push(newCH);
    var newZN = this.elements.expressions.length + 1;
    this.elements.expressions.push(newZN);
    this.lines[line].expressions.push(newZN);
    this.ex[newZN] = zn;
    this.ex[exp].ce.push(newZN);

    this.selection.line = this.ex[newCH].line;
    this.selection.ex = newCH;
    this.selection.di = null;
    //#endregion
    //----<<<<

    //Add fraction line
    //---->>>>
    //#region
    var fr = {
      pe: exp,
      pd: newDi,
      ch: newCH,
      zn: newZN,
      isActive: 1
    }
    var newFR = this.elements.fractions.length + 1;
    this.elements.fractions.push(newFR);
    this.lines[line].fractions.push(newFR);
    this.fr[newFR] = fr;
    this.ex[newCH].fr = newFR;
    this.ex[newZN].fr = newFR;
    //#endregion
    //----<<<<

    //Modify parent expression length and content length
    //---->>>>
    //#region
    var lengthChanged = false;
    this.ex[exp].cs++;
    if (this.ex[exp].cs == this.ex[exp].s) {
      this.ex[exp].s++;
      lengthChanged = true;
    }
    //endregion
    //----<<<<

    //Modify all parent expressions height
    //---->>>>
    //#region
    var CID = exp;
    if (heightChanged && !topExpression && !bottomExpression) {
      while (CID != 0) {
        switch (this.ex[CID].ch) {
          case 1: {
            this.ex[this.ex[CID].pe].t += 2;
            this.ex[this.ex[CID].pe].h += 2;
            break;
          }
          case 0: {
            if (this.ex[this.ex[CID].pe].b <= this.ex[CID].h - 3) {
              this.ex[this.ex[CID].pe].b += 2;
              this.ex[this.ex[CID].pe].h += 2;
            }
            break;
          }
          default:
            break;
        }
        var childExpressions = [];
        this.ex[this.ex[CID].pe].ce.forEach(el => {
          childExpressions.push(el);
        });
        var currentExpressionIndex = childExpressions.indexOf(CID);
        childExpressions.splice(currentExpressionIndex, 1);
        if (this.ex[CID].zn == 1) {
          childExpressions = [];
        }
        this.setChildExpressionY(childExpressions);
        CID = this.ex[CID].pe;
      }
    } else {
      if (topExpression) {
        while (CID != 0) {
          switch (this.ex[CID].ch) {
            case 1: {
              if (this.ex[this.ex[CID].pe].t - (this.ex[CID].h - 1) < 0) {
                this.ex[this.ex[CID].pe].y -= 2;
                this.ex[this.ex[CID].pe].t += 2;
                this.ex[this.ex[CID].pe].h += 2;
              }

              break;
            }
            case 0: {
              if (this.ex[this.ex[CID].pe].b <= this.ex[CID].h - 3) {
                this.ex[this.ex[CID].pe].b += 2;
                this.ex[this.ex[CID].pe].h += 2;
              }
              break;
            }
            default:
              break;
          }
          CID = this.ex[CID].pe;
        }
      }
    }
    //endregion
    //----<<<<

    //Modify all parent expressions length
    //---->>>>
    //#region
    var CID = exp;
    if (lengthChanged) {
      while (CID != 0) {
        if (CID != exp) {
          this.ex[CID].cs++;
        }


        var childExpressions = [];
        childExpressions.push(this.fr[this.ex[CID].fr].ch);
        childExpressions.push(this.fr[this.ex[CID].fr].zn);
        var currentExpressionIndex = childExpressions.indexOf(exp);
        if (currentExpressionIndex != -1) {
          childExpressions.splice(currentExpressionIndex, 1);
        }
        this.setChildExpressionS(childExpressions);


        var childDigits = [];
        this.ex[CID].cd.forEach(cd => {
          childDigits.push(cd);
        });
        if (childDigits.length > 0) {
          this.setChildExpressionX(childDigits, POS);
        }

        if (this.ex[CID].cs == this.di[this.ex[CID].pd].s) {
          this.di[this.ex[CID].pd].s++;
        }


        POS = this.di[this.ex[CID].pd].pos;
        CID = this.ex[CID].pe;
      }
    }
    //endregion
    //----<<<<
  }

  writeEx(id) {

  }


  write(t) {
    switch (t) {
      case "fr": {
        this.writeFr();
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
        this.selection.x = this.setSX(ev.offsetX) - 1.2;
        this.selection.y = Math.round((this.setSY(ev.offsetY)) / 10 + 1) * 10 - 3;
        this.selection.line = null;
        this.selection.ex = null;
        this.selection.di = null;
        break;
      }
      case "ex": {
        this.selection.y = this.lines[this.ex[id].line].y + 17.2 + (this.ex[id].y + this.ex[id].t) * this.hc;
        this.selection.x = this.lines[this.ex[id].line].x + this.ex[this.ex[id].pe].x * this.c + this.di[this.ex[id].pd].x * this.c + this.ex[id].cs * this.c + 7;
        this.selection.line = this.ex[id].line;
        this.selection.ex = id;
        this.selection.di = null;
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
