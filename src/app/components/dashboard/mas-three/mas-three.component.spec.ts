import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasThreeComponent } from './mas-three.component';

describe('MasThreeComponent', () => {
  let component: MasThreeComponent;
  let fixture: ComponentFixture<MasThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
