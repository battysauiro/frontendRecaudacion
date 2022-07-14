import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorContribucionMultasVehicularComponent } from './paginador-contribucion-multas-vehicular.component';

describe('PaginadorContribucionMultasVehicularComponent', () => {
  let component: PaginadorContribucionMultasVehicularComponent;
  let fixture: ComponentFixture<PaginadorContribucionMultasVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorContribucionMultasVehicularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorContribucionMultasVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
