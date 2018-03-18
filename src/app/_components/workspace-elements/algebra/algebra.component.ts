import { Component, OnInit, Input } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: '[algebra]',
  templateUrl: './algebra.component.html',
  styleUrls: ['./algebra.component.css'],
  providers: [ ]
})
export class AlgebraComponent {

  line: any;

  constructor() { }

  ex: any;
  di: any;
  fr: any;

  expressionHTML: any;


  ngOnInit() {
  
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

  private expression(ex, id) {
    let height = 2;
    let width = 0;
    let top = 0;
    let bottom = 0;
    let html = "";

    let expr = {};

    for (let i = 0; i < ex.cd.length; i++) {
      expr[this.di[ex.cd[i]].pos] = this.di[ex.cd[i]];

      switch (this.di[ex.cd[i]].type) {
        case "fraction":
          let zn = expr[this.di[ex.cd[i]].pos].zni = this.expression(this.ex[this.fr[this.di[ex.cd[i]].fr].zn], this.fr[this.di[ex.cd[i]].fr].zn);
          let ch = expr[this.di[ex.cd[i]].pos].chi = this.expression(this.ex[this.fr[this.di[ex.cd[i]].fr].ch], this.fr[this.di[ex.cd[i]].fr].ch);


          if (ch.width >= zn.width) {
            let transformX = ((ch.width - zn.width) / 2) * 20;
            let transformY = ch.height * 10;

            expr[this.di[ex.cd[i]].pos].chtml = '<g data-transformX="' + 0 + '" data-transformY="' + 0 + '" transform="translate(0,0)">' + ch.html + '</g>';
            expr[this.di[ex.cd[i]].pos].zhtml = '<g data-transformX="' + transformX + '" data-transformY="' + transformY + '" transform="translate(' + transformX + ',' + transformY + ')">' + zn.html + '</g>';
          } else {
            let transformX = ((zn.width - ch.width) / 2) * 20
            let transformY = ch.height * 10;

            expr[this.di[ex.cd[i]].pos].chtml = '<g data-transformX="' + transformX + '" data-transformY="' + 0 + '" transform="translate(' + ((zn.width - ch.width) / 2) * 20 + ',0)">' + ch.html + '</g>';
            expr[this.di[ex.cd[i]].pos].zhtml = '<g data-transformX="' + 0 + '" data-transformY="' + transformY + '" transform="translate(0,' + ch.height * 10 + ')">' + zn.html + '</g>';
          }


          if (top < ch.height - 1) {
            top = ch.height - 1;
          }
          if (bottom < zn.height - 1) {
            bottom = zn.height - 1;
          }
          height = 2 + top + bottom;

          break;
        case "digit":
          if (height < 2) {
            height += 2;
          }
          break;
        case "operator":
          if (height < 2) {
            height += 2;
          }
          break;

        default:
          break;
      }
    }
    for (let i = 1; i <= ex.cd.length; i++) {

      switch (expr[i].type) {
        case "fraction":
          let line;

          if (expr[i].chi.width >= expr[i].zni.width) {
            line = '<line data-type="line" style="stroke-linecap:round;" x1="-1" y1="' + expr[i].chi.height * 10 + '" x2="' + Number((expr[i].chi.width + 1) * 20 + 1) + '" y2="' + expr[i].chi.height * 10 + '" stroke="black" stroke-width="2" />'
          } else {
            line = '<line data-type="line" style="stroke-linecap:round;" x1="-1" y1="' + expr[i].chi.height * 10 + '" x2="' + Number((expr[i].zni.width + 1) * 20 + 1) + '" y2="' + expr[i].chi.height * 10 + '" stroke="black" stroke-width="2" />'
          }

          html = html + '<g data-transformX="' + (width) * 20 + '" data-transformY="' + (top - expr[i].chi.height + 1) * 10 + '" transform="translate(' + (width) * 20 + ',' + (top - expr[i].chi.height + 1) * 10 + ')">' + expr[i].chtml + expr[i].zhtml + line + '</g>';

          if (expr[i].zni.width >= expr[i].chi.width) {
            width += expr[i].zni.width + 1;
          } else {
            width += expr[i].chi.width + 1;
          }
          break;
        case "digit":
          html += '<text data-type="di" x="' + (width * 20 + expr[i].s * 3) + '" class="element" y = "' + (top * 10 + 17) + '" font-family = "scwlsWorkspace" font-size = "16">' + expr[i].text + '</text>';
          width += expr[i].s;
          break;
        case "operator":
          html += '<text data-type="di" x="' + (width * 20 + expr[i].s * 2) + '" class="element" y = "' + (top * 10 + 17.5) + '" font-family = "scwlsWorkspace" font-size = "16">' + expr[i].text + '</text>';
          width += expr[i].s;
          break;

        default:
          break;
      }
    }

    html = '<rect data-type="ex" data-expressionid="' + id + '" data-lineid="' + this.line.id + '" data-top="' + top + '" data-cs="' + width + '" x="0" class="expression" y = "0" width="' + (width + 1) * 20 + '" height="' + height * 10 + '"/>' + html;
    return { height: height, width: width, top: top, bottom: bottom, html: html }
  }

  getExpression(line) {
    this.line = line;
    this.ex = this.line.ex;
    this.di = this.line.di;
    this.fr = this.line.fr;
    let zhtml = '<g data-transformX="' + this.line.x + '" data-transformY="' + this.line.y + '" transform="translate(' + this.line.x + ',' + this.line.y + ')">' + this.expression(this.ex[1], 1).html + '</g>';
    //console.log(zhtml);
    return zhtml;
  }

  elX(ex) {
    let x = 0;
    let p = ex.parentNode;
    while (p.getAttribute("transform") != null) {
      x += Number(p.getAttribute("data-transformx"));
      p = p.parentNode;
    }
    return x;
  }

  elY(ex) {
    let y = 0;
    let p = ex.parentNode;
    while (p.getAttribute("transform") != null) {
      y += Number(p.getAttribute("data-transformy"));
      p = p.parentNode;
    }
    return y;
  }

}
