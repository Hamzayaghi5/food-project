import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResturantsComponent } from './manage-resturants.component';

describe('ManageResturantsComponent', () => {
  let component: ManageResturantsComponent;
  let fixture: ComponentFixture<ManageResturantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageResturantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageResturantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
