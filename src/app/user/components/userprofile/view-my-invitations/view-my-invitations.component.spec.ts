import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyInvitationsComponent } from './view-my-invitations.component';

describe('ViewMyInvitationsComponent', () => {
  let component: ViewMyInvitationsComponent;
  let fixture: ComponentFixture<ViewMyInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
