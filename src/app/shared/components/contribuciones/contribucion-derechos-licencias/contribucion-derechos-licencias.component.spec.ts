import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribucionDerechosLicenciasComponent } from './contribucion-derechos-licencias.component';

describe('ContribucionDerechosLicenciasComponent', () => {
  let component: ContribucionDerechosLicenciasComponent;
  let fixture: ComponentFixture<ContribucionDerechosLicenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribucionDerechosLicenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribucionDerechosLicenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
