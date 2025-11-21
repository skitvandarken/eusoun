import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mesa1Component } from './mesa-1.component';

describe('Mesa1Component', () => {
  let component: Mesa1Component;
  let fixture: ComponentFixture<Mesa1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mesa1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mesa1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
