import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialSensorComponent } from './historial-sensor.component';

describe('HistorialSensorComponent', () => {
  let component: HistorialSensorComponent;
  let fixture: ComponentFixture<HistorialSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
