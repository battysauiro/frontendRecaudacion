import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContribucionesComponent } from './form-contribuciones.component';

describe('FormContribucionesComponent', () => {
  let component: FormContribucionesComponent;
  let fixture: ComponentFixture<FormContribucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormContribucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContribucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
