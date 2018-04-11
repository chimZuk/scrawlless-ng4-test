import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivColumnComponent } from './div-column.component';

describe('DivColumnComponent', () => {
  let component: DivColumnComponent;
  let fixture: ComponentFixture<DivColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
