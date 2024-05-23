import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColposcopiaComponent } from './colposcopia.component';

describe('ColposcopiaComponent', () => {
  let component: ColposcopiaComponent;
  let fixture: ComponentFixture<ColposcopiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColposcopiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColposcopiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
