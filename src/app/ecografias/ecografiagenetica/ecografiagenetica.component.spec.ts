import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcografiageneticaComponent } from './ecografiagenetica.component';

describe('EcografiageneticaComponent', () => {
  let component: EcografiageneticaComponent;
  let fixture: ComponentFixture<EcografiageneticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcografiageneticaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcografiageneticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
