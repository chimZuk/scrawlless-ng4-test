import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulColumnComponent } from './mul-column.component';

describe('MulColumnComponent', () => {
  let component: MulColumnComponent;
  let fixture: ComponentFixture<MulColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
