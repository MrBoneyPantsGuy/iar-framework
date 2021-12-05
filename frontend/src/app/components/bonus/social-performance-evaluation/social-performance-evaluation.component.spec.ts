import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatTableModule} from '@angular/material/table';

import { SocialPerformanceEvaluationComponent } from './social-performance-evaluation.component';

describe('SocialPerformanceEvaluationComponent', () => {
  let component: SocialPerformanceEvaluationComponent;
  let fixture: ComponentFixture<SocialPerformanceEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialPerformanceEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPerformanceEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
