import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribucionMultasVehicularComponent } from './contribucion-multas-vehicular.component';

describe('ContribucionMultasVehicularComponent', () => {
  let component: ContribucionMultasVehicularComponent;
  let fixture: ComponentFixture<ContribucionMultasVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribucionMultasVehicularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribucionMultasVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
