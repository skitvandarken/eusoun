import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulherComponent } from './mulher.component';

describe('MulherComponent', () => {
  let component: MulherComponent;
  let fixture: ComponentFixture<MulherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MulherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MulherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
