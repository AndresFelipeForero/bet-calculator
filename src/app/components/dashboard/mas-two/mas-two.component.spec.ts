import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasTwoComponent } from './mas-two.component';

describe('MasTwoComponent', () => {
  let component: MasTwoComponent;
  let fixture: ComponentFixture<MasTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
