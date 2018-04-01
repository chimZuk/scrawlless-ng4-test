import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicationColumnComponent } from './multiplication-column.component';

describe('MultiplicationColumnComponent', () => {
  let component: MultiplicationColumnComponent;
  let fixture: ComponentFixture<MultiplicationColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplicationColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplicationColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
