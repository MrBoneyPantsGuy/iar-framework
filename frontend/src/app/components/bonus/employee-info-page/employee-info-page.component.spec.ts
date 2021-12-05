import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInfoPageComponent } from './employee-info-page.component';

describe('EmployeeInfoPageComponent', () => {
  let component: EmployeeInfoPageComponent;
  let fixture: ComponentFixture<EmployeeInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeInfoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
