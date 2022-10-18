import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesContribuyentesComponent } from './reportes-contribuyentes.component';

describe('ReportesContribuyentesComponent', () => {
  let component: ReportesContribuyentesComponent;
  let fixture: ComponentFixture<ReportesContribuyentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesContribuyentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesContribuyentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
