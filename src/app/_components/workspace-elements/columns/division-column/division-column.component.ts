import { Component, ViewChildren, Output, Input, EventEmitter } from '@angular/core';
import { MdMenu, MdMenuTrigger, MdButton } from '@angular/material';

@Component({
  selector: 'division-column',
  templateUrl: './division-column.component.html',
  styleUrls: ['./division-column.component.css'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class DivisionColumnComponent {

  data: any;
  operation: string;
  operator: string = '÷';

  splittedTermList: any;

  res: string = '';

  selected: any[];

  tempElement: number = 0;
  tempLine: number = 0;
  tempTrigger: string;

  key: any;
  isIntermediate: boolean = false;
  isEnterAllowed: boolean = false;

  nonCenteredLeftMenu: boolean;
  nonCenteredRightMenu: boolean;
  remMenu: boolean;

  inputButtons: any[] = [];

  getArr = function (i) {
    if (i > 0) {
      return new Array(i);
    } else {
      return new Array(0);
    }
  }


  constructor() {
    [7, 8, 9, 4, 5, 6, 1, 2, 3].forEach(element => {
      this.inputButtons.push({
        value: element,
        class: 'regular'
      });
    });
    this.inputButtons.push({
      value: '',
      class: 'cancel'
    });
    this.inputButtons.push({
      value: 0,
      class: 'regular'
    });
    this.inputButtons.push({
      value: '',
      class: 'done'
    });
  }

  ngOnInit() { }


  @Input()
  set setOperation(data: string) {
    this.operation = data;
  }
  get setOperation() { return this.operation; }

  @Input()
  set terms(data: any) {
    this.data = data;
    this.resetTerms();
  }
  get terms() { return this.terms; }

  resetTerms() {
    var tempMas: string[][] = [];

    this.splittedTermList = {
      isDot: 0,
      isResultDot: 0,
      beforeDot: 0,
      afterDot: 0,
      beforeResultDot: 0,
      afterResultDot: 0,
      numbersArray: [],
      intermediate: {
        result: [],
        remember: [],
        selected: []
      },
      remember: [],
      empty: 0,
      result: [],
      selected: []
    };

    for (var i = 0; i < this.data.length; i++) {
      tempMas.push(String(this.data[i]).split(''));

      this.splittedTermList.numbersArray.push({
        isDot: 0,
        beforeDot: 0,
        afterDot: 0,
        termsArray: []
      });


      for (var j = 0; j < tempMas[i].length; j++) {
        if (tempMas[i][j] == '.' || tempMas[i][j] == ',') {
          this.splittedTermList.isDot = this.splittedTermList.numbersArray[i].isDot = 1;
          this.splittedTermList.numbersArray[i].termsArray[j - 1].isDotted = true;
          this.splittedTermList.numbersArray[i].termsArray[j - 1].isPermanentDotted = true;
        } else {
          if (tempMas[i][j] == '-') {
          } else {
            if (this.splittedTermList.numbersArray[i].isDot) {
              this.splittedTermList.numbersArray[i].termsArray.push({
                value: tempMas[i][j],
                type: 'number',
                isDotted: false,
                isPermanentDotted: false,
                beforeDot: true
              });
              this.splittedTermList.numbersArray[i].beforeDot++;
            } else {
              this.splittedTermList.numbersArray[i].termsArray.push({
                value: tempMas[i][j],
                type: 'number',
                isDotted: false,
                isPermanentDotted: false,
                beforeDot: false
              });
              this.splittedTermList.numbersArray[i].afterDot++;
            }
          }
        }
      }
    }

    var forI = this.splittedTermList.numbersArray[1].termsArray.length;
    var forJ = this.splittedTermList.numbersArray[0].termsArray.length;

    if (forI - forJ > -1) {
      this.splittedTermList.numbersArray[0].termsArray[forJ - 1].isDotted = true;
      this.splittedTermList.numbersArray[0].termsArray[forJ - 1].isPermanentDotted = true;
      this.splittedTermList.numbersArray[0].termsArray.push({
        value: '0',
        type: 'number',
        isDotted: false,
        isPermanentDotted: false,
        beforeDot: true
      });
      this.splittedTermList.numbersArray[0].beforeDot++;
      for (var i = 0; i < forI - forJ; i++) {
        this.splittedTermList.numbersArray[0].termsArray.push({
          value: '0',
          type: 'number',
          isDotted: false,
          isPermanentDotted: false,
          beforeDot: true
        });
        this.splittedTermList.numbersArray[0].beforeDot++;
      }
    }

    this.splittedTermList.beforeDot = this.splittedTermList.numbersArray[this.largestBeforeDot()].beforeDot;
    this.splittedTermList.afterDot = this.splittedTermList.numbersArray[0].termsArray.length - this.splittedTermList.numbersArray[0].beforeDot;

    this.resetField();
  }

  getDivMas() {
    var mas = [];
    for (var i = 1; i < this.splittedTermList.intermediate.result.length; i++) {
      mas.push(String(i));
    }
    return mas;
  }

  pushIntermediate(empty) {
    var forI = this.splittedTermList.numbersArray[1].termsArray.length + 1;
    var mul = [];
    var sub = [];
    if (this.splittedTermList.isDot) {
      for (var i = 0; i < forI; i++) {
        mul.push({
          value: '',
          type: 'number',
          isFresh: true,
          isDotted: true,
          isPermanentDotted: false,
          isFreshDot: false,
          beforeDot: false
        });
        sub.push({
          value: '',
          type: 'number',
          isFresh: true,
          isDotted: true,
          isPermanentDotted: false,
          isFreshDot: false,
          beforeDot: false
        });
      }
    } else {
      for (var i = 0; i < forI; i++) {
        mul.push({
          value: '',
          type: 'number',
          isFresh: true,
          isDotted: false,
          isPermanentDotted: false,
          isFreshDot: false,
          beforeDot: false
        });
        sub.push({
          value: '',
          type: 'number',
          isFresh: true,
          isDotted: false,
          isPermanentDotted: false,
          isFreshDot: false,
          beforeDot: false
        });
      }
    }


    this.splittedTermList.intermediate.result.push({
      multiplication: mul,
      subtraction: sub,
      empty: empty
    });
  }

  resetField() {
    var forI: number;
    var forJ: number;

    forI = this.splittedTermList.numbersArray[1].termsArray.length + 1;
    forJ = this.splittedTermList.numbersArray[0].termsArray.length + 1;

    this.splittedTermList.result.push({
      value: '',
      type: 'number',
      isFresh: true,
      isDotted: true,
      isPermanentDotted: false,
      isFreshDot: true,
      beforeDot: false
    });

    if (this.splittedTermList.isDot) {
      for (var i = 0; i < this.splittedTermList.numbersArray[0].termsArray.length; i++) {
        this.splittedTermList.numbersArray[0].termsArray[i].isDotted = true;
      }
    }
    this.pushIntermediate(this.splittedTermList.empty);
  }

  rememberAction() {
    if (this.isIntermediate) {
      switch (this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].value) {
        case '':
          this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].value = 1;
          this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].isFresh = false;
          break;
        case 1:
          this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].value = '';
          this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].isFresh = true;
          break;
        default:
          break;
      }
    } else {
      switch (this.splittedTermList.remember[this.tempElement].value) {
        case '':
          this.splittedTermList.remember[this.tempElement].value = 1;
          this.splittedTermList.remember[this.tempElement].isFresh = false;
          break;
        case 1:
          this.splittedTermList.remember[this.tempElement].value = '';
          this.splittedTermList.remember[this.tempElement].isFresh = true;
          break;
        default:
          break;
      }
    }
  }

  putDot(id) {
    if (this.splittedTermList.result[id].isPermanentDotted) {
      for (var i = 0; i < this.splittedTermList.result.length; i++) {
        this.splittedTermList.result[i].isDotted = true;
        this.splittedTermList.result[i].isPermanentDotted = false;
        this.splittedTermList.result[i].isFreshDot = true;
        this.splittedTermList.isResultDot = 0;
      }
    } else {
      for (var i = 0; i < this.splittedTermList.result.length; i++) {
        this.splittedTermList.result[i].isDotted = false;
        this.splittedTermList.result[i].isPermanentDotted = false;
        this.splittedTermList.result[i].isFreshDot = false;
      }
      this.splittedTermList.result[id].isDotted = true;
      this.splittedTermList.result[id].isPermanentDotted = true;
      this.splittedTermList.isResultDot = 1;
    }
  }

  inputButtonClick(type, isInter, i, j, ev) {
    this.tempTrigger = type;
    this.isEnterAllowed = true;

    this.nonCenteredRightMenu = false;
    this.nonCenteredLeftMenu = false;
    if (ev.view.innerWidth - ev.screenX < 75) {
      this.nonCenteredRightMenu = true;
    } else {
      if (ev.screenX < 75) {
        this.nonCenteredLeftMenu = true;
      }
    }


    switch (type) {
      case 'mul': {
        this.remMenu = false;
        this.tempLine = i;
        this.tempElement = j;
        break;
      }
      case 'sub': {
        this.remMenu = false;
        this.tempLine = i;
        this.tempElement = j;
        break;
      }
      case 'res': {
        this.remMenu = false;
        this.tempElement = j;
        break;
      }
      default:
        break;
    }
  }

  resultInput(id) {
    this.isEnterAllowed = false;
    var type = this.tempTrigger;
    switch (id.class) {
      case 'regular': {
        switch (type) {
          case 'mul': {
            this.splittedTermList.intermediate.result[this.tempLine].multiplication[this.tempElement].value = id.value;
            this.splittedTermList.intermediate.result[this.tempLine].multiplication[this.tempElement].isFresh = false;
            if (this.tempElement == this.splittedTermList.intermediate.result[this.tempLine].multiplication.length - 1) {
              this.splittedTermList.intermediate.result[this.tempLine].multiplication.push({
                value: '',
                type: 'number',
                isFresh: true,
                isDotted: false,
                isPermanentDotted: false,
                isFreshDot: false,
                beforeDot: false
              });
            }
            break;
          }
          case 'sub': {
            this.splittedTermList.intermediate.result[this.tempLine].subtraction[this.tempElement].value = id.value;
            this.splittedTermList.intermediate.result[this.tempLine].subtraction[this.tempElement].isFresh = false;
            if (this.tempElement == this.splittedTermList.intermediate.result[this.tempLine].subtraction.length - 1) {
              this.splittedTermList.intermediate.result[this.tempLine].subtraction.push({
                value: '',
                type: 'number',
                isFresh: true,
                isDotted: false,
                isPermanentDotted: false,
                isFreshDot: false,
                beforeDot: false
              });
            }
            break;
          }
          case 'res': {
            if (this.tempElement != 0 && this.splittedTermList.result[this.tempElement].value == '' && id.value != '0') {
              for (var i = 0; i < this.splittedTermList.intermediate.result[this.tempLine].subtraction.length; i++) {
                if (this.splittedTermList.intermediate.result[this.tempLine].subtraction[i].value == '' || this.splittedTermList.intermediate.result[this.tempLine].subtraction[i].value == '0') {
                  this.splittedTermList.empty++;
                } else {
                  break;
                }
              }
              for (var i = 0; i < this.splittedTermList.intermediate.result[this.tempLine].subtraction.length; i++) {
                this.splittedTermList.intermediate.result[this.tempLine].subtraction[i].isFresh = false;
              }
              for (var i = 0; i < this.splittedTermList.intermediate.result[this.tempLine].multiplication.length; i++) {
                this.splittedTermList.intermediate.result[this.tempLine].multiplication[i].isFresh = false;
              }
              this.pushIntermediate(this.splittedTermList.empty);
            }
            this.splittedTermList.result[this.tempElement].value = id.value;
            this.splittedTermList.result[this.tempElement].isFresh = false;
            if (this.tempElement == this.splittedTermList.result.length - 1) {
              if (this.splittedTermList.isResultDot) {
                this.splittedTermList.result.push({
                  value: '',
                  type: 'number',
                  isFresh: true,
                  isDotted: false,
                  isPermanentDotted: false,
                  isFreshDot: false,
                  beforeDot: false
                });
              } else {
                this.splittedTermList.result.push({
                  value: '',
                  type: 'number',
                  isFresh: true,
                  isDotted: true,
                  isPermanentDotted: false,
                  isFreshDot: true,
                  beforeDot: false
                });
                try {
                  this.splittedTermList.result[this.tempElement - 1].isDotted = false;
                  this.splittedTermList.result[this.tempElement - 1].isFreshDot = false;
                } catch (error) {
                }
              }
            }

            break;
          }
          default:
            break;
        }
        break;
      }
      case 'cancel': {
        switch (type) {
          case 'mul': {
            this.splittedTermList.intermediate.result[this.tempLine].multiplication[this.tempElement].value = '';
            this.splittedTermList.intermediate.result[this.tempLine].multiplication[this.tempElement].isFresh = true;
            break;
          }
          case 'sub': {
            this.splittedTermList.intermediate.result[this.tempLine].subtraction[this.tempElement].value = '';
            this.splittedTermList.intermediate.result[this.tempLine].subtraction[this.tempElement].isFresh = true;
            break;
          }
          case 'res': {
            this.splittedTermList.result[this.tempElement].value = '';
            this.splittedTermList.result[this.tempElement].isFresh = true;
            break;
          }
          default:
            break;
        }
        break;
      }
      case 'done': {
        switch (type) {
          case 'res': {
            if (!this.splittedTermList.result[this.tempElement].value) {
              this.splittedTermList.result[this.tempElement].isFresh = true;
            }
            break;
          }
          default:
            break;
        }
        break;
      }
      default:
        break;
    }
  }

  denyEnter() {
    this.isEnterAllowed = false;
    try {
      this.splittedTermList.selected[this.tempElement].isSelected = false;
      this.splittedTermList.intermediate.selected[this.tempLine][this.tempElement].isSelected = false;
      this.splittedTermList.remember[this.tempElement].isSelected = false;
    } catch (error) { }

  }

  largestBeforeDot(): number {
    var max: number = this.splittedTermList.numbersArray[0].beforeDot;
    var maxID: number = 0;
    for (var i = 0; i < this.splittedTermList.numbersArray.length; i++) {
      if (this.splittedTermList.numbersArray[i].beforeDot > max) {
        max = this.splittedTermList.numbersArray[i].beforeDot;
        maxID = i;
      }
    }
    return maxID;
  }

  @ViewChildren(MdMenuTrigger) triggers: any;
  handleKeyboardEvents(event: KeyboardEvent) {
    this.key = event.which || event.keyCode;
    if (this.isEnterAllowed) {
      if (this.getValue(this.key) != 44) {
        this.resultInput({
          value: this.getValue(this.key),
          class: 'regular'
        });
      } else {
        if (this.key == 46) {
          this.resultInput({
            value: '',
            class: 'cancel'
          });
        } else {
          if (this.key == 8) {
            this.resultInput({
              value: '',
              class: 'done'
            });
          }
        }
      }
      this.triggers.toArray().forEach(element => {
        element.closeMenu();
      });
    }
  }

  getValue(ev): number {
    switch (ev) {
      case 48:
        return 0;
      case 49:
        return 1;
      case 50:
        return 2;
      case 51:
        return 3;
      case 52:
        return 4;
      case 53:
        return 5;
      case 54:
        return 6;
      case 55:
        return 7;
      case 56:
        return 8;
      case 57:
        return 9;
      case 96:
        return 0;
      case 97:
        return 1;
      case 98:
        return 2;
      case 99:
        return 3;
      case 100:
        return 4;
      case 101:
        return 5;
      case 102:
        return 6;
      case 103:
        return 7;
      case 104:
        return 8;
      case 105:
        return 9;
      default:
        break;
    }
    return 44;
  }

  saveResult() {
    for (var i = 0; i < this.splittedTermList.result.length; i++) {
      if (this.splittedTermList.result[i].value == '' && i != this.splittedTermList.result.length - 1) {
        this.res += '0';
      } else {
        this.res += this.splittedTermList.result[i].value;
      }
      if (this.splittedTermList.result[i].isPermanentDotted) {
        this.res += '.';
      }
    }
    localStorage.setItem('lastResult', this.res);
  }
}