import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrarContribucionComponent } from './cobrar-contribucion.component';

describe('CobrarContribucionComponent', () => {
  let component: CobrarContribucionComponent;
  let fixture: ComponentFixture<CobrarContribucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobrarContribucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CobrarContribucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
