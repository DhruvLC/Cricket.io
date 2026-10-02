import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTurf } from './list-turf';

describe('ListTurf', () => {
  let component: ListTurf;
  let fixture: ComponentFixture<ListTurf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTurf],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTurf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
