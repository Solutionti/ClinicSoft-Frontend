import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialpacienteComponent } from './historialpaciente.component';

describe('HistorialpacienteComponent', () => {
  let component: HistorialpacienteComponent;
  let fixture: ComponentFixture<HistorialpacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialpacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialpacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
