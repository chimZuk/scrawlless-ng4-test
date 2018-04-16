import { Component, OnInit, ElementRef, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import * as interact from 'interactjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { HomeworkDataService } from '../../../_services/homework-data/homework-data.service';
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
    private sanitizer: DomSanitizer,
    private data: HomeworkDataService,
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
  description: string = "";

  lines: any;
  elements: any;

  geoElements: any = [5, 4, 1, 2, 3];
  geo: any = {
    1: {
      type: "dot",
      x: 400,
      y: 200,
      dx: 400,
      dy: 200,
      r: 2,
      strokeW: 1,
      selected: 0
    },
    2: {
      type: "dot",
      x: 390,
      y: 200,
      dx: 390,
      dy: 200,
      r: 2,
      strokeW: 1,
      selected: 0
    },
    3: {
      type: "dot",
      x: 380,
      y: 200,
      dx: 380,
      dy: 200,
      r: 2,
      strokeW: 1,
      selected: 0
    },
    4: {
      type: "circle",
      x: 500,
      y: 160,
      dx: 500,
      dy: 160,
      r: 20,
      strokeW: 1,
      selected: 0
    },
    5: {
      type: "circle",
      x: 200,
      y: 700,
      dx: 200,
      dy: 700,
      r: 50,
      strokeW: 1,
      selected: 0
    }
  }

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
        date: "1/12/2019",
        subjectId: String(1),
        data: {
          elements: this.elements,
          lines: this.lines,
          description: this.description,
          scale: this.scale
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
    let tempWidth = this.container.nativeElement.attributes.width.value;
    let tempHeight = this.container.nativeElement.attributes.height.value;
    this.container.nativeElement.attributes.width.value = 1920;
    this.container.nativeElement.attributes.height.value = 2715;
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

  createLine(): any {
    let lineLength = this.elements.lines.length;
    let expressionsLength = this.elements.expressions.length + 1;

    var newLine = {
      id: lineLength,
      y: (this.selection.y / 10 >> 0) * 10 - 10,
      x: (this.selection.x / 20 >> 0) * 20,
      fr: {},
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

  getExpression(el) {
    let ex = this.algebra.getExpression(el);
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
    } else {
      this.mode = "";
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

    this.setGrid();
  }

  //endregion Workspace Buttons //


  //notSaved(array, element), select(event), onClick(ev)
  //region Drag Center //

  notSaved = function (array, element) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return false;
      }
    }
    return true;
  }

  select = function (event, id) {
    let el = this.geo[id];
    if (this.notSaved(this.selected, id)) {
      el.selected = 1;
      el.strokeW = 3;
      if (el.type == "dot" || el.type == "circle") {
        el.r += 2;
      }
      this.selected.push(id);
      this.container.nativeElement.attributes.class.value = "touch";
    } else {
      if (!this.notSaved(this.selected, id)) {
        el.selected = 0;
        el.strokeW = 1;
        if (el.type == "dot" || el.type == "circle") {
          el.r -= 2;
        }
        this.selected.splice(this.selected.indexOf(id), 1);
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
          this.selection.x = x + cs * 20 + 6;
          this.selection.y = y + top * 10 + 16.8;
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
            if (result.data.elements) {
              this.elements = result.data.elements;
            } else {
              this.elements = {
                lines: [],
                fractions: [],
                expressions: [],
                digits: []
              }
            }
            if (result.data.lines) {
              this.lines = result.data.lines;
            } else {
              this.lines = [];
            }

            this.scale = 1;

            this.description = result.data.description;
            this.vw = window.innerWidth;
            this.vh = window.innerHeight;

            this.loading = false;
            this.ref.detectChanges();

            setTimeout(function () {
              this.initUI(1);
            }.bind(this), 10);

          });
      });
  }

  initUI(scale) {
    if (this.container) {
      var container = this.container.nativeElement;
      var selected = this.selected;
      var notSaved = this.notSaved;
      var select = this.select;
      var browser = this.brows();

      this.zoom(scale);

      interact('.svgDraggable')
        .draggable({
          autoScroll: true,
          onstart: function (event) {
            this.setGrid()
          }.bind(this),
          onmove: dragMoveListener.bind(this),
          onend: function (event) {
          }
        }).on("tap", function (event) {
          if (browser.name === "Safari") {
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
          }
        });

      interact('.drag-handler')
        .draggable({
          autoScroll: true,
          onstart: function (event) {
            this.setGrid()
          }.bind(this),
          onmove: expressionDrag.bind(this),
          onend: function (event) {
            var target = event.target;
            this.lines[target.getAttribute('data-lineid')].x = Math.ceil((this.lines[target.getAttribute('data-lineid')].x - 5) / 10) * 10;
            this.lines[target.getAttribute('data-lineid')].y = Math.ceil((this.lines[target.getAttribute('data-lineid')].y - 5) / 10) * 10;
            this.ref.detectChanges();
            this.onClick({
              target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
            });
            this.ref.detectChanges();
          }.bind(this)
        });
    }

    function expressionDrag(event) {
      var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      var cW = Number(container.attributes.width.value);
      var cH = Number(container.attributes.height.value);
      var cA = container.attributes.viewBox.value.split(' ');

      this.lines[target.getAttribute('data-lineid')].x += Number(x) * (cA[2] / cW);
      this.lines[target.getAttribute('data-lineid')].y += Number(y) * (cA[3] / cH);
      this.onClick({
        target: document.querySelectorAll('[data-expressionid="' + this.selection.ex + '"]')[0]
      });
      this.ref.detectChanges();
    }

    function dragMoveListener(event) {
      let id = event.target.getAttribute("data-id");
      let el = this.geo[id];

      var cW = Number(container.attributes.width.value);
      var cH = Number(container.attributes.height.value);
      var cA = container.attributes.viewBox.value.split(' ');

      for (var i = 0; i < this.selected.length; i++) {
        this.geo[this.selected[i]].dx += Number(event.dx) * (cA[2] / cW);
        this.geo[this.selected[i]].x = Math.ceil((this.geo[this.selected[i]].dx - 5) / 10) * 10;
        this.geo[this.selected[i]].dy += Number(event.dy) * (cA[3] / cH);
        this.geo[this.selected[i]].y = Math.ceil((this.geo[this.selected[i]].dy - 5) / 10) * 10;
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