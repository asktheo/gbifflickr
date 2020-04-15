import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsActivityComponent } from './stats-activity.component';

describe('StatsActivityComponent', () => {
  let component: StatsActivityComponent;
  let fixture: ComponentFixture<StatsActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
