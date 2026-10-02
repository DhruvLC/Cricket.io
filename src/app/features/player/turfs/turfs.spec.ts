import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Turfs } from './turfs';

describe('Turfs', () => {
  let component: Turfs;
  let fixture: ComponentFixture<Turfs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Turfs],
    }).compileComponents();

    fixture = TestBed.createComponent(Turfs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
