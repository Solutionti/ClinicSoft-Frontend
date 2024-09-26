import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcografiamorfologicaComponent } from './ecografiamorfologica.component';

describe('EcografiamorfologicaComponent', () => {
  let component: EcografiamorfologicaComponent;
  let fixture: ComponentFixture<EcografiamorfologicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcografiamorfologicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcografiamorfologicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
