import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeInvitationsComponent } from './initiative-invitations.component';

describe('InitiativeInvitationsComponent', () => {
  let component: InitiativeInvitationsComponent;
  let fixture: ComponentFixture<InitiativeInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiativeInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativeInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
