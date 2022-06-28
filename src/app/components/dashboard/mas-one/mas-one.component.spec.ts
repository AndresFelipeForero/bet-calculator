import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasOneComponent } from './mas-one.component';

describe('MasOneComponent', () => {
  let component: MasOneComponent;
  let fixture: ComponentFixture<MasOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
