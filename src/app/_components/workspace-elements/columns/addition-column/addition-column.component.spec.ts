import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionColumnComponent } from './addition-column.component';

describe('AdditionColumnComponent', () => {
  let component: AdditionColumnComponent;
  let fixture: ComponentFixture<AdditionColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
