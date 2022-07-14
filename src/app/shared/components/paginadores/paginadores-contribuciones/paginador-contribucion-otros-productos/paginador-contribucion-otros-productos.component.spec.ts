import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorContribucionOtrosProductosComponent } from './paginador-contribucion-otros-productos.component';

describe('PaginadorContribucionOtrosProductosComponent', () => {
  let component: PaginadorContribucionOtrosProductosComponent;
  let fixture: ComponentFixture<PaginadorContribucionOtrosProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorContribucionOtrosProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorContribucionOtrosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
