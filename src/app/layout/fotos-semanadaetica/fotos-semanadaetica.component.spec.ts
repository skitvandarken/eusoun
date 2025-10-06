import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosSemanadaeticaComponent } from './fotos-semanadaetica.component';

describe('FotosSemanadaeticaComponent', () => {
  let component: FotosSemanadaeticaComponent;
  let fixture: ComponentFixture<FotosSemanadaeticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotosSemanadaeticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotosSemanadaeticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
