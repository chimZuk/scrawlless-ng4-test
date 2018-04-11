import { Component, ViewChildren, Output, Input, EventEmitter } from '@angular/core';
import { MatMenu, MatMenuTrigger, MatButton } from '@angular/material';

@Component({
  selector: 'mul-column',
  templateUrl: './mul-column.component.html',
  styleUrls: ['./mul-column.component.css'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class MulColumnComponent {

  data: any;
  operation: string;
  operator: string = '×';

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
    return new Array(i);
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
      beforeDot: 0,
      afterDot: 0,
      numbersArray: [],
      intermediate: {
        result: [],
        remember: [],
        selected: []
      },
      remember: [],
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
          this.splittedTermList.numbersArray[i].termsArray[0].isDotted = true;
          this.splittedTermList.numbersArray[i].termsArray[0].isPermanentDotted = true;
        } else {
          if (tempMas[i][j] == '-') {
          } else {
            if (this.splittedTermList.numbersArray[i].isDot) {
              this.splittedTermList.numbersArray[i].termsArray.unshift({
                value: tempMas[i][j],
                type: 'number',
                isDotted: false,
                isPermanentDotted: false,
                beforeDot: true
              });
              this.splittedTermList.numbersArray[i].beforeDot++;
            } else {
              this.splittedTermList.numbersArray[i].termsArray.unshift({
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

    this.splittedTermList.beforeDot = this.splittedTermList.numbersArray[this.largestBeforeDot()].beforeDot;
    this.splittedTermList.afterDot = this.splittedTermList.numbersArray[0].termsArray.length - this.splittedTermList.numbersArray[0].beforeDot;

    this.resetField();
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
          this.splittedTermList.result[i].isPermanentDotted = false;
          this.splittedTermList.result[i].isFreshDot = true;
        }
      } else {
        for (var i = 0; i < this.splittedTermList.result.length; i++) {
          this.splittedTermList.result[i].isPermanentDotted = false;
          this.splittedTermList.result[i].isFreshDot = false;
        }
        this.splittedTermList.result[id].isPermanentDotted = true;
      }
      this.saveResult();
  }

  inputButtonClick(type, isInter, i, j, ev) {
    this.tempTrigger = type;

    this.nonCenteredRightMenu = false;
    this.nonCenteredLeftMenu = false;
    if (ev.view.innerWidth - ev.screenX < 75) {
      this.nonCenteredRightMenu = true;
    } else {
      if (ev.screenX < 75) {
        this.nonCenteredLeftMenu = true;
      }
    }

    this.isEnterAllowed = true;
    this.isIntermediate = isInter;

    switch (type) {
      case 'res': {
        this.remMenu = false;
        if (isInter) {
          this.tempLine = i;
          this.tempElement = j;
          this.splittedTermList.intermediate.selected[this.tempLine][this.tempElement].isSelected = true;
        } else {
          this.tempElement = i;
          this.splittedTermList.selected[this.tempElement].isSelected = true;
        }
        break;
      }
      case 'rem': {
        if (isInter) {
          this.tempElement = j;
          this.remMenu = true;
          this.rememberAction();
          this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].isSelected = true;
        } else {
          this.tempElement = i;
          this.remMenu = true;
          this.rememberAction();
          this.splittedTermList.remember[this.tempElement].isSelected = true;
        }
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
          case 'res': {
            if (this.isIntermediate) {
              this.splittedTermList.intermediate.result[this.tempLine][this.tempElement].value = id.value;
              this.splittedTermList.intermediate.result[this.tempLine][this.tempElement].isFresh = false;
            } else {
              this.splittedTermList.result[this.tempElement].value = id.value;
              this.splittedTermList.result[this.tempElement].isFresh = false;
            }
            break;
          }
          case 'rem': {
            if (this.isIntermediate) {
              this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].value = id.value;
              this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].isFresh = false;
              this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].isSelected = false;
            } else {
              this.splittedTermList.remember[this.tempElement].value = id.value;
              this.splittedTermList.remember[this.tempElement].isFresh = false;
              this.splittedTermList.remember[this.tempElement].isSelected = false;
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
          case 'res': {
            this.splittedTermList.result[this.tempElement].value = '';
            this.splittedTermList.result[this.tempElement].isFresh = true;
            break;
          }
          case 'rem': {
            if (this.isIntermediate) {
              this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].value = '';
              this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].isFresh = true;
              this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].isSelected = false;
            } else {
              this.splittedTermList.remember[this.tempElement].value = '';
              this.splittedTermList.remember[this.tempElement].isFresh = true;
              this.splittedTermList.remember[this.tempElement].isSelected = false;
            }
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
          case 'rem': {
            if (this.isIntermediate) {
              this.splittedTermList.intermediate.remember[this.tempLine][this.tempElement].isSelected = false;
            } else {
              this.splittedTermList.remember[this.tempElement].isSelected = false;
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
    this.splittedTermList.selected[this.tempElement].isSelected = false;
    this.saveResult();
  }

  denyEnter() {
    this.isEnterAllowed = false;
    try {
      this.splittedTermList.selected[this.tempElement].isSelected = false;
      this.splittedTermList.intermediate.selected[this.tempLine][this.tempElement].isSelected = false;
      this.splittedTermList.remember[this.tempElement].isSelected = false;
    } catch (error) { }

  }

  resetField() {
    var forI: number;
    var forJ: number;

    forI = this.splittedTermList.numbersArray[1].termsArray.length;
    forJ = this.splittedTermList.numbersArray[0].termsArray.length + 1;
    for (var i = 0; i < forI; i++) {
      var remember: any[] = [];
      var result: any[] = [];
      for (var j = 0; j < forJ; j++) {
        if (j + 1 != forJ) {
          remember.unshift({
            value: '',
            type: 'number',
            isFresh: true,
            isSelected: false,
            isDotted: false,
            beforeDot: false
          });
        }
        result.unshift({
          value: '',
          type: 'number',
          isFresh: true,
          isDotted: false,
          isPermanentDotted: false,
          isFreshDot: false,
          beforeDot: false
        });
      }
      this.splittedTermList.intermediate.remember.unshift(remember);
      this.splittedTermList.intermediate.result.unshift(result);
    }

    forI = this.splittedTermList.numbersArray[1].termsArray.length;
    forJ = this.splittedTermList.numbersArray[0].termsArray.length + this.splittedTermList.numbersArray[1].termsArray.length + 1;
    for (var i = 0; i < forI; i++) {
      var selected: any[] = [];
      for (var j = 0; j < forJ; j++) {
        selected.push({
          isSelected: false
        });
      }
      this.splittedTermList.intermediate.selected.push(selected);
    }

    forI = this.splittedTermList.numbersArray[0].termsArray.length + this.splittedTermList.numbersArray[1].termsArray.length + 1;
    for (var i = 0; i < forI; i++) {
      if (i + 1 != forI) {
        this.splittedTermList.remember.unshift({
          value: '',
          type: 'number',
          isFresh: true,
          isSelected: false,
          isDotted: false,
          beforeDot: false
        });
      }
      this.splittedTermList.result.unshift({
        value: '',
        type: 'number',
        isFresh: true,
        isDotted: false,
        isPermanentDotted: false,
        isFreshDot: false,
        beforeDot: false
      });
      this.splittedTermList.selected.unshift({
        isSelected: false
      });
    }


    if (this.splittedTermList.beforeDot) {
      forI = this.splittedTermList.numbersArray[1].termsArray.length;
      forJ = this.splittedTermList.numbersArray[0].termsArray.length;
      for (var i = 0; i < forI; i++) {
        for (var j = 0; j < forJ; j++) {
          this.splittedTermList.intermediate.remember[i][j].isDotted = true;
        }
      }
      for (var j = 0; j < this.splittedTermList.remember.length; j++) {
        this.splittedTermList.remember[j].isDotted = true;
        this.splittedTermList.remember[j].beforeDot = false;
      }

      for (var i = 0; i < this.splittedTermList.numbersArray.length; i++) {
        for (var j = 0; j < this.splittedTermList.numbersArray[i].termsArray.length; j++) {
          this.splittedTermList.numbersArray[i].termsArray[j].isDotted = true;
        }
      }

      forI = this.splittedTermList.numbersArray[1].termsArray.length;
      forJ = this.splittedTermList.numbersArray[0].termsArray.length + 1;
      for (var i = 0; i < forI; i++) {
        for (var j = 0; j < forJ; j++) {
          this.splittedTermList.intermediate.result[i][j].isDotted = true;
        }
      }
      for (var i = 0; i < this.splittedTermList.result.length; i++) {
        this.splittedTermList.result[i].isDotted = true;
        this.splittedTermList.result[i].isFreshDot = true;
        this.splittedTermList.result[i].beforeDot = false;
      }
    }
    this.res = '';
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


  @ViewChildren(MatMenuTrigger) triggers: any;
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
      for (var i = 0; i < this.splittedTermList.intermediate.selected.length; i++) {
        for (var j = 0; j < this.splittedTermList.intermediate.selected[i].length; j++) {
          this.splittedTermList.intermediate.selected[i][j].isSelected = false;
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

  check() {
    console.log('Check is unavailable now');
  }

  saveResult() {
    this.res = "";
    for (var i = this.splittedTermList.result.length - 1; i > -1; i--) {
      if (this.splittedTermList.result[i].value == '') {
        this.res += '0';
      } else {
        this.res += this.splittedTermList.result[i].value;
      }
      if (this.splittedTermList.result[i].isPermanentDotted) {
        this.res += '.';
      }
    }
  }
}
