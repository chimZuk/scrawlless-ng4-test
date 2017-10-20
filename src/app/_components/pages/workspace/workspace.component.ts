import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  private id;
  sub: any;
  pageName: any;

  getArr = function (i) {
    return new Array(i);
  }

  lineHeight(i){
    console.log(Number(i))
    return Number(i) * Number(100)
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

}
