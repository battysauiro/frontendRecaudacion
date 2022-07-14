import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorContribucionDerechosLicenciasComponent } from './paginador-contribucion-derechos-licencias.component';

describe('PaginadorContribucionDerechosLicenciasComponent', () => {
  let component: PaginadorContribucionDerechosLicenciasComponent;
  let fixture: ComponentFixture<PaginadorContribucionDerechosLicenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorContribucionDerechosLicenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorContribucionDerechosLicenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
