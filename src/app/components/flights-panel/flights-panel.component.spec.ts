import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsPanelComponent } from './flights-panel.component';

describe('FlightsPanelComponent', () => {
  let component: FlightsPanelComponent;
  let fixture: ComponentFixture<FlightsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
