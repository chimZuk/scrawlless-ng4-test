import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

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


  getRoot(x, y, width, height, powerWidth) {
    console.log(this.makeRoot(x, y, width, height, powerWidth))
    return this.makeRoot(x, y, width, height, powerWidth);
  }

  constructor() { }

  ngOnInit() {

  }

}
