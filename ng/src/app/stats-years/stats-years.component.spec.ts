import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsYearsComponent } from './stats-years.component';

describe('StatsYearsComponent', () => {
  let component: StatsYearsComponent;
  let fixture: ComponentFixture<StatsYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsYearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
