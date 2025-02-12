import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacoesComponent } from './publicacoes.component';

describe('PublicacoesComponent', () => {
  let component: PublicacoesComponent;
  let fixture: ComponentFixture<PublicacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
