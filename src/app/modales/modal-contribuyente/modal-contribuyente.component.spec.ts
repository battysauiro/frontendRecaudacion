import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContribuyenteComponent } from './modal-contribuyente.component';

describe('ModalContribuyenteComponent', () => {
  let component: ModalContribuyenteComponent;
  let fixture: ComponentFixture<ModalContribuyenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalContribuyenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContribuyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
