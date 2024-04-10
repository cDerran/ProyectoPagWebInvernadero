import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSensorModalComponent } from './agregar-sensor-modal.component';

describe('AgregarSensorModalComponent', () => {
  let component: AgregarSensorModalComponent;
  let fixture: ComponentFixture<AgregarSensorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarSensorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarSensorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
