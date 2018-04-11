import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceDialogsComponent } from './workspace-dialogs.component';

describe('WorkspaceDialogsComponent', () => {
  let component: WorkspaceDialogsComponent;
  let fixture: ComponentFixture<WorkspaceDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
