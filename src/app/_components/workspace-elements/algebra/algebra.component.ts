import { Component } from '@angular/core';


@Component({
  selector: '[algebra]',
  templateUrl: './algebra.component.html',
  styleUrls: ['./algebra.component.css'],
  providers: []
})
export class AlgebraComponent {

  line: any;

  constructor() { }

  ex: any;
  di: any;
  fr: any;
  pw: any;
  br: any;

  expressionHTML: any;


  ngOnInit() {

  }


  private getConstants(depth) {
    let widthConst = 16;
    let heightConst = 16;
    let fontConst = 16;
    var diff = 5;
    if (depth > 0) {
      for (let i = 1; i <= depth; i++) {
        diff = diff / i;
        widthConst -= diff;
        heightConst -= diff;
        fontConst -= diff;
      }
    }
    widthConst = widthConst * 1.25;
    heightConst = heightConst * 0.625;
    fontConst = fontConst;
    return { fc: fontConst, wc: widthConst, hc: heightConst, fdc: fontConst / 16, wdc: widthConst / 20, hdc: heightConst / 10 };
  }



  private expression(ex, id, depth) {
    let cst = this.getConstants(depth);
    let height = 2 * cst.hdc;
    let width = 0;
    let top = 0;
    let bottom = 0;
    let html = "";

    let expr = {};
    for (let i = 0; i < ex.cd.length; i++) {
      expr[this.di[ex.cd[i]].pos] = this.di[ex.cd[i]];
      switch (this.di[ex.cd[i]].type) {
        case "fraction": {
          let zn = expr[this.di[ex.cd[i]].pos].zni = this.expression(this.ex[this.fr[this.di[ex.cd[i]].fr].zn], this.fr[this.di[ex.cd[i]].fr].zn, depth);
          let ch = expr[this.di[ex.cd[i]].pos].chi = this.expression(this.ex[this.fr[this.di[ex.cd[i]].fr].ch], this.fr[this.di[ex.cd[i]].fr].ch, depth);


          if (ch.width >= zn.width) {
            let transformX = ((ch.width - zn.width) / 2) * 20;
            if (ch.width <= 1 * cst.wdc) {
              transformX = 0;
            }
            let transformY = ch.height * 10;

            expr[this.di[ex.cd[i]].pos].chtml = '<g data-transformX="' + 0 + '" data-transformY="' + 0 + '" transform="translate(0,0)">' + ch.html + '</g>';
            expr[this.di[ex.cd[i]].pos].zhtml = '<g data-transformX="' + transformX + '" data-transformY="' + transformY + '" transform="translate(' + transformX + ',' + transformY + ')">' + zn.html + '</g>';
          } else {
            let transformX = ((zn.width - ch.width) / 2) * 20;
            if (zn.width <= 1 * cst.wdc) {
              transformX = 0;
            }
            let transformY = ch.height * 10;

            expr[this.di[ex.cd[i]].pos].chtml = '<g data-transformX="' + transformX + '" data-transformY="' + 0 + '" transform="translate(' + transformX + ',0)">' + ch.html + '</g>';
            expr[this.di[ex.cd[i]].pos].zhtml = '<g data-transformX="' + 0 + '" data-transformY="' + transformY + '" transform="translate(0,' + ch.height * 10 + ')">' + zn.html + '</g>';
          }


          if (top < ch.height - 1 * cst.hdc) {
            top = ch.height - 1 * cst.hdc;
          }
          if (bottom < zn.height - 1 * cst.hdc) {
            bottom = zn.height - 1 * cst.hdc;
          }
          height = 2 * cst.hdc + top + bottom;

          break;
        }
        case "power": {
          let zn = expr[this.di[ex.cd[i]].pos].zni = this.expression(this.ex[this.pw[this.di[ex.cd[i]].pw].zn], this.pw[this.di[ex.cd[i]].pw].zn, depth);
          let ch = expr[this.di[ex.cd[i]].pos].chi = this.expression(this.ex[this.pw[this.di[ex.cd[i]].pw].ch], this.pw[this.di[ex.cd[i]].pw].ch, depth + 1);


          let transformX = (zn.width) * 20;
          let transformY = (ch.height - 1 * cst.hdc) * 10;
          expr[this.di[ex.cd[i]].pos].chtml = '<g class="powerCH" data-transformX="' + transformX + '" data-transformY="' + -10 * cst.hdc + '" transform="translate(' + transformX + ', ' + -10 * cst.hdc + ')"><path fill="transparent" stroke-width="' + 1 * cst.wdc + '" stroke-linecap="round" stroke-dasharray="' + 2 * cst.wdc + ',' + 2 * cst.wdc + '" stroke="black" d="M' + 0 + ' ' + ((ch.height - 2 * cst.hdc) * 10 + 8 * cst.hdc) + ' L' + 0 + ' ' + ((ch.height - 2 * cst.hdc) * 10 + 20 * cst.hdc) + ' L' + 15 * cst.wdc + ' ' + ((ch.height - 2 * cst.hdc) * 10 + 20 * cst.hdc) + '" />' + ch.html + '</g>';
          expr[this.di[ex.cd[i]].pos].zhtml = '<g data-transformX="' + 0 + '" data-transformY="' + transformY + '" transform="translate(0,' + transformY + ')">' + zn.html + '</g>';


          if (top < ch.height) {
            top = ch.height;
          }
          if (bottom < zn.bottom) {
            bottom = zn.bottom;
          }
          height = 2 * cst.hdc + top + bottom;
          break;
        }
        case "brackets": {
          let cn = expr[this.di[ex.cd[i]].pos].cni = this.expression(this.ex[this.br[this.di[ex.cd[i]].br].cn], this.br[this.di[ex.cd[i]].br].cn, depth);
          let transformY = (cn.height / 2 - (cn.top - cn.bottom) + ((cn.top - cn.bottom) * (0.5 * cst.hdc))) * 10;
          expr[this.di[ex.cd[i]].pos].cnhtml = '<g data-transformX="' + 0 + '" data-transformY="' + transformY + '" transform="translate(0,' + transformY + ')"><path d="M' + 2.5 * cst.wdc + ' 0 C -' + 2.5 * cst.wdc + ' ' + 5 * cst.hdc + ', -' + 2.5 * cst.wdc + ' ' + (cn.height * 10 - 5 * cst.hdc) + ', ' + 2.5 * cst.wdc + ' ' + cn.height * 10 + '" stroke="black" stroke-width="' + 1.5 * cst.wdc + '" stroke-linecap="round" fill="transparent"/>' + cn.html + '<path d="M' + ((cn.width + cn.fw) * 20 - 2.5 * cst.wdc) + ' 0 C ' + ((cn.width + cn.fw) * 20 + 2.5 * cst.wdc) + ' ' + 5 * cst.hdc + ', ' + ((cn.width + cn.fw) * 20 + 2.5 * cst.wdc) + ' ' + (cn.height * 10 - 5 * cst.hdc) + ', ' + ((cn.width + cn.fw) * 20 - 2.5 * cst.wdc) + ' ' + cn.height * 10 + '" stroke="black" stroke-width="' + 1.5 * cst.wdc + '" stroke-linecap="round" fill="transparent"/></g>';

          if (top < cn.top) {
            top = cn.top;
          }
          if (bottom < cn.bottom) {
            bottom = cn.bottom;
          }

          height = 2 * cst.hdc + top + bottom;
          break;
        }
        case "powerWbrackets": {
          let zn = expr[this.di[ex.cd[i]].pos].zni = this.expression(this.ex[this.br[this.di[ex.cd[i]].br].cn], this.br[this.di[ex.cd[i]].br].cn, depth);
          let ch = expr[this.di[ex.cd[i]].pos].chi = this.expression(this.ex[this.pw[this.di[ex.cd[i]].pw].ch], this.pw[this.di[ex.cd[i]].pw].ch, depth + 1);


          let transformX = (zn.width) * 20;
          let transformY = (ch.height - 1 * cst.hdc) * 10;
          expr[this.di[ex.cd[i]].pos].chtml = '<g class="powerCH" data-transformX="' + transformX + '" data-transformY="' + -10 * cst.hdc + '" transform="translate(' + transformX + ', ' + -10 * cst.hdc + ')"><path fill="transparent" stroke-width="' + 1 * cst.wdc + '" stroke-linecap="round" stroke-dasharray="' + 2 * cst.wdc + ',' + 2 * cst.wdc + '" stroke="black" d="M' + 0 + ' ' + ((ch.height - 2 * cst.hdc) * 10 + 5 * cst.hdc) + ' L' + 0 + ' ' + ((ch.height - 2 * cst.hdc) * 10 + 20 * cst.hdc) + ' L' + 15 * cst.wdc + ' ' + ((ch.height - 2 * cst.hdc) * 10 + 20 * cst.hdc) + '" />' + ch.html + '</g>';
          expr[this.di[ex.cd[i]].pos].zhtml = '<g data-transformX="' + 0 + '" data-transformY="' + transformY + '" transform="translate(0,' + transformY + ')"><path d="M' + 2.5 * cst.wdc + ' 0 C -' + 2.5 * cst.wdc + ' ' + 5 * cst.hdc + ', -' + 2.5 * cst.wdc + ' ' + (zn.height * 10 - 5 * cst.hdc) + ', ' + 2.5 * cst.wdc + ' ' + zn.height * 10 + '" stroke="black" stroke-width="' + 1.5 * cst.wdc + '" stroke-linecap="round" fill="transparent"/>' + zn.html + '<path d="M' + ((zn.width + zn.fw) * 20 - 2.5 * cst.wdc) + ' 0 C ' + ((zn.width + zn.fw) * 20 + 2.5 * cst.wdc) + ' ' + 5 * cst.hdc + ', ' + ((zn.width + zn.fw) * 20 + 2.5 * cst.wdc) + ' ' + (zn.height * 10 - 5 * cst.hdc) + ', ' + ((zn.width + zn.fw) * 20 - 2.5 * cst.wdc) + ' ' + zn.height * 10 + '" stroke="black" stroke-width="' + 1.5 * cst.wdc + '" stroke-linecap="round" fill="transparent"/></g>';


          if (top < ch.height + zn.height / 2 - 1 * cst.hdc) {
            top = ch.height + zn.height / 2 - 1 * cst.hdc;
          }
          if (bottom < zn.height / 2 - 1 * cst.hdc) {
            bottom = zn.height / 2 - 1 * cst.hdc;
          }
          height = 2 * cst.hdc + top + bottom;
          break;
        }
        case "digit":
          if (height < 2 * cst.hdc) {
            height += 2 * cst.hdc;
          }
          break;
        case "operator":
          if (height < 2 * cst.hdc) {
            height += 2 * cst.hdc;
          }
          break;

        default:
          break;
      }
    }
    for (let i = 1; i <= ex.cd.length; i++) {
      switch (expr[i].type) {
        case "fraction": {
          let line;

          if (expr[i].chi.width >= expr[i].zni.width) {
            let fw = 0;
            if (expr[i].chi.width < 1 * cst.wdc) {
              fw = 1 * cst.wdc;
            }
            line = '<line data-type="line" style="stroke-linecap:round;" x1="' + -1 * cst.wdc + '" y1="' + expr[i].chi.height * 10 + '" x2="' + Number((expr[i].chi.width + fw + 1 * cst.wdc) * 20 + 1 - 10) + '" y2="' + expr[i].chi.height * 10 + '" stroke="black" stroke-width="' + 2 * cst.wdc + '" />'
          } else {
            let fw = 0;
            if (expr[i].zni.width < 1 * cst.wdc) {
              fw = 1 * cst.wdc;
            }
            line = '<line data-type="line" style="stroke-linecap:round;" x1="' + -1 * cst.wdc + '" y1="' + expr[i].chi.height * 10 + '" x2="' + Number((expr[i].zni.width + fw + 1 * cst.wdc) * 20 + 1 - 10) + '" y2="' + expr[i].chi.height * 10 + '" stroke="black" stroke-width="' + 2 * cst.wdc + '" />'
          }

          html = html + '<g data-transformX="' + (width) * 20 + '" data-transformY="' + (top - expr[i].chi.height + 1 * cst.hdc) * 10 + '" transform="translate(' + (width) * 20 + ',' + (top - expr[i].chi.height + 1 * cst.hdc) * 10 + ')">' + expr[i].chtml + expr[i].zhtml + line + '</g>';
          if (expr[i].zni.width == expr[i].chi.width) {
            if (expr[i].zni.width > 0) {
              width += expr[i].zni.width + 1 * cst.wdc;
            } else {
              width += expr[i].zni.width + 2 * cst.wdc;
            }

          } else {
            if (expr[i].zni.width > expr[i].chi.width) {
              width += expr[i].zni.width + 1 * cst.wdc;
            } else {
              width += expr[i].chi.width + 1 * cst.wdc;
            }
          }

          break;
        }
        case "power": {
          html = html + '<g data-transformX="' + (width) * 20 + '" data-transformY="' + (top - expr[i].chi.height + 1 * cst.hdc) * 10 + '" transform="translate(' + (width) * 20 + ',' + (top - expr[i].chi.height + 1 * cst.hdc) * 10 + ')">' + expr[i].chtml + expr[i].zhtml + '</g>';
          if (expr[i].chi.width < 1 * cst.wdc) {
            width += expr[i].zni.width + expr[i].chi.width + 1;
          } else {
            width += expr[i].zni.width + expr[i].chi.width;
          }
          break;
        }
        case "powerWbrackets": {
          html = html + '<g data-transformX="' + (width) * 20 + '" data-transformY="' + (top - expr[i].chi.height - (expr[i].zni.height / 2) + 2 * cst.hdc) * 10 + '" transform="translate(' + (width) * 20 + ',' + (top - expr[i].chi.height - (expr[i].zni.height / 2) + 2 * cst.hdc) * 10 + ')">' + expr[i].chtml + expr[i].zhtml + '</g>';
          if (expr[i].chi.width < 1 * cst.wdc) {
            width += expr[i].zni.width + expr[i].chi.width + 1;
          } else {
            width += expr[i].zni.width + expr[i].chi.width;
          }
          break;
        }
        case "brackets": {
          html = html + '<g data-transformX="' + (width) * 20 + '" data-transformY="' + (top - expr[i].cni.height + 1 * cst.hdc) * 10 + '" transform="translate(' + (width) * 20 + ',' + (top - expr[i].cni.height + 1 * cst.hdc) * 10 + ')">' + expr[i].cnhtml + '</g>';
          if (expr[i].cni.width < 1 * cst.wdc) {
            width += expr[i].cni.width + 1;
          } else {
            width += expr[i].cni.width;
          }
          break;
        }
        case "digit":
          html += '<text x="' + (width * 20 + expr[i].s * cst.hdc * 3) + '" class="textForSave" y = "' + (top * 10 + ((17 / 10) * cst.hdc) * 10) + '" font-family = "Comic Sans MS" font-size = "' + cst.fc * 1.25 + '">' + expr[i].value + '</text>';
          html += '<text data-type="di" data-lineid="' + this.line.id + '" data-digitid="' + expr[i].id + '" x="' + (width * 20 + expr[i].s * cst.hdc * 3) + '" class="element regularText" y = "' + (top * 10 + ((17 / 10) * cst.hdc) * 10) + '" font-family = "scwlsWorkspace" font-size = "' + cst.fc + '">' + expr[i].text + '</text>';
          width += expr[i].s * cst.hdc;
          break;
        case "operator":
          html += '<text x="' + (width * 20 + expr[i].s * cst.hdc * 2) + '" class="textForSave" y = "' + (top * 10 + ((17.5 / 10) * cst.hdc) * 10) + '" font-family = "Comic Sans MS" font-size = "' + cst.fc * 1.25 + '">' + expr[i].value + '</text>';
          html += '<text data-type="op" x="' + (width * 20 + expr[i].s * cst.hdc * 2) + '" class="element regularText" y = "' + (top * 10 + ((17.5 / 10) * cst.hdc) * 10) + '" font-family = "scwlsWorkspace" font-size = "' + cst.fc + '">' + expr[i].text + '</text>';
          width += expr[i].s * cst.hdc;
          break;

        default:
          break;
      }
    }

    let fw = 0;
    if (width < 1 * cst.wdc) {
      fw = 1 * cst.wdc;
    }

    html = '<rect fill="transparent" stroke-width="' + 1.5 * cst.wdc + '" data-fdc="' + cst.fdc + '" data-wdc="' + cst.wdc + '" data-hdc="' + cst.hdc + '" data-type="ex" data-expressionid="' + id + '" data-lineid="' + this.line.id + '" data-top="' + top + '" data-cs="' + width + '" x="0" class="expression" y = "0" width="' + ((width + fw + 1 * cst.wdc) * 20 - ((10 / 20) * cst.wdc) * 20) + '" height="' + height * 10 + '"/>' + html;
    if (ex.cn == 1) {
      width += 0.5 * cst.wdc
    }
    return { height: height, width: width, fw: fw, top: top, bottom: bottom, html: html }
  }

