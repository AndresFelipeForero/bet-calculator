import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenosTresComponent } from './menos-tres.component';

describe('MenosTresComponent', () => {
  let component: MenosTresComponent;
  let fixture: ComponentFixture<MenosTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenosTresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenosTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
