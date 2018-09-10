import { Component, OnInit, Input } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';


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

  expressionHTML: any;


  ngOnInit() {

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
      //console.log(ex.cd);
      switch (this.di[ex.cd[i]].type) {
        case "fraction": {
          let zn = expr[this.di[ex.cd[i]].pos].zni = this.expression(this.ex[this.fr[this.di[ex.cd[i]].fr].zn], this.fr[this.di[ex.cd[i]].fr].zn);
          let ch = expr[this.di[ex.cd[i]].pos].chi = this.expression(this.ex[this.fr[this.di[ex.cd[i]].fr].ch], this.fr[this.di[ex.cd[i]].fr].ch);


          if (ch.width >= zn.width) {
            let transformX = ((ch.width - zn.width) / 2) * 20;
            let transformY = ch.height * 10;

            expr[this.di[ex.cd[i]].pos].chtml = '<g data-transformX="' + 0 + '" data-transformY="' + 0 + '" transform="translate(0,0)">' + ch.html + '</g>';
            expr[this.di[ex.cd[i]].pos].zhtml = '<g onclick="console.log(`keke`)" data-transformX="' + transformX + '" data-transformY="' + transformY + '" transform="translate(' + transformX + ',' + transformY + ')">' + zn.html + '</g>';
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
        }
        case "power": {
          let zn = expr[this.di[ex.cd[i]].pos].zni = this.expression(this.ex[this.pw[this.di[ex.cd[i]].pw].zn], this.pw[this.di[ex.cd[i]].pw].zn);
          let ch = expr[this.di[ex.cd[i]].pos].chi = this.expression(this.ex[this.pw[this.di[ex.cd[i]].pw].ch], this.pw[this.di[ex.cd[i]].pw].ch);


          let transformX = (zn.width) * 20;
          //let transformY = ch.height * 10;
          console.log(zn)
          expr[this.di[ex.cd[i]].pos].chtml = '<g data-transformX="' + transformX + '" data-transformY="' + 0 + '" transform="translate(' + transformX + ',0)">' + ch.html + '</g>';
          expr[this.di[ex.cd[i]].pos].zhtml = '<g data-transformX="' + 0 + '" data-transformY="' + 10 + '" transform="translate(0,' + 10 + ')">' + zn.html + '</g>';


          if (top < ch.height - 1) {
            top = ch.height - 1;
          }
          /*if (bottom < zn.height - 1) {
            bottom = zn.height - 1;
          }*/
          height = top + zn.height;

          break;
        }
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
        case "fraction": {
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
        }
        case "power": {
          html = html + '<g data-transformX="' + (width) * 20 + '" data-transformY="' + (top - expr[i].chi.height + 1) * 10 + '" transform="translate(' + (width) * 20 + ',' + (top - expr[i].chi.height + 1) * 10 + ')">' + expr[i].chtml + expr[i].zhtml + '</g>';

          width += expr[i].zni.width + expr[i].chi.width + 1;
          break;
        }
        case "digit":
          html += '<text x="' + (width * 20 + expr[i].s * 3) + '" class="textForSave" y = "' + (top * 10 + 17) + '" font-family = "Comic Sans MS" font-size = "20">' + expr[i].value + '</text>';
          html += '<text data-type="di" data-lineid="' + this.line.id + '" data-digitid="' + expr[i].id + '" x="' + (width * 20 + expr[i].s * 3) + '" class="element regularText" y = "' + (top * 10 + 17) + '" font-family = "scwlsWorkspace" font-size = "0">' + expr[i].text + '</text>';
          width += expr[i].s;
          break;
        case "operator":
          html += '<text x="' + (width * 20 + expr[i].s * 2) + '" class="textForSave" y = "' + (top * 10 + 17.5) + '" font-family = "Comic Sans MS" font-size = "20">' + expr[i].value + '</text>';
          html += '<text data-type="op" x="' + (width * 20 + expr[i].s * 2) + '" class="element regularText" y = "' + (top * 10 + 17.5) + '" font-family = "scwlsWorkspace" font-size = "0">' + expr[i].text + '</text>';
          width += expr[i].s;
          break;

        default:
          break;
      }
    }

    html = '<rect fill="transparent" data-type="ex" data-expressionid="' + id + '" data-lineid="' + this.line.id + '" data-top="' + top + '" data-cs="' + width + '" x="0" class="expression" y = "0" width="' + (width + 1) * 20 + '" height="' + height * 10 + '"/>' + html;
    return { height: height, width: width, top: top, bottom: bottom, html: html }
  }

  getExpression(line) {
    this.line = line;
    this.ex = this.line.ex;
    this.di = this.line.di;
    this.fr = this.line.fr;
    this.pw = this.line.pw;
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

    let zhtml = '<g class="line-element" data-transformX="' + this.line.x + '" data-transformY="' + this.line.y + '" transform="translate(' + this.line.x + ',' + this.line.y + ')">' + dragHandler + this.expression(this.ex[this.ex[0].ce[0]], this.ex[0].ce[0]).html + '</g>';
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
