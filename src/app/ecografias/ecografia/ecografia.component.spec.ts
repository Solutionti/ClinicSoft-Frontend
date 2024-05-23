import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcografiaComponent } from './ecografia.component';

describe('EcografiaComponent', () => {
  let component: EcografiaComponent;
  let fixture: ComponentFixture<EcografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcografiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
