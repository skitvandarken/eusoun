import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCriarComponent } from './album-criar.component';

describe('AlbumCriarComponent', () => {
  let component: AlbumCriarComponent;
  let fixture: ComponentFixture<AlbumCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumCriarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
