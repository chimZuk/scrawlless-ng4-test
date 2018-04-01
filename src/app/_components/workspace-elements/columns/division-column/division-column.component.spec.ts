import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionColumnComponent } from './division-column.component';

describe('DivisionColumnComponent', () => {
  let component: DivisionColumnComponent;
  let fixture: ComponentFixture<DivisionColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
