import { Injectable } from '@angular/core';

@Injectable()
export class HomeworkDataService {

  constructor() { }
  
  lines: any = {
    0: {
      id: 0,
      y: 200,
      x: 260,
      fr: {
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
      },
      ex: {
        0: {
          line: 0,
          pe: 0,
          pd: 0,
          fr: 0,
          ch: 1, zn: 0, osn: 0,
          ce: [1],
          cd: []
        },
        1: {
          line: 0,
          pe: 0,
          pd: 0,
          fr: 0,
          ch: 0, zn: 0, osn: 1,
          ce: [2, 3, 8, 9],
          cd: [4, 5, 6, 1, 2, 3]
        },
        2: {
          line: 0,
          pe: 1,
          pd: 3,
          fr: 1,
          ch: 1, zn: 0, osn: 0,
          ce: [4, 5],
          cd: [7, 8, 9]
        },
        3: {
          line: 0,
          pe: 1,
          pd: 3,
          fr: 1,
          ch: 0, zn: 1, osn: 0,
          ce: [10],
          cd: [16]
        },
        4: {
          line: 0,
          pe: 2,
          pd: 9,
          fr: 2,
          ch: 1, zn: 0, osn: 0,
          ce: [],
          cd: [10]
        },
        5: {
          line: 0,
          pe: 2,
          pd: 9,
          fr: 2,
          ch: 0, zn: 1, osn: 0,
          ce: [6, 7],
          cd: [11, 12, 13]
        },
        6: {
          line: 0,
          pe: 5,
          pd: 13,
          fr: 3,
          ch: 1, zn: 0, osn: 0,
          ce: [],
          cd: [14]
        },
        7: {
          line: 0,
          pe: 5,
          pd: 13,
          fr: 3,
          ch: 0, zn: 1, osn: 0,
          ce: [],
          cd: [55]
        },
        8: {
          line: 0,
          pe: 1,
          pd: 6,
          fr: 4,
          ch: 1, zn: 0, osn: 0,
          ce: [],
          cd: [17]
        },
        9: {
          line: 0,
          pe: 1,
          pd: 6,
          fr: 4,
          ch: 0, zn: 1, osn: 0,
          ce: [],
          cd: [18]
        }
      },
      di: {
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
        55: {
          line: 0,
          pe: 7,
          s: 1,
          pos: 1,
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
    }
  }

  elements: any = {
    lines: [0],
    fractions: [1, 2, 3, 4],
    expressions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
  }

}
