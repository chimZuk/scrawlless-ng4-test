import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'algebra',
  templateUrl: './algebra.component.html',
  styleUrls: ['./algebra.component.css']
})
export class AlgebraComponent {

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
      pe: 1,
      pd: 3,
      fr: 1,
      ch: 0, zn: 1, osn: 0,
      s: 8,
      cs: 4,
      ce: [10],
      cd: [16]
    },
    4: {
      line: 0,
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

  di: any = {
    0: {
      line: 0,
      pos: 0,
      pe: 0,
      s: 0,
      value: "",
      text: "",
      type: null
    },
    1: {
      line: 0,
      pe: 1,
      s: 2,
      pos: 1,
      value: "-1",
      text: "&#xe90b;&#xe900;",
      type: "digit"
    },
    2: {
      line: 0,
      pe: 1,
      s: 1,
      pos: 2,
      value: "+",
      text: "&#xe90a;",
      type: "operator"
    },
    3: {
      line: 0,
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
      pe: 1,
      s: 1,
      pos: 5,
      value: "8",
      text: "&#xe907;",
      type: "digit"
    },
    6: {
      line: 0,
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
      pe: 2,
      s: 1,
      pos: 1,
      value: "2",
      text: "&#xe901;",
      type: "digit"
    },
    8: {
      line: 0,
      pe: 2,
      s: 1,
      pos: 2,
      value: "-",
      text: "&#xe90b;",
      type: "operator"
    },
    9: {
      line: 0,
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
      pe: 4,
      s: 1,
      pos: 1,
      value: "4",
      text: "&#xe903;",
      type: "digit"
    },
    11: {
      line: 0,
      pe: 5,
      s: 1,
      pos: 1,
      value: "5",
      text: "&#xe904;",
      type: "digit"
    },
    12: {
      line: 0,
      pe: 5,
      s: 1,
      pos: 2,
      value: "*",
      text: "&#xe90c;",
      type: "operator"
    },
    13: {
      line: 0,
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
      pe: 6,
      s: 1,
      pos: 1,
      value: "6",
      text: "&#xe905;",
      type: "digit"
    },
    15: {
      line: 0,
      pe: 7,
      s: 1,
      pos: 1,
      value: "7",
      text: "&#xe906;",
      type: "digit"
    },
    16: {
      line: 0,
      pe: 3,
      s: 1,
      pos: 1,
      value: "3",
      text: "&#xe902;",
      type: "digit"
    },
    17: {
      line: 0,
      pe: 8,
      s: 1,
      pos: 1,
      value: "8",
      text: "&#xe907;",
      type: "digit"
    },
    18: {
      line: 0,
      pe: 9,
      s: 1,
      pos: 1,
      value: "9",
      text: "&#xe908;",
      type: "digit"
    }
  }

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

  private makeRoot(x, y, width, height, powerWidth) {
    let yDiff = 4.5 + 10;
    let xDiff = 3.5;

    let finalHeight = ((height / 2) - 1) * 20;
    let finalWidth = (width - 1) * 20;
    let finalPowerWidth = (powerWidth - 1) * 20;

    let r1 = '<line class="st0" x1="' + (x + (1000 * 0.02) - xDiff) + '" y1="' + (y + (50 * 0.02) - yDiff) + '" x2="' + (x + (1000 * 0.02) - xDiff) + '" y2="' + (y + finalHeight + (1300 * 0.02) - yDiff) + '"/>';
    let r2 = '<line class="st0" x1="' + (x + (1000 * 0.02) - xDiff) + '" y1="' + (y + (50 * 0.02) - yDiff) + '" x2="' + (x + finalWidth + (2350 * 0.02) - xDiff) + '" y2="' + (y + (50 * 0.02) - yDiff) + '"/>';
    let r3 = '<line class="st0" x1="' + (x + (100 * 0.02) - xDiff) + '" y1="' + (y + finalHeight + (800 * 0.02) - yDiff) + '" x2="' + (x + (850 * 0.02) - xDiff) + '" y2="' + (y + finalHeight + (800 * 0.02) - yDiff) + '"/>';
    let r4 = '<line class="st0" x1="' + (x + (1000 * 0.02) - xDiff) + '" y1="' + (y + finalHeight + (1300 * 0.02) - yDiff) + '" x2="' + (x + (850 * 0.02) - xDiff) + '" y2="' + (y + finalHeight + (800 * 0.02) - yDiff) + '"/>';
    let r5 = '<line class="st0" x1="' + (x + finalWidth + (2350 * 0.02) - xDiff) + '" y1="' + (y + (300 * 0.02) - yDiff) + '" x2="' + (x + finalWidth + (2350 * 0.02) - xDiff) + '" y2="' + (y + (50 * 0.02) - yDiff) + '"/>';
    return r1 + r2 + r3 + r4 + r5;
  }

  private makePower(width, height, powerWidth, base, power) {
    let yDiff = 4.5 + 10;
    let xDiff = 3.5;

    let finalHeight = ((height / 2) - 1) * 20;
    let finalWidth = (width - 1) * 20;
    let finalPowerWidth = (powerWidth - 1) * 10;


    let Power = '<text transform="matrix(1 0 0 1 ' + 663.9404 * 0.02 + ' ' + (425.9985 * 0.02 - 5) + ')" class="st1 st2">' + power + '</text>';
    let Base = '<text transform="matrix(1 0 0 1 1 ' + (1093.9971 * 0.02 - 5) + ')" class="st1 st4">' + base + '</text>';

    let PowerSelection = '<rect x="' + (625 * 0.02 + finalWidth) + '" y = "' + (-5) + '" class="st3" width="' + (375 * 0.02 + finalPowerWidth) + '" height="' + 500 * 0.02 + '"/>';
    let BaseSelection = '<rect x="0" class="st3" y = "' + (-5) + '" width="' + (1001 * 0.02 + finalWidth + finalPowerWidth) + '" height="' + (1250 * 0.02 + finalHeight) + '"/>';
    return BaseSelection + Base + PowerSelection + Power;
  }

  private expression(ex) {
    let height = 2;
    let width = 0;
    let top = 0;
    let bottom = 0;

    let html = "";

    for (let i = 0; i < ex.cd.length; i++) {
      switch (this.di[ex.cd[i]].type) {
        case "fraction":
          let zn = this.expression(this.ex[this.fr[this.di[ex.cd[i]].fr].zn]);
          let ch = this.expression(this.ex[this.fr[this.di[ex.cd[i]].fr].ch]);

          let chtml = '<g transform="translate(0,0)">' + ch.html + '</g>';
          let zhtml = '<g transform="translate(0,' + ch.height * 10 + ')">' + zn.html + '</g>';
          let line;

          if (ch.width >= zn.width) {
            line = '<line style="stroke-linecap:round;" x1="-2" y1="' + ch.height * 10 + '" x2="' + Number((ch.width) * 20 + 2) + '" y2="' + ch.height * 10 + '" stroke="black" stroke-width="2" />'
          } else {
            line = '<line style="stroke-linecap:round;" x1="-2" y1="' + ch.height * 10 + '" x2="' + Number((zn.width) * 20 + 2) + '" y2="' + ch.height * 10 + '" stroke="black" stroke-width="2" />'
          }

          if (top < ch.height - 1) {
            top = ch.height - 1;
          }
          if (bottom < zn.height - 1) {
            bottom = zn.height - 1;
          }
          height = 2 + top + bottom;
          html = html + '<g transform="translate(' + (width) * 20 + ',' + (top - ch.height + 1) * 10 + ')">' + chtml + zhtml + line + '</g>';


          if (zn.width >= ch.width) {
            width += zn.width;
          } else {
            width += ch.width;
          }

          break;
        case "digit":
          html += '<rect x="' + (width * 20) + '" class="st3" y = "0" width="' + this.di[ex.cd[i]].s * 20 + '" height="20"/>';
          width += this.di[ex.cd[i]].s;
          if (height < 2) {
            height += 2;
          }
          break;
        case "operator":
          html += '<rect x="' + (width * 20) + '" class="st3" y = "0" width="20" height="20"/>';
          width += this.di[ex.cd[i]].s;
          if (height < 2) {
            height += 2;
          }
          break;

        default:
          break;
      }
    }

    return { height: height, width: width, top: top, bottom: bottom, html: html }
  }


  getRoot(x, y, width, height, powerWidth) {
    console.log(this.makeRoot(x, y, width, height, powerWidth))
    return this.makeRoot(x, y, width, height, powerWidth);
  }


  getPower(width, height, powerWidth, base, power) {
    console.log(this.makePower(width, height, powerWidth, base, power))
    return this.makePower(width, height, powerWidth, base, power);
  }

  getExpression() {
    let zhtml = '<g transform="translate(0,200)">' + this.expression(this.ex[1]).html + '</g>';
    return zhtml;
  }

  constructor() { }

  ngOnInit() {
  }

}
