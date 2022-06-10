import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenosDosComponent } from './menos-dos.component';

describe('MenosDosComponent', () => {
  let component: MenosDosComponent;
  let fixture: ComponentFixture<MenosDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenosDosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenosDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
