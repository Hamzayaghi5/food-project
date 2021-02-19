import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbasecontentComponent } from './adminbasecontent.component';

describe('AdminbasecontentComponent', () => {
  let component: AdminbasecontentComponent;
  let fixture: ComponentFixture<AdminbasecontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminbasecontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbasecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
