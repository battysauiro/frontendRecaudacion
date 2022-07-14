import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorContribucionMultasEbriedadComponent } from './paginador-contribucion-multas-ebriedad.component';

describe('PaginadorContribucionMultasEbriedadComponent', () => {
  let component: PaginadorContribucionMultasEbriedadComponent;
  let fixture: ComponentFixture<PaginadorContribucionMultasEbriedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorContribucionMultasEbriedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorContribucionMultasEbriedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
