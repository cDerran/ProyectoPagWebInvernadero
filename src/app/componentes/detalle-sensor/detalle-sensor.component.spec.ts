import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSensorComponent } from './detalle-sensor.component';

describe('DetalleSensorComponent', () => {
  let component: DetalleSensorComponent;
  let fixture: ComponentFixture<DetalleSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
