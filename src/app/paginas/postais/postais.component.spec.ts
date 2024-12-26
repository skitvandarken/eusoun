import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostaisComponent } from './postais.component';

describe('PostaisComponent', () => {
  let component: PostaisComponent;
  let fixture: ComponentFixture<PostaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
