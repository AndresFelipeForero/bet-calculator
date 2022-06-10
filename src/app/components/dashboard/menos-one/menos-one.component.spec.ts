import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenosOneComponent } from './menos-one.component';

describe('MenosOneComponent', () => {
  let component: MenosOneComponent;
  let fixture: ComponentFixture<MenosOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenosOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenosOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
