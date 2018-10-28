import { Component, OnInit, ElementRef, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import * as interact from 'interactjs';
import { HomeworkService } from '../../../_services/homework/homework.service';
import { UserService } from '../../../_services/user/user.service';

import { AlgebraComponent } from '../../workspace-elements/algebra/algebra.component';

import { MatDialog } from '@angular/material';

import { ColumnCountDialog } from './../../dialogs/workspace-dialogs/column-count-dialog/column-count-dialog.component';

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {


  //region New Feature //



  //endregion New Feature //


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private algebra: AlgebraComponent,
    private homeData: HomeworkService,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  private id;
  absUrl = window.location.href;
  loading = true;

  user: any;

  vw: any;
  vh: any;
  scale: number;

  hwDate: any;

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
    y: 20,
    fdc: 1
  }

  mode: string = "";
  modeType: string = "";
  description: string = "";

  isDragging = false;
  isResizing = false;
  wasMoving = false;
  wasSelMoving = false;

  lines: any;
  elements: any;

  tempDot: any = {
    type: "none"
  };

  tempLine: any = {
    type: "none"
  };

  tempSelection: any = {
    type: "none"
  }


  lastDraw: any = {
    type: "none",
    step: 0
  }

  geoElements: any = {
    dots: [0, 1, 2, 3],
    lines: [0],
    circles: [0, 1]
  };
  geo: any = {
    dots: {
      0: {
        type: "dot",
        name: "X",
        x: 30,
        y: 100,
        dx: 30,
        dy: 100,
        r: 4,
        strokeW: 1,
        selected: 0
      },
      1: {
        type: "dot",
        name: "Y",
        x: 390,
        y: 400,
        dx: 390,
        dy: 400,
        r: 4,
        strokeW: 1,
        selected: 0
      },
      2: {
        type: "dot",
        name: "A",
        x: 380,
        y: 200,
        dx: 380,
        dy: 200,
        r: 4,
        strokeW: 1,
        selected: 0
      },
      3: {
        type: "dot",
        name: "B",
        x: 100,
        y: 100,
        dx: 100,
        dy: 100,
        r: 4,
        strokeW: 1,
        selected: 0
      }
    },
    lines: {
      0: {
        type: "line",
        sDot: 0,
        eDot: 1,
        strokeW: 1,
        selected: 0
      }
    },
    circles: {
      0: {
        type: "circle",
        cDot: 3,
        r: 20,
        dr: 20,
        strokeW: 1,
        selected: 0
      },
      1: {
        type: "circle",
        cDot: 2,
        r: 50,
        dr: 50,
        strokeW: 1,
        selected: 0
      }
    }
  }


  lettersKeyboard: any = [
    {
      name: "A",
      gen: 0
    },
    {
      name: "B",
      gen: 0
    },
    {
      name: "C",
      gen: 0
    },
    {
      name: "D",
      gen: 0
    },
    {
      name: "E",
      gen: 0
    },
    {
      name: "F",
      gen: 0
    },
    {
      name: "G",
      gen: 0
    },
    {
      name: "H",
      gen: 0
    },
    {
      name: "I",
      gen: 0
    },
    {
      name: "J",
      gen: 0
    },
    {
      name: "K",
      gen: 0
    },
    {
      name: "L",
      gen: 0
    },
    {
      name: "M",
      gen: 0
    },
    {
      name: "N",
      gen: 0
    },
    {
      name: "O",
      gen: 0
    },
    {
      name: "P",
      gen: 0
    },
    {
      name: "Q",
      gen: 0
    },
    {
      name: "R",
      gen: 0
    },
    {
      name: "S",
      gen: 0
    },
    {
      name: "T",
      gen: 0
    },
    {
      name: "U",
      gen: 0
    },
    {
      name: "V",
      gen: 0
    },
    {
      name: "W",
      gen: 0
    },
    {
      name: "X",
      gen: 0
    },
    {
      name: "Y",
      gen: 0
    },
    {
      name: "Z",
      gen: 0
    }
  ];

  selectedLetters: any = [];

  terms: any = [];

  undoHistory: any = [];
  redoHistory: any = [];

  getArr = function (i) {
    return new Array(i);
  }

  //exit(), saveListClick()
  //region Data Manipulation

  exit() {
    this.saveListClick();
    this.location.back();
  }

  saveListClick() {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    let data = {
      token: token,
      homeworkId: String(this.id),
      info: {
        homeworkType: "HW",
        date: this.hwDate,
        subjectId: String(1),
        data: {
          elements: this.elements,
          lines: this.lines,
          description: this.description,
          scale: this.scale,
          geo: this.geo,
          geoElements: this.geoElements
        },
        dataFromTeacher: {},
        columnsInfo: {}
      }
    }
    this.homeData.saveHomework(data)
      .subscribe(result => {
      });
  }

  //endregion Data Manipulation //


  //saveAsSvg()
  //region Save Image //

  saveAsSvg() {
    this.saveListClick();
    let tempWidth = this.container.nativeElement.attributes.width.value;
    let tempHeight = this.container.nativeElement.attributes.height.value;
    this.container.nativeElement.attributes.width.value = 1920;
    this.container.nativeElement.attributes.height.value = 2715;
    for (var i = 0; i < document.getElementsByClassName("regularText").length; i++) {
      document.getElementsByClassName("regularText")[i].setAttribute("style", "font-size: 0px !important;");
    }

    document.getElementById("list").setAttribute("fill", "url(#smallGrid)");
    document.getElementById("cell").setAttribute("stroke-width", "2");
    document.getElementById("field").setAttribute("stroke-width", "4");
    document.getElementById("cover").setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = document.getElementById("cover").outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;

    var canvas = document.querySelector("canvas"),
      context = canvas.getContext("2d");

    var image = new Image;
    image.src = svgUrl;

    let filename = "untitled";
    if (this.description != "") {
      filename = "";
      for (let i = 0; i < this.description.length; i++) {
        if (this.description[i] != " ") {
          filename += this.description[i].toLocaleLowerCase();
        } else {
          filename += "_";
        }
      }
    }

    image.onload = function () {
      context.drawImage(image, 0, 0);
      var a = document.createElement("a");
      a.download = filename + ".png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };


    document.getElementById("cell").setAttribute("stroke-width", "0.5");
    document.getElementById("field").setAttribute("stroke-width", "2");
    document.getElementById("list").setAttribute("fill", "url(" + window.location.href + "#smallGrid)");
    this.container.nativeElement.attributes.width.value = tempWidth;
    this.container.nativeElement.attributes.height.value = tempHeight;

    for (var i = 0; i < document.getElementsByClassName("regularText").length; i++) {
      document.getElementsByClassName("regularText")[i].setAttribute("style", "");
    }
  }

  //endregion Save Image //


  //brows(), onResize()
  //region Window Data //

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

  @ViewChild('container') container: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event) {

  };



  //endregion Window Data //


  //getCharacter(val), write(val, t)
  //createLine(), writeDi(val), writeOp(val), writeFr()
  //region Writing Module //

  getCharacter(val) {
    console.log(val);
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
      case "×":
        return "&#xe90c;";
      case "/":
        return "&#xe90d;";
      case "=":
        return "&#xe90e;";
      default:
        break;
    }
  }

  write(val, t) {
    this.redoHistory = [];
    switch (t) {
      case "fr": {
        this.undoHistory = [];
        this.writeFr();
        break;
      }
      case "pw": {
        this.undoHistory = [];
        this.writePw();
        break;
      }
      case "br": {
        this.undoHistory = [];
        this.writeBr();
        break;
      }
      case "rt": {
        this.undoHistory = [];
        this.writeRt();
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
    this.ref.detectChanges();
  }

  draw(element, geoPoint) {
    this.redoHistory = [];
    switch (this.modeType) {
      case "select": {
        if (this.tempSelection.type == "select" && !this.wasSelMoving) {
          console.log("lol")
          this.wasSelMoving = false;
          if (this.setSX(geoPoint.x) > this.tempSelection.sx) {
            this.tempSelection.x = this.tempSelection.sx;
            this.tempSelection.width = this.setSX(geoPoint.x) - this.tempSelection.x;
          } else {
            this.tempSelection.x = this.setSX(geoPoint.x);
            this.tempSelection.width = this.tempSelection.sx - this.tempSelection.x;
          }
          if (this.setSY(geoPoint.y) > this.tempSelection.sy) {
            this.tempSelection.y = this.tempSelection.sy;
            this.tempSelection.height = this.setSY(geoPoint.y) - this.tempSelection.y;
          } else {
            this.tempSelection.y = this.setSY(geoPoint.y);
            this.tempSelection.height = this.tempSelection.sy - this.tempSelection.y;
          }
          this.deselectAll();
          for (var i = 0; i < this.geoElements.dots.length; i++) {
            var dot = this.geo.dots[this.geoElements.dots[i]];
            if (dot.x >= this.tempSelection.x && dot.x <= (this.tempSelection.x + this.tempSelection.width) && dot.y >= this.tempSelection.y && dot.y <= (this.tempSelection.y + this.tempSelection.height)) {
              if (!this.geo.dots[this.geoElements.dots[i]].selected) {
                this.select(this.geoElements.dots[i], "dots");
              }
            }
          }
        }
        break;
      }
      case "dot": {
        var checked = this.checkExisting(geoPoint.x, geoPoint.y);
        if (!checked.exist) {
          var name: string = "";
          var gen: number = 0;
          if (this.selectedLetters[0]) {
            name = String(this.selectedLetters[0].name);
            gen = Number(this.selectedLetters[0].gen);
          }
          var newDot = {
            type: "dot",
            name: name,
            gen: gen,
            x: geoPoint.x,
            y: geoPoint.y,
            dx: geoPoint.x,
            dy: geoPoint.y,
            r: 4,
            strokeW: 1,
            selected: 0
          }
          var dotID = this.geoElements.dots.length;
          this.geoElements.dots.push(dotID)
          this.geo.dots[dotID] = newDot;
          if (this.selectedLetters[0]) {
            this.selectedLetters.splice(0, 1);
          }
        } else {
          if (this.selectedLetters[0]) {
            this.geo.dots[checked.id].name = this.selectedLetters[0].name;
            this.geo.dots[checked.id].gen = this.selectedLetters[0].gen;
            this.selectedLetters.splice(0, 1);
          }
        }
        break;
      }
      case "line": {
        if (this.lastDraw.type == "line") {
          if (this.lastDraw.step == 1) {
            var checked = this.checkExisting(geoPoint.x, geoPoint.y);
            var newDotID;
            if (checked.exist) {
              newDotID = checked.id;
            } else {
              var name: string = "";
              var gen: number = 0;
              if (this.selectedLetters[0]) {
                name = String(this.selectedLetters[0].name);
                gen = Number(this.selectedLetters[0].gen);
              }
              var newDot = {
                type: "dot",
                name: name,
                gen: gen,
                x: geoPoint.x,
                y: geoPoint.y,
                dx: geoPoint.x,
                dy: geoPoint.y,
                r: 4,
                strokeW: 1,
                selected: 0
              }
              var dotID = this.geoElements.dots.length;
              this.geoElements.dots.push(dotID)
              this.geo.dots[dotID] = newDot;
              newDotID = dotID;
              if (this.selectedLetters[0]) {
                this.selectedLetters.splice(0, 1);
              }
            }

            if (this.lastDraw.sDot != newDotID) {
              var newLine = {
                type: "line",
                sDot: this.lastDraw.sDot,
                eDot: newDotID,
                strokeW: 1,
                selected: 0
              }

              var lineID = this.geoElements.lines.length;
              this.geoElements.lines.push(lineID)
              this.geo.lines[lineID] = newLine;
            }

            this.lastDraw = {
              type: "none",
              step: 0
            }
            this.tempLine = {
              type: "none"
            }
          }
        } else {
          if (this.lastDraw.type == "none") {
            var checked = this.checkExisting(geoPoint.x, geoPoint.y);
            var newDotID;
            if (checked.exist) {
              newDotID = checked.id;
            } else {
              var name: string = "";
              var gen: number = 0;
              if (this.selectedLetters[0]) {
                name = String(this.selectedLetters[0].name);
                gen = Number(this.selectedLetters[0].gen);
              }
              var newDot = {
                type: "dot",
                name: name,
                gen: gen,
                x: geoPoint.x,
                y: geoPoint.y,
                dx: geoPoint.x,
                dy: geoPoint.y,
                r: 4,
                strokeW: 1,
                selected: 0
              }
              var dotID = this.geoElements.dots.length;
              this.geoElements.dots.push(dotID)
              this.geo.dots[dotID] = newDot;
              newDotID = dotID;
              if (this.selectedLetters[0]) {
                this.selectedLetters.splice(0, 1);
              }
            }

            this.lastDraw = {
              type: "line",
              step: 1,
              sDot: newDotID
            }
          }
        }
        break;
      }
      case "multiline": {
        if (this.lastDraw.type == "line") {
          if (this.lastDraw.step == 1) {
            var checked = this.checkExisting(geoPoint.x, geoPoint.y);
            var newDotID;
            if (checked.exist) {
              newDotID = checked.id;
            } else {
              var name: string = "";
              var gen: number = 0;
              if (this.selectedLetters[0]) {
                name = String(this.selectedLetters[0].name);
                gen = Number(this.selectedLetters[0].gen);
              }
              var newDot = {
                type: "dot",
                name: name,
                gen: gen,
                x: geoPoint.x,
                y: geoPoint.y,
                dx: geoPoint.x,
                dy: geoPoint.y,
                r: 4,
                strokeW: 1,
                selected: 0
              }
              var dotID = this.geoElements.dots.length;
              this.geoElements.dots.push(dotID)
              this.geo.dots[dotID] = newDot;
              newDotID = dotID;
              if (this.selectedLetters[0]) {
                this.selectedLetters.splice(0, 1);
              }
            }

            if (this.lastDraw.sDot != newDotID) {
              var newLine = {
                type: "line",
                sDot: this.lastDraw.sDot,
                eDot: newDotID,
                strokeW: 1,
                selected: 0
              }

              var lineID = this.geoElements.lines.length;
              this.geoElements.lines.push(lineID)
              this.geo.lines[lineID] = newLine;
            }

            if (newDotID == this.lastDraw.fDot) {
              this.lastDraw = {
                type: "none",
                step: 0
              }
              this.tempLine = {
                type: "none"
              }
            } else {
              this.lastDraw = {
                type: "line",
                step: 1,
                sDot: newDotID,
                fDot: this.lastDraw.fDot
              }
            }

          }
        } else {
          if (this.lastDraw.type == "none") {
            var checked = this.checkExisting(geoPoint.x, geoPoint.y);
            var newDotID;
            if (checked.exist) {
              newDotID = checked.id;
            } else {
              var name: string = "";
              var gen: number = 0;
              if (this.selectedLetters[0]) {
                name = String(this.selectedLetters[0].name);
                gen = Number(this.selectedLetters[0].gen);
              }
              var newDot = {
                type: "dot",
                name: name,
                gen: gen,
                x: geoPoint.x,
                y: geoPoint.y,
                dx: geoPoint.x,
                dy: geoPoint.y,
                r: 4,
                strokeW: 1,
                selected: 0
              }
              var dotID = this.geoElements.dots.length;
              this.geoElements.dots.push(dotID)
              this.geo.dots[dotID] = newDot;
              newDotID = dotID;
              if (this.selectedLetters[0]) {
                this.selectedLetters.splice(0, 1);
              }
            }

            this.lastDraw = {
              type: "line",
              step: 1,
              sDot: newDotID,
              fDot: newDotID
            }
          }
        }
        break;
      }
      case "circle": {
        if (this.lastDraw.type == "circle") {
          if (this.lastDraw.step == 1) {
            var newCircle = {
              type: "circle",
              cDot: this.lastDraw.sDot,
              r: Math.abs(this.geo.dots[this.lastDraw.sDot].x - geoPoint.x),
              dr: Math.abs(this.geo.dots[this.lastDraw.sDot].x - geoPoint.x),
              strokeW: 1,
              selected: 0
            }

            var circleID = this.geoElements.circles.length;
            this.geoElements.circles.push(circleID)
            this.geo.circles[circleID] = newCircle;


            this.lastDraw = {
              type: "none",
              step: 0
            }
            this.tempLine = {
              type: "none"
            }
          }
        } else {
          if (this.lastDraw.type == "none") {
            var checked = this.checkExisting(geoPoint.x, geoPoint.y);
            var newDotID;
            if (checked.exist) {
              newDotID = checked.id;
            } else {
              var name: string = "";
              var gen: number = 0;
              if (this.selectedLetters[0]) {
                name = String(this.selectedLetters[0].name);
                gen = Number(this.selectedLetters[0].gen);
              }
              var newDot = {
                type: "dot",
                name: name,
                gen: gen,
                x: geoPoint.x,
                y: geoPoint.y,
                dx: geoPoint.x,
                dy: geoPoint.y,
                r: 4,
                strokeW: 1,
                selected: 0
              }
              var dotID = this.geoElements.dots.length;
              this.geoElements.dots.push(dotID)
              this.geo.dots[dotID] = newDot;
              newDotID = dotID;
              if (this.selectedLetters[0]) {
                this.selectedLetters.splice(0, 1);
              }
            }

            this.lastDraw = {
              type: "circle",
              step: 1,
              sDot: newDotID
            }
          }
        }
        break;
      }
      case "rectangle": {
        break;
      }
      case "letters": {
        var checked = this.checkExisting(geoPoint.x, geoPoint.y);
        if (checked.exist) {
          this.geo.dots[checked.id].name = this.selectedLetters[0].name;
          this.geo.dots[checked.id].gen = this.selectedLetters[0].gen;
          this.selectedLetters.splice(0, 1);
        }
        break;
      }
      default: {
        break;
      }
    }
    this.wasMoving = false;
    this.ref.detectChanges();
  }

  //-----------------------DRAWING IMPLEMENTATIOn-----------------------

  checkExisting(x, y) {
    for (var i = 0; i < this.geoElements.dots.length; i++) {
      var x1 = this.geo.dots[i].x - 5;
      var x2 = this.geo.dots[i].x + 5;
      var y1 = this.geo.dots[i].y - 5;
      var y2 = this.geo.dots[i].y + 5;

      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        return {
          exist: true,
          id: i
        }
      }
    }
    return {
      exist: false,
      id: 0
    }
  }

  changeGen(val) {
    if (val != 0) {
      var gen = this.lettersKeyboard[0].gen;
      if (gen + val >= 0 && gen + val <= 9) {
        for (var i = 0; i < this.lettersKeyboard.length; i++) {
          this.lettersKeyboard[i].gen += val;
        }
      }
    } else {
      for (var i = 0; i < this.lettersKeyboard.length; i++) {
        this.lettersKeyboard[i].gen = 0;
      }
    }

  }

  addLetter(i) {
    this.selectedLetters.push(Object.assign({}, this.lettersKeyboard[i]));
  }

  removeLetter(i) {
    this.selectedLetters.splice(i, 1);
  }

  //-----------------------END OF DRAWING IMPLEMENTATIOn-----------------------

  createLine(): any {
    let lineLength = this.elements.lines.length;
    let expressionsLength = this.elements.expressions.length + 1;

    var newLine = {
      id: lineLength,
      y: (this.selection.y / 10 >> 0) * 10 - 10,
      x: (this.selection.x / 20 >> 0) * 20,
      dy: (this.selection.y / 10 >> 0) * 10 - 10,
      dx: (this.selection.x / 20 >> 0) * 20,
      fr: {},
      br: {},
      rt: {},
      pw: {},
      ex: {
        0: {
          line: lineLength,
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
      line: lineLength,
      pe: 0,
      pd: 0,
      fr: 0,
      ch: 0, zn: 0, osn: 1,
      ce: [],
      cd: []
    }

    this.selection.line = lineLength;
    this.selection.ex = expressionsLength;

    newLine.ex[expressionsLength] = newEx;
    newLine.ex[0].ce.push(expressionsLength);


    let hist = {
      exID: expressionsLength,
      lineID: lineLength,
      newLine: newLine
    };


    //Elements Expression array update
    this.elements.expressions.push(expressionsLength);
    //Lines array update
    this.lines[lineLength] = newLine;
    //Elements Lines array update
    this.elements.lines.push(lineLength);

    return hist;

  }

  writeDi(val): any {
    let initSelection = Object.assign({}, this.selection);
    if (this.selection.line != null) {
      let line = this.selection.line;
      let ex = this.selection.ex;
      let diLength = Object.keys(this.lines[line].di).length;
      let newDI;
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

      if (lastDI.di == null || lastDI.di.type == "operator") {
        newDI = {
          id: diLength,
          line: line,
          pe: ex,
          s: 1,
          pos: this.lines[line].ex[ex].cd.length + 1,
          value: val,
          text: this.getCharacter(val),
          type: "digit"
        }


        //region Addition to History
        let hist = {
          action: "write",
          type: "di",
          subType: "lastNotDI",
          line: line,
          diID: diLength,
          exID: ex,
          di: Object.assign({}, newDI),
          lineHist: null,
          selection: initSelection
        }
        this.addToUndoHistory(hist);
        //endregion Addition to History


        //Line Digits array update
        this.lines[line].di[diLength] = newDI;
        //Line Expressions array update
        this.lines[line].ex[ex].cd.push(diLength);
        //Elements Digits array update
        this.elements.digits.push(diLength);
      } else {
        if (lastDI.di.type == "digit") {


          //region Addition to History
          let hist = {
            action: "write",
            type: "di",
            subType: "lastDI",
            line: line,
            diID: lastDI.id,
            exID: null,
            di: Object.assign({}, this.lines[line].di[lastDI.id]),
            lineHist: null,
            selection: initSelection,
            diForRedo: null
          }
          //endregion Addition to History


          lastDI.di.s += 0.73;
          lastDI.di.value = Number(String(lastDI.di.value) + String(val));
          lastDI.di.text += this.getCharacter(val);


          //region Addition to History
          hist.diForRedo = Object.assign({}, this.lines[line].di[lastDI.id]);
          this.addToUndoHistory(hist);
          //endregion Addition to History


          //Line Digits array update
          this.lines[line].di[lastDI.id] = lastDI.di;

        }
      }
    } else {

      let lineHist = this.createLine();

      let line = this.selection.line;
      let ex = this.selection.ex;
      let diLength = Object.keys(this.lines[line].di).length;
      var newDI = {
        id: diLength,
        line: line,
        pe: ex,
        s: 1,
        pos: this.lines[line].ex[ex].cd.length + 1,
        value: val,
        text: this.getCharacter(val),
        type: "digit"
      }


      //region Addition to History
      let hist = {
        action: "write",
        type: "di",
        subType: "lastDInewLine",
        line: line,
        diID: diLength,
        exID: ex,
        di: Object.assign({}, newDI),
        lineHist: lineHist,
        selection: initSelection
      }
      this.addToUndoHistory(hist);
      //endregion Addition to History


      //Line Digits array update
      this.lines[line].di[diLength] = newDI;
      //Line Expressions array update
      this.lines[line].ex[ex].cd.push(diLength);
      //Elements Digits array update
      this.elements.digits.push(diLength);
    }
  }

  writeOp(val): any {
    let initSelection = Object.assign({}, this.selection);
    if (this.selection.line != null) {
      let line = this.selection.line;
      let ex = this.selection.ex;
      let diLength = Object.keys(this.lines[line].di).length;
      let newDI;
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

      newDI = {
        id: diLength,
        line: line,
        pe: ex,
        s: 1,
        pos: this.lines[line].ex[ex].cd.length + 1,
        value: val,
        text: this.getCharacter(val),
        type: "operator"
      }


      //region Addition to History
      let hist = {
        action: "write",
        type: "di",
        subType: "lastNotDI",
        line: line,
        diID: diLength,
        exID: ex,
        di: Object.assign({}, newDI),
        lineHist: null,
        selection: initSelection
      }
      this.addToUndoHistory(hist);
      //endregion Addition to History


      //Line Digits array update
      this.lines[line].di[diLength] = newDI;
      //Line Expressions array update
      this.lines[line].ex[ex].cd.push(diLength);
      //Elements Digits array update
      this.elements.digits.push(diLength);


    } else {
      let lineHist = this.createLine();
      let line = this.selection.line;
      let ex = this.selection.ex;
      let diLength = Object.keys(this.lines[line].di).length;
      var newDI = {
        id: diLength,
        line: line,
        pe: ex,
        s: 1,
        pos: this.lines[line].ex[ex].cd.length + 1,
        value: val,
        text: this.getCharacter(val),
        type: "operator"
      }


      //region Addition to History
      let hist = {
        action: "write",
        type: "di",
        subType: "lastDInewLine",
        line: line,
        diID: diLength,
        exID: ex,
        di: Object.assign({}, newDI),
        lineHist: lineHist,
        selection: initSelection
      }
      this.addToUndoHistory(hist);
      //endregion Addition to History


      //Line Digits array update
      this.lines[line].di[diLength] = newDI;
      //Line Expressions array update
      this.lines[line].ex[ex].cd.push(diLength);
      //Elements Digits array update
      this.elements.digits.push(diLength);


    }
  }

  writeFr(): any {
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
        id: diLength,
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
      this.elements.fractions.push(this.elements.fractions.length + 1);

      this.lines[line].ex[this.elements.expressions.length + 1] = newCh;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);

      this.selection.ex = this.elements.expressions.length;
      this.selection.line = line;
      this.onClick({
        target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
      });

      this.lines[line].ex[this.elements.expressions.length + 1] = newZn;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);
    } else {
      this.createLine();
      let line = this.selection.line;
      let ex = this.selection.ex;
      let diLength = Object.keys(this.lines[line].di).length;
      var newDI = {
        id: diLength,
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
      this.elements.fractions.push(this.elements.fractions.length + 1);

      this.lines[line].ex[this.elements.expressions.length + 1] = newCh;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);

      this.selection.ex = this.elements.expressions.length;
      this.selection.line = line;
      this.onClick({
        target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
      });

      this.lines[line].ex[this.elements.expressions.length + 1] = newZn;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);
    }
  }



  writePw(): any {
    console.log(this.lines);
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
      console.log(lastDI);

      if (lastDI.di.type != "brackets") {
        for (var i = 0; i < this.lines[line].ex[ex].cd.length; i++) {
          if (Number(this.lines[line].ex[ex].cd[i]) == Number(lastDI.id)) {
            this.lines[line].di[this.lines[line].ex[ex].cd[i]].pos = 1;
          }
        }
        var newDI;
        if (lastDI.di.type != "fraction" && lastDI.di.type != "root") {
          newDI = {
            id: diLength,
            line: line,
            pe: ex,
            s: 1,
            pos: lastDI.pos,
            value: "",
            text: "",
            type: "power",
            pw: this.elements.powers.length + 1
          }
        } else {
          newDI = {
            id: diLength,
            line: line,
            pe: ex,
            s: 1,
            pos: lastDI.pos,
            value: "",
            text: "",
            type: "powerWbrackets",
            pw: this.elements.powers.length + 1,
            br: this.elements.brackets.length + 1
          }
          var newBR = {
            pe: ex,
            pd: this.elements.digits[this.elements.digits.length - 1],
            cn: this.elements.expressions.length + 2,
            isActive: 1
          }
          this.lines[line].br[this.elements.brackets.length + 1] = newBR;
          this.elements.brackets.push(this.elements.brackets.length + 1);
        }

        this.lines[line].di[diLength] = newDI;
        this.lines[line].ex[ex].cd.push(diLength);
        this.elements.digits.push(diLength);

        var newPW = {
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
          pw: this.elements.powers.length + 1,
          ch: 1, zn: 0, osn: 0,
          ce: [],
          cd: []
        }

        var newZn;
        if (lastDI.di.type != "fraction" && lastDI.di.type != "root") {
          newZn = {
            line: line,
            pe: ex,
            pd: diLength,
            pw: this.elements.powers.length + 1,
            ch: 0, zn: 1, osn: 0,
            ce: [],
            cd: [lastDI.id]
          }
        } else {
          newZn = {
            line: line,
            pe: ex,
            pd: diLength,
            pw: this.elements.powers.length + 1,
            ch: 0, zn: 1, osn: 0, cn: 1,
            ce: [],
            cd: [lastDI.id]
          }
        }

        this.lines[line].pw[this.elements.powers.length + 1] = newPW;
        this.elements.powers.push(this.elements.powers.length + 1);

        this.lines[line].ex[this.elements.expressions.length + 1] = newCh;
        this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
        this.elements.expressions.push(this.elements.expressions.length + 1);

        this.selection.ex = this.elements.expressions.length;
        this.selection.line = line;
        this.onClick({
          target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
        });

        this.lines[line].ex[this.elements.expressions.length + 1] = newZn;
        this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);

        for (var i = 0; i < this.lines[line].ex[ex].cd.length; i++) {
          if (Number(this.lines[line].ex[ex].cd[i]) == Number(lastDI.id)) {
            this.lines[line].ex[ex].cd.splice(i, 1);
          }
        }
        this.elements.expressions.push(this.elements.expressions.length + 1);
      } else {

        this.lines[lastDI.di.line].di[lastDI.id].type = "powerWbrackets";
        this.lines[lastDI.di.line].di[lastDI.id].pw = this.elements.powers.length + 1;
        this.lines[lastDI.di.line].di[lastDI.id].zn = 1;

        var newPW = {
          pe: ex,
          pd: lastDI.id,
          ch: this.elements.expressions.length + 1,
          zn: this.lines[lastDI.di.line].di[lastDI.id].pe,
          isActive: 1
        }

        var newCh = {
          line: line,
          pe: ex,
          pd: diLength,
          pw: this.elements.powers.length + 1,
          ch: 1, zn: 0, osn: 0,
          ce: [],
          cd: []
        }

        this.lines[line].pw[this.elements.powers.length + 1] = newPW;
        this.elements.powers.push(this.elements.powers.length + 1);

        this.lines[line].ex[this.elements.expressions.length + 1] = newCh;
        this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
        this.elements.expressions.push(this.elements.expressions.length + 1);

        this.selection.ex = this.elements.expressions.length;
        this.selection.line = line;
        this.onClick({
          target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
        });
      }
    } else {
      console.log("error");
    }
  }

  writeBr(): any {
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
        id: diLength,
        line: line,
        pe: ex,
        s: 1,
        pos: this.lines[line].ex[ex].cd.length + 1,
        value: "",
        text: "",
        type: "brackets",
        br: this.elements.brackets.length + 1
      }

      this.lines[line].di[diLength] = newDI;
      this.lines[line].ex[ex].cd.push(diLength);
      this.elements.digits.push(diLength);
      var newBR = {
        pe: ex,
        pd: this.elements.digits[this.elements.digits.length - 1],
        cn: this.elements.expressions.length + 1,
        isActive: 1
      }

      var newCn = {
        line: line,
        pe: ex,
        pd: diLength,
        br: this.elements.brackets.length + 1,
        ch: 0, zn: 0, osn: 0, cn: 1,
        ce: [],
        cd: []
      }
      this.lines[line].br[this.elements.brackets.length + 1] = newBR;
      this.elements.brackets.push(this.elements.brackets.length + 1);

      this.lines[line].ex[this.elements.expressions.length + 1] = newCn;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);

      this.selection.ex = this.elements.expressions.length;
      this.selection.line = line;
      this.onClick({
        target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
      });
    } else {
      this.createLine();
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
        id: diLength,
        line: line,
        pe: ex,
        s: 1,
        pos: this.lines[line].ex[ex].cd.length + 1,
        value: "",
        text: "",
        type: "brackets",
        br: this.elements.brackets.length + 1
      }

      this.lines[line].di[diLength] = newDI;
      this.lines[line].ex[ex].cd.push(diLength);
      this.elements.digits.push(diLength);
      var newBR = {
        pe: ex,
        pd: this.elements.digits[this.elements.digits.length - 1],
        cn: this.elements.expressions.length + 1,
        isActive: 1
      }

      var newCn = {
        line: line,
        pe: ex,
        pd: diLength,
        br: this.elements.brackets.length + 1,
        ch: 0, zn: 0, osn: 0, cn: 1,
        ce: [],
        cd: []
      }
      this.lines[line].br[this.elements.brackets.length + 1] = newBR;
      this.elements.brackets.push(this.elements.brackets.length + 1);

      this.lines[line].ex[this.elements.expressions.length + 1] = newCn;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);

      this.selection.ex = this.elements.expressions.length;
      this.selection.line = line;
      this.onClick({
        target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
      });
    }
  }


  writeRt(): any {
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
        id: diLength,
        line: line,
        pe: ex,
        s: 1,
        pos: this.lines[line].ex[ex].cd.length + 1,
        value: "",
        text: "",
        type: "root",
        rt: this.elements.roots.length + 1
      }

      this.lines[line].di[diLength] = newDI;
      this.lines[line].ex[ex].cd.push(diLength);
      this.elements.digits.push(diLength);

      var newRT = {
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
        rt: this.elements.roots.length + 1,
        ch: 1, zn: 0, osn: 0,
        ce: [],
        cd: []
      }

      var newZn = {
        line: line,
        pe: ex,
        pd: diLength,
        rt: this.elements.roots.length + 1,
        ch: 0, zn: 1, osn: 0,
        ce: [],
        cd: []
      }

      this.lines[line].rt[this.elements.roots.length + 1] = newRT;
      this.elements.roots.push(this.elements.roots.length + 1);

      this.lines[line].ex[this.elements.expressions.length + 1] = newCh;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);

      this.selection.ex = this.elements.expressions.length;
      this.selection.line = line;
      this.onClick({
        target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
      });

      this.lines[line].ex[this.elements.expressions.length + 1] = newZn;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);
    } else {
      this.createLine();
      let line = this.selection.line;
      let ex = this.selection.ex;
      let diLength = Object.keys(this.lines[line].di).length;
      var newDI = {
        id: diLength,
        line: line,
        pe: ex,
        s: 1,
        pos: this.lines[line].ex[ex].cd.length + 1,
        value: "",
        text: "",
        type: "root",
        rt: this.elements.roots.length + 1
      }

      this.lines[line].di[diLength] = newDI;
      this.lines[line].ex[ex].cd.push(diLength);
      this.elements.digits.push(diLength);

      var newRT = {
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
        rt: this.elements.roots.length + 1,
        ch: 1, zn: 0, osn: 0,
        ce: [],
        cd: []
      }

      var newZn = {
        line: line,
        pe: ex,
        pd: diLength,
        rt: this.elements.roots.length + 1,
        ch: 0, zn: 1, osn: 0,
        ce: [],
        cd: []
      }

      this.lines[line].rt[this.elements.roots.length + 1] = newRT;
      this.elements.roots.push(this.elements.roots.length + 1);

      this.lines[line].ex[this.elements.expressions.length + 1] = newCh;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);

      this.selection.ex = this.elements.expressions.length;
      this.selection.line = line;
      this.onClick({
        target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
      });

      this.lines[line].ex[this.elements.expressions.length + 1] = newZn;
      this.lines[line].ex[ex].ce.push(this.elements.expressions.length + 1);
      this.elements.expressions.push(this.elements.expressions.length + 1);
    }
  }




  //endregion Writing Module //


  //addToUndoHistory(hist), addToRedoHistory(hist)
  //undoLast(), redoLast()
  //removeFromArray(array, element)
  //region Redo Undo //

  addToUndoHistory(hist) {
    this.undoHistory.push(hist);
  }

  addToRedoHistory(hist) {
    this.redoHistory.push(hist);
  }

  undoLast() {
    if (this.undoHistory.length == 0) {
      return;
    }

    let last = this.undoHistory[this.undoHistory.length - 1];

    switch (last.type) {
      case "di": {
        if (last.subType == "lastNotDI") {
          delete this.lines[last.line].di[last.diID];
          this.removeFromArray(this.lines[last.line].ex[last.exID].cd, last.diID);
          this.removeFromArray(this.elements.digits, last.diID);
          this.selection = last.selection;
        } else {
          if (last.subType == "lastDI") {
            this.lines[last.line].di[last.diID] = last.di;
            this.selection = last.selection;
          } else {
            if (last.subType == "lastDInewLine") {
              this.removeFromArray(this.elements.expressions, last.lineHist.lineID);
              delete this.lines[last.lineHistlineID];
              this.removeFromArray(this.elements.lines, last.lineHist.lineID);

              delete this.lines[last.line].di[last.diID];
              this.removeFromArray(this.lines[last.line].ex[last.exID].cd, last.diID)
              this.removeFromArray(this.elements.digits, last.diID);
              this.selection = last.selection;
            }
          }
        }
        break;
      }
      case "fr": {

        break;
      }
      default:
        break;
    }

    this.addToRedoHistory(Object.assign({}, last));
    this.undoHistory.splice(-1, 1);

    this.ref.detectChanges();
  }

  redoLast() {
    if (this.redoHistory.length == 0) {
      return;
    }

    let last = this.redoHistory[this.redoHistory.length - 1];

    if (last.subType == "lastNotDI") {
      this.lines[last.line].di[last.diID] = last.di;
      this.lines[last.line].ex[last.exID].cd.push(last.diID);
      this.elements.digits.push(last.diID);
      this.selection = last.selection;
    } else {
      if (last.subType == "lastDI") {
        this.lines[last.line].di[last.diID] = last.diForRedo;
        this.selection = last.selection;
      } else {
        if (last.subType == "lastDInewLine") {
          this.elements.expressions.push(last.lineHist.exID);
          this.lines[last.lineHist.lineID] = last.lineHist.newLine;
          this.elements.lines.push(last.lineHist.lineID);

          this.lines[last.line].di[last.diID] = last.di;
          this.lines[last.line].ex[last.exID].cd.push(last.diID);
          this.elements.digits.push(last.diID);
          this.selection = last.selection;
        }
      }
    }

    this.addToUndoHistory(Object.assign({}, last));
    this.redoHistory.splice(-1, 1);

    this.ref.detectChanges();
  }


  removeFromArray(array, element) {
    let index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
  }


  //endregion Redo Undo //


  //setCursor(ev, element, id)
  //getExpression(el)
  //region Display Data //

  setCursor(ev, element, id) {
    if (this.mode != "geo") {
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
    } else {
      var geoPoint: any = {};
      geoPoint.x = Math.round((this.setSX(ev.offsetX)) / 10) * 10;
      geoPoint.y = Math.round((this.setSY(ev.offsetY)) / 10) * 10;
      this.draw(element, geoPoint);
    }
  }

  onMouseDown(ev) {
    if (this.modeType == "select") {
      this.tempSelection.type = "select";
      this.tempSelection.sx = this.setSX(ev.offsetX);
      this.tempSelection.sy = this.setSY(ev.offsetY);
      this.tempSelection.x = this.setSX(ev.offsetX);
      this.tempSelection.y = this.setSY(ev.offsetY);
      this.tempSelection.width = 20;
      this.tempSelection.height = 20;
    }
  }

  onMouseUp(ev) {
    if (this.modeType == "select" && this.wasSelMoving) {
      this.tempSelection = {
        type: "none"
      }
      this.modeType = "";
    }
  }

  onMouseMove(ev) {
    this.wasMoving = true;
    if (this.modeType != "") {
      switch (this.modeType) {
        case "select": {
          if (this.tempSelection.type == "select") {
            this.wasSelMoving = true;
            if (this.setSX(ev.offsetX) > this.tempSelection.sx) {
              this.tempSelection.x = this.tempSelection.sx;
              this.tempSelection.width = this.setSX(ev.offsetX) - this.tempSelection.x;
            } else {
              this.tempSelection.x = this.setSX(ev.offsetX);
              this.tempSelection.width = this.tempSelection.sx - this.tempSelection.x;
            }
            if (this.setSY(ev.offsetY) > this.tempSelection.sy) {
              this.tempSelection.y = this.tempSelection.sy;
              this.tempSelection.height = this.setSY(ev.offsetY) - this.tempSelection.y;
            } else {
              this.tempSelection.y = this.setSY(ev.offsetY);
              this.tempSelection.height = this.tempSelection.sy - this.tempSelection.y;
            }
            this.deselectAll();
            for (var i = 0; i < this.geoElements.dots.length; i++) {
              var dot = this.geo.dots[this.geoElements.dots[i]];
              if (dot.x >= this.tempSelection.x && dot.x <= (this.tempSelection.x + this.tempSelection.width) && dot.y >= this.tempSelection.y && dot.y <= (this.tempSelection.y + this.tempSelection.height)) {
                if (!this.geo.dots[this.geoElements.dots[i]].selected) {
                  this.select(this.geoElements.dots[i], "dots");
                }
              }
            }
          }
          break;
        }
        case "dot": {
          this.tempDot.type = "dot";
          this.tempDot.x = this.setSX(ev.offsetX);
          this.tempDot.y = this.setSY(ev.offsetY);
          this.tempDot.r = 4;
          this.tempDot.fill = "gray";
          if (this.selectedLetters[0]) {
            this.tempDot.name = this.selectedLetters[0].name;
            this.tempDot.gen = this.selectedLetters[0].gen;
          } else {
            this.tempDot.name = "";
            this.tempDot.gen = 0;
          }
          break;
        }
        case "line": {
          if (this.lastDraw.type == "none") {
            this.tempDot.type = "dot";
            this.tempDot.x = this.setSX(ev.offsetX);
            this.tempDot.y = this.setSY(ev.offsetY);
            this.tempDot.r = 4;
            this.tempDot.fill = "gray";
          } else {
            if (this.lastDraw.type == "line") {
              this.tempDot.type = "dot";
              this.tempDot.x = this.setSX(ev.offsetX);
              this.tempDot.y = this.setSY(ev.offsetY);
              this.tempDot.r = 4;

              this.tempLine.type = "line";
              this.tempLine.x1 = this.geo.dots[this.lastDraw.sDot].x;
              this.tempLine.y1 = this.geo.dots[this.lastDraw.sDot].y;
              this.tempLine.x2 = this.setSX(ev.offsetX);
              this.tempLine.y2 = this.setSY(ev.offsetY);
            }
          }
          break;
        }
        case "multiline": {
          if (this.lastDraw.type == "none") {
            this.tempDot.type = "dot";
            this.tempDot.x = this.setSX(ev.offsetX);
            this.tempDot.y = this.setSY(ev.offsetY);
            this.tempDot.r = 4;
            this.tempDot.fill = "gray";
          } else {
            if (this.lastDraw.type == "line") {
              this.tempDot.type = "dot";
              this.tempDot.x = this.setSX(ev.offsetX);
              this.tempDot.y = this.setSY(ev.offsetY);
              this.tempDot.r = 4;

              this.tempLine.type = "line";
              this.tempLine.x1 = this.geo.dots[this.lastDraw.sDot].x;
              this.tempLine.y1 = this.geo.dots[this.lastDraw.sDot].y;
              this.tempLine.x2 = this.setSX(ev.offsetX);
              this.tempLine.y2 = this.setSY(ev.offsetY);
            }
          }
          break;
        }
        case "circle": {
          if (this.lastDraw.type == "none") {
            this.tempDot.type = "dot";
            this.tempDot.x = this.setSX(ev.offsetX);
            this.tempDot.y = this.setSY(ev.offsetY);
            this.tempDot.r = 4;
            this.tempDot.fill = "gray";
          } else {
            if (this.lastDraw.type == "circle") {
              this.tempDot.type = "dot";
              this.tempDot.x = this.setSX(ev.offsetX);
              this.tempDot.y = this.geo.dots[this.lastDraw.sDot].y;
              this.tempDot.r = 5;
              this.tempDot.fill = "#ed7e28";

              this.tempLine.type = "circle";
              this.tempLine.cx = this.geo.dots[this.lastDraw.sDot].x;
              this.tempLine.cy = this.geo.dots[this.lastDraw.sDot].y;
              this.tempLine.r = Math.abs(this.geo.dots[this.lastDraw.sDot].x - this.setSX(ev.offsetX));
            }
          }
          break;
        }
        case "rectangle": {
          break;
        }
        case "letters": {
          this.tempDot.type = "dot";
          this.tempDot.x = this.setSX(ev.offsetX);
          this.tempDot.y = this.setSY(ev.offsetY);
          this.tempDot.r = 4;
          this.tempDot.fill = "gray";
          if (this.selectedLetters[0]) {
            this.tempDot.name = this.selectedLetters[0].name;
            this.tempDot.gen = this.selectedLetters[0].gen;
          } else {
            this.tempDot.name = "";
            this.tempDot.gen = "";
          }
          break;
        }
        default: {
          this.tempDot = { type: "none" };
          this.tempLine = { type: "none" };
          this.lastDraw = { type: "none" };
          break;
        }
      }
    }
  }

  getExpression(el) {
    let ex = this.algebra.getExpression(Object.assign({}, el));
    if (this.selection.ex != null) {
      this.onClick({
        target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
      });
    }
    return ex;
  }

  //endregion Display Data //


  //switchMode(mode), setSX(n), setSY(n), zoom(scale)
  //region Workspace Buttons //

  switchMode(mode) {
    if (this.mode === "" || this.mode != "" && this.mode != mode) {
      this.mode = mode;
      if (this.mode == "geo") {
        this.selection = {
          line: null,
          ex: null,
          di: null,
          ev: null,
          x: -20,
          y: -20,
          fdc: 1
        }
      } else {
        this.selection = {
          line: null,
          ex: null,
          di: null,
          ev: null,
          x: 20,
          y: 20,
          fdc: 1
        }
      }
    } else {
      this.mode = "";
    }
    this.modeType = "";
    this.tempDot = { type: "none" };
    this.tempLine = { type: "none" };
    this.lastDraw = { type: "none" };
    this.selectedLetters = [];
    this.wasMoving = false;
    this.wasSelMoving = false;
    this.tempSelection = {
      type: "none"
    }
    this.changeGen(0);
    this.deselectAll();
  }

  switchModeType(modeType) {
    if (this.modeType === "" || this.modeType != "" && this.modeType != modeType) {
      this.modeType = modeType;
    } else {
      this.modeType = "";
    }
    this.tempDot = { type: "none" };
    this.tempLine = { type: "none" };
    this.lastDraw = { type: "none" };
    this.selectedLetters = [];
    this.wasMoving = false;
    this.wasSelMoving = false;
    this.tempSelection = {
      type: "none"
    }
    this.changeGen(0);
    this.deselectAll();
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

    this.setGrid();
  }

  //endregion Workspace Buttons //


  //notSaved(array, element), select(event), onClick(ev)
  //region Drag Center //

  notSaved = function (array, element) {
    for (var i = 0; i < array.length; i++) {
      if (JSON.stringify(array[i]) === JSON.stringify(element)) {
        return false;
      }
    }
    return true;
  }

  selectedEx: any = [];

  select = function (id, type) {
    let el = this.geo[type][id];
    if (!this.isDragging && this.notSaved(this.selected, {
      id: id,
      type: type
    })) {
      el.selected = 1;
      el.strokeW = 3;
      if (el.type == "dot" || el.type == "circle") {
        el.r += 2;
      }
      this.selected.push({
        id: id,
        type: type
      });
      this.container.nativeElement.attributes.class.value = "touch";
    } else {
      if (!this.isDragging && !this.notSaved(this.selected, {
        id: id,
        type: type
      })) {
        el.selected = 0;
        el.strokeW = 1;
        if (el.type == "dot" || el.type == "circle") {
          el.r -= 2;
        }
        this.selected.splice(this.selected.indexOf({
          id: id,
          type: type
        }), 1);
        if (this.selected.length == 0) {
          this.container.nativeElement.attributes.class.value = "";
        }
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
          this.selection.fdc = Number(ev.target.getAttribute("data-fdc"));
          this.selection.x = x + cs * 20 + 2 * Number(ev.target.getAttribute("data-wdc"));
          this.selection.y = y + top * 10 + 16.8 * Number(ev.target.getAttribute("data-hdc"));
          this.selection.line = line;
          this.selection.ex = ex;
          this.selection.di = pd;
          this.mode = "math";
          break;
        }
        case "di": {
          let line = Number(ev.target.getAttribute("data-lineid"));
          let di = Number(ev.target.getAttribute("data-digitid"));
          this.terms.push(this.lines[line].di[di].value)
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  //endregion Darg Center //


  //resetTerms(), openDialog(op)
  //region Count in Column //

  resetTerms() {
    this.terms = [];
    this.ref.detectChanges();
  }

  openDialog(op): void {
    if (this.terms.length != 0) {
      if ((this.terms.length > 1 && (op == "sub" || op == "sum")) || (this.terms.length == 2)) {
        let dialogRef = this.dialog.open(ColumnCountDialog, {
          data: { terms: this.terms, operator: op }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (Number(result)) {
            for (var i = 0; i < String(Number(result)).length; i++) {
              this.write(Number(String(Number(result))[i]), "di");
              this.ref.detectChanges();
            }
            this.ref.detectChanges();
            this.onClick({
              target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
            });
          }
          this.terms = [];
          this.ref.detectChanges();
        });
      }
    }
  }

  //endregion Count in Column //


  //ngOnInit(), getUserInfo(), initUI(scale)
  //region Init Center //

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getUserInfo();
  }

  getUserInfo() {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    let data = {
      token: token
    }
    this.userService.getUserInfo(data)
      .subscribe(result => {
        this.user = result;

        this.homeData.homeworkRead({
          token: JSON.parse(localStorage.getItem('currentUser')).token,
          homeworkId: String(this.id)
        })
          .subscribe(result => {
            console.log(result);
            if (result.data.elements) {
              this.elements = result.data.elements;
            } else {
              this.elements = {
                lines: [],
                fractions: [],
                roots: [],
                powers: [],
                brackets: [],
                expressions: [],
                digits: []
              }
            }
            if (result.data.geoElements) {
              this.geoElements = result.data.geoElements;
            } else {
              this.geoElements = {
                dots: [],
                lines: [],
                circles: []
              };
            }
            if (result.data.lines) {
              this.lines = result.data.lines;
            } else {
              this.lines = [];
            }
            if (result.data.geo) {
              this.geo = result.data.geo;
            } else {
              this.geo = {
                dots: [],
                lines: [],
                circles: []
              };
            }
            this.scale = 1;

            this.description = result.data.description;
            this.vw = window.innerWidth;
            this.vh = window.innerHeight;
            this.hwDate = result.date;
            this.loading = false;
            this.ref.detectChanges();
            setTimeout(function () {
              this.initUI(1);
            }.bind(this), 10);

          });
      });
  }

  deselectAll() {
    var container = this.container.nativeElement;
    for (var i = 0; i < this.selected.length; i++) {
      this.geo[this.selected[i].type][this.selected[i].id].selected = 0;
      this.geo[this.selected[i].type][this.selected[i].id].strokeW = 1;
      if (this.selected[i].type == "dots" || this.selected[i].type == "circles") {
        this.geo[this.selected[i].type][this.selected[i].id].r -= 2;
      }
    }
    this.selected = [];
    container.attributes.class.value = "";
  }

  initUI(scale) {
    if (this.container) {
      var container = this.container.nativeElement;
      var selected = this.selected;
      var notSaved = this.notSaved;
      var browser = this.brows();

      this.zoom(scale);

      interact('.svgDraggable')
        .draggable({
          autoScroll: true,
          onstart: function (event) {
            this.isDragging = true;
          }.bind(this),
          onmove: dragMoveListener.bind(this),
          onend: function (event) {
            setTimeout(function () {
              this.deselectAll();
              this.ref.detectChanges();
              this.isDragging = false;
              this.isResizing = false;
            }.bind(this), 1);
          }.bind(this)
        }).on("tap", function (event) {
          /*if (browser.name === "Safari") {
            let id = event.target.getAttribute("data-id");
            let el = this.geo[id];
            if (!notSaved(selected, id)) {
              el.selected = 0;
              el.strokeW = 1;
              if (el.type == "dot" || el.type == "circle") {
                el.r -= 2;
              }
              selected.splice(selected.indexOf(id), 1);
              if (selected.length == 0) {
                container.attributes.class.value = "";
              }
            }
          }*/
        });

      interact('.drag-handler')
        .draggable({
          autoScroll: true,
          onstart: function (event) {
          }.bind(this),
          onmove: expressionDrag.bind(this),
          onend: function (event) { }
        }).on("tap", function (event) {

          let id = event.target.getAttribute('data-lineid');
          let el = this.lines[id];

          if (this.notSaved(this.selectedEx, id)) {
            this.selectedEx.push(id);
            this.container.nativeElement.attributes.class.value = "touch";
          } else {
            if (!notSaved(this.selectedEx, id)) {
              this.selectedEx.splice(this.selectedEx.indexOf(id), 1);
              if (this.selectedEx.length == 0) {
                container.attributes.class.value = "";
              }
            }
          }
        }.bind(this));
    }

    function expressionDrag(event) {
      var target = event.target

      var cW = Number(container.attributes.width.value);
      var cH = Number(container.attributes.height.value);
      var cA = container.attributes.viewBox.value.split(' ');


      for (var i = 0; i < this.selectedEx.length; i++) {
        this.lines[this.selectedEx[i]].dx += Number(event.dx) * (cA[2] / cW);
        this.lines[this.selectedEx[i]].x = Math.ceil((this.lines[this.selectedEx[i]].dx - 5) / 10) * 10;
        this.lines[this.selectedEx[i]].dy += Number(event.dy) * (cA[3] / cH);
        this.lines[this.selectedEx[i]].y = Math.ceil((this.lines[this.selectedEx[i]].dy - 5) / 10) * 10;
      }

      this.onClick({
        target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
      });
      this.ref.detectChanges();
    }

    function dragMoveListener(event) {
      let id = event.target.getAttribute("data-id");

      var cW = Number(container.attributes.width.value);
      var cH = Number(container.attributes.height.value);
      var cA = container.attributes.viewBox.value.split(' ');
      if (event.target.getAttribute("data-type") != "radius") {
        for (var i = 0; i < this.selected.length; i++) {
          this.geo[this.selected[i].type][this.selected[i].id].dx += Number(event.dx) * (cA[2] / cW);
          this.geo[this.selected[i].type][this.selected[i].id].x = Math.ceil((this.geo[this.selected[i].type][this.selected[i].id].dx - 5) / 10) * 10;
          this.geo[this.selected[i].type][this.selected[i].id].dy += Number(event.dy) * (cA[3] / cH);
          this.geo[this.selected[i].type][this.selected[i].id].y = Math.ceil((this.geo[this.selected[i].type][this.selected[i].id].dy - 5) / 10) * 10;
        }
      } else {
        if (event.target.getAttribute("data-dType") == "w") {
          this.isResizing = 1;
          this.geo.circles[id].dr += Number(event.dx) * (cA[2] / cW) * Number(event.target.getAttribute("data-direction"));
          this.geo.circles[id].r = Math.ceil((this.geo.circles[id].dr - 5) / 10) * 10;
        } else {
          this.isResizing = 2;
          this.geo.circles[id].dr += Number(event.dy) * (cA[3] / cH) * Number(event.target.getAttribute("data-direction"));
          this.geo.circles[id].r = Math.ceil((this.geo.circles[id].dr - 5) / 10) * 10;
        }
      }

      this.ref.detectChanges();
    }
  }

  setGrid() {
    /*var container = this.container.nativeElement;
    var cW = Number(container.attributes.width.value);
    var cH = Number(container.attributes.height.value);
    var cA = container.attributes.viewBox.value.split(' ');

    interact('.svgDraggable').draggable({
      snap: {
        targets: [
          interact.createSnapGrid({
            x: 10 * (cW / cA[2]),
            y: 10 / (cA[3] / cH),
            range: Infinity
          })
        ]
      }
    });


    interact('.drag-handler')
      .draggable({
        snap: {
          targets: [
            interact.createSnapGrid({
              x: 10 * (cW / cA[2]),
              y: 10 / (cA[3] / cH),
              range: Infinity
            })
          ],
          relativePoints: [{ x: 1, y: 1 }]
        }
      });
    console.log(15 * (cW / cA[2]))
    console.log(15 * (cH / cA[3]))*/
  }

  //endregion Init Center //


}