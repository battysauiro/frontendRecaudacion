import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorContribucionDerechosGComponent } from './paginador-contribucion-derechos-g.component';

describe('PaginadorContribucionDerechosGComponent', () => {
  let component: PaginadorContribucionDerechosGComponent;
  let fixture: ComponentFixture<PaginadorContribucionDerechosGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorContribucionDerechosGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorContribucionDerechosGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
