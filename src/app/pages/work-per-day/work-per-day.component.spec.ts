import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPerDayComponent } from './work-per-day.component';

describe('WorkPerDayComponent', () => {
  let component: WorkPerDayComponent;
  let fixture: ComponentFixture<WorkPerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkPerDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
