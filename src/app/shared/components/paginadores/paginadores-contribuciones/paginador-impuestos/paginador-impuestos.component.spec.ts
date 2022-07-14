import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorImpuestosComponent } from './paginador-impuestos.component';

describe('PaginadorImpuestosComponent', () => {
  let component: PaginadorImpuestosComponent;
  let fixture: ComponentFixture<PaginadorImpuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorImpuestosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
