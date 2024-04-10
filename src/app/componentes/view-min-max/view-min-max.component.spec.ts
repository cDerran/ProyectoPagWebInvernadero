import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMinMaxComponent } from './view-min-max.component';

describe('ViewMinMaxComponent', () => {
  let component: ViewMinMaxComponent;
  let fixture: ComponentFixture<ViewMinMaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMinMaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMinMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
