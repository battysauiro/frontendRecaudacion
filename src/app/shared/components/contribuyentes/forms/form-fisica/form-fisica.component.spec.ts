import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFisicaComponent } from './form-fisica.component';

describe('FormFisicaComponent', () => {
  let component: FormFisicaComponent;
  let fixture: ComponentFixture<FormFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFisicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
