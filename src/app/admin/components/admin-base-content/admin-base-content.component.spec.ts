import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBaseContentComponent } from './admin-base-content.component';

describe('AdminBaseContentComponent', () => {
  let component: AdminBaseContentComponent;
  let fixture: ComponentFixture<AdminBaseContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBaseContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBaseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
