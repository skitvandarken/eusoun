import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumListarComponent } from './album-listar.component';

describe('AlbumListarComponent', () => {
  let component: AlbumListarComponent;
  let fixture: ComponentFixture<AlbumListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