  getExpression(line) {
    this.line = line;
    this.ex = this.line.ex;
    this.di = this.line.di;
    this.fr = this.line.fr;
    this.pw = this.line.pw;
    this.br = this.line.br;
    let dragHandler = `<g transform="translate(-20, -20)" class="drag-handler" data-lineID="` + this.line.id + `"><path data-lineID="` + this.line.id + `" fill="none" stroke = "none" class="handler" d="M20,12.5c0,2,0,7.5,0,7.5s-5.4,0-7.5,0C8.4,20,5,16.6,5,12.5S8.4,5,12.5,5S20,8.4,20,12.5z"/>
    <line data-lineID="` + this.line.id + `" fill="none" stroke = "none" class="arrow" x1="12.5" y1="7.5" x2="12.5" y2="17.5"/>
    <line data-lineID="` + this.line.id + `" fill="none" stroke = "none" class="arrow" x1="7.5" y1="12.5" x2="17.5" y2="12.5"/>
    <line data-lineID="` + this.line.id + `" fill="none" stroke = "none" class="arrow" x1="12.5" y1="7.5" x2="11.2" y2="10"/>
    <line data-lineID="` + this.line.id + `" fill="none" stroke = "none" class="arrow" x1="13.7" y1="10" x2="12.5" y2="7.5"/>
    <line data-lineID="` + this.line.id + `" fill="none" stroke = "none" class="arrow" x1="7.5" y1="12.5" x2="10" y2="11.2"/>
    <line data-lineID="` + this.line.id + `" fill="none" stroke = "none" class="arrow" x1="10.1" y1="13.7" x2="7.5" y2="12.5"/>
    <line data-lineID="` + this.line.id + `" fill="none" stroke = "none" class="arrow" x1="12.5" y1="17.5" x2="11.2" y2="15"/>
    <line data-lineID="` + this.line.id + `" fill="none" stroke = "none" class="arrow" x1="13.7" y1="15" x2="12.5" y2="17.5"/>
    <line data-lineID="` + this.line.id + `" fill="none" stroke = "none" class="arrow" x1="17.5" y1="12.5" x2="15" y2="11.2"/>
    <line data-lineID="` + this.line.id + `" fill="none" stroke = "none" class="arrow" x1="15" y1="13.7" x2="17.5" y2="12.5"/></g>`;

    let zhtml = '<g class="line-element" data-transformX="' + this.line.x + '" data-transformY="' + this.line.y + '" transform="translate(' + this.line.x + ',' + this.line.y + ')">' + dragHandler + this.expression(this.ex[this.ex[0].ce[0]], this.ex[0].ce[0], 0).html + '</g>';
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
