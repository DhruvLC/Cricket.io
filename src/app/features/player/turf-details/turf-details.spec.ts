import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurfDetails } from './turf-details';

describe('TurfDetails', () => {
  let component: TurfDetails;
  let fixture: ComponentFixture<TurfDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurfDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(TurfDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
