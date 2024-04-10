import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUsersSensorsComponent } from './gestion-users-sensors.component';

describe('GestionUsersSensorsComponent', () => {
  let component: GestionUsersSensorsComponent;
  let fixture: ComponentFixture<GestionUsersSensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionUsersSensorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionUsersSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
