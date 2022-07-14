import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorContribucionMultasComponent } from './paginador-contribucion-multas.component';

describe('PaginadorContribucionMultasComponent', () => {
  let component: PaginadorContribucionMultasComponent;
  let fixture: ComponentFixture<PaginadorContribucionMultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorContribucionMultasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorContribucionMultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
