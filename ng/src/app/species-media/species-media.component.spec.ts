import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesMediaComponent } from './species-media.component';

describe('SpeciesMediaComponent', () => {
  let component: SpeciesMediaComponent;
  let fixture: ComponentFixture<SpeciesMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeciesMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
