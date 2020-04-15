import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsMonthsComponent } from './stats-months.component';

describe('StatsMonthsComponent', () => {
  let component: StatsMonthsComponent;
  let fixture: ComponentFixture<StatsMonthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsMonthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
