import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnCountDialogComponent } from './column-count-dialog.component';

describe('ColumnCountDialogComponent', () => {
  let component: ColumnCountDialogComponent;
  let fixture: ComponentFixture<ColumnCountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnCountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnCountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
