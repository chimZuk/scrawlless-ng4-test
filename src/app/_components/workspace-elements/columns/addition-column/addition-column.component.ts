import { Component, ViewChildren, Output, Input, EventEmitter } from '@angular/core';
import { MdMenu, MdMenuTrigger, MdButton } from '@angular/material';

@Component({
  selector: 'addition-column',
  templateUrl: './addition-column.component.html',
  styleUrls: ['./addition-column.component.css'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})

export class AdditionColumnComponent {

  data: any;
  operation: string;
  operator: string;

  splittedTermList: any;
  autoNull: boolean;

  res: string = '';

  tempElement: number;
  tempTrigger: string;

  key: any;
  isEnterAllowed: boolean = false;

  nonCenteredLeftMenu: boolean;
  nonCenteredRightMenu: boolean;
  remMenu: boolean;

  inputButtons: any[] = [];


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

  ngOnInit() { 
    console.log("lol");
  }


  @Input()
  set isAutoNull(data: boolean) {
    this.autoNull = data;
  }
  get isAutoNull() { return this.autoNull; }

  @Input()
  set setOperation(data: string) {
    this.operation = data;
    if (this.operation == 'sub') {
      this.operator = '-';
    } else {
      if (this.operation == 'sum') {
        this.operator = '+';
      }
    }
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
        termsArray: [],
        remember: [],
        result: []
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

    if (this.isAutoNull) {
      this.autoNullAdd();
    } else {
      this.resetField();
    }
  }

  rememberAction(id) {
    switch (this.operation) {
      case 'sum': {
        switch (this.splittedTermList.remember[id].value) {
          case '':
            this.splittedTermList.remember[id].value = 1;
            this.splittedTermList.remember[id].isFresh = false;
            break;
          case 1:
            this.splittedTermList.remember[id].value = '';
            this.splittedTermList.remember[id].isFresh = true;
            break;
          default:
            break;
        }
        break;
      }
      case 'sub': {
        switch (this.splittedTermList.remember[id].value) {
          case '':
            this.splittedTermList.remember[id].value = -1;
            this.splittedTermList.remember[id].isFresh = false;
            break;
          case -1:
            this.splittedTermList.remember[id].value = '';
            this.splittedTermList.remember[id].isFresh = true;
            break;
          default:
            break;
        }
        break;
      }
      default:
        break;
    }

  }

  putDot(id) {
    if (!this.autoNull) {
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
    }
  }

  inputButtonClick(type, id, ev) {
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
    this.tempElement = id;

    switch (type) {
      case 'res': {
        this.remMenu = false;
        this.splittedTermList.selected[this.tempElement].isSelected = true;
        break;
      }
      case 'rem': {
        this.remMenu = true;
        this.rememberAction(id);
        this.splittedTermList.remember[id].isSelected = true;
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
            this.splittedTermList.result[this.tempElement].value = id.value;
            this.splittedTermList.result[this.tempElement].isFresh = false;
            break;
          }
          case 'rem': {
            this.splittedTermList.remember[this.tempElement].value = id.value;
            this.splittedTermList.remember[this.tempElement].isFresh = false;
            this.splittedTermList.remember[this.tempElement].isSelected = false;
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
            this.splittedTermList.remember[this.tempElement].value = '';
            this.splittedTermList.remember[this.tempElement].isFresh = true;
            this.splittedTermList.remember[this.tempElement].isSelected = false;
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
            if (!this.splittedTermList.result[this.tempElement].value) {
              this.splittedTermList.result[this.tempElement].isFresh = true;
            }
            this.splittedTermList.remember[this.tempElement].isSelected = false;
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
  }

  denyEnter() {
    this.isEnterAllowed = false;
    this.splittedTermList.selected[this.tempElement].isSelected = false;
    try {
      this.splittedTermList.remember[this.tempElement].isSelected = false;
    } catch (error) { }

  }


  autoNullAdd() {
    var max: number = Number(this.splittedTermList.beforeDot);
    for (var i = 0; i < this.splittedTermList.numbersArray.length; i++) {
      var term = this.splittedTermList.numbersArray[i].beforeDot;
      var dif: number = max - term;
      if (dif == 0) {

      } else {
        if (dif == max && term == 0) {
          this.splittedTermList.numbersArray[i].beforeDot = max;
          this.splittedTermList.numbersArray[i].termsArray[0].isDotted = true;
          this.splittedTermList.numbersArray[i].termsArray[0].isPermanentDotted = true;
          for (var j = dif; j > 0; j--) {
            this.splittedTermList.numbersArray[i].termsArray.unshift({
              value: '0',
              type: 'number',
              isDotted: false,
              isPermanentDotted: false,
              beforeDot: true
            });
          }
        } else {
          if (dif > 0) {
            this.splittedTermList.numbersArray[i].beforeDot = max;
            for (var j = dif; j > 0; j--) {
              this.splittedTermList.numbersArray[i].termsArray.unshift({
                value: '0',
                type: 'number',
                isDotted: false,
                isPermanentDotted: false,
                beforeDot: true
              });
            }
          }
        }
      }
    }
    this.resetField();
  }

  resetField() {
    this.splittedTermList.selected = [];
    var forI: number;

    if (this.operation != 'sub') {
      forI = this.splittedTermList.numbersArray[this.largestTerm()].afterDot + 1;
    } else {
      forI = this.splittedTermList.numbersArray[this.largestTerm()].afterDot;
    }

    for (var i = 0; i < forI; i++) {
      if (i + 1 != forI && (!this.splittedTermList.isDot || !this.autoNull)) {
        this.splittedTermList.remember.unshift({
          value: '',
          type: 'number',
          isFresh: true,
          isDotted: false,
          beforeDot: false
        });
      } else {
        if (this.splittedTermList.isDot) {
          this.splittedTermList.remember.unshift({
            value: '',
            type: 'number',
            isFresh: true,
            isDotted: false,
            beforeDot: false
          });
        }
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
    }

    if (this.splittedTermList.isDot && this.autoNull) {
      this.splittedTermList.remember[0].isDotted = true;
      this.splittedTermList.result[0].isDotted = true;
      this.splittedTermList.result[0].isPermanentDotted = true;
    }

    forI = this.splittedTermList.numbersArray[this.largestTerm()].beforeDot;
    for (var i = 0; i < forI; i++) {
      if (i + 1 != forI) {
        this.splittedTermList.remember.unshift({
          value: '',
          type: 'number',
          isFresh: true,
          isDotted: false,
          beforeDot: true
        });
      }
      this.splittedTermList.result.unshift({
        value: '',
        type: 'number',
        isFresh: true,
        isDotted: false,
        isPermanentDotted: false,
        isFreshDot: false,
        beforeDot: true
      });
    }

    if (!this.isAutoNull) {
      for (var i = 0; i < this.splittedTermList.numbersArray.length; i++) {
        for (var j = 0; j < this.splittedTermList.numbersArray[i].termsArray.length; j++) {
          this.splittedTermList.numbersArray[i].termsArray[j].isDotted = true;
        }
      }
      for (var i = 0; i < this.splittedTermList.remember.length; i++) {
        this.splittedTermList.remember[i].isDotted = true;
        this.splittedTermList.remember[i].beforeDot = false;
      }
      for (var i = 0; i < this.splittedTermList.result.length; i++) {
        this.splittedTermList.result[i].isDotted = true;
        this.splittedTermList.result[i].isFreshDot = true;
        this.splittedTermList.result[i].beforeDot = false;
      }
    }

    forI = this.splittedTermList.numbersArray[this.largestTerm()].afterDot + this.splittedTermList.numbersArray[this.largestTerm()].beforeDot;
    if (this.operation == 'sub') {
      forI--;
    }
    for (var i = 0; i < forI * 2; i++) {
      this.splittedTermList.selected.unshift({
        isSelected: false
      });
    }
  }

  addNull(id) {
    var tempTerm = this.splittedTermList.numbersArray[id];
    var tempTermLargest = this.splittedTermList.numbersArray[this.largestTerm()];
    var check = tempTerm.beforeDot + tempTerm.afterDot == tempTermLargest.beforeDot + tempTermLargest.afterDot;
    if (check) {
      this.splittedTermList.remember.unshift({
        value: '',
        type: 'number',
        isFresh: true,
        isDotted: true,
        beforeDot: false
      });
      this.splittedTermList.result.unshift({
        value: '',
        type: 'number',
        isFresh: true,
        isDotted: true,
        isPermanentDotted: false,
        isFreshDot: true,
        beforeDot: false
      });
      this.splittedTermList.selected.push({
        isSelected: false
      });
    }

    if (!this.splittedTermList.numbersArray[id].beforeDot) {
      this.splittedTermList.numbersArray[id].termsArray[0].isDotted = true;
      this.splittedTermList.numbersArray[id].termsArray[0].isPermanentDotted = true;
      this.splittedTermList.numbersArray[id].termsArray.unshift({
        value: '0',
        type: 'number',
        isDotted: true,
        isPermanentDotted: false,
        beforeDot: true
      });
    } else {
      this.splittedTermList.numbersArray[id].termsArray.unshift({
        value: '0',
        type: 'number',
        isDotted: true,
        isPermanentDotted: false,
        beforeDot: true
      });
    }
    this.splittedTermList.numbersArray[id].beforeDot++

    for (var j = 0; j < this.splittedTermList.result.length; j++) {
      this.splittedTermList.result[j].isPermanentDotted = false;
      this.splittedTermList.result[j].isFreshDot = true;
    }
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

  largestTerm(): number {
    var max: number = this.splittedTermList.numbersArray[0].termsArray.length;
    var maxID: number = 0;
    for (var i = 0; i < this.splittedTermList.numbersArray.length; i++) {
      if (this.splittedTermList.numbersArray[i].termsArray.length > max) {
        max = this.splittedTermList.numbersArray[i].termsArray.length;
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
      switch (this.tempTrigger) {
        case 'res': {
          if (this.splittedTermList.numbersArray.length < 3) {
            this.triggers.toArray()[this.tempElement].closeMenu();
          } else {
            this.triggers.toArray()[this.tempElement + this.splittedTermList.remember.length].closeMenu();
          }
          break;
        }
        case 'rem': {
          this.triggers.toArray()[this.tempElement].closeMenu();
          break;
        }
        default:
          break;
      }
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
    localStorage.setItem('lastResult', this.res);
  }
}