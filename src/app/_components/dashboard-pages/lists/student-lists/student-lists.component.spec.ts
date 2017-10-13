import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListsComponent } from './student-lists.component';

describe('StudentListsComponent', () => {
  let component: StudentListsComponent;
  let fixture: ComponentFixture<StudentListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
