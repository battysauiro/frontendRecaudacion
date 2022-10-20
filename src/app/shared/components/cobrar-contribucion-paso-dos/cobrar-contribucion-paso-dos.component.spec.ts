import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrarContribucionPasoDosComponent } from './cobrar-contribucion-paso-dos.component';

describe('CobrarContribucionPasoDosComponent', () => {
  let component: CobrarContribucionPasoDosComponent;
  let fixture: ComponentFixture<CobrarContribucionPasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobrarContribucionPasoDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CobrarContribucionPasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
